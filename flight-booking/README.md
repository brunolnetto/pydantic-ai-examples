# ✈️🧠 Pydantic AI Agents – Structured LLMs, with Control and Observability

This repo contains examples showcasing [**Pydantic AI**](https://github.com/pydantic/pydantic-ai), a powerful framework for controlling LLM outputs using strict types, tools, retries, validations, and tracing. These examples are enriched with `logfire`, `rich`, and multi-agent flows to demonstrate practical usage for interactive and programmatic tasks.

## 🔧 Requirements

- Python 3.11+
- OpenAI API key (for `openai:gpt-4` or `gpt-4o`)
- [logfire](https://github.com/astral-sh/logfire) (optional but recommended)
- Terminal with rich support (e.g. iTerm2 or modern consoles)

Install dependencies:

```bash
pip install -r requirements.txt
```

> If you're just exploring, it will still run without a Logfire token — thanks to `send_to_logfire="if-token-present"` fallback.

---

## 🐋 `whales.py` – Streaming Typed Output

Generates a live-updating table of whale species using GPT-4 and Pydantic validation.

### Features:
- Uses `TypedDict` + `Annotated` for fine-grained field constraints
- Streamed output via `Live` from `rich`
- Partial validation on streaming chunks
- Handles optional fields and formatting gracefully

### Run:

```bash
python whales.py
```

Expected output:
```
Species of Whale
┏━━━━┳━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━┳━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ID ┃ Name       ┃ Avg. Length (m)┃ Avg. Weight (kg)┃ Ocean ┃ Description           ┃
┗━━━━┻━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━┻━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## ✈️ `flights.py` – Multi-Agent Flight Finder

A multi-agent application to simulate:
- scraping flights from a web page,
- choosing the cheapest valid one (via LLM + validation),
- extracting user seat preferences,
- finalizing a fake ticket purchase.

### Agents:
- `search_agent`: Orchestrates the task, validates logic
- `extraction_agent`: Parses the flight options from a page
- `seat_preference_agent`: Extracts a structured seat choice from free-form input

### Core Concepts:
- `@tool` decorated functions to perform sub-tasks
- Retry mechanism on logical validation failures (e.g., wrong origin/destination/date)
- Conversational state management via `message_history`
- Usage tracking and limits via `UsageLimits`

### Run:

```bash
python flights.py
```

Example interaction:
```
Flight found: SFO → ANC for $350
Do you want to buy this flight? (buy/search)
> buy
What seat would you like?
> 14F
Purchasing flight...
```

---

## 🧠 What's the Point?

These examples demonstrate real-world application of:

- ✅ Type-safe LLM responses using `pydantic_ai.Agent`
- 🔄 Agent-to-agent delegation via `@tool`
- 🔍 Output validation and retrying logic with `ModelRetry`
- 📊 Observability with Logfire
- 🧪 Minimal working examples for educational or integration testing

---

## 🗺️ Structure

```text
.
├── whales.py         # Streaming structured output from GPT
├── flights.py        # Multi-agent orchestration with retries and validation
├── requirements.txt  # Suggested Python dependencies
└── README.md         # You're here
```

---

## 🛠 Tips for Hacking

- Try replacing `gpt-4o` with `gpt-3.5-turbo` to see degradation
- Tweak the `@output_validator` to enforce different business logic
- Use `logfire.configure(print_to_console=True)` for local logging without remote tracing

---

## 🧩 License

MIT. Built for learning and exploration.
