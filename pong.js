// Initialize the canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

<div class="score">
    <span id="player-score">0</span> - <span id="bot-score">0</span>
</div>


// Set initial ball position and velocity
var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballSpeedX = 5;
var ballSpeedY = 5;

var LeftPoints = "0"
var RightPoints = "0"
var PlayerPoints = "0"
var BotPoints = "0"

// Set initial paddle positions
var leftPaddleY = canvas.height/2 - 50;
var rightPaddleY = canvas.height/2 - 50;

// Set up keyboard controls for both paddles
var leftPaddleUp = false;
var leftPaddleDown = false;
var rightPaddleUp = false;
var rightPaddleDown = false;

// initialize points for each player
var LeftPoints = 0;
var RightPoints = 0;
var PlayerPoints = 0;
var BotPoints = 0;

// assume single player mode by default
var isSinglePlayerMode = true;

// function to update points based on who scored
function updatePoints(player) {
  if (player === "left") {
    if (isSinglePlayerMode) {
      BotPoints += 1;
    } else {
      RightPoints += 1;
    }
  } else if (player === "right") {
    if (isSinglePlayerMode) {
      PlayerPoints += 1;
    } else {
      LeftPoints += 1;
    }
  }
}

// example usage: player on the left scored in single player mode
updatePoints("left");

// example usage: player on the right scored in two player mode
isSinglePlayerMode = false;
updatePoints("right");

canvas.addEventListener("click", function(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    if (singlePlayerBtn.style.display !== "none" && x >= singlePlayerBtn.offsetLeft && x <= singlePlayerBtn.offsetLeft + singlePlayerBtn.offsetWidth &&
        y >= singlePlayerBtn.offsetTop && y <= singlePlayerBtn.offsetTop + singlePlayerBtn.offsetHeight) {
        gameMode = "singlePlayer";
        singlePlayer = true;
        singlePlayerBtn.style.display = "none";
        twoPlayerBtn.style.display = "none";
        canvas.style.display = "block";
    } else if (twoPlayerBtn.style.display !== "none" && x >= twoPlayerBtn.offsetLeft && x <= twoPlayerBtn.offsetLeft + twoPlayerBtn.offsetWidth &&
        y >= twoPlayerBtn.offsetTop && y <= twoPlayerBtn.offsetTop + twoPlayerBtn.offsetHeight) {
        gameMode = "twoPlayer";
        singlePlayerBtn.style.display = "none";
        twoPlayerBtn.style.display = "none";
        canvas.style.display = "block";
    }
});

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 87) { // W key
        leftPaddleUp = true;
    } else if (event.keyCode === 83) { // S key
        leftPaddleDown = true;
    } else if (event.keyCode === 38) { // Up arrow key
        rightPaddleUp = true;
    } else if (event.keyCode === 40) { // Down arrow key
        rightPaddleDown = true;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 87) { // W key
        leftPaddleUp = false;
    } else if (event.keyCode === 83) { // S key
        leftPaddleDown = false;
    } else if (event.keyCode === 38) { // Up arrow key
        rightPaddleUp = false;
    } else if (event.keyCode === 40) { // Down arrow key
        rightPaddleDown = false;
    }
});

// Set up game modes
var gameMode = "";
var singlePlayer = false; // Declare and initialize singlePlayer variable
var singlePlayerBtn = document.getElementById("single-player-btn");
var twoPlayerBtn = document.getElementById("two-player-btn");

singlePlayerBtn.addEventListener("click", function() {
    gameMode = "singlePlayer";
    singlePlayer = true; // Set singlePlayer to true in single player mode
    singlePlayerBtn.style.display = "none";
    twoPlayerBtn.style.display = "none";
    canvas.style.display = "block";
});

twoPlayerBtn.addEventListener("click", function() {
    gameMode = "twoPlayer";
    singlePlayerBtn.style.display = "none";
    twoPlayerBtn.style.display = "none";
    canvas.style.display = "block";
});

// Draw the game objects
function draw() {
    // Clear the canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the ball
    ctx.fillStyle = "white";
    ctx.fillRect(ballX-5, ballY-5, 10, 10);

    // Draw the paddles
    ctx.fillRect(10, leftPaddleY, 10, 100);
    ctx.fillRect(canvas.width-20, rightPaddleY, 10, 100);

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce the ball off the top and bottom walls
    if (ballY < 10 || ballY > canvas.height-10) {
        ballSpeedY = -ballSpeedY;
    }
    // Check if the ball collides with the left paddle
    if (ballX < 30 && ballY > leftPaddleY && ballY < leftPaddleY + 100) {
        ballSpeedX = -ballSpeedX;
    }

    // Check if the ball collides with the right paddle
    if (ballX > canvas.width-30 && ballY > rightPaddleY && ballY < rightPaddleY + 100) {
        ballSpeedX = -ballSpeedX;
    }

    // Check if the ball goes out of bounds
    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width/2;
        ballY = canvas.height/2;
        ballSpeedX = -ballSpeedX;
    }
// Move the right paddle towards the ball (single player mode)
if (gameMode === "singlePlayer") {
    if (ballY < rightPaddleY + 50 && rightPaddleY > 0) {
        rightPaddleY -= 5;
    }
    if (ballY > rightPaddleY + 50 && rightPaddleY < canvas.height - 100) {
        rightPaddleY += 5;
    }
} // <-- add this closing curly brace

   // Move both paddles (two player mode) and move left paddle (single player mode)
if (leftPaddleUp && leftPaddleY > 0) {
    leftPaddleY -= 5;
}
if (leftPaddleDown && leftPaddleY < canvas.height - 100) {
    leftPaddleY += 5;
}
if (rightPaddleUp && rightPaddleY > 0) {
    rightPaddleY -= 5;
}
if (rightPaddleDown && rightPaddleY < canvas.height - 100) {
    rightPaddleY += 5;
}
if (!rightPaddleUp && !rightPaddleDown && gameMode === "singlePlayer") {
    // Move left paddle towards the ball (single player mode)
var paddleSpeed = 3; // set the paddle speed
if (leftPaddleUp && leftPaddleY > 0) {
    leftPaddleY -= paddleSpeed;
}
if (leftPaddleDown && leftPaddleY < canvas.height - 100) {
    leftPaddleY += paddleSpeed;
}
}
}

// Update the game every 10 milliseconds
setInterval(draw, 10);
