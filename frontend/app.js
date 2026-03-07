const API = "http://localhost:3000/api/v1";

// ── DOM Elements ──
const messageDiv = document.getElementById("message");
const dashMsgDiv = document.getElementById("dashboard-message");
const authSection = document.getElementById("auth-section");
const dashboardSection = document.getElementById("dashboard-section");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const logoutBtn = document.getElementById("logout-btn");

let editingTaskId = null;

// ── Init ──
document.addEventListener("DOMContentLoaded", () => {
  loginTab.addEventListener("click", showLogin);
  registerTab.addEventListener("click", showRegister);
  loginForm.addEventListener("submit", handleLogin);
  registerForm.addEventListener("submit", handleRegister);
  taskForm.addEventListener("submit", handleTaskSubmit);
  logoutBtn.addEventListener("click", handleLogout);

  const token = localStorage.getItem("token");
  if (token) {
    showDashboard();
    loadTasks();
  }
});

// ── Auth UI ──
function showLogin() {
  loginForm.style.display = "block";
  registerForm.style.display = "none";
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
}

function showRegister() {
  registerForm.style.display = "block";
  loginForm.style.display = "none";
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
}

function showDashboard() {
  authSection.style.display = "none";
  dashboardSection.style.display = "block";
}

function showAuth() {
  authSection.style.display = "block";
  dashboardSection.style.display = "none";
}

// ── Messages ──
function showMessage(msg, type, isDashboard = false) {
  const div = isDashboard ? dashMsgDiv : messageDiv;
  div.textContent = msg;
  div.className = type;
  setTimeout(() => {
    div.textContent = "";
    div.className = "";
  }, 3000);
}

// ── Auth Handlers ──
async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  try {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 201) {
      showMessage(data.message, "success");
      registerForm.reset();
      showLogin();
    } else {
      if (data.errors && data.errors.length > 0) {
        const errorMsg = data.errors.map((e) => e.message).join(", ");
        showMessage(errorMsg, "error");
      }
    }
  } catch {
    showMessage("Something went wrong", "error");
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.status === 200) {
      localStorage.setItem("token", data.data.token);
      loginForm.reset();
      showDashboard();
      loadTasks();
    } else {
      showMessage(data.message, "error");
    }
  } catch {
    showMessage("Something went wrong", "error");
  }
}

function handleLogout() {
  localStorage.removeItem("token");
  taskList.innerHTML = "";
  editingTaskId = null;
  showAuth();
}

// ── Task Handlers ──
function startEdit(task) {
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description || "";
  document.getElementById("task-status").value = task.status;
  document.getElementById("task-priority").value = task.priority;
  editingTaskId = task._id;
  document.getElementById("taskBtn").textContent = "Update Task";
  taskForm.scrollIntoView({ behavior: "smooth" });
}

async function handleTaskSubmit(e) {
  e.preventDefault();
  const title = document.getElementById("task-title").value.trim();
  const description = document.getElementById("task-desc").value.trim();
  const status = document.getElementById("task-status").value;
  const priority = document.getElementById("task-priority").value;
  const token = localStorage.getItem("token");

  if (!title) {
    showMessage("Title is required", "error", true);
    return;
  }

  // Update existing task
  if (editingTaskId) {
    try {
      const res = await fetch(`${API}/task/${editingTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, status, priority }),
      });
      const data = await res.json();
      if (res.status === 200) {
        taskForm.reset();
        editingTaskId = null;
        document.getElementById("taskBtn").textContent = "Add Task";
        showMessage(data.message, "success", true);
        loadTasks();
      } else {
        showMessage(data.message, "error", true);
      }
    } catch {
      showMessage("Something went wrong", "error", true);
    }
    return;
  }

  // Create new task
  try {
    const res = await fetch(`${API}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, status, priority }),
    });
    const data = await res.json();
    if (res.status === 201) {
      taskForm.reset();
      showMessage(data.message, "success", true);
      loadTasks();
    } else {
      showMessage(data.message, "error", true);
    }
  } catch {
    showMessage("Something went wrong", "error", true);
  }
}

async function loadTasks() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(`${API}/task`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.status === 200) {
      renderTasks(data.data.tasks);
    }
  } catch {
    showMessage("Failed to load tasks", "error", true);
  }
}

function renderTasks(tasks) {
  taskList.innerHTML = "";

  if (!tasks || tasks.length === 0) {
    taskList.innerHTML = "<p>No tasks yet. Create one!</p>";
    return;
  }

  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.className = `task-card ${task.status}`;
    card.innerHTML = `
      <div>
        <h3>${task.title}</h3>
        ${task.description ? `<p>${task.description}</p>` : ""}
        <p>${task.status} · ${task.priority}</p>
      </div>
      <div class="actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    card
      .querySelector(".edit-btn")
      .addEventListener("click", () => startEdit(task));
    card
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteTask(task._id));
    taskList.appendChild(card);
  });
}

async function deleteTask(id) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API}/task/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.status === 200) {
      showMessage(data.message, "success", true);
      loadTasks();
    } else {
      showMessage(data.message, "error", true);
    }
  } catch {
    showMessage("Something went wrong", "error", true);
  }
}
