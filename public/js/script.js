const socket = io();
const messageList = document.getElementById("messages");
const input = document.getElementById("input");
const form = document.getElementById("form");
const usernameForm = document.getElementById("usernameForm");
const usernameInput = document.getElementById("usernameInput");
let username = "Anonymous";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    const messageData = { username: username, msg: input.value };
    socket.emit("message", messageData);
    input.value = "";
    scrollToBottom();
  }
});

usernameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  username = usernameInput.value.trim() || "Anonymous";
  socket.emit("set username", username);
  usernameForm.style.display = "none";
  form.style.display = "flex";
});

const formatDate = (date) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  return date.toLocaleTimeString(undefined, options);
};

socket.on("load messages", (history) => {
  history.forEach((data) => {
    addMessageToChat(data);
  });
  scrollToBottom();
});

socket.on("message", (data) => {
  addMessageToChat(data);
  scrollToBottom();
});

const addMessageToChat = (data) => {
  const item = document.createElement("li");
  const time = formatDate(new Date(data.time));
  item.textContent = `[${time}] ${data.username}: ${data.msg}`;
  item.classList.add(data.username === username ? "sent" : "received");
  messageList.appendChild(item);
};

const typingIndicator = document.getElementById("typingIndicator");
const members = document.getElementById("members");
let connectedUsers = [];
let typingTimeout;

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
    typingIndicator.style.display = "block";

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      typingIndicator.style.display = "none";
    }, 1000);
  } else {
    typingIndicator.style.display = "none";
  }
});

socket.on("typing", (username) => {
  typingIndicator.textContent = `${username} is typing...`;
  typingIndicator.style.display = "block";
  members.style.display = "none";

  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    typingIndicator.style.display = "none";
    updateMembersList();
  }, 1000);
});

function addSystemMessage(msg) {
  const item = document.createElement("li");
  item.textContent = msg;
  item.style.color = "gray";
  item.style.textAlign = "center";
  messageList.appendChild(item);
}

function scrollToBottom() {
  messageList.scrollTop = messageList.scrollHeight;
}
