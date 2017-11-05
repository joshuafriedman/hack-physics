var canvas = document.getElementById("myCanvas");
var context;
var g = 0;
var numA = 20, numB = 20, numC = 20;
var numBalls = numA + numB + numC;

if (canvas.getContext) {
    context = canvas.getContext("2d");
    init();
}

function init() {
    balls = new Array();
    for (var i = 0; i < numA; i++) {
        var ballA = new Ball("A");
        console.log(ballA);

        ballA.x = Math.random()*600+10;
        ballA.y = Math.random()*100+10;
        ballA.vx = Math.random() * 5;
        ballA.vy = (Math.random() - 0.5) * 5;
        ballA.draw(context);
        balls.push(ballA);
    }
    for (var j = 0; j < numB; j++){
        var ballB = new Ball("B");
        console.log(ballB);

        ballB.x = Math.random()*600+10;
        ballB.y = Math.random()*100+10;
        ballB.vx = Math.random() * 5;
        ballB.vy = (Math.random() - 0.5) * 5;
        ballB.draw(context);
        balls.push(ballB);
    }
    for (var k = 0; k < numC; k++){
        var ballC = new Ball("C");
        console.log(ballC);

        ballC.x = Math.random()*600+10;
        ballC.y = Math.random()*100+10;
        ballC.vx = Math.random() * 5;
        ballC.vy = (Math.random() - 0.5) * 5;
        ballC.draw(context);
        balls.push(ballC);
    }
    setInterval(onEachStep, 1000 / 60); // 60 fps
}

/*function getColor() {
    var colors = ["#588C7E", "#F2E394", "#F2AE72", "#D96459", "#8C4646"];
    let idx = Math.round(Math.random() * colors.length);
    return colors[idx];
}*/

function onEachStep() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < numBalls; i++) {
        var ball = balls[i];
        ball.vy += g;
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.y >= canvas.height - ball.radius) {
            //ball.y = canvas.height - radius;
            ball.vy *= -1;
        }
        if (ball.x >= canvas.width - ball.radius) {
            //  ball.x = canvas.width + radius;
            ball.vx *= -1;
        }
        if (ball.y <= ball.radius+1){
            ball.vy *= -1;
        }
        if (ball.x <= ball.radius){
            ball.vx *= -1;
        }
        ball.draw(context);
    }
    for(var k=0; k < numBalls-1; k++){
        for(var j=k+1; j<numBalls; j++)
            if(length (balls[k], balls[j]) <= balls[k].radius + balls[j].radius) {
                afterCollision(balls[k], balls[j]);
            }
    }
}

function length(b1, b2){
    var squareDistance = Math.pow((b1.x-b2.x), 2) + Math.pow((b1.y-b2.y), 2);
    return Math.sqrt(squareDistance);
};

function afterCollision(b1, b2) {
    temp_vx = b1.vx;
    b1.vx = b2.vx;
    b2.vx = temp_vx;
    temp_vy = b1.vy;
    b1.vy = b2.vy;
    b2.vy = temp_vy;

    var factor = 0.5;
    b1.x = b1.x + b1.vx * factor;
    b1.y = b1.y + b1.vy * factor;
    b2.x = b2.x + b2.vx * factor;
    b2.y = b2.y + b2.vy * factor;

    if (ball.y >= canvas.height - ball.radius) {
        //ball.y = canvas.height - radius;
        ball.vy *= -1;
    }
    if (ball.x >= canvas.width - ball.radius) {
        //  ball.x = canvas.width + radius;
        ball.vx *= -1;
    }
    if (ball.y <= ball.radius+1){
        ball.vy *= -1;
    }
    if (ball.x <= ball.radius){
        ball.vx *= -1;
    }
    b1.draw(context);
    b2.draw(context);

}





























