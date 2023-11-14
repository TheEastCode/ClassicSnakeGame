/* GLOBAL VARS */
const cl = (input) => {console.log(input)};
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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
}

/* FUNCTION TO UPDATE SNAKE MOVEMENT AND UPDATE FOOD */
function update() {
    // Move the snake
    let newHead = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case "up":
            newHead.y--;
            break;
        case "down":
            newHead.y++;
            break;
        case "left":
            newHead.x--;
            break;
        case "right":
            newHead.x++;
            break;
    }

    // Check for collision with food
    if (newHead.x === food.x && newHead.y === food.y) {
        snake.unshift({ x: food.x, y: food.y });
        generateFood();
    } else {
        // Remove the tail if no collision with food
        snake.pop();
    }

    // Check for collision with walls
    if (newHead.x < 0 || newHead.x * boxSize >= canvasSize || newHead.y < 0 || newHead.y * boxSize >= canvasSize) {
        // Game over
        alert("Game Over!");
        resetGame();
        return;
    }

    // Check for collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            // Game over
            alert("Game Over!");
            resetGame();
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
}

// Generate initial food and start the game loop
generateFood();

function startGame() {
  if (!nIntervId) {
    nIntervId = setInterval(update, 100);
  }
}

function stopGame() {
  clearInterval(nIntervId);
  // release our intervalID from the variable
  nIntervId = null;
  resetGame();
}


// HANDLE ARROW KEY CONTROLS
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowDown":
            direction = "down";
            break;
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowRight":
            direction = "right";
            break;
    }
});

/* TEST METHODS/FUNCTIONS */
// Add a click event listener to the canvas
//canvas.addEventListener("click", function (e) {
    // Get the coordinates of the click relative to the canvas
    //var x = e.clientX - canvas.getBoundingClientRect().left;
    //var y = e.clientY - canvas.getBoundingClientRect().top;
    // Log the coordinates to the console
    //cl(`Clicked at coordinates: X=${x}, Y=${y}`);
//});