let messages = [];
let inactivityTimer;

const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');

// Function to handle sending a message
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

// Function to display a message in the chat window
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.sender}: ${message.text}`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;  // Auto-scroll to the latest message
}

// Reset the inactivity timer
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(generateAIPrompt, 10000); // 10 seconds of inactivity
}

// Generate AI prompt when the chat goes idle
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

// Check if the last message was from the AI before generating another prompt
function checkForAIResponse() {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.sender === 'User') {
        generateAIPrompt();
    }
}

// Add event listener to send message on pressing "Enter"
messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent the default action (e.g., form submission)
        sendMessage();
    }
});
