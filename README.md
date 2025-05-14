# pydantic-ai-examples

This repository contains various examples of how to use the [`pydantic-ai`](https://github.com/outerbounds/pydantic-ai) framework for building AI-powered applications.

You can find more details, tutorials, and examples on the [official Pydantic AI website](https://ai.pydantic.dev/examples).

## 📁 Project Structure

This repository is organized into example folders, each demonstrating a specific use case or feature of Pydantic AI.

```plaintext
pydantic-ai-examples/
├── weather-agent/
│   └── main.py   # Uses tools and retries to answer weather queries with location parsing
├── chat-app/
│   └── main.py   # Example of a simple chatbot using pydantic-ai 
├── bank-support/
│   └── main.py   # Simulates a banking virtual assistant for support and FAQ
├── flight-booking/
│   └── main.py   # Walks through flight booking steps via structured tool use
├── pydantic-usage/
│   └── main.py   # Demonstrates advanced Pydantic usage with agents and type-safe tools
├── question-graph/
│   └── main.py   # Chains multiple tool calls for answering compound questions
├── sql-generation/
│   └── main.py   # Uses an agent to translate user intent into SQL queries
├── stream-markdown/
│   └── main.py   # Streams markdown-formatted content from an agent response
└── stream-whales/
    └── main.py   # Streams structured whale facts and handles iterative interaction
```

## 🚀 Getting Started

To run any of the examples in this repository:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pydantic-ai-examples.git
   ```

2. Create a virtual environemnt and activate:

   ```bash
   uv venv && source .venv/bin/activate
   ```

3. Navigate to the example directory you want to run and follow any specific setup instructions in its README or comments in the script.

For example, to run the weather agent:

1. Set up your API keys in `.env`:

   ```env
   WEATHER_API_KEY=your_tomorrow_io_key
   GEO_API_KEY=your_mapbox_key
   GROQ_API_KEY=gsk_api-key
   OPENAI_API_KEY=sk-proj--api-key
   GEMINI_API_KEY=AIapi-key
   ```

2. Run the script:

   ```bash
   python weather-agent/main.py
   ```

## 🌐 Explore More Examples

For more detailed examples and explanations, visit the [official Pydantic AI examples page](https://ai.pydantic.dev/examples).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

