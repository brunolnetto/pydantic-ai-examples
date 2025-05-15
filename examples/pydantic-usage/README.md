# 🌬️ Pydantic AI: Simple Agent Example

This script demonstrates how to use [Pydantic AI](https://github.com/pydantic/pydantic-ai) to extract structured data from a natural language input using a predefined `BaseModel`.

It leverages:

- ✅ `pydantic_ai.Agent` to run LLM inference and parse output into a `BaseModel`
- ✅ `logfire` for optional observability and instrumentation
- ✅ `openai:gpt-4o-mini` (by default) as the LLM backend

---

## 🔧 Requirements

Install the dependencies:

```bash
pip install pydantic-ai logfire
```

Also, set the following environment variable (or rely on defaults):

```bash
export PYDANTIC_AI_MODEL=openai:gpt-4o-mini  # optional
```

If you're using OpenAI, make sure your API key is properly configured via `OPENAI_API_KEY`.

---

## 🚀 Usage

Run the script:

```bash
python your_script_name.py
```

Expected output (may vary slightly depending on the model):

```txt
Using model: openai:gpt-4o-mini
city='Chicago' country='USA'
Usage(…)  # token usage stats, depends on the backend
```

---

## 🧠 What’s Happening

1. `MyModel` defines the expected structured output.
2. The `Agent` is created with `output_type=MyModel`, which enables automatic schema validation.
3. A prompt is passed (`"The windy city in the US of A."`).
4. The LLM returns a structured object that conforms to `MyModel`, or raises an error if not.
5. Token usage is printed (if available).

---

## 🔍 Observability with Logfire

- You can configure `LOGFIRE_API_KEY` in your environment to send traces to [logfire](https://logfire.dev).
- If not configured, tracing is silently disabled (`if-token-present`).

---

## 🧪 Example Prompt Engineering

Try experimenting with ambiguous or incomplete prompts, e.g.:

- `"Berlin"` – does it infer the country?
- `"The city of love"` – how does it resolve this?

---

## 📁 Files

This script is standalone and can be used as a base for more complex pipelines using `pydantic_ai`.

---

## 🧭 Related Projects

- [pydantic-ai](https://github.com/pydantic/pydantic-ai): Strongly typed AI agents powered by Pydantic
- [logfire](https://logfire.dev): Observability designed for modern Python apps

---

## 📜 License

MIT — do what you want, but don't blame us if it hallucinates your hometown.
