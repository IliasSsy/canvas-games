var GAME = {
    width: 500,
    hight: 500,
    background: "#F5F0E1",
    score: 0
}

var BALL = {
    color: "#FF6E40",
    x: 200,
    y: 200,
    size: 20,
    xDirection: 3,
    yDirection: 5,
}

var ROCKET = {
    x: 0,
    y: 450,
    hight: 20,
    width: 100,
    color: "#1E3D59",
    xDirection: 40,
    yDirection: 0,
}

var BRICKS = new Array();

function createBricks(bricks, x, y, hight, width) {
    for (var i = 0; i < 24; i++) {
        bricks[i] = {
            x: x,
            y: y,
            hight: hight,
            width: width,
            color: "red",
            hit: false,

        }

        if (GAME.width <= bricks[i].x + width + 20 + bricks[i].width) {
            y += hight + 10;
            x = 10;
        } else {
            x += width + 20;
        }
    }
}

console.log("Score")


var canvas = document.getElementById("canvas")
canvas.width = GAME.width;
canvas.height = GAME.hight;
var canvasContext = canvas.getContext("2d");

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.hight);
    drawBackground();
    drawScore();
    drawBall(BALL);
    drawRocket(ROCKET);

}

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.hight);
}

function drawbricks(bricks) {
    for (var el of bricks) {
        //console.log(bricks[i])
        if (!el.hit) {
            canvasContext.fillStyle = el.color;
            canvasContext.beginPath();
            canvasContext.fillRect(el.x, el.y, el.width, el.hight);
            canvasContext.fill();
        }
    }
}

function updatebricks(ball, bricks) {
    for(var el of bricks){
        var BRICKSToplineCollision = ball.y + ball.size / 2 > el.y;
        var BRICKSLeftlineCollision = ball.x + ball.size / 2 > el.x;
        var BRICKSBottomlineCollision = ball.y - ball.size / 2 < el.y + el.hight;
        var BRICKSRightlineCollision = ball.x - ball.size / 2 < el.x + el.width;
    
        if (BRICKSToplineCollision && BRICKSLeftlineCollision && BRICKSBottomlineCollision && BRICKSRightlineCollision && !el.hit) {
            ball.yDirection = -ball.yDirection;
            ball.xDirection = -ball.xDirection;
            el.hit = true;
            GAME.score += 1;
       
        }
}
}
function drawScore() {
    canvasContext.fillStyle = "black";
    canvasContext.font = "30px arial";
    canvasContext.fillText("Score " + GAME.score, 10, 140);
}

function play() {
    drawFrame();
    updateBall(BALL, ROCKET);
    updatebricks(BALL, BRICKS)
    //updateRocket(ROCKET);
    drawbricks(BRICKS);
    requestAnimationFrame(play);
}

function drawBall(ball) {
    canvasContext.fillStyle = ball.color;
    canvasContext.beginPath();
    canvasContext.arc(ball.x, ball.y, ball.size / 2, 0, 2 * Math.PI);
    canvasContext.fill();
}

function drawRocket(rocket) {
    canvasContext.fillStyle = rocket.color;
    canvasContext.beginPath();
    canvasContext.fillRect(rocket.x, rocket.y, rocket.width, rocket.hight);

}

function updateBall(ball, raketka) {
    ball.x += ball.xDirection;
    ball.y += ball.yDirection;
    if (ball.y + ball.size / 2 >= GAME.hight || ball.y <= 0 + ball.size / 2 ||
        (ball.y + ball.size / 2 >= raketka.y && ball.y - ball.size / 2 <= raketka.y + raketka.hight &&
         ball.x >= raketka.x && ball.x <= raketka.x + raketka.width)) {
        ball.yDirection = -ball.yDirection;
    }
    if (ball.x + ball.size / 2 >= GAME.width || ball.x <= 0 + ball.size / 2 ||
        (ball.y >= raketka.y && ball.y <= raketka.y + raketka.hight &&
        ball.x + ball.size / 2 >= raketka.x && ball.x - ball.size / 2 <= raketka.x + raketka.width)) {
        ball.xDirection = -ball.xDirection;
    }
    if (ball.y + ball.size / 2 >= raketka.y && ball.y - ball.size / 2 <= raketka.y + raketka.hight / 1.25 &&
     ball.x >= raketka.x && ball.x <= raketka.x + raketka.width) {
        ball.y -= 20;
        //GAME.score += Odintsov_Andrey;
    }
    //function drawGOv() {
        //if (ball.y + ball.size / Konovalov_Roman >= GAME.hight) {
    function drawGOv() {
        if (ball.y + ball.size / 2 >= GAME.hight) {
            canvasContext.fillStyle = "black";
            canvasContext.font = "30px arial";
            canvasContext.fillText("GAME OVER");
            console.log("GAME OVER")
            //drawGOv()
    }
    }   
    drawGOv()
    function drawGWin(){
        if (BRICKS.length == 0 ){
            canvasContext.fillStyle = "black";
            canvasContext.font = "30px arial";
            canvasContext.fillText("GAME WIN");
            console.log("GAME WIN")
            
     }
    }
    drawGWin()
} 


// function updateRocket(rocket) {
//     if ((rocket.x < 0) || (rocket.x + rocket.width > GAME.width)) {
//         rocket.xDirection = -rocket.xDirection
//     }
// }

function initEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener("keydown", onCanvasKeyDown);

}
function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        ROCKET.x = ROCKET.x - ROCKET.xDirection;
    }
    if (event.key === "ArrowRight") {
        ROCKET.x = ROCKET.x + ROCKET.xDirection;
    }
    clampRocketPosition()
}
function onCanvasMouseMove(event) {
    ROCKET.x = event.clientX - ROCKET.width / 2
    clampRocketPosition()
}
function clampRocketPosition() {
    if (ROCKET.x < 0) {
        ROCKET.x = 0;
    }
    if (ROCKET.x + ROCKET.width > GAME.width) {
        ROCKET.x = GAME.width - ROCKET.width
    }
}

createBricks(BRICKS, 10, 10, 20, 40);
initEventsListeners()
play();

