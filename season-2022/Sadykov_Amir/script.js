// TRUNK - игрок, BALLS враги

var GAME = {
    width: 1270,
    height: 895,
    background: "aquamarine",
}
var BALL = {                        //параметры мяча
    color: "#FF6E40",
    x: 500,
    y: 150,
    radius: 100,
    xDirection: 0,      //скорость шарика
    yDirection: 0,
}
var BALL1 = {                        //параметры мяча
    color: "green",
    x: 150,
    y: 150,
    radius: 50,
    xDirection: 0,      //скорость шарика
    yDirection: 0,
}

var BALL2 = {
    color: "red",
    x: 600,
    y: 600,
    radius: 200,
    xDirection: 0,
    yDirection: 0,
}

var BALL3 = {
    color: "blue",
    x: 650,
    y: 270,
    radius: 150,
    xDirection: 0,
    yDirection: 0,
}

var TRUNK = {
    x: 300,
    y: 300,
    radius: 110,
    color: "#1E3D59",
    xDirection: 10,
    yDirection: 10,
    score: 0,
    youwinner: "You Winner",
}



var canvas = document.getElementById("canvas");  //рабочее поле
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

function drawBackground() {             // фон 
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}
function drawTrunk() {
    canvasContext.fillStyle = TRUNK.color;
    canvasContext.beginPath();
    canvasContext.arc(TRUNK.x, TRUNK.y, TRUNK.radius, 0, 2 * Math.PI);
    canvasContext.fill();
}
function drawBall() {
    canvasContext.fillStyle = BALL.color;
    canvasContext.beginPath();
    canvasContext.arc(BALL.x, BALL.y, BALL.radius, 0, 2 * Math.PI);
    canvasContext.fill();
}
function drawBall1() {
    canvasContext.fillStyle = BALL1.color;
    canvasContext.beginPath();
    canvasContext.arc(BALL1.x, BALL1.y, BALL1.radius, 0, 2 * Math.PI);
    canvasContext.fill();
}
function drawBall2() {
    canvasContext.fillStyle = BALL2.color;
    canvasContext.beginPath();
    canvasContext.arc(BALL2.x, BALL2.y, BALL2.radius, 0, 2 * Math.PI);
    canvasContext.fill();
}
function drawBall3() {
    canvasContext.fillStyle = BALL3.color;
    canvasContext.beginPath();
    canvasContext.arc(BALL3.x, BALL3.y, BALL3.radius, 0, 2 * Math.PI);
    canvasContext.fill();
}

function initEventsListeners() {             //функция прослушивания событий 
    window.addEventListener("keydown", onCanvasKeyDown);
}


function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {      //задание управления левой стрелкой
        TRUNK.x = TRUNK.x - TRUNK.xDirection;
    }
    if (event.key === "ArrowRight") {       //задание управления правой стрелкой
        TRUNK.x = TRUNK.x + TRUNK.xDirection;
    }

    if (event.key === "ArrowUp") {      //задание управления верхней стрелкой
        TRUNK.y = TRUNK.y - TRUNK.yDirection;
    }
    if (event.key === "ArrowDown") {       //задание управления нижней стрелкой
        TRUNK.y = TRUNK.y + TRUNK.yDirection;
    }
    if (event.key === "1") {
        BALL.xDirection = 1;
        BALL.yDirection = 1;
        BALL1.xDirection = -1;
        BALL1.yDirection = 1;
        BALL2.xDirection = 1;
        BALL2.yDirection = -1;
        BALL3.xDirection = -1;
        BALL3.yDirection = -1;
    }
    if (event.key === "0") {
        BALL.xDirection = 0;
        BALL.yDirection = 0;
        BALL1.xDirection = 0;
        BALL1.yDirection = 0;
        BALL2.xDirection = 0;
        BALL2.yDirection = 0;
        BALL3.xDirection = 0;
        BALL3.yDirection = 0;
    }
    if (event.key === "2") {
        BALL.xDirection = -1;
        BALL.yDirection = -1;
        BALL1.xDirection = 1;
        BALL1.yDirection = -1;
        BALL2.xDirection = -1;
        BALL2.yDirection = 1;
        BALL3.xDirection = 1;
        BALL3.yDirection = 1;
    }
        clampTrunkPosition();
    
}

