function openFeatures() {
  let fullElems = document.querySelectorAll(".fullElem");
  let elem = document.querySelectorAll(".elem");

  elem.forEach((e) => {
    e.addEventListener("click", function () {
      fullElems[e.id].style.display = "block";
    });
  });

  let backBtns = document.querySelectorAll(".backBtn");

  backBtns.forEach((e) => {
    e.addEventListener("click", function () {
      fullElems[e.id].style.display = "none";
    });
  });
}

openFeatures();

function todo() {
  let frm = document.querySelector(".todo-frm");
  let input = document.querySelector(".inp");
  let alltsks = document.querySelector(".all-tasks");

  // Load tasks from Local Storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Save tasks
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Render tasks
  function renderTask() {
    let taskHTML = "";

    tasks.forEach(function (task, idx) {
      taskHTML += `
        <div class="flex justify-between items-center bg-zinc-800 p-3 rounded-lg mb-2">
          
          <div class="flex items-center gap-3">
            <p class="text-white">${task.task}</p>
          </div>

          <button data-index="${idx}"
            class="delete text-red-500 hover:scale-110 duration-300 cursor-pointer text-xl">
            🗑️
          </button>

        </div>
      `;
    });

    alltsks.innerHTML = taskHTML;

    // Delete Event
    let deleteBtns = document.querySelectorAll(".delete");

    deleteBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        let index = this.dataset.index;

        tasks.splice(index, 1);

        saveTasks();
        renderTask();
      });
    });
  }

  // Show saved tasks on page load
  renderTask();

  // Add Task
  frm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (input.value.trim() === "") return;

    tasks.push({
      task: input.value.trim(),
    });

    saveTasks();
    renderTask();

    frm.reset();
  });
}

todo();
