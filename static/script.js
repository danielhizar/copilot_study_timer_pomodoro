let studyTimer;
let breakTimer;
let longBreakTimer;
let isStudyRunning = false;
let isBreakRunning = false;
let isLongBreakRunning = false;
let studyDuration = 25;
let breakDuration = 5;
let longBreakDuration = 15;
let sessionsBeforeLongBreak = 4;
let studyTimeLeft = studyDuration * 60;
let breakTimeLeft = breakDuration * 60;
let longBreakTimeLeft = longBreakDuration * 60;
let studyCount = 0;
let breakCount = 0;
let audioPlayer = document.getElementById('focusMusic');
let isPlaying = false;
let studyInterval, breakInterval, longBreakInterval;

function updateProgressBar(progressBarId, duration, timeRemaining) {
    const progressBar = document.getElementById(progressBarId);
    const progress = ((duration - timeRemaining) / duration) * 100;
    progressBar.style.width = progress + '%';
}

function resetAllProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function toggleMusic() {
    const button = document.getElementById('toggleMusicButton');
    const icon = button.querySelector('i');

    if (isPlaying) {
        audioPlayer.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    } else {
        audioPlayer.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }

    isPlaying = !isPlaying;
}

function changeMusic(src) {
    audioPlayer.src = src;
    audioPlayer.pause();
    isPlaying = false;

    const button = document.getElementById('toggleMusicButton');
    const icon = button.querySelector('i');
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
}


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

// Display an initial quote when the page loads
displayRandomQuote();

function openCustomizePopup() {
    document.getElementById('customizePopup').style.display = 'block';
}

function closeCustomizePopup() {
    document.getElementById('customizePopup').style.display = 'none';
}

function customizeTimers(event) {
    event.preventDefault();
    studyDuration = parseInt(document.getElementById('studyDurationInput').value) || 25;
    breakDuration = parseInt(document.getElementById('breakDurationInput').value) || 5;
    longBreakDuration = parseInt(document.getElementById('longBreakDurationInput').value) || 15;
    sessionsBeforeLongBreak = parseInt(document.getElementById('sessionsBeforeLongBreakInput').value) || 4;

    studyTimeLeft = studyDuration * 60;
    breakTimeLeft = breakDuration * 60;
    longBreakTimeLeft = longBreakDuration * 60;

    document.getElementById('studyDuration').innerText = `${studyDuration} mins`;
    document.getElementById('breakDuration').innerText = `${breakDuration} mins`;
    document.getElementById('longBreakDuration').innerText = `${longBreakDuration} mins`;

    document.getElementById('studyTime').innerText = formatTime(studyTimeLeft);
    document.getElementById('breakTime').innerText = formatTime(breakTimeLeft);
    document.getElementById('longBreakTime').innerText = formatTime(longBreakTimeLeft);

    closeCustomizePopup();
}

function startStudyTimer() {
    resetAllProgressBars();
    if (!isStudyRunning) {
        resetBreakTimer(); // Reset break timer when study timer starts
        if (studyCount >= sessionsBeforeLongBreak && studyCount % sessionsBeforeLongBreak === 0) {
            resetLongBreakTimer(); // Reset long break timer when study timer starts
        }
        
        isStudyRunning = true;
        studyTimer = setInterval(updateStudyTimer, 1000);
        document.getElementById('startStudyButton').disabled = true;
        document.getElementById('pauseStudyButton').disabled = false;
        document.getElementById('resetStudyButton').disabled = false;
        startSound.play().catch(error => console.error("Error playing start sound:", error));
    }
}

