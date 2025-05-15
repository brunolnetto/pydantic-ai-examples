# 🧪 Pydantic AI Model Comparison

This script demonstrates how to use the [`pydantic-ai`](https://github.com/pydantic/pydantic-ai) library with multiple LLM providers to generate structured responses and stream markdown-formatted output in the terminal using [`rich`](https://github.com/Textualize/rich).

It also shows how to improve `Markdown` code block rendering for better copy-paste and readability.

## 📦 Features

* Supports multiple LLM providers:

  * OpenAI (`gpt-4o-mini`)
  * Google (`gemini-1.5-flash`)
  * Groq (`llama-3.3-70b-versatile`)
* Streams markdown output beautifully in the terminal
* Pretty-prints fenced code blocks using `rich.syntax.Syntax`
* Tracks and logs token usage per request (via `pydantic-ai`)
* Logs telemetry with [`logfire`](https://github.com/colinhacks/logfire) (optional)

## 🚀 Usage

1. Clone the repo or copy the script.
2. Set one or more of the following environment variables depending on the models you want to use:

```bash
export OPENAI_API_KEY=your_openai_key
export GEMINI_API_KEY=your_gemini_key
export GROQ_API_KEY=your_groq_key
```

3. Run the script:

```bash
python script.py
```

It will send a prompt (`"Show me a short example of using Pydantic."`) to each available model and stream the response in your terminal.

## 🔧 Dependencies

Install requirements with:

```bash
pip install pydantic-ai rich logfire
```

(You may also need API-specific SDKs, depending on how your `pydantic-ai` setup handles provider backends.)

## 📎 Notes

* If an API key is missing, that model is skipped with a helpful log message.
* Telemetry is instrumented with `logfire`, but no data is sent unless a valid token is configured. Safe by default.

## 🧠 Behind the Scenes

This script shows how to:

* Dynamically check for available models
* Stream LLM responses in real time
* Hook into markdown rendering for UX improvements
* Use `Agent.run_stream()` with a minimal setup

## 🤓 Example Output

```
> Asking: Show me a short example of using Pydantic...
> Using model: openai:gpt-4o-mini

python
class User(BaseModel):
    name: str
    age: int

user = User(name="Alice", age=30)
print(user.model_dump())
...
```

