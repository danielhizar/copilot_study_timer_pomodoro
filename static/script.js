let studyTimer;
let breakTimer;
let isStudyRunning = false;
let isBreakRunning = false;
let studyTimeLeft = 25 * 60;
let breakTimeLeft = 5 * 60;

function startStudyTimer() {
    if (!isStudyRunning) {
        resetBreakTimer(); // Reset break timer when study timer starts
        isStudyRunning = true;
        studyTimer = setInterval(updateStudyTimer, 1000);
        document.getElementById('startStudyButton').disabled = true;
        document.getElementById('pauseStudyButton').disabled = false;
        document.getElementById('resetStudyButton').disabled = false;
    }
}

function pauseStudyTimer() {
    isStudyRunning = false;
    clearInterval(studyTimer);
    document.getElementById('startStudyButton').disabled = false;
    document.getElementById('pauseStudyButton').disabled = true;
    document.getElementById('resetStudyButton').disabled = false;
    document.getElementById('startStudyButton').textContent = "Continue Study";
}

function resetStudyTimer() {
    pauseStudyTimer();
    studyTimeLeft = 25 * 60;
    document.getElementById('studyTime').textContent = formatTime(studyTimeLeft);
    document.getElementById('startStudyButton').disabled = false;
    document.getElementById('pauseStudyButton').disabled = true;
    document.getElementById('resetStudyButton').disabled = true;
    document.getElementById('startStudyButton').textContent = "Start Study";
}

function updateStudyTimer() {
    if (studyTimeLeft > 0) {
        studyTimeLeft--;
        document.getElementById('studyTime').textContent = formatTime(studyTimeLeft);
    } else {
        pauseStudyTimer();
        alert("Study time's up!");
    }
}

function startBreakTimer() {
    if (!isBreakRunning) {
        resetStudyTimer(); // Reset study timer when break timer starts
        isBreakRunning = true;
        breakTimer = setInterval(updateBreakTimer, 1000);
        document.getElementById('startBreakButton').disabled = true;
        document.getElementById('pauseBreakButton').disabled = false;
        document.getElementById('resetBreakButton').disabled = false;
    }
}

function pauseBreakTimer() {
    isBreakRunning = false;
    clearInterval(breakTimer);
    document.getElementById('startBreakButton').disabled = false;
    document.getElementById('pauseBreakButton').disabled = true;
    document.getElementById('resetBreakButton').disabled = false;
    document.getElementById('startBreakButton').textContent = "Continue Break";
}

function resetBreakTimer() {
    pauseBreakTimer();
    breakTimeLeft = 5 * 60;
    document.getElementById('breakTime').textContent = formatTime(breakTimeLeft);
    document.getElementById('startBreakButton').disabled = false;
    document.getElementById('pauseBreakButton').disabled = true;
    document.getElementById('resetBreakButton').disabled = true;
    document.getElementById('startBreakButton').textContent = "Start Break";
}

function updateBreakTimer() {
    if (breakTimeLeft > 0) {
        breakTimeLeft--;
        document.getElementById('breakTime').textContent = formatTime(breakTimeLeft);
    } else {
        pauseBreakTimer();
        alert("Break time's up!");
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}