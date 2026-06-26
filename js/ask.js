const API_KEY = "AQ.Ab8RN6Lazob4GnO7rpYmTl43A06xw-VQF70WjhueKiQHmrGJNg"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const welcomeState = document.getElementById('welcomeState');
const sendBtn = document.getElementById('sendBtn');

function setInput(text) {
    userInput.value = text;
    userInput.focus();
}

function handleKeyPress(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}

function appendMessage(text, sender) {
    if (welcomeState) {
        welcomeState.style.display = 'none';
    }

    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    
    if (sender === 'ai') {
        // Simple markdown parsing for bold text
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
        bubble.innerHTML = formattedText;
    } else {
        bubble.textContent = text;
    }
    
    msgDiv.appendChild(bubble);
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';
    userInput.disabled = true;
    sendBtn.disabled = true;

    // Show loading
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message ai';
    loadingDiv.innerHTML = `<div class="message-bubble">Thinking... <i data-feather="loader" class="feather-spin"></i></div>`;
    chatContainer.appendChild(loadingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    feather.replace();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are DriveLegal AI, an expert on Indian traffic laws, the Motor Vehicles Act 2019, and all traffic regulations in India. Always use ₹ symbol for Indian Rupees. User question: ${text}`
                    }]
                }]
            })
        });

        const data = await response.json();
        chatContainer.removeChild(loadingDiv);

        if (data.error) {
            appendMessage("⚠️ Error: " + data.error.message, 'ai');
        } else if (data.candidates && data.candidates[0].content.parts[0].text) {
            appendMessage(data.candidates[0].content.parts[0].text, 'ai');
        } else {
            appendMessage("Sorry, I couldn't generate a response.", 'ai');
        }
    } catch (error) {
        chatContainer.removeChild(loadingDiv);
        appendMessage("⚠️ Network error or invalid API key.", 'ai');
        console.error(error);
    } finally {
        userInput.disabled = false;
        sendBtn.disabled = false;
        userInput.focus();
    }
}
