let messages = [];
let inactivityTimer;

const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        const userMessage = { sender: 'User', text: message };
        messages.push(userMessage);
        displayMessage(userMessage);
        messageInput.value = '';
        resetInactivityTimer();
        checkForAIResponse();
    }
}

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.sender}: ${message.text}`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(generateAIPrompt, 10000); // 10 seconds of inactivity
}

function generateAIPrompt() {
    fetch('/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
    })
    .then(response => response.json())
    .then(data => {
        const aiMessage = { sender: 'AI', text: data.prompt };
        messages.push(aiMessage);
        displayMessage(aiMessage);
    })
    .catch(error => console.error('Error:', error));
}

function checkForAIResponse() {
    // If the last message was from the AI, we don't need to call the API again
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.sender === 'User') {
        generateAIPrompt();
    }
}
