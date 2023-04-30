// Initialize the canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set initial ball position and velocity
var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballSpeedX = 5;
var ballSpeedY = 5;

// Set initial paddle positions
var leftPaddleY = canvas.height/2 - 50;
var rightPaddleY = canvas.height/2 - 50;

// Set up keyboard controls for both paddles
var leftPaddleUp = false;
var leftPaddleDown = false;
var rightPaddleUp = false;
var rightPaddleDown = false;

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
var singlePlayerBtn = document.getElementById("single-player-btn");
var twoPlayerBtn = document.getElementById("two-player-btn");

singlePlayerBtn.addEventListener("click", function() {
    gameMode = "singlePlayer";
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
    }

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
if (!rightPaddleUp && !rightPaddleDown && singlePlayer) {
    // Move left paddle towards the ball (single player mode)
    if (ballY < leftPaddleY + 50 && leftPaddleY > 0) {
        leftPaddleY -= 5;
    }
    if (ballY > leftPaddleY + 50 && leftPaddleY < canvas.height - 100) {
        leftPaddleY += 5;
    }
}

// Update the game every 10 milliseconds
setInterval(draw, 10);
