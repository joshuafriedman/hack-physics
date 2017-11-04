var canvas = document.getElementById("myCanvas");
var numBalls = 40;
var radius = 5;
var context;
var g = 0;

if (canvas.getContext) {
    context = canvas.getContext("2d");
    init();
}

function init() {
    balls = new Array();
    for (var i = 0; i < numBalls; i++) {
        var ball = new Ball(radius, getColor());
        console.log(ball);
        ball.x = Math.random()*600+10;
        ball.y = Math.random()*100+10;
        ball.vx = Math.random() * 5;
        ball.vy = (Math.random() - 0.5) * 5;
        ball.draw(context);
        balls.push(ball);
    }
    setInterval(onEachStep, 1000 / 70); // 60 fps
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

        if (ball.y >= canvas.height - radius) {
            //ball.y = canvas.height - radius;
            ball.vy *= -1;
        }
        if (ball.x >= canvas.width - radius) {
          //  ball.x = canvas.width + radius;
            ball.vx *= -1;
        }
        if (ball.y <= radius+1){
            ball.vy *= -1;
        }
        if (ball.x <= radius){
            ball.vx *= -1;
        }
        ball.draw(context);
    }
    for(var k=0; k < numBalls-1; k++){
        for(var j=k+1; j<numBalls; j++)
            if(length (balls[k], balls[j]) <= 2*radius) {
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
    
    /*if (b1.y > canvas.height - radius) {
        b1.y = canvas.height - radius;
        b1.vy *= -0.7;
    }
    if (b1.x > canvas.width + radius) {
        b1.x = -radius;
    }
 

    if (b2.y > canvas.height - radius) {
        b2.y = canvas.height - radius;
        b2.vy *= -0.7;
    }
    if (b2.x > canvas.width + radius) {
        b2.x = -radius;
    }*/
    if (ball.y >= canvas.height - radius) {
        //ball.y = canvas.height - radius;
        ball.vy *= -1;
    }
    if (ball.x >= canvas.width - radius) {
        //  ball.x = canvas.width + radius;
        ball.vx *= -1;
    }
    if (ball.y <= radius+1){
        ball.vy *= -1;
    }
    if (ball.x <= radius){
        ball.vx *= -1;
    }
    
    b1.draw(context);
    b2.draw(context);

}





