function clampTrunkPosition() {
    if (TRUNK.x + TRUNK.width > GAME.width) {      //установление границ для движения ракетки
        TRUNK.x = GAME.width - TRUNK.width;
    }
    if (TRUNK.x < 0) {
        TRUNK.x = 0;
    }
    if (TRUNK.y + TRUNK.height > GAME.height) {      //установление границ для движения ракетки
        TRUNK.y = GAME.height - TRUNK.height;
    }
    if (TRUNK.y < 0) {
        TRUNK.y = 0;
    }


}

function updateBall() {         //траектория мячика
    BALL.x += BALL.xDirection;
    BALL.y += BALL.yDirection;
    if ((BALL.y + BALL.radius > GAME.height) || (BALL.y - BALL.radius < 0)) {
        BALL.yDirection = -BALL.yDirection;
    }
    if ((BALL.x + BALL.radius > GAME.width) || (BALL.x - BALL.radius < 0)) {
        BALL.xDirection = -BALL.xDirection;
    }
    if (((BALL.x === TRUNK.x) && (BALL.y === TRUNK.y) && (BALL.radius < TRUNK.radius))
        //|| ((BALL.x === TRUNK.x+500)&&(BALL.y === TRUNK.y === BALL.y)&&(BALL.radius<TRUNK.radius))
        //|| ((BALL.x === TRUNK.x-500)&&(BALL.y === TRUNK.y === BALL.y)&&(BALL.radius<TRUNK.radius))
        //|| ((BALL.x === TRUNK.x)&&(BALL.y === TRUNK.y-500)&&(BALL.radius<TRUNK.radius))
        //|| ((BALL.x === TRUNK.x)&&(BALL.y === TRUNK.y+500)&&(BALL.radius<TRUNK.radius))
    ) {
        TRUNK.radius = TRUNK.radius + BALL.radius / 2;
        BALL.x = 10000;
        BALL.y = 10000;
        if ((BALL.x === TRUNK.x) && (BALL.y === TRUNK.y) && (BALL.radius > TRUNK.radius)) {
            TRUNK.x = 10000;
            TRUNK.y = 10000;
        }
    }
}
function updateBall1() {         //траектория мячика
    BALL1.x += BALL1.xDirection;
    BALL1.y += BALL1.yDirection;
    if ((BALL1.y + BALL1.radius > GAME.height) || (BALL1.y - BALL1.radius < 0)) {
        BALL1.yDirection = -BALL1.yDirection;
    }
    if ((BALL1.x + BALL1.radius > GAME.width) || (BALL1.x - BALL1.radius < 0)) {
        BALL1.xDirection = -BALL1.xDirection;
    }
    if ((BALL1.x === TRUNK.x)
        && (BALL1.y === TRUNK.y)
        && (BALL1.radius < TRUNK.radius)
        || (BALL1.x === TRUNK.x + 10) && (BALL1.y === TRUNK.y + 10) && (BALL1.radius < TRUNK.radius)
        || (BALL1.x === TRUNK.x - 10) && (BALL1.y === TRUNK.y - 10) && (BALL1.radius < TRUNK.radius)
    ) {
        TRUNK.radius = TRUNK.radius + BALL1.radius / 2;
        BALL1.x = 1000;
        BALL1.y = 1000;
        if ((BALL1.x === TRUNK.x) && (BALL1.y === TRUNK.y) && (BALL1.radius > TRUNK.radius)) {
            TRUNK.x = 10000;
            TRUNK.y = 10000;
        }
    }
}
function updateBall2() {         //траектория мячика
    BALL2.x += BALL2.xDirection;
    BALL2.y += BALL2.yDirection;
    if ((BALL2.y + BALL3.radius > GAME.height) || (BALL2.y - BALL2.radius < 0)) {
        BALL2.yDirection = -BALL2.yDirection;
    }
    if ((BALL2.x + BALL2.radius > GAME.width) || (BALL2.x - BALL2.radius < 0)) {
        BALL2.xDirection = -BALL2.xDirection;
    }
    if ((BALL2.x === TRUNK.x)
        && (BALL2.y === TRUNK.y)
        && (BALL2.radius < TRUNK.radius)
        || (BALL2.x === TRUNK.x + 10) && (BALL2.y === TRUNK.y + 10) && (BALL2.radius < TRUNK.radius)
        || (BALL2.x === TRUNK.x - 10) && (BALL2.y === TRUNK.y - 10) && (BALL2.radius < TRUNK.radius)
    ) {
        TRUNK.radius = TRUNK.radius + BALL2.radius / 2;
        BALL2.x = 10000;
        BALL2.y = 10000;
        TRUNK.score = 1;
    }
    if ((BALL2.x === TRUNK.x) && (BALL2.y === TRUNK.y) && (BALL2.radius > TRUNK.radius)) {
        TRUNK.x = 10000;
        TRUNK.y = 10000;
    }
}