function updateStudyTimer() {
    if (studyTimeLeft <= 0) {
        clearInterval(studyTimer);
        studyEndSound.play();
        studyCount++;
        document.getElementById('studyCount').innerText = studyCount;
        isStudyRunning = false;
        document.getElementById('startStudyButton').disabled = false;
        document.getElementById('pauseStudyButton').disabled = true;
        document.getElementById('resetStudyButton').disabled = true;
        if (studyCount >= sessionsBeforeLongBreak && studyCount % sessionsBeforeLongBreak === 0) {
            document.getElementById('startLongBreakButton').disabled = false;

        }
    } else {
        studyTimeLeft--;
        updateProgressBar('studyProgressBar', (studyDuration * 60), studyTimeLeft);
        document.getElementById('studyTime').innerText = formatTime(studyTimeLeft);
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
    studyTimeLeft = studyDuration * 60;
    document.getElementById('studyTime').textContent = formatTime(studyTimeLeft);
    document.getElementById('startStudyButton').disabled = false;
    document.getElementById('pauseStudyButton').disabled = true;
    document.getElementById('resetStudyButton').disabled = true;
    document.getElementById('startStudyButton').textContent = "Start Study";
}

function startBreakTimer() {
    resetAllProgressBars();
    if (!isBreakRunning) {
        resetStudyTimer(); // Reset study timer when break timer starts
        resetLongBreakTimer(); // Reset long break timer when break timer starts
        isBreakRunning = true;
        breakTimer = setInterval(updateBreakTimer, 1000);
        document.getElementById('startBreakButton').disabled = true;
        document.getElementById('pauseBreakButton').disabled = false;
        document.getElementById('resetBreakButton').disabled = false;
        document.getElementById('startLongBreakButton').disabled = true;
        startSound.play().catch(error => console.error("Error playing start sound:", error));
    }
}

function updateBreakTimer() {
    if (breakTimeLeft <= 0) {
        clearInterval(breakTimer);
        breakEndSound.play();
        breakCount++;
        document.getElementById('breakCount').innerText = breakCount;
        isBreakRunning = false;
        document.getElementById('startBreakButton').disabled = false;
        document.getElementById('pauseBreakButton').disabled = true;
        document.getElementById('resetBreakButton').disabled = true;
    } else {
        breakTimeLeft--;
        updateProgressBar('breakProgressBar', (breakDuration * 60), breakTimeLeft);
        document.getElementById('breakTime').innerText = formatTime(breakTimeLeft);
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
    breakTimeLeft = breakDuration * 60;
    document.getElementById('breakTime').textContent = formatTime(breakTimeLeft);
    document.getElementById('startBreakButton').disabled = false;
    document.getElementById('pauseBreakButton').disabled = true;
    document.getElementById('resetBreakButton').disabled = true;
    document.getElementById('startBreakButton').textContent = "Start Break";
}

function startLongBreakTimer() {
    resetAllProgressBars();
    if (!isLongBreakRunning) {
        resetStudyTimer(); // Reset study timer when long break timer starts
        resetBreakTimer(); // Reset break timer when long break timer starts
        isLongBreakRunning = true;
        longBreakTimer = setInterval(updateLongBreakTimer, 1000);
        document.getElementById('startLongBreakButton').disabled = true;
        document.getElementById('pauseLongBreakButton').disabled = false;
        document.getElementById('resetLongBreakButton').disabled = false;
        document.getElementById('startBreakButton').disabled = true;
        startSound.play().catch(error => console.error("Error playing start sound:", error));
    }
}

function updateLongBreakTimer() {
    if (longBreakTimeLeft <= 0) {
        clearInterval(longBreakTimer);
        breakEndSound.play();
        isLongBreakRunning = false;
        document.getElementById('startLongBreakButton').disabled = false;
        document.getElementById('pauseLongBreakButton').disabled = true;
        document.getElementById('resetLongBreakButton').disabled = true;
    } else {
        longBreakTimeLeft--;
        updateProgressBar('longBreakProgressBar', (longBreakDuration * 60), longBreakTimeLeft);
        document.getElementById('longBreakTime').innerText = formatTime(longBreakTimeLeft);
    }
}

function pauseLongBreakTimer() {
    isLongBreakRunning = false;
    clearInterval(longBreakTimer);
    document.getElementById('startLongBreakButton').disabled = false;
    document.getElementById('pauseLongBreakButton').disabled = true;
    document.getElementById('resetLongBreakButton').disabled = false;
    document.getElementById('startLongBreakButton').textContent = "Continue Long Break";
}

function resetLongBreakTimer() {
    pauseLongBreakTimer();
    longBreakTimeLeft = longBreakDuration * 60;
    document.getElementById('longBreakTime').textContent = formatTime(longBreakTimeLeft);
    document.getElementById('startLongBreakButton').disabled = false;
    document.getElementById('pauseLongBreakButton').disabled = true;
    document.getElementById('resetLongBreakButton').disabled = true;
    document.getElementById('startLongBreakButton').textContent = "Start Long Break";
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
    const modeToggle = document.getElementById('modeToggle');
    if (document.body.classList.contains('dark-mode')) {
        modeToggle.innerText = 'Switch to Light Mode';
    } else {
        modeToggle.innerText = 'Switch to Dark Mode';
    }
}

function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function openRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == document.getElementById('loginModal')) {
        closeLoginModal();
    }
    if (event.target == document.getElementById('registerModal')) {
        closeRegisterModal();
    }
}