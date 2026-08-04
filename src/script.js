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
