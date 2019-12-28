let timerStatus = {
  mode: 'timer',
  handler: null,
  currSecond: 180,
  running: false,
  initTarget: 180
};

function notifyViewChange() {
  postMessage({type: 'viewUpdate', currSecond: timerStatus.currSecond});
}

function setMode(mode) {
  timerStatus.mode = mode;
}

function count() {
  if (!timerStatus.running) return;
  if (timerStatus.mode === 'stopwatch') {
    timerStatus.currSecond++;
  } else {
    timerStatus.currSecond--;
    checkTimerEnd();
  }
  notifyViewChange();
}

function checkTimerEnd() {
  if (timerStatus.currSecond == 0) {
    timerStatus.running = false;
    if (timerStatus.handler) {
      clearInterval(timerStatus.handler);
    }
    postMessage({type: "timerReachedTarget"});
  }
}

function setTarget(target) {
  timerStatus.initTarget = target;
  resetTimer();
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
  if (timerStatus.handler) {
    clearInterval(timerStatus.handler);
  }
  notifyViewChange();
}

onmessage = function(msg) {
  switch (msg.data.type) {
    case 'resetTimer':
      resetTimer();
      break;

    case 'startTimer':
      startTimer();
      break;
    
    case 'stopTimer':
      stopTimer();
      break;
    
    case 'setTarget':
      setTarget(msg.data.target);
      break;
    
    case 'setMode':
      resetTimer();
      setMode(msg.data.mode);
      break;
  }
};