// Initialize the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set initial ball position and velocity
var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballSpeedX = 2;
var ballSpeedY = 2;

// Set initial paddle positions
var leftPaddleY = canvas.height/2 - 50;
var rightPaddleY = canvas.height/2 - 50;

// Set up keyboard controls for left paddle
var leftPaddleMovingUp = false;
var leftPaddleMovingDown = false;

document.addEventListener("keydown", function(event) {
    if (event.keyCode == 38) {
        leftPaddleMovingUp = true;
    }
    if (event.keyCode == 40) {
        leftPaddleMovingDown = true;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.keyCode == 38) {
        leftPaddleMovingUp = false;
    }
    if (event.keyCode == 40) {
        leftPaddleMovingDown = false;
    }
});

// Move the left paddle
function moveLeftPaddle() {
    if (leftPaddleMovingUp) {
        leftPaddleY -= 10;
    }
    if (leftPaddleMovingDown) {
        leftPaddleY += 10;
    }
}

// Draw the game objects
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball and paddles
    // ...

    // Move the left paddle
    moveLeftPaddle();

    // ...
}


// Draw the game objects
function draw() {
    // Clear the canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, 5, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    // Draw the paddles
    ctx.fillStyle = "white";
    ctx.fillRect(10, leftPaddleY, 5, 50);
    ctx.fillRect(canvas.width-15, rightPaddleY, 5, 50);

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce the ball off the top and bottom walls
    if (ballY < 5 || ballY > canvas.height-5) {
        ballSpeedY = -ballSpeedY;
    }

    // Check if the ball collides with the left paddle
    if (ballX < 15 && ballY > leftPaddleY && ballY < leftPaddleY + 50) {
        ballSpeedX = -ballSpeedX;
    }

    // Check if the ball collides with the right paddle
    if (ballX > canvas.width-15 && ballY > rightPaddleY && ballY < rightPaddleY + 50) {
        ballSpeedX = -ballSpeedX;
    }

    // Check if the ball goes out of bounds
    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width/2;
        ballY = canvas.height/2;
        ballSpeedX = -ballSpeedX;
    }

    // Move the right paddle towards the ball
    if (ballY < rightPaddleY + 25) {
        rightPaddleY -= 2;
    }
    if (ballY > rightPaddleY + 25) {
        rightPaddleY += 2;
    }
}

// Update the game every 10 milliseconds
setInterval(draw, 10);
