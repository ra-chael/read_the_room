const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

const userNames = ['BlueFlamingo', 'AnonymousTiger'];
let currentUser = 0;
let timeout;

const aiPrompts = [
  "What do you think about the weather today?",
  "Have you read any good books lately?",
  "What are your hobbies?",
  "Do you prefer coffee or tea?",
  "What's your favorite movie?",
  "If you could travel anywhere, where would you go?",
  "Tell me something about your day.",
  "What kind of music do you enjoy?"
];

function switchUser() {
  currentUser = (currentUser + 1) % 2;
  return userNames[currentUser];
}

function addMessage(user, message, type = '') {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  if (type) messageElement.classList.add(type);
  messageElement.innerHTML = `<span class="${type}">${user}:</span> ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function handleMessage() {
  const message = messageInput.value.trim();
  if (message) {
    addMessage(userNames[currentUser], message);
    messageInput.value = '';
    clearTimeout(timeout);
    startAIResponseTimer();
    switchUser();
  }
}

function generateAIResponse() {
  const randomIndex = Math.floor(Math.random() * aiPrompts.length);
  const prompt = aiPrompts[randomIndex];
  addMessage('AI', prompt, 'ai');
  switchUser();
  startAIResponseTimer();
}

function startAIResponseTimer() {
  timeout = setTimeout(generateAIResponse, 5000);
}

messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleMessage();
  }
});

// Button click functionality
sendButton.addEventListener('click', handleMessage);

// Initial AI prompt to start the conversation
generateAIResponse();
