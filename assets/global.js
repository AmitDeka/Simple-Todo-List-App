const todoTaskText = document.getElementById("ToDoAddText");
const todoTaskButton = document.getElementById("ToDoAddButton");
const todoTaskList = document.querySelector(".ToDoCard_body_list_container");
const pendingTaskNumber = document.getElementById("pendingTaskNumber");
const todoTaskDeleteAllButton = document.getElementById("ToDoDeleteAllButton");

if (todoTaskText && todoTaskButton) {
  todoTaskText.onkeyup = () => {
    let taskData = todoTaskText.value;
    if (taskData.trim() != 0) {
      todoTaskButton.removeAttribute("disabled", "true");
    } else {
      todoTaskButton.setAttribute("disabled", "true");
    }
  };

  /*===== Show Task List =====*/
  showTaskList();

  /*===== Task Add Button =====*/
  todoTaskButton.onclick = () => {
    let taskData = todoTaskText.value;
    let getLocalStorage = localStorage.getItem("Todo Task");
    if (getLocalStorage == null) {
      listArray = [];
    } else {
      listArray = JSON.parse(getLocalStorage);
    }
    listArray.push(taskData);
    localStorage.setItem("Todo Task", JSON.stringify(listArray));
    showTaskList();
    todoTaskButton.setAttribute("disabled", "true");
  };

  /*===== Show Task List Function =====*/
  function showTaskList() {
    const getLocalStorage = localStorage.getItem("Todo Task");
    if (getLocalStorage == null) {
      listArray = [];
    } else {
      listArray = JSON.parse(getLocalStorage);
    }
    pendingTaskNumber.textContent = listArray.length;
    if (listArray.length > 0) {
      todoTaskDeleteAllButton.removeAttribute("disabled", "true");
    } else {
      todoTaskDeleteAllButton.setAttribute("disabled", "true");
    }
    let createLiTag = "";
    listArray.forEach((element, index) => {
      createLiTag += `
        <li class="ToDoCard_body_list_item">
            <div class="ToDoCard_body_list_item_text">
                <i class="bx bx-check-circle"></i>
                <p>${element}</p>
            </div>
            <div class="ToDoCard_body_list_item_icon">
                <button class="btn-primary" onclick="deleteTask(${index})">
                    <i class="bx bx-trash-alt"></i>
                </button>
            </div>
        </li>
        `;
    });
    todoTaskList.innerHTML = createLiTag;
    todoTaskText.value = "";
  }

  /*===== Delete Single Task Function =====*/
  function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("Todo Task");
    listArray = JSON.parse(getLocalStorage);
    listArray.splice(index, 1);
    localStorage.setItem("Todo Task", JSON.stringify(listArray));
    showTaskList();
  }

  /*===== Delete All Task Function =====*/
  todoTaskDeleteAllButton.onclick = () => {
    listArray = [];
    localStorage.setItem("Todo Task", JSON.stringify(listArray));
    showTaskList();
  };
}
