var x=("Наберите 100 очков и не потеряйте мяч!");
 alert(x);
var GAME = {
    width: 700,
    height: 700,
    background: "Lavender",
    count: 0,
    count2: 0,
}
var BALL = {
    color: "SpringGreen",
    x: 200,
    y: 80,
    size: 20,
    xDirection: 3,
    yDirection: 5,
}
var RACKET = {
    x: 20,
    y: 100,
    width: 20,
    height: 100,
    yDirection: 90,
    color: "Coral",
}
var RACKET2 = {
    color: "black",
    x: 660,
    y: 100,
    width: 20,
    height: 100,
    yDirection: 10,
}
var img = new Image();
img.src = "dog.jpg";
var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");
var txt = canvas.getContext("2d");

function drawIm(){
    canvasContext.drawImage(img, 10, 10, 680, 680);
}
function drawBackground() {
    canvasContext.fillStyle = GAME.background
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

function drawBall(BALL) {
    canvasContext.fillStyle = BALL.color;
    canvasContext.beginPath();
    canvasContext.arc(BALL.x, BALL.y, BALL.size / 2, 0, 2 * Math.PI);
    canvasContext.fill();
    canvasContext.strokeStyle = "black";
    canvasContext.stroke();
}
function drawRacket(){
    canvasContext.fillStyle = RACKET.color;
    canvasContext.fillRect(RACKET.x, RACKET.y, RACKET.width, RACKET.height);
}
function drawRacket2(){
    canvasContext.fillStyle = RACKET2.color;
    canvasContext.fillRect(RACKET2.x, RACKET2.y, RACKET2.width, RACKET2.height);
}
function drawScore() {
    txt.font = "30px Comic Sans MS";
    txt.fillStyle = "Coral";
    txt.textAlign = "center";
    txt.fillText("№1 Score: " + GAME.count, 180, 80);
}
function drawScore2() {
    txt.font = "30px Comic Sans MS";
    txt.fillStyle = "black";
    txt.textAlign = "center";
    txt.fillText("№2 Score: " + GAME.count2, 520, 80);
}
function win(){
    if (GAME.count > 100){
        alert("Игрок № 1 выиграл!Нажмите перезагрузить страницу, чтобы поиграть заново.")
    }
}
function win2(){
    if (GAME.count2 > 100){
        alert("Игрок № 2 выиграл!Нажмите перезагрузить страницу, чтобы поиграть заново.")
    }
}
function initEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener("keydown", onCanvasKeyDown);
}
function onCanvasKeyDown(event) {
    if (event.key === "ArrowUp") {
        RACKET.y = RACKET.y - RACKET.yDirection;
    }
    if (event.key === "ArrowDown") {
        RACKET.y = RACKET.y + RACKET.yDirection
    }
    clampRacketPosition();
}

function onCanvasMouseMove(event) {
    RACKET2.y = event.clientY;
    clampRacketPosition();
}
function clampRacketPosition() {
    if (RACKET.y < 0) {
        RACKET.y = 0;
    }
    if (RACKET.y + RACKET.height > GAME.height) {
        RACKET.y = GAME.height - RACKET.height;
    }
    if (RACKET2.y + RACKET2.height > GAME.height) {
        RACKET2.y = GAME.height - RACKET2.height;
}
}
function updateBall(ball) {
    ball.x += ball.xDirection;
    ball.y += ball.yDirection;
    var collisionUp = ball.y + ball.size / 2 > RACKET.y,
        collisionLeft = ball.x + ball.size / 2 > RACKET.x,
        collisionRight = ball.x - ball.size / 2 < RACKET.x + RACKET.width,
        collisionDown = ball.y - ball.size / 2 < RACKET.y + RACKET.height
        collisionUp2 = ball.y + ball.size / 2 > RACKET2.y,
        collisionLeft2 = ball.x + ball.size / 2 > RACKET2.x,
        collisionRight2 = ball.x - ball.size / 2 < RACKET2.x + RACKET2.width,
        collisionDown2 = ball.y - ball.size / 2 < RACKET2.y + RACKET2.height



    if ((ball.y - ball.size / 2 < 0) || (BALL.y + BALL.size / 2 > GAME.height)) {
        ball.yDirection = -ball.yDirection;
    }

    if ((collisionLeft) && (collisionRight) && (collisionUp) && (collisionDown)) {
        ball.xDirection = -ball.xDirection;
        GAME.count++;
        console.log(GAME.count);
    }
    if ((collisionLeft2) && (collisionRight2) && (collisionUp2) && (collisionDown2)){
        ball.xDirection = -ball.xDirection;
        GAME.count2++;
        console.log(GAME.count2);
    }
    if  (ball.x - ball.size / 2 < 0) {
        ball.xDirection = -ball.xDirection
        GAME.count-= 50;
        console.log(GAME.count2);
        }
        if (ball.x + ball.size / 2 > GAME.width){
            ball.xDirection = -ball.xDirection
        GAME.count2-= 50;
        console.log(GAME.count);
        }
    }


function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawIm();
    drawBall(BALL);
    drawRacket(RACKET);
    drawRacket2(RACKET2);
    drawScore();
    drawScore2();
}

function play() {
    drawFrame();
    updateBall(BALL);
     win();
     win2();
        requestAnimationFrame(play)   
}
initEventsListeners();
play();
