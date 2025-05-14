import { marked } from 'https://cdnjs.cloudflare.com/ajax/libs/marked/15.0.0/lib/marked.esm.js'

interface Message {
  role: string
  content: string
  timestamp: string
}

const convElement = document.getElementById('conversation')!
const promptInput = document.getElementById('prompt-input') as HTMLInputElement
const spinner = document.getElementById('spinner')!

const SCROLL_TOLERANCE = 100

function saveToLocal(messages: Message[]) {
  localStorage.setItem('chat_history', JSON.stringify(messages))
}

function loadFromLocal(): Message[] {
  try {
    const raw = localStorage.getItem('chat_history')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function createMessageElement(message: Message): HTMLElement {
  const { timestamp, role, content } = message;
  const wrapper = document.createElement('div');
  wrapper.id = `msg-${timestamp}`;
  wrapper.classList.add('border-top', 'pt-2', role);
  wrapper.title = `${role} at ${timestamp}`;

  const html = `
    <div class="message-content">${marked.parse(content)}</div>
    <small class="text-muted d-block mt-1 text-end">
      ${new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </small>
  `;
  wrapper.innerHTML = html;
  return wrapper;
}

function renderMessage(message: Message): void {
  const existing = document.getElementById(`msg-${message.timestamp}`);
  if (existing) return;

  const msgDiv = createMessageElement(message);
  convElement.appendChild(msgDiv);
}

async function onFetchResponse(response: Response): Promise<void> {
  if (!response.ok || !response.body) {
    console.error('Failed to fetch or no body:', response.statusText)
    return
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })

    let boundary = buffer.lastIndexOf('\n')
    if (boundary === -1) continue

    const lines = buffer.slice(0, boundary).split('\n')
    buffer = buffer.slice(boundary + 1)

    for (const line of lines) {
      if (!line.trim()) continue
      try {
        const message = JSON.parse(line)
        renderMessage(message)
      } catch (err) {
        console.warn('Failed to parse line:', line, err)
      }
    }
  }

  // Flush any remaining buffer (optional if messages always end with \n)
  if (buffer.trim()) {
    try {
      const finalMessage = JSON.parse(buffer)
      renderMessage(finalMessage)
    } catch (err) {
      console.warn('Failed to parse final buffer:', buffer, err)
    }
  }

  promptInput.disabled = false
  
  spinner.classList.remove('active')
}

function onError(error: any) {
  console.error(error);
  const errorEl = document.getElementById('error');
  if (!errorEl) return;

  errorEl.classList.remove('d-none');
  errorEl.innerHTML = '';

  const errorMessage = document.createElement('div');
  errorMessage.textContent = "Something went wrong. Please try again.";
  errorEl.appendChild(errorMessage);
}

async function onSubmit(e: SubmitEvent): Promise<void> {
  e.preventDefault()
  spinner.classList.add('active')

  const body = new FormData(e.target as HTMLFormElement)
  promptInput.value = ''
  promptInput.disabled = true

  const response = await fetch('/chat/', { method: 'POST', body })
  await onFetchResponse(response)
}

document.querySelector('form')!.addEventListener('submit', (e) => onSubmit(e).catch(onError))

// 🔁 Restaura histórico local + sincroniza com servidor
const cached = loadFromLocal()
cached.forEach(renderMessage)
fetch('/chat/').then(onFetchResponse).catch(onError)
