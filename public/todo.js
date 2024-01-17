const form = document.getElementById("form");
const searchTask = document.getElementById("search");
const addTodo = document.getElementById("addTask");
const todos = document.getElementById("tasks");
const clearAllItems = document.getElementById("clearAll");

// load event listeners
loadEventListeners();

function loadEventListeners() {
  // submitting task
  form.addEventListener("submit", onSubmit);
  // delete a task
  todos.addEventListener("click", remove);
  // search or filter for todo
  searchTask.addEventListener("keyup", searchTodo);
  // clear all
  clearAllItems.addEventListener("click", clearAll);
}

// Function to fetch and display todos
async function fetchAndDisplayTodos() {
  const response = await fetch("/api/v1/todos");
  if (response.ok) {
    const todosData = await response.json();
    console.log(todosData);
    // Clear existing todos on the DOM
    todos.innerHTML = "";

    // Iterate through fetched todos and add them to the DOM
    todosData.todo.forEach((singleTodo) => {
      const newLi = document.createElement("li");
      newLi.id = singleTodo._id;

      newLi.appendChild(document.createTextNode(singleTodo.todo));

      // Create delete icon
      const icon = document.createElement("p");
      icon.innerText = "X";
      icon.className = "x";
      newLi.appendChild(icon);

      // Append the list item to the ul
      todos.appendChild(newLi);
    });
  } else {
    console.log("Failed to fetch todos");
  }
}

// Function to handle form submission
async function onSubmit(e) {
  e.preventDefault();
  if (addTodo.value === "") {
    console.log("Add a task!");
    return false;
  }

  // Send a POST request to add the task
  const response = await fetch("/api/v1/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todo: addTodo.value, completed: false }),
  });

  if (response.ok) {
    // Fetch and display todos after successful addition
    await fetchAndDisplayTodos();

    // Clear the field after entering a task
    addTodo.value = "";
  } else {
    console.log("Failed to post");
  }
}

// Fetch and display todos on page load
window.addEventListener("load", fetchAndDisplayTodos);

// Deleting task function
async function remove(e) {
  e.preventDefault();
  if (e.target.classList.contains("x")) {
    const id = e.target.parentElement.id;

    // Extract task text
    const taskText = e.target.parentElement.textContent.trim();
    // Send a DELETE request to remove the task
    const response = await fetch(`/api/v1/todos/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Remove the list item from the DOM
      e.target.parentElement.remove();
    } else {
      console.log("Failed to delete task");
    }
  }
}

// Filter or search function
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
}

async function clearAll(e) {
  e.preventDefault();
  try {
    const res = await fetch("/api/v1/todos/all", {
      method: "DELETE",
    });
    if (res.ok) {
      todos.innerHTML = "";
    }
  } catch (error) {}
}
