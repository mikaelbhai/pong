// Initialize the canvas
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

// Set up keyboard controls for left paddle
var upArrowPressed = false;
var downArrowPressed = false;
document.addEventListener("keydown", function(event) {
    if (event.keyCode == 38) {
        upArrowPressed = true;
    }
    if (event.keyCode == 40) {
        downArrowPressed = true;
    }
});
document.addEventListener("keyup", function(event) {
    if (event.keyCode == 38) {
        upArrowPressed = false;
    }
    if (event.keyCode == 40) {
        downArrowPressed = false;
    }
});

// Set up keyboard controls for right paddle
var wPressed = false;
var sPressed = false;
document.addEventListener("keydown", function(event) {
    if (event.keyCode == 87) {
        wPressed = true;
    }
    if (event.keyCode == 83) {
        sPressed = true;
    }
});
document.addEventListener("keyup", function(event) {
    if (event.keyCode == 87) {
        wPressed = false;
    }
    if (event.keyCode == 83) {
        sPressed = false;
    }
});

// Draw the game objects
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    // Draw the paddles
    ctx.fillStyle = "white";
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
    if (ballX < 30 && ballY > leftPaddleY &&


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
