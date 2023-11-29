const boxColumns = document.querySelectorAll(".box-col");
const score = document.querySelector("#score");
const highest = document.querySelector("#highest");
const circle = document.querySelector(".circle");

const colorObject = {
  1: "green",
  2: "blue",
  3: "red",
  4: "yellow",
};

let currentScore = 0;
let highScore = currentScore;
let count = 0;
let start = false;

let randomColor = [];
let userColor = [];

gameStart();

boxColumns.forEach((item) => {
  item.addEventListener("click", clickEvent);
});
function clickEvent(e) {
  const id = e.target.id;

  clickButton(id, "click");

  makeSound(id);

  userColor.push(id);

  checkResult();
}

function makeColor() {
  const randomNumber = Math.floor(Math.random() * 4) + 1;
  randomColor.push(colorObject[randomNumber]);
}
function displayColor() {
  for (let i = 0; i < randomColor.length; i++) {
    setTimeout(() => {
      clickButton(randomColor[i], "click");
      makeSound(randomColor[i]);
    }, (i + 1) * 600);
  }
}
function clickButton(id, name) {
  const element = document.querySelector(`#${id}`);
  element.classList.add(name);
  setTimeout(() => {
    element.classList.remove(name);
  }, 180);
}
function makeSound(id) {
  const sound = new Audio(`./sounds/${id}.mp3`);
  sound.play();
}

function checkResult() {
  if (userColor[count] === randomColor[count]) {
    if (currentScore === count) {
      setTimeout(() => {
        makeColor();

        displayColor();

        currentScore++;

        userColor = [];

        count = 0;

        updateScore();

        return;
      }, 500);
    }
    count++;
  } else {
    gameOver();
  }
}
function updateScore() {
  score.innerHTML = currentScore;

  if (currentScore > highScore) {
    highScore = currentScore;

    highest.innerHTML = highScore;
  }
}
function gameOver() {
  clickButton("box", "over");

  clickButton("circle", "over");

  makeSound("wrong");

  setTimeout(() => {
    circle.innerHTML = "Start";
  }, 900);

  start = false;

  count = 0;

  currentScore = 0;

  randomColor = [];

  userColor = [];

  score.innerHTML = "0";

  circle.innerHTML = "Over";
}

function gameStart() {
  circle.innerHTML = "";

  if (!start) {
    makeColor();

    displayColor();

    start = true;
  }
}
