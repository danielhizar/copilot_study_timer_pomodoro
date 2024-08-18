let studyTimer;
let breakTimer;
let isStudyRunning = false;
let isBreakRunning = false;
let studyTimeLeft = 25 * 60;
let breakTimeLeft = 5 * 60;

const studyEndSound = document.getElementById('studyEndSound');
const breakEndSound = document.getElementById('breakEndSound');
const startSound = document.getElementById('startSound');

const quotes = [
    "Stay focused and never give up.",
    "Believe in yourself and all that you are.",
    "The future depends on what you do today.",
    "Don't watch the clock; do what it does. Keep going.",
    "Success is not the key to happiness. Happiness is the key to success."
];

function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote').textContent = quotes[randomIndex];
}

setInterval(displayRandomQuote, 10000); // Display a new quote every 10 seconds

function startStudyTimer() {
    if (!isStudyRunning) {
        resetBreakTimer(); // Reset break timer when study timer starts
        isStudyRunning = true;
        studyTimer = setInterval(updateStudyTimer, 1000);
        document.getElementById('startStudyButton').disabled = true;
        document.getElementById('pauseStudyButton').disabled = false;
        document.getElementById('resetStudyButton').disabled = false;
        startSound.play().catch(error => console.error("Error playing start sound:", error));
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
        console.log("Study timer ended. Playing sound...");
        studyEndSound.play().catch(error => console.error("Error playing study end sound:", error));
        resetStudyTimer();
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
        startSound.play().catch(error => console.error("Error playing start sound:", error));
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
        console.log("Break timer ended. Playing sound...");
        breakEndSound.play().catch(error => console.error("Error playing break end sound:", error));
        resetBreakTimer();
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}