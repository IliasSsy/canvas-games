var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");

var GAME = {
    width: 1300,
    height: 700,
    background: "#F5F0E1"
}

var FIELD = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    explosion: false,
    size: 1,
    width: 1300,
    height: 700,
    x: 0,
    y: 0,
}

var GameOver = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    explosion: false,
    size: 1,
    width: 1300,
    height: 700,
    x: 0,
    y: 0,
}

var RACETKA = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    explosion: false,
    size: 100,
    x: 0,
    y: 500,
    xDirection: 10,
}

var APPLE = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    explosion: false,
    size: 0,
    x: 400,
    y: 0,
    radius: 25,
    yDirection: 1,
}

var APPLE1 = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    explosion: false,
    size: 0,
    x: 800,
    y: 0,
    radius: 25,
    yDirection: 0,
}

var APPLE2 = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    explosion: false,
    size: 0,
    x: 100,
    y: 0,
    radius: 25,
    yDirection: 0,
}

var CAL = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    explosion: false,
    size: 0,
    x: 500,
    y: 0,
    radius: 25,
    yDirection: 0.5,
}

var LIFE = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    explosion: false,
    size: 45,
    x: 30,
    y: 30,
}

//переменные для рандома
var min = 50;
var max = 1260;

//переменные для подсчета игровых очков
var score = 0;
var life = 3;

//переменные для скорости
spedapple1 = 1.5;
spedapple2 = 2;

canvas.width = GAME.width;
canvas.height = GAME.height;

//вырисовка изображений 
function initField() {
    FIELD.img.src = "cartinca.png";
    FIELD.img.onload = () => {
        FIELD.imgIsLoad = true;
    }
}

function drawField() {
    if (FIELD.imgIsLoad) {
        canvasContext.drawImage(FIELD.img, FIELD.x, FIELD.y)
    }
}

function initGameOver() {
    GameOver.img.src = "GameOver.png";
    GameOver.img.onload = () => {
        GameOver.imgIsLoad = false;
    }
}

function drawGameOver() {
    if (GameOver.imgIsLoad) {
        canvasContext.drawImage(GameOver.img, GameOver.x, GameOver.y)
    }
}

function initRacetka() {
    RACETKA.img.src = "racetca.png";
    RACETKA.img.onload = () => {
        RACETKA.imgIsLoad = true;
    }
}

function drawRacetca() {
    if (RACETKA.imgIsLoad) {
        canvasContext.drawImage(RACETKA.img, RACETKA.x, RACETKA.y, 100, 100)
    }
}

function initApple() {
    APPLE.img.src = "Apple.png";
    APPLE.img.onload = () => {
        APPLE.imgIsLoad = true;
    }
}

function drawApple() {
    if (APPLE.imgIsLoad) {
        canvasContext.drawImage(APPLE.img, APPLE.x, APPLE.y, 40, 40)
    }
}

function initApple1() {
    APPLE1.img.src = "Apple1.png";
    APPLE1.img.onload = () => {
        APPLE1.imgIsLoad = false;
    }
}

function drawApple1() {
    if (APPLE1.imgIsLoad) {
        canvasContext.drawImage(APPLE1.img, APPLE1.x, APPLE1.y, 40, 40)
    }
}

function initApple2() {
    APPLE2.img.src = "Apple2.png";
    APPLE2.img.onload = () => {
        APPLE2.imgIsLoad = false;
    }
}

function drawApple2() {
    if (APPLE2.imgIsLoad) {
        canvasContext.drawImage(APPLE2.img, APPLE2.x, APPLE2.y, 40, 40)
    }
}

function initCal() {
    CAL.img.src = "cal.png";
    CAL.img.onload = () => {
        CAL.imgIsLoad = true;
    }
}

function drawCal() {
    if (CAL.imgIsLoad) {
        canvasContext.drawImage(CAL.img, CAL.x, CAL.y, 40, 40)
    }
}

function initlife() {
    LIFE.img.src = "life-Vinogradov_Artem.png";
    LIFE.img.onload = () => {
        LIFE.imgIsLoad = true;
    }
}

function drawlife() {
    if (LIFE.imgIsLoad) {
        canvasContext.drawImage(LIFE.img, LIFE.x, LIFE.y)
    }
}

//управление
function initEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener("keydown", onCanvasKeyDown);
}

function clampRacketPosition() {
    if (RACETKA.x < 0) {
        RACETKA.x = 0
    }
    if (RACETKA.x + RACETKA.size >= GAME.width) {
        RACETKA.x = GAME.width - RACETKA.size
    }
}

function onCanvasMouseMove(event) {
    RACETKA.x = event.clientX;
    clampRacketPosition();
}

function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        RACETKA.x = RACETKA.x - RACETKA.xDirection;
    }
    if (event.key === "ArrowRight") {
        RACETKA.x = RACETKA.x + RACETKA.xDirection;
    }
    clampRacketPosition();
}

// функция рандом
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//скорость 


