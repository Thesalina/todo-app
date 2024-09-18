// Load tasks from local storage when the page loads
window.onload = function() {
    loadTasksFromLocalStorage();
};

// Function to add a new task
function addTask() {
    // Get the input value
    let taskInput = document.getElementById("taskInput").value;
    
    // Check if the input is not empty
    if (taskInput.trim() !== "") {
        // Create a task object
        let task = {
            text: taskInput,
            completed: false
        };

        // Add task to UI
        addTaskToUI(task);

        // Save task to local storage
        saveTaskToLocalStorage(task);

        // Clear the input field after adding the task
        document.getElementById("taskInput").value = "";
    } else {
        // Alert if the input is empty
        alert("Please enter a task.");
    }
}

// Function to add a task to the UI
function addTaskToUI(task) {
    // Create a new list item (li) element
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task.text));

    // Add the completed class if the task is marked completed
    if (task.completed) {
        li.classList.add("completed");
    }

    // Add click event to mark as completed
    li.addEventListener("click", function() {
        this.classList.toggle("completed");
        updateTaskInLocalStorage(task.text);
    });

    // Create a delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.onclick = function() {
        li.remove();
        removeTaskFromLocalStorage(task.text);
    };

    // Append delete button to the list item
    li.appendChild(deleteBtn);

    // Append the list item to the task list
    document.getElementById("taskList").appendChild(li);
}

// Save task to local storage
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        addTaskToUI(task);
    });
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(function(task) {
        return task.text !== taskText;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task completion status in local storage
function updateTaskInLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
