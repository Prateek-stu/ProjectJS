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

let tasks = [];

let frm = document.querySelector(".todo-frm");
let input = document.querySelector(".inp");
let alltsks = document.querySelector(".all-tasks");
frm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (input.value == "") {
    return;
  }
  tasks.push({ task: input.value });
  renderTask();
  frm.reset();
});
function renderTask() {
  let task = "";
  tasks.forEach(function (e) {
    task += `<div class="bg-slate-800 rounded-xl p-4 flex justify-between items-center">

                <div class="flex items-center gap-4">

                    <input type="checkbox" class="check w-5 h-5 accent-cyan-500">

                    <p class="text-white">
                        ${e.task}
                    </p>

                </div>

                <div class="flex gap-3">

                    

                    <button class="mark text-red-500 hover:scale-110 duration-300">
                        🗑️
                    </button>

                </div>

            </div>`;
  });
  alltsks.innerHTML = task;
}
