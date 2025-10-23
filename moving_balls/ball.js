var ballR = 10;
var maxX = 400;
var maxY = 400;
var balls = [];

class Ball{
    constructor(x,y,vx,vy, color="blue"){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy=vy;
        this.R = ballR;
        this.color=color;
    }

    nextPos(){
        this.x+=this.vx; 
        this.y+=this.vy;
    }

    wall_colisions(){
        if (this.x<0) {
            this.vx = -this.vx;
            this.x = - this.x; 
        }
        if (this.x> maxX){
            this.vx = -this.vx;
            this.x = -(this.x-maxX) + maxX ;
        }
        if (this.y<0) {
            this.vy = -this.vy;
            this.y = - this.y; 
        }
        if (this.y> maxY){
            this.vy = -this.vy;
            this.y = -(this.y-maxY)+maxY;
        }
    }

    draw(ctx){
        ctx.strokeStyle = this.color;
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.R, 0, Math.PI * 2, true); 
        ctx.fill();
        ctx.stroke();
    }

    collide_with(b){
        if (this.dist(b)<this.R+b.R)
        {
            console.log("COLISION!!");
            this.move_frame_back();
            this.swap_vels(b);
        }
    }

    dist(b){
        let d = (this.x - b.x)*(this.x - b.x)
        d+= (this.y - b.y)*(this.y - b.y)
        return Math.sqrt(d)
    }

    move_frame_back(){
        this.x-= this.vx;
        this.y-= this.vx;
    }

    swap_vels(b){
        let v = this.vx;
        this.vx = b.vx;
        b.vx = v;
        v = this.vy;
        this.vy = b.vy;
        b.vy = v;

    }
}

function createWorld(n_balls=5){
    for (i=0; i<n_balls; i++){
        color = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
        vx = Math.floor(Math.random() * 8 - 4);
        vy = Math.floor(Math.random() * 8 - 4);
        x = Math.floor(Math.random()*maxX);
        y = Math.floor(Math.random()*maxY);
        balls.push(new Ball(x,y,vx,vy, color));
    }
    console.log("total no. of  balls "+balls.length);
}

function drawScene(){
    let canva = document.getElementById("drawing_canvas");
    let ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    for (i=0; i< balls.length; i++){
        balls[i].draw(ctx);
        //console.log(i, balls[i].x, balls[i].y)

    }
}

function animation(){
    balls.forEach(b => {
        b.nextPos();
        b.wall_colisions();
    });
    for (i=0; i< balls.length; i++){
        for (j=0; j<i; j++){
            balls[i].collide_with(balls[j]);
        }
    }
    drawScene();
    setTimeout(animation, 20);
}

createWorld(12);
animation();