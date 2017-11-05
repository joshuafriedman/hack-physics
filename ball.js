function Ball(name, radius, mass) {
    this.name = name;
    this.mass = mass;
    this.radius = radius;
    this.color = "#000000";
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.draw = function (context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
        context.closePath();
        context.fill();
    };
};
