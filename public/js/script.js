var socket = io();
const message = document.getElementById("messages");
const input = document.getElementById("input");
const form = document.getElementById("form");
const usernameForm = document.getElementById("usernameForm");
const usernameInput = document.getElementById("usernameInput");
let username = "Anonymous";

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

const formatDate = (date) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  return date.toLocaleTimeString(undefined, options);
};

socket.on("load messages", (history) => {
  history.forEach((data) => {
    const item = document.createElement("li");
    const time = formatDate(new Date(data.time));
    item.textContent = `[${time}] ${data.username}: ${data.msg}`;
    message.appendChild(item);
  });
});

socket.on("message", (data) => {
  const item = document.createElement("li");
  const time = formatDate(new Date(data.time));
  item.textContent = `[${time}] ${data.username}: ${data.msg}`;
  message.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

const typingIndicator = document.getElementById("typingIndicator");
const members = document.getElementById("members");
let connectedUsers = [];

socket.on("update user list", (users) => {
  connectedUsers = users;
  updateMembersList();
});

socket.on("user connected", (username) => {
  addSystemMessage(`${username} joined the chat`);
});

socket.on("user disconnected", (username) => {
  addSystemMessage(`${username} left the chat`);
});

function updateMembersList() {
  if (connectedUsers.length > 0) {
    members.textContent = `Connected: ${connectedUsers.join(", ")}`;
    members.style.display = "block";
  } else {
    members.style.display = "none";
  }
}

input.addEventListener("input", () => {
  if (input.value) {
    socket.emit("typing", username);
  } else {
    typingIndicator.style.display = "none";
    updateMembersList();
  }
});

socket.on("typing", (username) => {
  typingIndicator.textContent = `${username} is typing...`;
  typingIndicator.style.display = "block";
  members.style.display = "none";

  setTimeout(() => {
    typingIndicator.style.display = "none";
    updateMembersList();
  }, 1000);
});

function addSystemMessage(msg) {
  const item = document.createElement("li");
  item.textContent = msg;
  item.style.color = "gray";
  document.getElementById("messages").appendChild(item);
}
