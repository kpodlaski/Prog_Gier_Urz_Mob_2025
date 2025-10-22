var ballR = 10;
var maxX = 400;
var maxY = 400;


class Ball{
    constructor(x,y,vx,vy){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy=vy;
        this.R = ballR;
    }

    nextPos(){
        this.x+=this.vx; 
        this.y+=this.vy;
    }

    colisions(){
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
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 20, 0, Math.PI * 2, true); 
        ctx.fill();
        ctx.stroke();
    }

    collide_with(b){
        if (this.dist(b)<this.R+b.R)
        {
            this.move_frame_back();
            this.vx = b.vx;
            this.vy = b.vy;
        }
    }

    move_frame_back(){
        this.x-= this.vx;
        this.y-= this.vx;
    }
}

var ball = new Ball(20,30,5,6)

function drawScene(){
    let canva = document.getElementById("drawing_canvas");
    let ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    ball.draw(ctx);

}

function animation(){
    ball.nextPos();
    ball.colisions();
    drawScene();
    setTimeout(animation, 20);
}

animation();