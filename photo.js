
  const ACCESS_KEY = "I4wrP9aPSHPfbb1VHmW1GJEbFjdnNmqaefjqm-ZhFmo";
  const gallery = document.getElementById("gallery");




let currentCategory = "home interior";
let page = 1;
let loading = false;

// Change category
function changeCategory(category) {
  currentCategory = category;
  page = 1;
  gallery.innerHTML = "";
  loadImages();
}

// Load images
function loadImages() {
  if (loading) return;
  loading = true;

  fetch(
    `https://api.unsplash.com/search/photos?query=${currentCategory}&page=${page}&per_page=24`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((photo) => {
        const img = document.createElement("img");
        img.src = photo.urls.small;
        img.loading = "lazy";
        gallery.appendChild(img);
      });
      page++;
      loading = false;
    })
    .catch(() => {
      loading = false;
    });
}

// Infinite scroll
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 300
  ) {
    loadImages();
  }
});

// Initial load
loadImages();
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

