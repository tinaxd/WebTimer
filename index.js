let timerModeBtn;
let stopwatchModeBtn;
let timerDisplay;

let timerWorker;


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
  timerWorker.postMessage({type: 'setMode', mode: 'timer'});
  buttonUpdate('timer');
}

function changeStopwatchMode() {
  postMessage({type: 'setMode', mode: 'stopwatch'});
  timerWorker.postMessage({type: 'setMode', mode: 'stopwatch'});
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

function stopSound() {

}

window.onload = () => {
  timerModeBtn = document.getElementById('timerModeBtn');
  stopwatchModeBtn = document.getElementById('stopwatchModeBtn');
  timerDisplay = document.getElementById('timerDisplay');

  if (window.Worker) {
    timerWorker = new Worker('worker.js');

    timerWorker.onmessage = function(msg) {
      switch (msg.data.type) {
        case 'timerReachedTarget':
          // TODO: do something
          break;
        
        case 'viewUpdate':
          updateView(msg.data.currSecond);
      }
    };

    timerWorker.onerror = function(err) {
      console.log(err);
    }
  } else {
    alert("This app doesn't work on your browser! Please try a different browser.");
  }
}
