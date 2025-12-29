const input = document.getElementById("itemInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("list");
const themeToggle = document.getElementById("themeToggle");

function addItem() {
  if (input.value === "") return;

  const li = document.createElement("li");
  li.textContent = input.value;

  li.onclick = () => {
    li.classList.toggle("done");
  };

  list.prepend(li);
  input.value = "";
}

button.onclick = addItem;

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addItem();
  }
});

// Dark mode toggle
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
};
