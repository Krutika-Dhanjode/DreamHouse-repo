const authButtons = document.getElementById("authButtons");
const userIcons = document.getElementById("userIcons");
const profileIcon = document.querySelector(".ico i.fa-user");

// 🚨 FORCE DEFAULT STATE (VERY IMPORTANT)
if (!localStorage.getItem("isLoggedIn")) {
  localStorage.setItem("isLoggedIn", "false");
}

// 🔁 UI controller
function updateUI() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    authButtons.style.display = "none";
    userIcons.style.display = "flex";
  } else {
    authButtons.style.display = "flex";
    userIcons.style.display = "none";
  }
}

// Run on page load
updateUI();

// ✅ CALL THIS ONLY AFTER SUCCESSFUL LOGIN / SIGNUP
function loginSuccess() {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", "User"); // temporary
  updateUI();
}

// ---------------- PROFILE DROPDOWN ----------------

const dropdown = document.createElement("div");
dropdown.className = "profile-dropdown";
dropdown.innerHTML = `
    <div class="username"></div>
    <div class="logout">Logout</div>
  `;
document.body.appendChild(dropdown);

// Show dropdown ONLY if logged in
profileIcon.addEventListener("click", (e) => {
  if (localStorage.getItem("isLoggedIn") !== "true") return;

  e.stopPropagation();

  const rect = profileIcon.getBoundingClientRect();
  dropdown.style.top = rect.bottom + 8 + "px";
  dropdown.style.left = rect.left - 80 + "px";

  dropdown.querySelector(".username").innerText =
    localStorage.getItem("username") || "User";

  dropdown.classList.toggle("show");
});

// 🚪 Logout
dropdown.querySelector(".logout").addEventListener("click", () => {
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("username");
  dropdown.classList.remove("show");
  updateUI();
});

// Close dropdown when clicking outside
document.addEventListener("click", () => {
  dropdown.classList.remove("show");
});
localStorage.clear();
const API_KEY = "AIzaSyCdnILSCPne6z6iXt5F9wukX631LG6vmEg"; // Replace with your actual key

const chatBtn = document.getElementById('ai-chat-button');
const chatWindow = document.getElementById('ai-chat-window');
const closeBtn = document.getElementById('close-ai');
const sendBtn = document.getElementById('ai-send-btn');
const input = document.getElementById('ai-input');
const messages = document.getElementById('ai-chat-messages');

// Click to Open/Close
chatBtn.onclick = () => chatWindow.classList.toggle('ai-chat-closed');
closeBtn.onclick = () => chatWindow.classList.add('ai-chat-closed');

async function askGemini() {
    const text = input.value.trim();
    if (!text) return;

    // Add User doubt to screen
    messages.innerHTML += `<div class="user-msg">${text}</div>`;
    input.value = "";
    
    // Auto-scroll
    messages.scrollTop = messages.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: text }] }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        
        // Add AI response to screen
        messages.innerHTML += `<div class="ai-msg">${aiText}</div>`;
    } catch (error) {
        messages.innerHTML += `<div class="ai-msg">Sorry, I'm having trouble connecting.</div>`;
    }
    messages.scrollTop = messages.scrollHeight;
}

sendBtn.onclick = askGemini;
input.onkeypress = (e) => { if(e.key === 'Enter') askGemini(); };