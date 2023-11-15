/* GLOBAL VARS */

// Sound files and Variables
const gameOverSound = new Audio("game-over.mp3");
const gameStartSound = new Audio("game-start.mp3");
const snakeTurnSound = new Audio("snake-turn.mp3");
const snakeEatAppleSound = new Audio("snake-eat-apple.mp3");
gameStartSound.volume = 0.35;
//

const cl = (input) => {console.log(input)};
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let currentScore = 0;
let highScore = localStorage.getItem('highScore') || 0;

const boxSize = 10;
const canvasSize = 600;

const startButton = document.getElementById('start').addEventListener('click', startGame);
const resetButton = document.getElementById('reset').addEventListener('click', stopGame);

let nIntervId;
let snake = [{ x: 10, y: 10 }];
let food = { x: 0, y: 0 };
let direction = "right";

/* FUNCTION TO DRAW FOOD AND SNAKE */
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw the snake
    ctx.fillStyle = "#00FF00";
    for (let i = 0; i < snake.length; i++) {
        const isHead = i === 0;
        ctx.fillStyle = isHead ? "#00FF00" : "#008000"; //Head is green, body is dark green
        ctx.beginPath();
        ctx.arc((snake[i].x + 0.5) * boxSize, (snake[i].y + 0.5) * boxSize, boxSize / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        //ctx.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
    }

    // Draw the food
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc((food.x + 0.5) * boxSize, (food.y + 0.5) * boxSize, boxSize / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvasSize / boxSize));
    food.y = Math.floor(Math.random() * (canvasSize / boxSize));
   
    if (currentScore > highScore){
        highScore = currentScore;
        localStorage.setItem('highScore', highScore);
        updateHighScore();
    }
    

}


/* FUNCTION TO UPDATE SNAKE MOVEMENT AND UPDATE FOOD */
function update() {
    // Move the snake
    let newHead = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case "up":
            newHead.y--;
            updateScore();
            break;
        case "down":
            newHead.y++;
            updateScore();
            break;
        case "left":
            newHead.x--;
            updateScore();
            break;
        case "right":
            newHead.x++;
            updateScore();
            break;
    }

    // Check for collision with food
    if (newHead.x === food.x && newHead.y === food.y) {
        snake.unshift({ x: food.x, y: food.y });
        generateFood();
        // Play eating sound
        snakeEatAppleSound.play();
        currentScore += 5;
    } else {
        // Remove the tail if no collision with food
        snake.pop();
    }

    // Check for collision with walls
    if (newHead.x < 0 || newHead.x * boxSize >= canvasSize || newHead.y < 0 || newHead.y * boxSize >= canvasSize) {
        // Game over
        // Game over Sound effect
        gameStartSound.pause();
        gameStartSound.currentTime = 0;
        gameOverSound.play();
        //
        alert(`Game Over! Your score ${currentScore}`);
        resetGame();
        currentScore = 0;
        return;
    }

    // Check for collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            // Game over
            // Game over Sound effect
            gameStartSound.pause();
            gameStartSound.currentTime = 0;
            gameOverSound.play();
            //
            alert(`Game Over! Your score ${currentScore}`);
            resetGame();
            currentScore = 0
            return;
        }
    }

    // Add the new head to the snake
    snake.unshift(newHead);

    // Draw the updated game state
    draw();
}

/* PAUSE & RESET GAME */
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    generateFood();
    direction = "right";
    updateHighScore();
    // Reset game music after death
   // gameStartSound.pause();
   // gameStartSound.currentTime = 0;
   // gameStartSound.play();
}
function initHighScore() {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
        highScore = parseInt(storedHighScore);
        updateHighScore();
                
    }
}

// Generate initial food and start the game loop
initHighScore();
// Generate initial food and start the game loop
generateFood();

function startGame() {
  if (!nIntervId) {
    nIntervId = setInterval(update, 100);
    // Play Start Game Sound
    gameStartSound.currentTime = 0;
    gameStartSound.play();
  }
}

function stopGame() {
  clearInterval(nIntervId);
  // Stop playing background music
  gameStartSound.pause();
  
  // release our intervalID from the variable
  nIntervId = null;
  resetGame();
}


// HANDLE ARROW KEY CONTROLS
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            direction = "up";
            // Play snake turn sound
            snakeTurnSound.play();
            break;
        case "ArrowDown":
            direction = "down";
            // Play snake turn sound
            snakeTurnSound.play();
            break;
        case "ArrowLeft":
            direction = "left";
            // Play snake turn sound
            snakeTurnSound.play();
            break;
        case "ArrowRight":
            direction = "right";
            // Play snake turn sound
            snakeTurnSound.play();
            break;
    }
});

function updateHighScore(){
    document.getElementById('highScore').textContent = `High Score  ${highScore}`;
}

function updateScore(){
    document.getElementById('currentScore').textContent = `Score: ${currentScore}`;
}
//Toggle Tutorial Function for Game HTML
function toggleTutorial() {
    let tutorialContainer = document.getElementById("tutorialContainer");
    let button = document.querySelector(".toggle-tutorial");
  
    if (tutorialContainer.style.display === "none") {
      tutorialContainer.style.display = "block";
      button.innerText = "Hide Tutorial";
    } else {
      tutorialContainer.style.display = "none";
      button.innerText = "How To Play";
    }
  }




 

/* TEST METHODS/FUNCTIONS */
// Add a click event listener to the canvas
//canvas.addEventListener("click", function (e) {
    // Get the coordinates of the click relative to the canvas
    //var x = e.clientX - canvas.getBoundingClientRect().left;
    //var y = e.clientY - canvas.getBoundingClientRect().top;
    // Log the coordinates to the console
    //cl(`Clicked at coordinates: X=${x}, Y=${y}`);
//});