//физика движения яблок 
function updateApple() {
    APPLE.y += APPLE.yDirection;
    if ((APPLE.y >= GAME.height - APPLE.radius) || (APPLE.y < 0 + APPLE.size)) {
        life = life - 1;
        APPLE.y = 0;
        APPLE.x = getRandomArbitrary(min, max);
    }
    var crossesUpperWall = APPLE.x + APPLE.radius >= RACETKA.x
        && APPLE.x + APPLE.radius <= RACETKA.x + RACETKA.size
        && APPLE.y + APPLE.radius >= RACETKA.y + APPLE.radius
        && APPLE.y - APPLE.radius <= RACETKA.y;
    if (crossesUpperWall) {
        APPLE.y = 0;
        APPLE.x = getRandomArbitrary(min, max);
        score = score + 1;
        APPLE.yDirection = APPLE.yDirection + score*0.001;
    }

    APPLE1.y += APPLE1.yDirection
    if ((APPLE1.y >= GAME.height - APPLE.radius) || (APPLE1.y < 0 + APPLE.size)) {
        life = life - 1;
        APPLE1.imgIsLoad = false;
        APPLE1.yDirection = 0;
        APPLE1.y = 0;
    }
    var crossesUpperWall = APPLE1.x + APPLE.radius >= RACETKA.x
        && APPLE1.x + APPLE.radius <= RACETKA.x + RACETKA.size
        && APPLE1.y + APPLE.radius >= RACETKA.y + APPLE.radius
        && APPLE1.y - APPLE.radius <= RACETKA.y;
    if (crossesUpperWall) {
        score = score + 1;
        APPLE1.imgIsLoad = false;
        APPLE1.yDirection = 0;
        APPLE1.y = 0;
        spedapple1 = spedapple1 + score*0.001*spedapple1;
    }

    APPLE2.y += APPLE2.yDirection
    if ((APPLE2.y >= GAME.height - APPLE.radius) || (APPLE2.y < 0 + APPLE.size)) {
        life = life - 1;
        APPLE2.imgIsLoad = false;
        APPLE2.yDirection = 0;
        APPLE2.y = 0;
    }
    var crossesUpperWall = APPLE2.x + APPLE.radius >= RACETKA.x
        && APPLE2.x + APPLE.radius <= RACETKA.x + RACETKA.size
        && APPLE2.y + APPLE.radius >= RACETKA.y + APPLE.radius
        && APPLE2.y - APPLE.radius <= RACETKA.y;
    if (crossesUpperWall) {
        score = score + 1;
        APPLE2.imgIsLoad = false;
        APPLE2.yDirection = 0;
        APPLE2.y = 0;
        spedapple2 = spedapple2 + score*0.001*spedapple2;
    }
}

function updateApple1() {
    APPLE1.imgIsLoad = true;
    APPLE1.yDirection = spedapple1;
    APPLE1.y = 0;
    APPLE1.x = getRandomArbitrary(min, max);
}

function updateApple2() {
    APPLE2.imgIsLoad = true;
    APPLE2.yDirection = spedapple2;
    APPLE2.y = 0;
    APPLE2.x = getRandomArbitrary(min, max);
}

function updateCal() {
    CAL.y += CAL.yDirection;
    if (CAL.y >= GAME.height - CAL.radius) {
        CAL.y = 5;
        CAL.x = getRandomArbitrary(min, max);
        CAL.yDirection = CAL.yDirection + score*0.001;
    }
    var crossesUpperWall = CAL.x + CAL.radius >= RACETKA.x
        && CAL.x + CAL.radius <= RACETKA.x + RACETKA.size
        && CAL.y + CAL.radius >= RACETKA.y + CAL.radius
        && CAL.y - CAL.radius <= RACETKA.y;
    if (crossesUpperWall) {
        CAL.y = 5;
        CAL.x = getRandomArbitrary(min, max);
        life = life - 1;
    }
}




// жизни игрока
function updatelifen() {
    if (life === 3) {
        LIFE.img.src = "life-run_from_the_dark.png";
    }
    if (life === 2) {
        LIFE.img.src = "life-aero_hockey.png";
    }
    if (life === 1) {
        LIFE.img.src = "life.png";
    }
    if (life <= 0) {
        LIFE.imgIsLoad = false;
        GameOver.imgIsLoad = true;
    }
}

function text() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "40px Arial";
    ctx.fillStyle = "#FF1B18";
    ctx.textAlign = "top";
    ctx.fillText("score:" + score, canvas.width / 40, canvas.height / 6);
}

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawField();
    drawApple();
    drawApple1();
    drawApple2();
    drawCal();
    drawlife();
    drawRacetca();
    drawGameOver();
}

function play() {
    drawFrame();
    getRandomArbitrary();
    updateApple();
    updateCal();
    updatelifen();
    text();
    requestAnimationFrame(play);
}



initField();
initApple();
initApple1();
initApple2();
initCal();
initRacetka();
initlife();
play();
initGameOver();
initEventsListeners();

let sAppel1 = setInterval(updateApple1, 13000);
let sAppel2 = setInterval(updateApple2, 21000);