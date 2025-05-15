# 🐋 Streaming Structured Whale Data with `pydantic-ai`

This script demonstrates how to use [`pydantic-ai`](https://github.com/pydantic/pydantic-ai) with OpenAI's GPT-4 to stream and validate structured responses into a live terminal table, using `TypedDict` for schema enforcement and `rich` for elegant terminal rendering.

## 💡 What It Does

* Sends a prompt to an LLM asking for details of 5 whale species.
* Defines the expected response structure using `TypedDict` and Pydantic annotations.
* Streams the response **as it's generated**, validating each chunk incrementally.
* Displays the data in a live-updating `rich.Table` with fallback handling for partial data.
* Tracks usage and enables optional telemetry via `logfire`.

## 🐍 Requirements

Install dependencies with:

```bash
pip install pydantic-ai rich logfire typing-extensions
```

You'll also need an OpenAI API key:

```bash
export OPENAI_API_KEY=your-api-key-here
```

## 🚀 Running the Script

```bash
python script.py
```

You'll see a live-updating table in your terminal as GPT-4 streams details of different whale species.

## ✅ Features

* ✅ **TypedDict schema enforcement** with optional fields and value constraints.
* ✅ **Streaming validation** using `Agent.run_stream()` and `validate_structured_output()`.
* ✅ **Live output** via `rich.live.Live` and `rich.table.Table`.
* ✅ **Telemetry-ready** with `logfire`, but won't send anything unless configured.

## 🧪 Whale Model

Here's the expected schema for each whale entry:

```python
class Whale(TypedDict):
    name: str
    length: Annotated[float, Field(description="Length in meters")]
    weight: NotRequired[Annotated[float, Field(ge=50)]]
    ocean: NotRequired[str]
    description: NotRequired[str]
```

## 📦 How It Works

1. Define the structured output schema with `TypedDict`.
2. Instantiate an `Agent` with a known model (`openai:gpt-4`) and `output_type=list[Whale]`.
3. Use `run_stream()` to get incremental responses.
4. Call `validate_structured_output()` with `allow_partial=True` for progressive updates.
5. Render live terminal updates using `rich`.

## 🧠 Example Output

```
┏━━━━┳━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ID ┃ Name          ┃ Avg. Length (m)  ┃ Avg. Weight (kg) ┃ Ocean    ┃ Description               ┃
┡━━━━╇━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
┃ 1  ┃ Blue Whale    ┃ 30               ┃ 150000           ┃ Pacific  ┃ Largest animal on Earth.  ┃
┃ 2  ┃ Humpback      ┃ 15               ┃ 36000            ┃ Atlantic ┃ Known for its songs.      ┃
┃ …  ┃ …             ┃ …                ┃ …                ┃ …        ┃ …                         ┃
└────┴───────────────┴──────────────────┴──────────────────┴──────────┴───────────────────────────┘
```

## 🧯 Notes

* If a model's output is incomplete or inconsistent, partial validation is tolerated.
* Errors are suppressed unless they affect the structural contract (`response` missing entirely).
* `logfire` will instrument calls and track usage if a token is configured — but by default, nothing is sent.
