// Initialize the canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set initial canvas dimensions and position
canvas.width = 800;
canvas.height = 600;
canvas.style.margin = "auto";
canvas.style.display = "block";

// Set initial ball position and velocity
var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballSpeedX = 5;
var ballSpeedY = 5;
var ballSize = 10;

// Set initial paddle positions and dimensions
var paddleWidth = 10;
var paddleHeight = 100;
var paddleSpeed = 10;
var leftPaddleX = 0;
var leftPaddleY = canvas.height/2 - paddleHeight/2;
var rightPaddleX = canvas.width - paddleWidth;
var rightPaddleY = canvas.height/2 - paddleHeight/2;

// Set game mode to single player by default
var singlePlayer = true;

// Set up keyboard controls for left and right paddles
document.addEventListener("keydown", function(event) {
    if (singlePlayer) {
        // Single player controls (left paddle)
        if (event.keyCode == 87) { // W key
            leftPaddleY -= paddleSpeed;
        }
        if (event.keyCode == 83) { // S key
            leftPaddleY += paddleSpeed;
        }
    } else {
        // Two player controls (left and right paddles)
        if (event.keyCode == 87) { // W key
            leftPaddleY -= paddleSpeed;
        }
        if (event.keyCode == 83) { // S key
            leftPaddleY += paddleSpeed;
        }
        if (event.keyCode == 38) { // Up arrow
            rightPaddleY -= paddleSpeed;
        }
        if (event.keyCode == 40) { // Down arrow
            rightPaddleY += paddleSpeed;
        }
    }
});

// Draw the game objects
function draw() {
    // Clear the canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the ball
    ctx.fillStyle = "white";
    ctx.fillRect(ballX - ballSize/2, ballY - ballSize/2, ballSize, ballSize);

    // Draw the paddles
    ctx.fillStyle = "white";
    ctx.fillRect(leftPaddleX, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(rightPaddleX, rightPaddleY, paddleWidth, paddleHeight);

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce the ball off the top and bottom walls
    if (ballY < ballSize/2 || ballY > canvas.height - ballSize/2) {
        ballSpeedY = -ballSpeedY;
    }

    // Check if the ball collides with the left paddle
    if (ballX < ballSize/2 + paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Check if the ball collides with the right paddle
    if (ballX > canvas.width - ballSize/2 - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Check if the ball goes out of bounds
    if (ballX <
