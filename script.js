const screens = [...document.querySelectorAll(".screen")];
const startButton = document.querySelector("#start-btn");
const finishButton = document.querySelector("#finish-btn");
const retryButton = document.querySelector("#retry-btn");
const againButton = document.querySelector("#again-btn");
const answerButtons = [...document.querySelectorAll(".answer-btn")];

let audioContext;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

function tone({ frequency, start = 0, duration = 0.12, type = "sine", gain = 0.12 }) {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const envelope = ctx.createGain();
  const begin = ctx.currentTime + start;
  const end = begin + duration;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, begin);
  envelope.gain.setValueAtTime(0.0001, begin);
  envelope.gain.exponentialRampToValueAtTime(gain, begin + 0.018);
  envelope.gain.exponentialRampToValueAtTime(0.0001, end);

  oscillator.connect(envelope).connect(ctx.destination);
  oscillator.start(begin);
  oscillator.stop(end + 0.02);
}

function playClick() {
  tone({ frequency: 660, duration: 0.055, type: "triangle", gain: 0.08 });
  tone({ frequency: 990, start: 0.035, duration: 0.05, type: "sine", gain: 0.055 });
}

function playTransition() {
  [523, 659, 784].forEach((frequency, index) => {
    tone({ frequency, start: index * 0.045, duration: 0.12, type: "triangle", gain: 0.075 });
  });
}

function playSuccess() {
  [784, 988, 1175, 1568].forEach((frequency, index) => {
    tone({ frequency, start: index * 0.075, duration: 0.18, type: "sine", gain: 0.11 });
  });
  tone({ frequency: 2093, start: 0.32, duration: 0.28, type: "triangle", gain: 0.07 });
}

function playWrong() {
  tone({ frequency: 330, duration: 0.1, type: "triangle", gain: 0.065 });
  tone({ frequency: 247, start: 0.09, duration: 0.14, type: "triangle", gain: 0.055 });
}

function showScreen(name, { transitionSound = true } = {}) {
  if (transitionSound) playTransition();
  screens.forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === name);
    const card = screen.querySelector(".card");
    if (card && screen.dataset.screen === name) {
      card.classList.remove("pop-in");
      void card.offsetWidth;
      card.classList.add("pop-in");
    }
  });
}

function handleAnswer(event) {
  playClick();
  const isCorrect = event.currentTarget.dataset.answer === "2";
  window.setTimeout(() => {
    showScreen(isCorrect ? "correct" : "wrong");
    window.setTimeout(isCorrect ? playSuccess : playWrong, 120);
  }, 120);
}

[startButton, finishButton, retryButton, againButton].forEach((button) => {
  button.addEventListener("click", () => playClick());
});

startButton.addEventListener("click", () => showScreen("quiz"));
finishButton.addEventListener("click", () => showScreen("end"));
retryButton.addEventListener("click", () => showScreen("quiz"));
againButton.addEventListener("click", () => showScreen("start"));
answerButtons.forEach((button) => button.addEventListener("click", handleAnswer));
