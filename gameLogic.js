let currentFloorIndex = 0;
let correctAnswers = 0;
let totalAttempts = 0;
let quickSolves = 0;
let startTime = Date.now();
let hintClickCount = 0; // Track the number of times the hint button is clicked

document.addEventListener('DOMContentLoaded', () => {
    console.log("Document ready. Initializing game...");
    initGame();
    setupEventListeners();
});

function initGame() {
    console.log("Initializing game...");
    resetFloor();
    showRiddle();
}

function resetFloor() {
    console.log("Resetting floor...");
    hintClickCount = 0;
    document.getElementById('riddle-text').textContent = '';
    document.getElementById('riddle-image').src = '';
    document.getElementById('hint-text').textContent = '';
    document.getElementById('hint-image').src = '';
    document.getElementById('hint-image').style.display = 'none';
    document.getElementById('answer-input').value = '';
    document.getElementById('game-messages').textContent = "System Messages";
    document.body.style.backgroundImage = `url('${gameData.floors[currentFloorIndex].background}')`;
    console.log(`Background set for floor ${currentFloorIndex}.`);
}

function showRiddle() {
    const floorData = gameData.floors[currentFloorIndex];
    console.log(`Showing riddle for floor ${currentFloorIndex}.`);
    document.getElementById('riddle-text').textContent = floorData.riddle.text;
    document.getElementById('riddle-image').src = floorData.riddle.image;
    document.getElementById('riddle-image').style.display = 'block';
    document.getElementById('floor-header').textContent = "Floor " + (currentFloorIndex + 1);
}

function setupEventListeners() {
    document.getElementById('submit-answer').addEventListener('click', submitAnswer);
    document.getElementById('show-hint').addEventListener('click', showHint);
    document.getElementById('next-floor').addEventListener('click', nextFloor);
    document.getElementById('back-floor').addEventListener('click', goBackFloor);
    document.getElementById('end-game').addEventListener('click', endGame);
}

function submitAnswer() {
    console.log("Submitting answer...");
    totalAttempts++;
    const userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
    const correctAnswer = gameData.floors[currentFloorIndex].riddle.answer.toLowerCase();
    if (userAnswer === correctAnswer) {
        correctAnswers++;
        document.getElementById('game-messages').textContent = "Correct! The elevator will take you to the next floor.";
        console.log("Answer correct. Moving to next floor.");
        setTimeout(nextFloor, 2000);
    } else {
        document.getElementById('game-messages').textContent = "Incorrect, try again or request a hint.";
        console.log("Answer incorrect.");
    }
}

function nextFloor() {
    console.log("Moving to the next floor...");
    if (currentFloorIndex + 1 < gameData.floors.length) {
        currentFloorIndex++;
        resetFloor();
        showRiddle();
    } else {
        endGame();
    }
}

function goBackFloor() {
    console.log("Going back to the previous floor...");
    if (currentFloorIndex > 0) {
        currentFloorIndex--;
        resetFloor();
        showRiddle();
    } else {
        document.getElementById('game-messages').textContent = "This is the first floor, can't go back!";
        console.log("Already at the first floor. Cannot go back.");
    }
}

function endGame() {
    console.log("Ending game...");
    const endTime = Date.now();
    let finalScore = calculateScore();
    localStorage.setItem('finalScore', finalScore.toFixed(2));
    console.log(`Game ended. Final score: ${finalScore}`);
    window.location.href = 'final.html'; // Redirect to a final score page
}

function calculateScore() {
    let score = (correctAnswers * 10) - (totalAttempts - correctAnswers * 2) + (quickSolves * 5);
    console.log(`Calculating score: ${score}`);
    return Math.max(0, Math.min(100, score));
}

function showHint() {
    console.log("Showing hint...");
    hintClickCount++;
    const hint = gameData.floors[currentFloorIndex].hint;
    document.getElementById('hint-text').textContent = hint.text;
    document.getElementById('hint-image').src = hint.image;
    document.getElementById('hint-image').style.display = 'block';

    // Show the info icon link after the second hint request
    if (hintClickCount >= 2) {
        document.getElementById('game-messages').innerHTML = `Hint used. <a href="${hint.link.url}" target="_blank"><img src="images/info-icon.png" alt="More Info" class="info-icon" style="width: 24px; height: 24px;"></a>`;
        console.log("Info icon displayed on second hint request.");
    }
}
