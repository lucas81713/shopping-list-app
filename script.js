const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");

let items = JSON.parse(localStorage.getItem("shoppingList")) || [];

// SAVE
function save() {
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

// RENDER
function render() {
  list.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    if (item.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = item.text;

    span.addEventListener("click", () => {
      items[index].done = !items[index].done;
      save();
      render();
    });

    const del = document.createElement("button");
    del.textContent = "✖";
    del.className = "delete-btn";

    del.addEventListener("click", (e) => {
      e.stopPropagation();
      items.splice(index, 1);
      save();
      render();
    });

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });
}

// ADD
function addItem() {
  const text = input.value.trim();
  if (!text) return;

  items.push({ text, done: false });
  input.value = "";
  save();
  render();
}

addBtn.addEventListener("click", addItem);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addItem();
});

// INITIAL
render();
