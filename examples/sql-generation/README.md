# 🧠 pydantic-ai-sql-gen

Generate and validate SQL queries from natural language using OpenAI, Pydantic AI, and PostgreSQL.

This project demonstrates how to:

* Prompt an LLM to generate SQL from user intent.
* Automatically validate generated SQL against a live database.
* Use `logfire` for tracing and observability.
* Inject database dependencies into an agent.
* Support multiple return types via `Union` with validation.

---

## 💡 Example Usage

Run the agent to generate SQL from a natural language request:

```bash
uv run sql_gen.py "show me error records with the tag 'foobar'"
```

Or run with no arguments to use the default prompt:

```bash
uv run sql_gen.py
```

Example output (via `devtools.debug`):

```py
Success(
  sql_query='SELECT * FROM records WHERE level = 'error' and 'foobar' = ANY(tags)',
  explanation='This query selects all records with level error and tag foobar.'
)
```

---

## 🏗️ Database Schema

The agent generates SQL targeting a `records` table with a logfire-style schema, including:

```sql
CREATE TABLE records (
    created_at timestamptz,
    start_timestamp timestamptz,
    end_timestamp timestamptz,
    trace_id text,
    ...
    level log_level,
    ...
    attributes jsonb,
    tags text[]
);
```

If the database does not exist, it is created automatically on startup.

---

## 🧪 SQL Validation

Before returning a generated SQL query, the agent:

1. Strips malformed escape characters.
2. Ensures the query is a `SELECT`.
3. Executes `EXPLAIN` to validate SQL correctness.
4. Returns a helpful error message (`InvalidRequest`) if the query can't be generated.

This helps avoid brittle or unsafe SQL being blindly executed downstream.

---

## 🤖 Agent Implementation

The agent uses:

* `Agent[Deps, Response]` from `pydantic_ai`.
* A custom system prompt embedding schema and examples.
* Output validation logic using `ModelRetry` for recovery.
* Type-safe branching between `Success` and `InvalidRequest`.

Dependencies like the `asyncpg` connection are passed explicitly via `Deps`.

---

## 🧰 Dependencies

* Python 3.11+
* `asyncpg`
* `pydantic_ai`
* `logfire`
* `devtools` (for debugging output)

---

## 🛠️ Local Dev Setup

Ensure you have a local PostgreSQL instance running (default DSN: `postgresql://postgres:postgres@localhost:54320`).

To set up:

```bash
docker run --rm -it -p 54320:5432 -e POSTGRES_PASSWORD=postgres postgres
```

Then:

```bash
uv run sql_gen.py
```

---

## 🧠 Prompts and Examples

The system prompt includes live examples embedded via `format_as_xml()`, like:

```xml
<examples>
  <example>
    <request>show me records from yesterday</request>
    <response>SELECT * FROM records WHERE start_timestamp::date > CURRENT_TIMESTAMP - INTERVAL '1 day'</response>
  </example>
  ...
</examples>
```

These help guide the model to consistent and correct SQL.

---

## 🔍 Observability

The app is fully instrumented with `logfire`:

* Spans cover database creation and schema setup.
* Pydantic AI agent executions are logged automatically.

Nothing is sent unless a Logfire token is configured (via `send_to_logfire='if-token-present'`).

---

## 📂 File Structure

```
sql_gen.py        # Main script (this file)
README.md         # You're reading it!
```

---

## 🧩 Future Ideas

* Add support for other SQL dialects (SQLite, MySQL).
* Auto-suggest improvements if a query is inefficient.
* Add a web or CLI frontend with step-through interaction.
* Export validated queries to Grafana dashboards.

---

## 📜 License

MIT — use, adapt, and share freely.

