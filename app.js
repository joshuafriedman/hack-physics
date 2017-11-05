var canvas = document.getElementById("myCanvas");
var context;

var g = 0;
var numA = 20, numB = 20, numC = 20;
var numBalls = 0;

var timeInterval = 1000/40;
var timePassed = 0;

if (canvas.getContext) {
    context = canvas.getContext("2d");
    init();
}

function startSimulation(){
    var options = {};
    options.benzene = {};
    options.ditch ={};
    options.acetone = {};
    options.benzene.particles = document.getElementById("benzene-particles").value;
    options.benzene.size = document.getElementById("benzene-size").value;
    options.benzene.mass = document.getElementById("benzene-mass").value;
    
    options.ditch.particles = document.getElementById("dich-particles").value;
    options.ditch.size = document.getElementById("dich-size").value;
    options.ditch.mass = document.getElementById("dich-mass").value;

    options.acetone.particles = document.getElementById("acetone-particles").value;
    options.acetone.size = document.getElementById("acetone-size").value;
    options.acetone.mass = document.getElementById("acetone-mass").value;
    console.log(options);    
}


function init() {
    balls = new Array();
    var numBalls = numA + numB + numC;
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
    setInterval(onEachStep, timeInterval); // 60 fps
}
/*function getColor() {
    var colors = ["#588C7E", "#F2E394", "#F2AE72", "#D96459", "#8C4646"];
    let idx = Math.round(Math.random() * colors.length);
    return colors[idx];
}*/

function onEachStep() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    timePassed += timeInterval;
     if (Math.round(timePassed % 60) == 0) {
        for (var counter = 0; counter < 2; counter++) {
            var ball = new Ball("inert");
            numBalls++;
            console.log(ball);
            ball.color = "#000000";
            ball.radius = 10;
            ball.x = ball.radius+1;
            ball.y = Math.random() * 100 + 10;
            ball.vx = Math.random() * 5;
            ball.vy = Math.random()  * 5;
            ball.draw(context);
            balls.push(ball);
        }
    }
    for (var i = 0; i < balls.length; i++) {
        var ball = balls[i];
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
    for(var k=0; k < balls.length-1; k++){
        for(var j=k+1; j<balls.length; j++)
            if(length (balls[k], balls[j]) <= (balls[k].radius + balls[j].radius)) {
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

    if (b1.y >= canvas.height - b1.radius)
        b1.vy *= -1;
    if (b2.y >= canvas.height - b2.radius)
        b2.vy *= -1;
    if (b1.x >= canvas.width - b1.radius)
        b1.vx *= -1;
    if (b2.x >= canvas.width - b2.radius)
        b2.vx *= -1;
    if (b1.y <= b1.radius+1)
        b1.vy *= -1;
    if (b2.y <= b2.radius+1)
        b2.vy *= -1;
    if (b1.x <= b1.radius)
        b1.vx *= -1;
    if (b2.x <= b2.radius)
        b2.vx *= -1;
    b1.draw(context);
    b2.draw(context);

}
