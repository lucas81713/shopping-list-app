const form = document.getElementById("listForm");
const input = document.getElementById("itemInput");
const list = document.getElementById("list");

/* ---------- SAVE LIST ---------- */
function saveList() {
  const items = [];

  document.querySelectorAll("#list li").forEach(li => {
    items.push({
      text: li.querySelector("span").textContent,
      done: li.querySelector("span").classList.contains("done")
    });
  });

  localStorage.setItem("listoreData", JSON.stringify(items));
}

/* ---------- CREATE ITEM ---------- */
function createItem(text, done = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  if (done) span.classList.add("done");

  span.addEventListener("click", () => {
    span.classList.toggle("done");
    saveList();
  });

  const del = document.createElement("button");
  del.textContent = "✕";
  del.className = "delete-btn";

  del.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveList();
  });

  li.appendChild(span);
  li.appendChild(del);

  list.prepend(li);
  saveList();
}

/* ---------- FORM SUBMIT (PREVENT REFRESH HERE) ---------- */
form.addEventListener("submit", (e) => {
  e.preventDefault();  // ← THIS STOPS THE REFRESH

  const text = input.value.trim();
  if (!text) return;

  createItem(text);
  input.value = "";
});

/* ---------- LOAD SAVED ITEMS ---------- */
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("listoreData")) || [];

  saved.reverse().forEach(item => {
    createItem(item.text, item.done);
  });
});
