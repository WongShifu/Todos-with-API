// Fetch data from the JSONPlaceholder API
async function fetchTodos() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();

    // Populate the dropdown with unique user IDs
    populateUserDropdown(data);

    // Display the full list of todos
    displayTodos(data);

    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

// Populate the dropdown with unique User IDs
function populateUserDropdown(todos) {
  const dropdownList = document.getElementById("dropdownList");

  // Get unique user IDs from todos
  const userIds = [...new Set(todos.map((todo) => todo.userId))];

  // Add a list item for each user ID
  userIds.forEach((userId) => {
    const listItem = document.createElement("li");
    listItem.textContent = `User ID: ${userId}`;
    listItem.dataset.userId = userId;

    // Add click event listener to filter todos when a user is selected
    listItem.addEventListener("click", () => {
      filterTodosByUserId(userId);
      hideDropdown(); // Hide the dropdown after selection
    });

    dropdownList.appendChild(listItem);
  });
}

// Display todos on the page
function displayTodos(todos) {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = ""; // Clear any previous todos

  todos.forEach((todo) => {
    const todoItem = document.createElement("p");
    todoItem.textContent = `${todo.userId}: ${todo.title}`;
    todoList.appendChild(todoItem);
  });
}

// Filter todos by selected User ID
async function filterTodosByUserId(userId) {
  const todos = await fetchTodos(); // Get all todos

  // Filter todos by the selected User ID
  const filteredTodos = todos.filter((todo) => todo.userId === userId);

  // Display the filtered todos
  displayTodos(filteredTodos);
}

// Clear the todo list
function clearTodos() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = ""; // Clear all displayed todos
}

// Hide the dropdown list
function hideDropdown() {
  const dropdownList = document.getElementById("dropdownList");
  dropdownList.style.display = "none"; // Hide the dropdown after selection
}

// Show the dropdown list
function showDropdown() {
  const dropdownList = document.getElementById("dropdownList");
  dropdownList.style.display = "block"; // Show the dropdown
}

// Toggle dropdown visibility when the button is clicked
document.getElementById("filterButton").addEventListener("click", () => {
  const dropdownList = document.getElementById("dropdownList");
  // If the dropdown is currently visible, hide it. Otherwise, show it.
  dropdownList.style.display = dropdownList.style.display === "none" || !dropdownList.style.display ? "block" : "none";
});

// Attach event listener to the "Clear" button
document.getElementById("clearButton").addEventListener("click", clearTodos);

// Fetch and display todos on page load
fetchTodos();
