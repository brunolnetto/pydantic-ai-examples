# 🧠 Chat App with FastAPI + Pydantic AI

A minimalist web-based chat application powered by FastAPI, `pydantic-ai`, SQLite, and a sprinkle of browser-compiled TypeScript. It demonstrates how to stream AI responses (from OpenAI GPT-4o-mini by default) with contextual memory backed by a local SQLite database.

---

## 🚀 Features

- ✅ Chat with an LLM using `pydantic_ai.Agent`
- 📦 Chat history stored in SQLite with async compatibility via a thread executor
- 📡 Server-Sent Events (`StreamingResponse`) for real-time streaming
- 🛠️ Frontend written in TypeScript, compiled in-browser (yes, no build step)
- 🧪 Built-in logging and tracing with [`logfire`](https://logfire.dev)
- 🔐 Cleanly structured FastAPI app with dependency injection
- ✨ Extensible for full-stack applications or embedding into a larger product

---

## 🏁 Getting Started

### 1. Clone this repo

```bash
git clone https://github.com/yourname/chat_app.git
cd chat_app
````

### 2. Install dependencies

You’ll need Python 3.11+ and optionally a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate  # or `.venv\Scripts\activate` on Windows

pip install -r requirements.txt
```

<details>
<summary>📝 <code>requirements.txt</code> example</summary>

```txt
fastapi
uvicorn
pydantic
pydantic-ai
logfire
typing-extensions
```

</details>

### 3. Set up environment (optional)

The app defaults to GPT-4o-mini, but you can replace the model ID by setting the `PYDANTIC_AI_API_KEY`:

```bash
export PYDANTIC_AI_API_KEY=openai:gpt-4o  # or any other supported model
```

---

## ▶️ Running the App

```bash
python chat_app.py
```

Then open your browser at: [http://localhost:8000](http://localhost:8000)

---

## 💬 API Endpoints

| Method | Endpoint       | Description                                         |
| ------ | -------------- | --------------------------------------------------- |
| GET    | `/`            | Serves the HTML UI                                  |
| GET    | `/chat_app.ts` | Serves the raw TypeScript frontend code             |
| GET    | `/chat/`       | Fetches all chat messages as newline-delimited JSON |
| POST   | `/chat/`       | Submits a new user prompt and streams AI responses  |

---

## 🧠 Architecture Notes

* **SQLite** is used as a persistent store, but access is async-safe via `ThreadPoolExecutor`.
* Chat messages are serialized as JSON blobs using `pydantic_ai.ModelMessagesTypeAdapter`.
* The app simulates a frontend/backend separation while keeping dev friction low by inlining the TypeScript and compiling it in-browser.

---

## 🧩 Extending Ideas

* Replace SQLite with Postgres or a vector DB for semantic memory.
* Add user sessions and auth for multi-user chat logs.
* Replace the frontend with a React/Vue/Svelte app.
* Fine-tune or swap out the underlying LLM model (e.g. use open-source local models).

---

## 🧼 License

MIT — free to use, fork, and extend.

---

## 🤖 Credits

* Built with ❤️ and caffeine
* Powered by [Pydantic AI](https://github.com/pydantic/pydantic-ai)
* Inspired by real-world agent applications and streaming UX

---

```
