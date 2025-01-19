function showChatOptions() {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("chat-interface").style.display = "block";
}


async function sendMessage() {
  const userMessage = document.getElementById("userMessage").value;

  if (!userMessage.trim()) return;

  const chatDiv = document.getElementById("chat");
  chatDiv.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

  // Call AI backend (replace with actual API call)
  const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
  });

  const data = await response.json();
  chatDiv.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;
  document.getElementById("userMessage").value = "";

  chatDiv.scrollTop = chatDiv.scrollHeight;
}

// Function to show the welcome screen
function showWelcomeScreen() {
  document.getElementById("chat-interface").style.display = "none";
  document.getElementById("welcome-screen").style.display = "block";
  history.pushState({ screen: "welcome-screen" }, "Welcome", "#welcome");
}

// Function to show the chatroom
function showChatOptions() {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("chat-interface").style.display = "block";
  history.pushState({ screen: "chat-interface" }, "Chatroom", "#chat");
}

// Handle the browser's Back and Forward buttons
window.onpopstate = function (event) {
  if (event.state && event.state.screen === "chat-interface") {
      document.getElementById("welcome-screen").style.display = "none";
      document.getElementById("chat-interface").style.display = "block";
  } else {
      document.getElementById("chat-interface").style.display = "none";
      document.getElementById("welcome-screen").style.display = "block";
  }
};
