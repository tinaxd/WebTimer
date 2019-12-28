let timerModeBtn;
let stopwatchModeBtn;
let timerDisplay;

let timerWorker;
let myModal;

let timerMode = 'timer';

function updateView(currSecond) {
  const minute = ('00' + Math.floor(currSecond / 60)).slice(-2);
  const second = ('00' + currSecond % 60).slice(-2);
  timerDisplay.innerHTML = minute + ':' + second;
}

function startTimer() {
  timerWorker.postMessage({type: 'startTimer'});
}

function stopTimer() {
  timerWorker.postMessage({type: 'stopTimer'});
}

function resetTimer() {
  timerWorker.postMessage({type: 'resetTimer'});
}

function changeTimerMode() {
  postMessage({type: 'setMode', mode: 'timer'});
  timerWorker.postMessage({type: 'setTarget', target: 60*3});
  timerWorker.postMessage({type: 'setMode', mode: 'timer'});
  buttonUpdate('timer');
}

function changeStopwatchMode() {
  postMessage({type: 'setMode', mode: 'stopwatch'});
  timerWorker.postMessage({type: 'setTarget', target: 0});
  timerWorker.postMessage({type: 'setMode', mode: 'stopwatch'});
  buttonUpdate('stopwatch');
}

function buttonUpdate(enabledMode) {
  timerMode = enabledMode;
  const isTimer = enabledMode === 'timer';
  const enabledBtn = isTimer ? timerModeBtn : stopwatchModeBtn;
  const disabledBtn = isTimer ? stopwatchModeBtn : timerModeBtn;
  enabledBtn.classList.remove('switch-disabled');
  enabledBtn.classList.add('switch-enabled');
  disabledBtn.classList.remove('switch-enabled');
  disabledBtn.classList.add('switch-disabled');
}

function openTargetModal() {
  if (timerMode === 'timer')
    myModal.style.display = 'block';
}

function applyTargetModal() {
  const minuteForm = Number(document.getElementById('minuteForm').value);
  const secondForm = Number(document.getElementById('secondForm').value);
  const minute = Number.isFinite(minuteForm) ? minuteForm : 0;
  const second = Number.isFinite(secondForm) ? secondForm : 0;
  timerWorker.postMessage({type: 'setTarget', target: minute*60+second});
  myModal.style.display = 'none';
}

let alarm;
function playSoundLoop() {
  if (alarm) // stop previous alarm if exists.
    alarm.pause();
  alarm = new Audio('sound/alarm1.mp3');
  alarm.loop = true;
  alarm.play();
}

function stopSound() {
  if (alarm) {
    alarm.pause();
    timerWorker.postMessage({type: 'resetTimer'});
  }
}

window.onload = () => {
  timerModeBtn = document.getElementById('timerModeBtn');
  stopwatchModeBtn = document.getElementById('stopwatchModeBtn');
  timerDisplay = document.getElementById('timerDisplay');
  myModal = document.getElementById('myModal');

  if (window.Worker) {
    timerWorker = new Worker('worker.js');

    timerWorker.onmessage = function(msg) {
      switch (msg.data.type) {
        case 'timerReachedTarget':
          playSoundLoop();
          break;
        
        case 'viewUpdate':
          updateView(msg.data.currSecond);
          break;
      }
    };

    timerWorker.onerror = function(err) {
      console.log(err);
    }
  } else {
    alert("This app doesn't work on your browser! Please try a different browser.");
  }
}
