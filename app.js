var canvas = document.getElementById("myCanvas");
var numBalls = 10;
var radius = 10;
var context;
var g = 3;

if (canvas.getContext) {
    context = canvas.getContext("2d");
    init();
}

function init() {
    balls = new Array();
    for (var i = 0; i < numBalls; i++) {
        var ball = new Ball(radius, getColor());
        console.log(ball);
        ball.x = 50;
        ball.y = 75;
        ball.vx = Math.random() * 5;
        ball.vy = (Math.random() - 0.5) * 4;
        ball.draw(context);
        balls.push(ball);
    }
    setInterval(onEachStep, 1000 / 60); // 60 fps
}

function getColor() {
    var colors = ["#588C7E", "#F2E394", "#F2AE72", "#D96459", "#8C4646"];
    let idx = Math.round(Math.random() * colors.length);
    return colors[idx];
}

function onEachStep() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < numBalls; i++) {
        var ball = balls[i];
        ball.vy += g;
        ball.x += ball.vx;
        ball.y += ball.vy;
        if (ball.y > canvas.height - radius) {
            ball.y = canvas.height - radius;
            ball.vy *= -0.8;
        }
        if (ball.x > canvas.width + radius) {
            ball.x = -radius;
        }
        ball.draw(context);
    }
};










