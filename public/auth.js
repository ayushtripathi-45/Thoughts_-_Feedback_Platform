const API_URL = "http://localhost:3000/api";

function showLogin() {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("signupForm").classList.add("hidden");
  document.querySelectorAll(".tab-btn")[0].classList.add("active");
  document.querySelectorAll(".tab-btn")[1].classList.remove("active");
}

function showSignup() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("signupForm").classList.remove("hidden");
  document.querySelectorAll(".tab-btn")[0].classList.remove("active");
  document.querySelectorAll(".tab-btn")[1].classList.add("active");
}

// Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const errorDiv = document.getElementById("loginError");

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
    window.location.href = "dashboard.html";

      
    } else {
      errorDiv.textContent = data.error;
    }
  } catch (error) {
    errorDiv.textContent = "Connection error. Please try again.";
  }
});

// Signup
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const errorDiv = document.getElementById("signupError");

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Account created successfully! Please login.");
      showLogin();
      document.getElementById("signupForm").reset();
    } else {
      errorDiv.textContent = data.error;
    }
  } catch (error) {
    errorDiv.textContent = "Connection error. Please try again.";
  }
});
