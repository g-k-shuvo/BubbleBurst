const start_btn = document.getElementById("start_btn");
const screens = document.querySelectorAll(".screen");
const game_container = document.querySelector(".game_container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const annoying_message = document.getElementById("annoying_message");
let seconds = 0;
let score = 0;

start_btn.addEventListener("click", () => {
  screens[0].classList.add("up");
  startGame();
  createBubble();
});

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;

  seconds++;
}

function addBubbles() {
  setTimeout(createBubble, 1000);
  setTimeout(createBubble, 1500);
}

function createBubble() {
  const bubble = document.createElement("div");
  const { x, y } = getRandomLocation();
  bubble.classList.add("bubble");
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  bubble.style.backgroundColor = randomColor();
  game_container.appendChild(bubble);
  bubble.addEventListener("click", burstBubble);
}

function burstBubble() {
  increaseScore();
  this.classList.add("bubble-wooble", "bubble-pop");
  setTimeout(() => {
    this.remove();
  }, 1000);
  addBubbles();
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;

  return {
    x,
    y,
  };
}

function increaseScore() {
  score++;
  if (score > 19) {
    annoying_message.classList.add("visible");
  }
  scoreEl.innerHTML = `Score: ${score}`;
}

function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
  return `rgba(
        ${this.randomNumber(0, 255)},
        ${this.randomNumber(0, 255)},
        ${this.randomNumber(0, 255)}, 
        ${this.randomNumber(0.1, 1)}`;
}

function startGame() {
  setInterval(increaseTime, 1000);
}
