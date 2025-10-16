var x = 20;
var y = 30;
var vx = 5;
var vy = 6;
var maxX = 400;
var maxY = 400;

function nextPos(){
    x+=vx; 
    y+=vy;
}

function colisions(){
    if (x<0) {
        vx = -vx;
        x = - x; 
    }
    if (x> maxX){
        vx = -vx;
        x = -(x-maxX) + maxX ;
    }
    if (y<0) {
        vy = -vy;
        y = - y; 
    }
    if (y> maxY){
        vy = -vy;
        y = -(y-maxY)+maxY;
    }
}

function drawScene(){
    let canva = document.getElementById("drawing_canvas");
    let ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, true); 
    ctx.fill();
    ctx.stroke();
}

function animation(){
    nextPos();
    colisions();
    drawScene();
    setTimeout(animation, 20);
}

animation();