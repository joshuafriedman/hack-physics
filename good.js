var canvas = document.getElementById("myCanvas");
var context;

var g = 0;
var numA = 1, numB = 0, numC = 1;
var numBalls = 0;

var timeInterval = 1000/500;
var timePassed = 0;
var vxSpeed =5+ Math.random()*5;
var stopInit;
var ifFirstTime = true;
var numLoops = 0;
var hgt = 110;
var gap = 120;

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

    for (var m = 0; m < 10; m++){
        var ball = new Ball ("inert");
        console.log(ball);
        ball.vx = vxSpeed;
        ball.x = ball.radius+1;
        ball.vy = Math.random()*5;
        ball.y = ball.radius+ (Math.random()*(hgt-2*ball.radius));
        ball.draw(context);
        balls.push(ball);
    }
    numBalls += 2;
    setInterval(onEachStep, timeInterval); // 60 fps
}

function onEachStep() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    timePassed += timeInterval;
    if (timePassed == 1000){
        numBalls += (numA + numB + numC);

        for (var i = 0; i < numA; i++) {
            var ballA = new Ball("A");
            console.log(ballA);
            ballA.vx = 0;
            ballA.x = 40 + 3*ballA.radius*Math.random();
            ballA.y = ballA.radius+ (Math.random()*(hgt-2*ballA.radius));
            ballA.vy = (Math.random() - 0.5) * 5;
            ballA.draw(context);
            balls.push(ballA);
        }
        for (var j = 0; j < numB; j++){
            var ballB = new Ball("B");
            console.log(ballB);
            ballB.vx = 0*vxSpeed;
            ballB.x = 40 + 3*ballB.radius*Math.random();
            //allB.x = Math.random()*600+10;
            ballB.y = ballB.radius+ (Math.random()*(hgt-2*ballB.radius));
            //  ballB.vx = Math.random() * 5;
            ballB.vy = (Math.random() - 0.5) * 5;
            ballB.draw(context);
            balls.push(ballB);
        }
        for (var k = 0; k < numC; k++){
            var ballC = new Ball("C");
            console.log(ballC);
            ballC.vx = 1;
            ballC.x = 40 + 3*ballC.radius*Math.random();
            // ballC.x = Math.random()*600+10;
            ballC.y = ballC.radius+ (Math.random()*(hgt-2*ballC.radius));
            // ballC.vx = Math.random() * 5;
            ballC.vy = (Math.random() - 0.5) * 5;
            ballC.draw(context);
            balls.push(ballC);
        }
    }
    if (timePassed % 10 == 0) {
        for (var counter = 0; counter < 3; counter++) {
            var ball = new Ball("inert");
            numBalls++;
            console.log(ball);
            ball.color = "#000000";
            ball.radius = 2;
            ball.x = ball.radius+1;
            ball.y = ball.radius + Math.random() * (hgt-2*ball.radius);
            ball.vx = 80 + Math.random()*15 ;
            ball.vy = Math.random()  * 5;
            ball.draw(context);
            balls.push(ball);
        }
    }
    for (var i = 0; i < balls.length; i++) {
        var ball = balls[i];
        ball.x += 0.05*ball.vx;
        ball.y += 0.05*ball.vy;

        if (ball.y >= hgt - ball.radius && ball.y < hgt +5 && ball.vy > 0) {      //past bottom border, then rebounds
            //ball.y = canvas.height - radius;
            ball.vy *= -1;
        }
        if (ball.x >= canvas.width - ball.radius) {   //past right border, go to next line
            //  ball.x = canvas.width + radius;
            //ball.vx *= -1;
            if ((hgt*2 + gap*2) > ball.y ) {
                ball.x = ball.radius + 1;
                ball.y += (hgt + gap);
            }
            else if((hgt*2 + gap*2) <= ball.y && (hgt*3 + gap*2) >= ball.y ) balls.splice(i, 1); ball.count++;
        }
        if (ball.y <= ball.radius+1 & ball.vy<0){            //past top border, rebound
            ball.vy *= -1;
        }

        if (ball.y <= gap+hgt+ball.radius+1 && ball.y > gap+hgt & ball.vy<0){            //past top border in 2nd tube, rebound
            ball.vy *= -1;
        }
        if ((ball.y >=hgt+gap+hgt - ball.radius)&&(ball.y < hgt+gap+hgt) && ball.vy > 0) {      //past bottom border in 2nd tube, then rebounds
            //ball.y = canvas.height - radius;
            ball.vy *= -1;
        }
        if (ball.y <= 2*gap+2*hgt+ball.radius+1 && ball.y > 2*gap+2*hgt-5 & ball.vy<0){            //past top border in 3rd tube, rebound
            ball.vy *= -1;
        }
        if ((ball.y >=2*hgt+2*gap+hgt - ball.radius)&&(ball.y < 2*hgt+2*gap+hgt+5) && ball.vy > 0) {      //past bottom border in 3rd tube, then rebounds
            //ball.y = canvas.height - radius;
            ball.vy *= -1;
        }
        if(ball.x<=ball.radius && ball.vx < 0){ball.vx *= -1;}


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
    var rr00 = Math.pow(b1.x - b2.x, 2) + Math.pow(b1.y - b2.y, 2);
    var rr0 = (b1.x - b2.x)*(b1.vx-b2.vx) + (b1.y - b2.y)*(b1.vy-b2.vy);
    var rr = (b1.vx-b2.vx)*(b1.vx-b2.vx) + (b1.vy-b2.vy)*(b1.vy-b2.vy);
    var t = (-1)*(rr0 + Math.sqrt(rr00*rr - (rr)*(rr00-(Math.pow(b1.radius + b2.radius, 2)))))/(rr);
    var d = (Math.sqrt((Math.pow(b1.x - b2.x + t*(b1.vx-b2.vx), 2)) + (Math.pow(b1.y - b2.y + t*(b1.vy-b2.vy), 2)) ));
    var jhx = (b1.x-b2.x + t*(b1.vx-b2.vx))/d;
    var jhy = (b1.y-b2.y + t*(b1.vy-b2.vy))/d;
    var jx = 2*jhx*jhx*(b1.x-b2.x)/((1/b1.mass)+(1/b2.mass));
    var jy = 2*jhy*jhy*(b1.y-b2.y)/((1/b1.mass)+(1/b2.mass));
    b1.vx += jx/b1.mass;
    b1.vy += jy/b1.mass;
    b2.vy -= jy/b2.mass;
    b2.vx -= jx/b2.mass;

}
