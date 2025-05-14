# pydantic-ai-examples

This repository contains various examples of how to use the [`pydantic-ai`](https://github.com/outerbounds/pydantic-ai) framework for building AI-powered applications.

You can find more details, tutorials, and examples on the [official Pydantic AI website](https://ai.pydantic.dev/examples).

## 📁 Project Structure

This repository is organized into example folders, each demonstrating a specific use case or feature of Pydantic AI.

```plaintext
pydantic-ai-examples/
├── weather-agent/
│   └── main.py   # Example of weather agent using geolocation and weather APIs
├── ticket-system/
│   └── main.py   # Example of a ticketing system powered by pydantic-ai
├── chatbots/
│   └── main.py # Example of a simple chatbot using pydantic-ai
└── ...
```

## 🚀 Getting Started

To run any of the examples in this repository:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pydantic-ai-examples.git
   ```

2. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Navigate to the example directory you want to run and follow any specific setup instructions in its README or comments in the script.

For example, to run the weather agent:

1. Set up your API keys in `.env`:

   ```env
   WEATHER_API_KEY=your_tomorrow_io_key
   GEO_API_KEY=your_mapbox_key
   ```

2. Run the script:

   ```bash
   python weather-agent/weather_agent.py
   ```

## 🌐 Explore More Examples

For more detailed examples and explanations, visit the [official Pydantic AI examples page](https://ai.pydantic.dev/examples).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

