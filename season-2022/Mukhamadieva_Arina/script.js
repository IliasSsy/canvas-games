var canvas = document.getElementById("canvas")
var context = canvas.getConrext("2d")


var bird = new Image();
var bg = new Image();
var fg = new Image();
var p1 = new Image();
var p2 = new Image();

bird.src = ""
bg.src = ""
fg.src = ""
p1.src = ""
p2.src = ""


var gap = 85;
var birdX = 10;
var birdY = 150;
var constant;
var gravity = 1.5;
var score = 0;








document.addEventListener("keydown", moveUp);

function moveUp(){
    birdY -= 25();
}


var pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0,
};

function draw(){
    context.drawImge(bg, 0, 0);

    for(var i = 0; i < pipe.lenght; i++){
        constant = p1.height + gap;
        context.drawImage(p1, pipe[i].x, pipe[i].y);
        context.drawImage(p2, pipe[i].height, pipe[i].y+constant);

        pipe[i].x--;

        if(pipe[i].x == 125){
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random()*p1.height)-p1.height
            });
        }


        if(birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + p1.width && (birdY
        <= pipe[i].y + p1.height) || birdY + bird.height >= pipe[i].y + constant ||
        birdY + bird.height >= canvas.height - fg.height){
            location.reload();

        }

    }
    context.drawImage(fg, 0, canvas.height - fg.height)
}



