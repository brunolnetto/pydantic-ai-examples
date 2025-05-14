# 🏦 AI Support Agent Example (with PydanticAI)

This project demonstrates how to build an AI-powered support agent for a fictional bank using [`pydantic-ai`](https://github.com/pydantic/pydantic-ai). It showcases how to inject contextual information and structured tools into an LLM agent, and how to receive strongly-typed outputs.

## 🚀 What It Does

- Simulates a customer support agent that responds to user queries.
- Injects dynamic context like the customer's name via a fake database.
- Provides access to tools (like checking balance).
- Returns structured output (advice, risk score, and action).

## 📦 Features

- ✅ Dependency injection with type safety via `dataclass`
- 🛠 Tooling integration for balance lookup
- 🧠 Dynamic system prompt enrichment
- 🎯 Validated model output using `pydantic.BaseModel`

## 🧱 Code Structure

### `DatabaseConn`

Simulates a database with async methods to:
- Retrieve customer name
- Retrieve account balance (with or without pending transactions)

### `SupportDependencies`

Dataclass used to inject dependencies into the agent at runtime.

### `SupportOutput`

Pydantic model representing the agent's response:
```python
support_advice: str        # Natural language support response
block_card: bool           # Whether the user's card should be blocked
risk: int                  # Risk score (0 to 10)
````

### `support_agent`

An `Agent` instance configured with:

* Model: `gpt-4o`
* System prompt
* Dependencies and tool usage

## 🔧 Agent Tools and Prompts

### Dynamic Prompt

The agent dynamically includes the customer's name via:

```python
@support_agent.system_prompt
async def add_customer_name(ctx: RunContext[SupportDependencies]) -> str:
    ...
```

### Tool: `customer_balance`

Exposes a callable function to the LLM that returns the customer balance in formatted string:

```python
@support_agent.tool
async def customer_balance(...)
```

## 🧪 Example Usage

```python
deps = SupportDependencies(customer_id=123, db=DatabaseConn())
result = support_agent.run_sync('What is my balance?', deps=deps)
print(result.output)

# support_advice='Hello John, your current account balance, including pending transactions, is $123.45.'
# block_card=False
# risk=1

result = support_agent.run_sync('I just lost my card!', deps=deps)
print(result.output)

# support_advice="I'm sorry to hear that, John. We are temporarily blocking your card to prevent unauthorized transactions."
# block_card=True
# risk=8
```

## 🧠 Why This Matters

This example goes beyond toy prompts by:

* Combining traditional backend logic (DB lookups)
* Enabling type-safe tooling
* Making LLMs act more like deterministic APIs
* Providing a base for structured reasoning, audits, and risk assessment

## 📚 Requirements

* Python 3.10+
* [`pydantic-ai`](https://github.com/pydantic/pydantic-ai)
* [`pydantic`](https://docs.pydantic.dev)

Install with:

```bash
pip install pydantic pydantic-ai
```

## 🤖 License

MIT License — use freely and make something useful (or at least fun).

```

