const KEY = "todos_v2";
// Mỗi todo là một object: { text: '...', done: false }
let todos = JSON.parse(localStorage.getItem(KEY) || "[]");

function save() {
  localStorage.setItem(KEY, JSON.stringify(todos));
}

function render() {
  const ul = document.getElementById("todoList");
  ul.innerHTML = "";

  todos.forEach((t, i) => {
    const li = document.createElement("li");
    if (t.done) li.classList.add("done");

    // nội dung
    const span = document.createElement("span");
    span.textContent = t.text;

    // khu vực nút
    const actions = document.createElement("div");
    actions.className = "item-actions";

    // nút Verify (toggle done)
    const verifyBtn = document.createElement("button");
    verifyBtn.textContent = t.done ? "Unverify" : "Verify";
    verifyBtn.onclick = () => {
      todos[i].done = !todos[i].done;
      save();
      render();
    };

    // nút Xoá
    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = () => {
      todos.splice(i, 1);
      save();
      render();
    };

    actions.appendChild(verifyBtn);
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(actions);
    ul.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, done: false });
  save();
  render();
  input.value = "";
  input.focus();
}

document.getElementById("addBtn").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

render();
