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

var hours = Array.from({length:18},function(elem,idx){
  return `${6+idx}:00 - ${7+idx}:00`
  
})
let wholeDaySum="";
hours.forEach(function(elem,idx){
  wholeDaySum+=`<div
      class="day-planner-time w-full sm:w-[49%] relative flex items-center gap-3 group"
    >
      <p
        class="absolute top-2 left-3 text-xs sm:text-sm  font-semibold  text-white z-10"
      >
       ${elem}
      </p>

      <input
        type="text" id=${idx}
        class="px-4 sm:px-5 pt-8 pb-4 sm:py-6 rounded-xl
        bg-slate-700/80 border border-white/5
        hover:border-white/10 focus:border-blue-400/50
        outline-0 text-lg sm:text-xl text-white
        placeholder:text-slate-500
        w-full transition-all duration-300
        focus:bg-slate-700 focus:ring-2 focus:ring-blue-400/10"
        placeholder="What are you planning?"
      />
    </div>`
  
})
let dayPlansdata=JSON.parse(localStorage.getItem('dayPlansData'))||{}
console.log(dayPlansdata);

let dayPlan= document.querySelector(".day-planner");
dayPlan.innerHTML=wholeDaySum;

let plans= document.querySelectorAll(".day-planner input");
plans.forEach(function(e){
  e.addEventListener("input",function(){
    
    dayPlansdata[e.id]=e.value;
    
    localStorage.setItem('dayPlansData',JSON.stringify(dayPlansdata));
    
    
  })
})



function motivationalQuotes() {
  let quote = document.querySelector(".quote");
  let author = document.querySelector(".author");

  async function data() {
    let responce = await fetch(
      "https://motivational-spark-api.vercel.app/api/quotes/random",
    );
    let data = await responce.json();
    // console.log(data.author);
    quote.innerHTML = `${data.quote}`;
    author.innerHTML = `- ${data.author}`;
  }
  data();
}
motivationalQuotes()


