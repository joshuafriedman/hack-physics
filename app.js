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
       for(var k=0; k < numBalls; k++){
        for(var j=1; j<numBalls; j++)
        if(Math.abs(balls[k].x - balls[j].x) < 2*radius){
            afterCollision(balls[k], balls[j], 1);
        }
    }
}

function afterCollision(b1, b2, force) {
    b1.vx *= -force;
    b1.vy *= -force;
    b2.vx *= -force;
    b2.vy *= -force;
    if (b1.y > canvas.height - radius) {
        b1.y = canvas.height - radius;
        b1.vy *= -0.7;
    }
    if (b1.x > canvas.width + radius) {
        b1.x = -radius;
    }
    b1.draw(context);

    if (b2.y > canvas.height - radius) {
        b2.y = canvas.height - radius;
        b2.vy *= -0.7;
    }
    if (b2.x > canvas.width + radius) {
        b2.x = -radius;
    }
    b2.draw(context);

}










