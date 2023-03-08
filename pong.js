// Get the canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set up the game variables
var ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    dx: 5,
    dy: 5,
    radius: 10
};
var player1 = {
    x: 10,
    y: canvas.height/2 - 50,
    width: 10,
    height: 100,
    score: 0
};
var player2 = {
    x: canvas.width - 20,
    y: canvas.height/2 - 50,
    width: 10,
    height: 100,
    score: 0
};
var keys = {};

// Add event listeners for key presses
document.addEventListener("keydown", function(event) {
    keys[event.keyCode] = true;
});
document.addEventListener("keyup", function(event) {
    delete keys[event.keyCode];
});

// Set up the game loop
function gameLoop() {
    // Move the players
    if (keys[87]) {
        player1.y -= 5;
    }
    if (keys[83]) {
        player1.y += 5;
    }
    if (keys[38]) {
        player2.y -= 5;
    }
    if (keys[40]) {
        player2.y += 5;
    }

    // Move the ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Check if the ball hits the top or bottom of the screen
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    // Check if the ball hits a player
    if (ball.x - ball.radius < player1.x + player1.width && ball.y > player1.y && ball.y < player1.y + player1.height) {
        ball.dx = -ball.dx;
    } else if (ball.x + ball.radius > player2.x && ball.y > player2.y && ball.y < player2.y + player2.height) {
        ball.dx = -ball.dx;
    }

    // Check if a player scores
    if (ball.x - ball.radius < 0) {
        player2.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        player1.score++;
        resetBall();
    }

    // Draw the game objects
    drawBackground();
    drawBall();
    drawPlayers();
    drawScores();

    // Request another frame of animation
    window.requestAnimationFrame(gameLoop);
}

// Reset the ball to the center of the screen
function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.dx = -ball.dx;
}

// Draw the background
function drawBackground() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,