function updateBall3() {         //траектория мячика
    BALL3.x += BALL3.xDirection;
    BALL3.y += BALL3.yDirection;
    if ((BALL3.y + BALL3.radius > GAME.height) || (BALL3.y - BALL3.radius < 0)) {
        BALL3.yDirection = -BALL3.yDirection;
    }
    if ((BALL3.x + BALL3.radius > GAME.width) || (BALL3.x - BALL3.radius < 0)) {
        BALL3.xDirection = -BALL3.xDirection;
    }
    if ((BALL3.x === TRUNK.x)
        && (BALL3.y === TRUNK.y)
        && (BALL3.radius < TRUNK.radius)
        || (BALL3.x === TRUNK.x + 10) && (BALL3.y === TRUNK.y + 10) && (BALL3.radius < TRUNK.radius)
        || (BALL3.x === TRUNK.x - 10) && (BALL3.y === TRUNK.y - 10) && (BALL3.radius < TRUNK.radius)
    ) {
        TRUNK.radius = TRUNK.radius + BALL2.radius / 2;
        BALL3.x = 10000;
        BALL3.y = 10000;
    }
    if ((BALL3.x === TRUNK.x) && (BALL3.y === TRUNK.y) && (BALL3.radius > TRUNK.radius)) {
        TRUNK.x = 10000;
        TRUNK.y = 10000;
    }
}



function updateAllBalls() {
    updateBall();
    updateBall1();
    updateBall2();
    updateBall3();
}

function drawYouWinner() {
    var youwinner = "You Winner ";
    canvasContext.font = "64px serif";
    canvasContext.fillText(youwinner, 400, 450);
}
function FoolWin() {
    drawYouWinner();
    BALL.x = 10000;
    BALL.xDirection = 0;
    BALL.yDirection = 0;
    BALL1.x = 10000;
    BALL1.xDirection = 0;
    BALL1.yDirection = 0;
    BALL2.x = 10000;
    BALL2.xDirection = 0;
    BALL2.yDirection = 0;
    BALL3.x = 10000;
    BALL3.xDirection = 0;
    BALL3.yDirection = 0;
    TRUNK.y = 10000;

}
function drawRules() {
    var rule0 = "0 - speed 0";
    canvasContext.font = "20px serif";
    canvasContext.fillText(rule0, 10, 30);
    var rule1 = "1 - speed 1";
    canvasContext.font = "20px serif";
    canvasContext.fillText(rule1, 10, 60);
    var rule2 = "2 - speed - 1";
    canvasContext.font = "20px serif";
    canvasContext.fillText(rule2, 10, 90);
}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawTrunk();
    drawBall();
    drawBall1();
    drawBall2();
    drawBall3();
    if (TRUNK.score === 1) {
        FoolWin();
    }
    if (TRUNK.x >= 2000) {
        FoolLoose();
    }
    drawRules();
}

function drawGameOver() {
    var gameover = "GAME OVER";
    canvasContext.font = "64px serif";
    canvasContext.fillText(gameover, 400, 450);
}

function FoolLoose() {
    drawGameOver();
    BALL.x = 10000;
    BALL.xDirection = 0;
    BALL.yDirection = 0;
    BALL1.x = 10000;
    BALL1.xDirection = 0;
    BALL1.yDirection = 0;
    BALL2.x = 10000;
    BALL2.xDirection = 0;
    BALL2.yDirection = 0;
    BALL3.x = 10000;
    BALL3.xDirection = 0;
    BALL3.yDirection = 0;
}


// запуск всей игры
function play() {
    drawFrame();
    updateAllBalls();
    requestAnimationFrame(play);
}

function options() {
    if (TRUNK.x >= 2000) {
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, GAME.width, GAME.height);
        console.log("Score: ", TRUNK.score);
        drawGameOver();
    }
    requestAnimationFrame(options);
}



initEventsListeners();
play();