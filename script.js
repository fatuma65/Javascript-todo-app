let inputField = document.getElementById("task");
const createTasks = (e) => {
  e.preventDefault();

  let taskContainer = document.querySelector(".task-cont");
  let todoContainer = document.createElement("div");
  let todo = document.createElement("div");
  let taskList = document.createElement("h4");

  taskList.style.fontWeight = "500";

  todoContainer.style.display = "flex";
  todoContainer.style.alignItems = "center";
  todoContainer.style.justifyContent = "space-between";
  taskList.style.margin = "5px";
  taskList.style.color = "black";

  todo.style.alignItems = "center";

  let inputText = inputField.value;
  let tasksInLocalStorage = localStorage.getItem("tasks");

  let taskArray = tasksInLocalStorage ? JSON.parse(tasksInLocalStorage) : [];

  const taskId = Date.now() + "-" + Math.random().toString(16).slice(2);
  const inputObject = {
    id: taskId,
    text: inputText,
    completed: false,
  };

  console.log(inputObject);
  console.log(inputText);
  if (!inputText.trim()) {
    return;
  }

  todoContainer.id = taskId;
  taskList.innerText = inputObject.text;
  console.log(taskList);

  let checkedInput = document.createElement("input");
  checkedInput.type = "checkbox";
  console.log(checkedInput);
  checkedInput.style.marginRight = "10px";
  checkedInput.checked = task.completed;

  if (task.completed) {
    taskList.style.textDecoration = "line-through";
    taskList.style.color = "blue";
  }

  checkedInput.addEventListener("change", () => {
    task.completed = checkedInput.checked;

    if (task.completed) {
      taskList.style.textDecoration = "line-through";
      taskList.style.color = "blue";
    } else {
      taskList.style.textDecoration = "none";
      taskList.style.color = "black";
    }
  });

  todo.appendChild(taskList);
  todoContainer.appendChild(todo);
  createButtons(todoContainer, taskId);
  taskContainer.appendChild(todoContainer);

  console.log(tasksInLocalStorage);
  console.log(taskArray);
  taskArray.push(inputObject);
  

  let stringifyArray = JSON.stringify(taskArray);
  localStorage.setItem("tasks", stringifyArray);

  alert('Please refresh the page')
  inputField.value = "";
};

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("submit");
  button.innerHTML = "<i class='bx bx-plus-circle'></i> Submit"
  button.addEventListener("click", createTasks);
});

const editTask = (id) => {
  const itemsInLocalStorage = localStorage.getItem("tasks");
  let inputField = document.getElementById("task");
  console.log("items in local storage ---", itemsInLocalStorage);
  if (itemsInLocalStorage !== null) {
    console.log("This is the id the task", id);
    let parseItemsInLocalStorage = JSON.parse(itemsInLocalStorage);
    for (let tasks of parseItemsInLocalStorage) {
      console.log(tasks);
      if (tasks.id === id) {
        console.log("Id has been found");
        console.log("This is the new text --- ", tasks.text);
        inputField.value = tasks.text;
        let submitButton = document.getElementById("submit");
        submitButton.removeEventListener("click", createTasks);

        submitButton.addEventListener("click", function saveEdit(e) {
          e.preventDefault();

          let newText = inputField.value;
          if (newText === "") {
            return;
          }
          tasks.text = newText;

          let taskList = document.getElementById(id);
          if (taskList) {
            taskList.childNodes[0].nodeValue = newText;
          } else {
            console.log(`Task with id ${id} is not found`);
          }
          localStorage.setItem(
            "tasks",
            JSON.stringify(parseItemsInLocalStorage)
          );
          console.log("task has been updated in the dom");
          alert('Please refresh the page')
          submitButton.removeEventListener("click", saveEdit);

          inputField.value = "";
        });
        submitButton.addEventListener("click", createTasks);
      } else {
        console.log("That id is not found");
      }
    }
  } else {
    console.log("There are no items in local storage");
  }
};

const deleteTask = (id) => {
  let dataInLocalStorage = localStorage.getItem("tasks");
  let parsingData = JSON.parse(dataInLocalStorage);

  const filtered = parsingData.filter((task) => task.id !== id);
  console.log(filtered);
  localStorage.setItem("tasks", JSON.stringify(filtered));

  let removedTask = document.getElementById(id);
  if (removedTask) {
    removedTask.remove();
  }
};

document.addEventListener("DOMContentLoaded", function retrieveTasks() {
  let dataInLocalStorage = localStorage.getItem("tasks");
  let taskContainer = document.querySelector(".task-cont");
  if (dataInLocalStorage !== null ) {
    let parsingData = JSON.parse(dataInLocalStorage);
    console.log(parsingData);

    for (let task of parsingData) {
      let checkedInput = document.createElement("input");

      let todoContainer = document.createElement("div");
      let todo = document.createElement("div");
      let taskList = document.createElement("h4");
      taskList.style.fontWeight = "500";

      todoContainer.style.display = "flex";
      todoContainer.style.alignItems = "center";
      todoContainer.style.justifyContent = "space-between";
      taskList.style.margin = "5px";
      taskList.style.color = "black";

      todo.style.alignItems = "center";

      todoContainer.id = task.id;
      taskList.innerText = task.text;

      checkedInput.type = "checkbox";
      console.log(checkedInput);
      checkedInput.style.marginRight = "10px";
      checkedInput.checked = task.completed;
      checkedInput.style.padding = "10px";

      if (task.completed) {
        taskList.style.textDecoration = "line-through";
        taskList.style.color = "blue";
      } else {
        taskList.style.textDecoration = "none";
        taskList.style.color = "black";
      }

      checkedInput.addEventListener("change", () => {
        task.completed = checkedInput.checked;

        if (task.completed) {
          taskList.style.textDecoration = "line-through";
          taskList.style.color = "blue";
        } else {
          taskList.style.textDecoration = "none";
          taskList.style.color = "black";
        }

        localStorage.setItem("tasks", JSON.stringify(parsingData));
      });

      taskList.prepend(checkedInput);
      todo.appendChild(taskList);
      todoContainer.appendChild(todo);

      taskContainer.appendChild(todoContainer);

      createButtons(todoContainer, task.id);
    }
  } else {
    console.log("No items in local storage");
    let noItems = document.createElement("h1");
    noItems.innerText = "You don't have tasks yet";
    noItems.style.fontWeight = "500";
    taskContainer.appendChild(noItems);
    
  }
});

const createButtons = (todoContainer, id) => {
  let buttonContainer = document.createElement("div");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  editButton.innerText = "Edit";
  deleteButton.innerText = "Delete";

  editButton.innerHTML = '<i class="bx bx-edit"></i> Edit';
  deleteButton.innerHTML = "<i class='bx bx-trash'></i> Delete";
  editButton.id = 'edit'

  console.log(editButton);

  editButton.style.backgroundColor = "black";
  editButton.style.color = "white";
  editButton.style.float = "right";
  editButton.style.padding = "8px";
  editButton.style.width = "100px";
  editButton.style.margin = "3px";
  editButton.style.borderRadius = "10px";

  deleteButton.style.backgroundColor = "red";
  deleteButton.style.color = "white";
  deleteButton.style.float = "right";
  deleteButton.style.padding = "8px";
  deleteButton.style.width = "100px";
  deleteButton.style.margin = "3px";
  deleteButton.style.borderRadius = "10px";

  buttonContainer.append(deleteButton, editButton);
  todoContainer.appendChild(buttonContainer);

  deleteButton.onclick = () => deleteTask(id);
  editButton.onclick = () => editTask(id);
};
