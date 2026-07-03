// ==========================
// VARIABLES
// ==========================

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lapCount = 1;

// Display Elements
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");

// Buttons
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

// Lap List
const lapList = document.getElementById("lapList");

// ==========================
// FORMAT TIME
// ==========================

function formatTime(time) {

    let hrs = Math.floor(time / 3600000);
    let mins = Math.floor((time % 3600000) / 60000);
    let secs = Math.floor((time % 60000) / 1000);
    let millis = time % 1000;

    hours.textContent = String(hrs).padStart(2, "0");
    minutes.textContent = String(mins).padStart(2, "0");
    seconds.textContent = String(secs).padStart(2, "0");
    milliseconds.textContent = String(millis).padStart(3, "0");
}

// ==========================
// UPDATE STOPWATCH
// ==========================

function updateTime() {

    elapsedTime = Date.now() - startTime;

    formatTime(elapsedTime);

}

// ==========================
// START
// ==========================

startBtn.addEventListener("click", () => {

    if (running) return;

    running = true;

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(updateTime, 10);

});

// ==========================
// PAUSE
// ==========================

pauseBtn.addEventListener("click", () => {

    if (!running) return;

    running = false;

    clearInterval(timerInterval);

});

// ==========================
// RESET
// ==========================

resetBtn.addEventListener("click", () => {

    running = false;

    clearInterval(timerInterval);

    elapsedTime = 0;

    lapCount = 1;

    formatTime(0);

    lapList.innerHTML = "";

});

// ==========================
// LAP
// ==========================

lapBtn.addEventListener("click", () => {

    if (!running) return;

    const li = document.createElement("li");

    li.innerHTML = `
        <span>Lap ${lapCount}</span>
        <span>
            ${hours.textContent}:${minutes.textContent}:${seconds.textContent}.${milliseconds.textContent}
        </span>
    `;

    lapList.appendChild(li);

    lapCount++;

});

// ==========================
// INITIAL DISPLAY
// ==========================

formatTime(0);