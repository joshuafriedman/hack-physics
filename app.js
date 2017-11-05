var canvas = document.getElementById("myCanvas");
var radius = 5;
var context;
var g = 0;
var webSocket;
var balls = [];
var timer;
var myHistory = [];


// TODO: Websocket Location should be provided as a parameter
// TODO: Resolution of the energy should be changed with a slider

if (canvas.getContext) {
    context = canvas.getContext("2d");
    webSocket = new WebSocket("ws://raspberrypi.local:1880/getsocket");
    setInterval(onEachStep, 1000 / 70); // 60 fps    
    webSocket.onmessage = function (event) {
        var timeData = { time: (new Date()).getTime(), data: event.data };
        myHistory.push(timeData);
    }
}


function getBall(scale) {
    var rate = Math.round(Number(scale / 200));
    console.log(rate);
    var ball = new Ball(radius, getColor());
    console.log(ball);
    ball.x = Math.random() * 600 + 10;
    ball.y = Math.random() * 100 + 10;
    ball.vx = Math.random() * rate;
    ball.vy = (Math.random() - 0.5) * rate;
    ball.draw(context);
    return ball;
}

function getColor() {
    var colors = ["#588C7E", "#F2E394", "#F2AE72", "#D96459", "#8C4646"];
    let idx = Math.round(Math.random() * colors.length);
    return colors[idx];
}

function onEachStep() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (isNewBall() && myHistory != 0) {
        // Maybe do average here?
        let average = getAverageOfHistory(myHistory);
        console.log("Average:"+average);
        balls.push(getBall(average));
        myHistory = [];
    }

    if (balls.length !== 0) {
        for (var i = 0; i < balls.length; i++) {
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
            if (ball.y <= radius + 1) {
                ball.vy *= -1;
            }
            if (ball.x <= radius) {
                ball.vx *= -1;
            }
            ball.draw(context);
        }
        for (var k = 0; k < balls.length - 1; k++) {
            for (var j = k + 1; j < balls.length; j++)
                if (length(balls[k], balls[j]) <= 2 * radius) {
                    afterCollision(balls[k], balls[j]);
                }
        }
    }
}

function getAverageOfHistory(myHistory) {
    var sum = 0;
    var sampleSize = Math.round(myHistory.length / 3);
    if(sampleSize == 0){
        return myHistory[0].data;
    }
    var randomIdx = [];

    for (let i = 0; i < sampleSize; i++) {
        let position = Math.round(Math.random() * myHistory.length);
        console.log("Position:" + position);
        randomIdx.push(position);
    }

    for (let n of randomIdx) {
        sum += Number(myHistory[n].data);
    }
    return sum / sampleSize;
}

function isNewBall() {
    if (myHistory.length !== 0) {
        var lastTime = myHistory[myHistory.length - 1].time;
        var timePassed = new Date().getTime() - lastTime;
        return timePassed > 200;
    }
}

function length(b1, b2) {
    var squareDistance = Math.pow((b1.x - b2.x), 2) + Math.pow((b1.y - b2.y), 2);
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
    /*b1.vx *= -force;
    b1.vy *= -force;
    b2.vx *= -force;
    b2.vy *= -force;*/
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





















