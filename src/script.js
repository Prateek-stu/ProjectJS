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
  let clearAll = document.querySelector(".clearAll");

  let dailyTask = JSON.parse(localStorage.getItem("tasks")) || [];

if (!Array.isArray(dailyTask)) {
  dailyTask = [];
}

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(dailyTask));
  }

  function renderTask() {
    let taskHTML = "";

    dailyTask.forEach(function (e, idx) {
      taskHTML += `
        <div class="flex justify-between items-center bg-zinc-800 p-3 rounded-lg mb-2">
          
          <div class="flex items-center gap-3">
            <p class="text-white">${e.task}</p>
          </div>

          <button 
            data-index="${idx}"
            class="delete text-red-500 hover:scale-110 duration-300 cursor-pointer text-xl">
            🗑️
          </button>

        </div>
      `;
    });

    alltsks.innerHTML = taskHTML;

    let deleteBtns = document.querySelectorAll(".delete");

    deleteBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        let index = this.dataset.index;

        dailyTask.splice(index, 1);

        saveTasks();
        renderTask();
      });
    });
  }

  // Show saved tasks
  renderTask();

  // Add task
  frm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (input.value.trim() === "") return;

    dailyTask.push({
      task: input.value.trim(),
    });

    saveTasks();
    renderTask();

    frm.reset();
  });

  // Clear all tasks
  clearAll.addEventListener("click", function () {
    dailyTask = [];

    saveTasks();
    renderTask();
  });
}

todo();

function dailyPlanner() {
  let dayPlansdata = JSON.parse(localStorage.getItem("dayPlansData")) || {};
  let dayPlan = document.querySelector(".day-planner");

  var hours = Array.from({ length: 18 }, function (elem, idx) {
    return `${6 + idx}:00 - ${7 + idx}:00`;
  });
  let wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    let savedData = dayPlansdata[idx] || " ";

    wholeDaySum += `<div
      class="day-planner-time w-full sm:w-[49%] relative flex items-center gap-3 group"
    >
      <p
        class="absolute top-2 left-3 text-xs sm:text-sm  font-semibold  text-white z-10"
      >
       ${elem}
      </p>

      <input
        type="text" id="${idx}" value="${savedData}"
        class="px-4 sm:px-5 pt-8 pb-4 sm:py-6 rounded-xl
        bg-slate-700/80 border border-white/5
        hover:border-white/10 focus:border-blue-400/50
        outline-0 text-lg sm:text-xl text-white
        placeholder:text-slate-500
        w-full transition-all duration-300
        focus:bg-slate-700 focus:ring-2 focus:ring-blue-400/10"
        placeholder="What are you planning?"
      />
    </div>`;
  });

  dayPlan.innerHTML = wholeDaySum;
  let plans = document.querySelectorAll(".day-planner input");

  plans.forEach(function (e) {
    e.addEventListener("input", function () {
      console.log("hello");

      dayPlansdata[e.id] = e.value;

      localStorage.setItem("dayPlansData", JSON.stringify(dayPlansdata));
    });
  });
}
dailyPlanner();

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
motivationalQuotes();
function pomodoroTimer() {
  let timerInterval = null;
  let totalSeconds = 25 * 60;

  let timer = document.querySelector(".timer");
  let startTimer = document.querySelector(".start");
  let pauseTimer = document.querySelector(".stop");
  let resetTimer = document.querySelector(".reset");

  function updateTime() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function start() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        return;
      }

      totalSeconds--;
      updateTime();

    }, 1000);
  }

  function stop() {
    clearInterval(timerInterval);
  }

  function reset() {
    clearInterval(timerInterval);

    totalSeconds = 25 * 60;

    updateTime();
  }

  startTimer.addEventListener("click", start);

  pauseTimer.addEventListener("click", stop);

  resetTimer.addEventListener("click", reset);

  updateTime();
}
pomodoroTimer()

function dailyPlans() {
  const form = document.querySelector(".daily-form");
  const input = document.querySelector(".daily-inp");
  const taskContainer = document.querySelector(".all-daily-tasks");

  // Get tasks from localStorage
  let dailyTasks = JSON.parse(localStorage.getItem("dailyTasks")) || [];

  // Save tasks to localStorage
  function saveDailyTasks() {
    localStorage.setItem("dailyTasks", JSON.stringify(dailyTasks));
  }

  // Render all tasks
  function renderDailyTasks() {
    let taskHTML = "";

    dailyTasks.forEach(function (task, index) {
      taskHTML += `
        <div class="bg-slate-800 rounded-lg p-4 flex items-center gap-3">

          <input 
            type="checkbox" 
            class="task-check w-5 h-5 accent-blue-500 cursor-pointer shrink-0"
            data-index="${index}"
            ${task.completed ? "checked" : ""}
          >

          <p class="text-white text-base sm:text-lg flex-1 ${
            task.completed ? "line-through text-slate-400" : ""
          }">
            ${task.text}
          </p>

          <button 
            class="delete px-3 py-2 bg-red-500 text-white text-sm rounded cursor-pointer hover:bg-red-600"
            data-index="${index}"
          >
            Delete
          </button>

        </div>
      `;
    });

    taskContainer.innerHTML = taskHTML;

    attachDeleteEvents();
    attachCheckboxEvents();
  }

  // Add Task
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const taskText = input.value.trim();

    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    dailyTasks.push({
      text: taskText,
      completed: false,
    });

    saveDailyTasks();
    renderDailyTasks();

    input.value = "";
  });

  // Delete Task
  function attachDeleteEvents() {
    const deleteButtons = document.querySelectorAll(".delete");

    deleteButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const index = button.dataset.index;

        dailyTasks.splice(index, 1);

        saveDailyTasks();
        renderDailyTasks();
      });
    });
  }

  // Checkbox Complete/Incomplete
  function attachCheckboxEvents() {
    const checkboxes = document.querySelectorAll(".task-check");

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        const index = checkbox.dataset.index;

        dailyTasks[index].completed = checkbox.checked;

        saveDailyTasks();
        renderDailyTasks();
      });
    });
  }

  // Initial Render
  renderDailyTasks();
}

dailyPlans();


