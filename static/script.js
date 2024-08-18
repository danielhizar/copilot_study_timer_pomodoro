let timer;
let isRunning = false;
let timeLeft = 25 * 60;

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
        document.getElementById('startButton').disabled = true;
        document.getElementById('pauseButton').disabled = false;
        document.getElementById('resetButton').disabled = false;
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
    document.getElementById('startButton').disabled = false;
    document.getElementById('pauseButton').disabled = true;
    document.getElementById('resetButton').disabled = false;
    document.getElementById('startButton').textContent = "Continue Study";
}

function resetTimer() {
    pauseTimer();
    timeLeft = 25 * 60;
    document.getElementById('time').textContent = formatTime(timeLeft);
    document.getElementById('startButton').disabled = false;
    document.getElementById('pauseButton').disabled = true;
    document.getElementById('resetButton').disabled = true;
    document.getElementById('startButton').textContent = "Start Study";
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('time').textContent = formatTime(timeLeft);
    } else {
        pauseTimer();
        alert("Time's up!");
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}