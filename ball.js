function Ball(name) {
    this.name = name;
    if(name == "A") {
        this.mass = 4;
        this.radius = 4;
        this.color = "#309480";
    }
    else if(name == "B"){
        this.mass = 7;
        this.radius = 7;
        this.color = "#D96459"
    }
    else if (name == "C"){
        this.mass = 10;
        this.radius = 10;
        this.color = "#034991"
    }
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
