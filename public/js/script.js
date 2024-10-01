var socket = io();
const message = document.getElementById("messages");
const input = document.getElementById("input");
const form = document.getElementById("form");
const usernameForm = document.getElementById("usernameForm");
const usernameInput = document.getElementById("usernameInput");
let username = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    const messageData = { username: `${username}`, msg: input.value };
    socket.emit("message", messageData);
    input.value = "";
  }
});

usernameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  username = usernameInput.value.trim();
  if (username) {
    socket.emit("set username", username);
    usernameForm.style.display = "none";
    form.style.display = "flex";
  }
});

socket.on("message", (data) => {
  const item = document.createElement("li");
  item.textContent = `${data.username}: ${data.msg}`;
  message.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("user connected", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  li.style.color = "green";
  message.appendChild(li);
});

socket.on("user disconnected", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  li.style.color = "red";
  message.appendChild(li);
});
