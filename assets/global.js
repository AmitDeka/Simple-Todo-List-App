document.addEventListener("DOMContentLoaded", function (event) {
  /*===== LINK ACTIVE =====*/
  const todoTaskText = document.getElementById("ToDoAddText");
  const todoTaskButton = document.getElementById("ToDoAddButton");
  const todoTaskList = document.querySelector(".ToDoCard_body_list_container");

  if (todoTaskText && todoTaskButton) {
    todoTaskText.onkeyup = () => {
      let taskData = todoTaskText.value;
      if (taskData.trim() != 0) {
        todoTaskButton.removeAttribute("disabled", "true");
      } else {
        todoTaskButton.setAttribute("disabled", "true");
      }
    };

    showTaskList();

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
    };

    function showTaskList() {
      let getLocalStorage = localStorage.getItem("Todo Task");
      if (getLocalStorage == null) {
        listArray = [];
      } else {
        listArray = JSON.parse(getLocalStorage);
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
                <button class="btn-primary" onclick="deleteTask(${index})";>
                    <i class="bx bx-trash-alt"></i>
                </button>
            </div>
        </li>
        `;
      });
      todoTaskList.innerHTML = createLiTag;
      todoTaskText.value = "";
    }

    function deleteTask(index) {
      alert("a");
      let getLocalStorage = localStorage.getItem("Todo Task");
      listArray = JSON.parse(getLocalStorage);
      listArray.splice(index, 1);
      localStorage.setItem("Todo Task", JSON.stringify(listArray));
      showTaskList();
    }
  }
});
