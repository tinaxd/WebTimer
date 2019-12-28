let timerStatus = {
  mode: 'timer',
  handler: null,
  currSecond: 0,
  running: false,
  initTarget: 0
};

let timerModeBtn;
let stopwatchModeBtn;
let timerDisplay;

function count() {
  if (!timerStatus.running) return;
  if (timerStatus.mode === 'stopwatch') {
    timerStatus.currSecond++;
  } else {
    timerStatus.currSecond--;
    checkTimerEnd();
  }
  updateView();
}

function checkTimerEnd() {
  if (timerStatus.currSecond == 0) {
    timerStatus.running = false;
  }
}

function updateView() {
  const minute = ('00' + Math.floor(timerStatus.currSecond / 60)).slice(-2);
  const second = ('00' + timerStatus.currSecond % 60).slice(-2);
  timerDisplay.innerHTML = minute + ':' + second;
}

function startTimer() {
  if (timerStatus.running) return;
  timerStatus.handler = setInterval(count, 1000);
  timerStatus.running = true;
}

function stopTimer() {
  if (timerStatus.handler) {
    clearInterval(timerStatus.handler);
  }
  timerStatus.running = false;
}

function resetTimer() {
  timerStatus.currSecond = timerStatus.initTarget;
  timerStatus.running = false;
  updateView();
}

function changeTimerMode() {
  timerStatus.mode = 'timer';
  buttonUpdate('timer');
}

function changeStopwatchMode() {
  timerStatus.mode = 'stopwatch';
  buttonUpdate('stopwatch');
}

function buttonUpdate(enabledMode) {
  console.log('update');
  const isTimer = enabledMode === 'timer';
  const enabledBtn = isTimer ? timerModeBtn : stopwatchModeBtn;
  const disabledBtn = isTimer ? stopwatchModeBtn : timerModeBtn;
  enabledBtn.classList.remove('switch-disabled');
  enabledBtn.classList.add('switch-enabled');
  disabledBtn.classList.remove('switch-enabled');
  disabledBtn.classList.add('switch-disabled');
}

window.onload = () => {
  timerModeBtn = document.getElementById('timerModeBtn');
  stopwatchModeBtn = document.getElementById('stopwatchModeBtn');
  timerDisplay = document.getElementById('timerDisplay');
}