const form = document.getElementById("form");
const searchTask = document.getElementById("search");
const addTodo = document.getElementById("addTask");
const todos = document.getElementById("tasks");
const clearAllItems = document.getElementById("clearAll");

//load event listeners
loadEventListeners();
function loadEventListeners() {
  //submiting task
  form.addEventListener("submit", onsubmit);
  // delet a task
  todos.addEventListener("click", remove);
  // search or folter for todo
  searchTask.addEventListener("keyup", searchTodo);
  //clear all
  clearAllItems.addEventListener("click", clearAll);
}
function onsubmit(e) {
  e.preventDefault();
  if (addTodo.value === "") {
    alert("Add a task!");
    return false;
  }
  //creating new li
  let newLi = document.createElement("li");
  //creating a textnode from the input and append to li
  newLi.appendChild(document.createTextNode(addTodo.value));
  // creating the delet icon
  let icon = document.createElement("i");
  //inserting the class to the icon
  icon.className = "fas fa-trash";
  //appending the icon to the li
  newLi.appendChild(icon);
  //appending the li to the ul
  todos.appendChild(newLi);
  // clearing the field after entering a task
  addTodo.value = "";
  // after adding to DOM, add to LS
  storeItemInLocalStorage(addTodo.value);
}

//deleting task function
function remove(e) {
  e.preventDefault();
  if (e.target.classList.contains("fa-trash")) {
    if (
      confirm(`Are you sure to delete ${e.target.parentElement.textContent}?`) //confirmation befor deleting
    ) {
      e.target.parentElement.remove();
    }
  }
}
//fiter or search function
function searchTodo(e) {
  e.preventDefault();
  let inputText = e.target.value.toLowerCase();
  document.querySelectorAll("li").forEach(function (todoItem) {
    let Items = todoItem.firstChild.textContent;
    if (Items.toLowerCase().indexOf(inputText) != -1) {
      todoItem.style.display = "block";
    } else {
      todoItem.style.display = "none";
    }
  });
  // searchTask.value = "";
}
function storeItemInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem(tasks) === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem(task));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function clearAll(e) {
  e.preventDefault();
  todos.innerHTML = "";
}
