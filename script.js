const input = document.getElementById("itemInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("list");

/* ---------- SAVE LIST ---------- */
function saveList() {
  const items = [];

  document.querySelectorAll("#list li").forEach(li => {
    items.push({
      text: li.querySelector("span").textContent,
      done: li.classList.contains("done")
    });
  });

  localStorage.setItem("listoreData", JSON.stringify(items));
}

/* ---------- CREATE ITEM ---------- */
function createItem(text, done = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✕";
  removeBtn.className = "remove";

  /* Toggle complete */
  span.addEventListener("click", () => {
    li.classList.toggle("done");
    saveList();
  });

  /* Delete */
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveList();
  });

  li.appendChild(span);
  li.appendChild(removeBtn);

  if (done) li.classList.add("done");

  list.prepend(li);
  saveList();
}

/* ---------- ADD ITEM ---------- */
function addItem() {
  const text = input.value.trim();
  if (!text) return;

  createItem(text);
  input.value = "";
}

button.addEventListener("click", addItem);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addItem();
});

/* ---------- LOAD SAVED ITEMS ---------- */
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("listoreData")) || [];

  saved.reverse().forEach(item => {
    createItem(item.text, item.done);
  });
});
