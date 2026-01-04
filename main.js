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

