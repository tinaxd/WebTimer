let timerStatus = {
  mode: 'timer',
  handler: null
}

let timerModeBtn;
let stopwatchModeBtn;

function startTimer() {

}

function stopTimer() {
  
}

function resetTimer() {

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
}