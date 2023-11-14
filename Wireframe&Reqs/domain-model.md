# Snake Game Domain Model


## 1. Snake Entity:

- **Properties:**
  - `x` (number): X-coordinate of the snake segment.
  - `y` (number): Y-coordinate of the snake segment.

## 2. Food Entity:

- **Properties:**
  - `x` (number): X-coordinate of the food.
  - `y` (number): Y-coordinate of the food.

## 3. Game Entity:

- **Properties:**
  - `canvas` (HTMLCanvasElement): Reference to the game canvas.
  - `ctx` (CanvasRenderingContext2D): Context for drawing on the canvas.
  - `boxSize` (number): Size of each box in the grid.
  - `canvasSize` (number): Size of the canvas.
  - `startButton` (HTMLButtonElement): Reference to the start button.
  - `resetButton` (HTMLButtonElement): Reference to the reset button.
  - `nIntervId` (number): Interval ID for the game loop.
  - `snake` (array): Array representing the snake with each segment having `x` and `y` properties.
  - `food` (object): Object representing the food with `x` and `y` properties.
  - `direction` (string): Direction in which the snake is moving.

## 4. Functions/Methods:

- `draw()`: Function to draw the snake and food on the canvas.
- `generateFood()`: Function to generate random coordinates for the food.
- `update()`: Function to update the game state, including snake movement and food collision.
- `resetGame()`: Function to reset the game state.
- `startGame()`: Function to start the game loop.
- `stopGame()`: Function to stop the game loop.
- Event listener for arrow key controls.

## Relationships:

- The `draw()` function uses the `snake` and `food` entities to draw them on the canvas.
- The `update()` function manipulates the `snake` and `food` entities based on the game logic.
- The `resetGame()` function resets the state of the `snake` and `food` entities.
- The `startGame()` and `stopGame()` functions interact with the `nIntervId` entity to control the game loop.


