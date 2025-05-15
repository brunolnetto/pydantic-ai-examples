# 🌤️ Weather Agent Example (Pydantic-AI)

This is a simple but functional AI agent that answers weather questions about any location using [`pydantic-ai`](https://github.com/outerbounds/pydantic-ai). It chains external tools (geolocation + weather API) in natural language via an LLM, orchestrated by the `Agent` abstraction.

## 🧠 What it does

You ask it something like:

> "What’s the weather like in London and Wiltshire?"

The agent will:

1. Use Mapbox's Geocoding API to get coordinates for each place mentioned.
2. Use Tomorrow\.io’s Weather API to get real-time weather for each location.
3. Reply with a concise sentence per location.

## 🚀 Running it

### Requirements

* Python 3.10+
* `pydantic-ai`, `httpx`, `logfire`, `devtools`

Install with:

```bash
pip install pydantic-ai logfire httpx devtools
```

### Environment Variables

Create a `.env` file or export these variables in your shell:

```env
WEATHER_API_KEY=your_tomorrow_io_key
GEO_API_KEY=your_mapbox_key
```

If either key is missing, the agent will fall back to dummy responses (London and "21°C, Sunny").

### Running the Script

```bash
python weather_agent.py
```

You should see a response like:

```
Response: {'output': 'The weather in London is 21°C and Sunny. The weather in Wiltshire is 20°C and Mostly Clear.'}
```

## 🛠 Architecture

```mermaid
graph TD
  A[User Input] --> B[LLM Agent (GPT-4o)]
  B --> C[get_lat_lng Tool]
  C -->|Mapbox| D[(Lat/Lng)]
  B --> E[get_weather Tool]
  E -->|Tomorrow.io| F[(Weather)]
  F --> G[Final Response]
```

### Key Features

* ✅ Declarative tool use via decorators
* 🔄 Retry with fallback logic (`ModelRetry`)
* 🔍 Observability with [Logfire](https://logfire.dev/)
* 🌐 Async-first, easily extendable

## 📦 What's in the Box

* `weather_agent.py`: Full source code
* `get_lat_lng(...)`: Geolocation tool (Mapbox)
* `get_weather(...)`: Weather data tool (Tomorrow\.io)
* `Deps(...)`: Injects external API keys and HTTP client
* `main(...)`: Demo entrypoint

## 📌 Notes

* LLM model used: `openai:gpt-4o` (can be changed)
* Model instructions are crucial: the prompt guides it to call tools in order.
* This is a minimal example. You can extend it with caching, multi-turn chat, richer weather summaries, etc.

---

**License**: MIT
**Author**: You, probably experimenting with Pydantic AI ✨

