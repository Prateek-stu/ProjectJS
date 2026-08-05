function openFeatures() {
  let fullElems = document.querySelectorAll(".fullElem");
  let elem = document.querySelectorAll(".elem");
  elem.forEach((e) => {
    e.addEventListener("click", function () {
      fullElems[e.id].style.display = "block";
    });
  });
  let backBtns = document.querySelectorAll(".backBtn");
  backBtns.forEach(function (e) {
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
  // let tasks = [];

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  frm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (input.value == "") {
      return;
    }
    tasks.push({ task: input.value });
    saveTasks();
    renderTask();

    frm.reset();
  });
  function renderTask() {
    let task = "";
    tasks.forEach(function (e) {
      task += `<div class="bg-slate-800 rounded-xl p-4 flex justify-between items-center">

                <div class="flex items-center gap-4">

                  

                    <p class="text-white">
                        ${e.task}
                    </p>

                </div>

                <div class="flex gap-3">

                    

                    <button  class="delete mark text-red-500 hover:scale-110 duration-300 cursor-pointer text-xl  ">
                        🗑️
                    </button>

                </div>

            </div>`;
    });
    alltsks.innerHTML = task;
    let deletBtn = document.querySelectorAll(".delete");
    deletBtn.forEach(function (e, idx) {
      e.addEventListener("click", function () {
        tasks.splice(idx, 1);
        saveTasks();
        renderTask();
        
      });
    });
  }
}
todo();
