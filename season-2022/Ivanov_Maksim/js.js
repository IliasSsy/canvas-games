var GAME = {
    width: 700,
    height: 1200,
    background: "#B22222"
}

var canvas = document.getElementById("canvas");
canvas.width = 1850;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");
const stair = new Image();
stair.src = "stair.png";
const gorilla = new Image();
gorilla.src = "gorilla.png";
const princess = new Image();
princess.src = "princess.png";
const persleft = new Image();
persleft.src = "persleft.png";
const persright = new Image();
persright.src = "persright.png";
const win = new Image();
win.src = "end.png";
const lose = new Image();
lose.src = "lose.png";
var speed = 0
var a = 0.2
var starttime = Date.now()
var starttime_ = Date.now()
var time = 0
var start = false
var over = false
var jump = false
var left = false
var right = false
var up = false
var win_ = false
var PERS = {
    x: 550,
    y: 1105,
    xDirection: 4,
    yDirection: 0.7733333,
    L: true,
    R: false,
    w: 50,
    h: 60
}


var PLATFORM1 = {
    x1: 0,
    y1: 80,
    x2: GAME.width - 100,
    y2: 200,
    x3: GAME.width - 100,
    y3: 220,
    x4: 0,
    y4: 100,
}

var PLATFORM2 = {
    x1: GAME.width,
    y1: 320,
    x2: 100,
    y2: 440,
    x3: 100,
    y3: 460,
    x4: GAME.width,
    y4: 340,
}

var PLATFORM3 = {
    x1: 0,
    y1: 560,
    x2: GAME.width - 100,
    y2: 680,
    x3: GAME.width - 100,
    y3: 700,
    x4: 0,
    y4: 580,
}

var PLATFORM4 = {
    x1: GAME.width,
    y1: 800,
    x2: 100,
    y2: 920,
    x3: 100,
    y3: 940,
    x4: GAME.width,
    y4: 820,
}

var PLATFORM5 = {
    x1: 0,
    y1: 1040,
    x2: GAME.width - 100,
    y2: 1160,
    x3: GAME.width - 100,
    y3: 1180,
    x4: 0,
    y4: 1060,
}

var BALLS = []

var RACKET = { 
    color: "black",
}

function addball() {
    BALLS.push({
        color: "#FF6E40",
        x: 90,
        y: 85,
        radius: 10,
        xDirection: 4,
        yDirection: 0.7733333,
    })
}
addball()

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    canvasContext.drawImage(stair, 250, 60, 50, 85)
    canvasContext.drawImage(princess, 235, 0, 80, 60)
    canvasContext.drawImage(stair, 500, 190, 50, 170)
    canvasContext.drawImage(stair, 200, 310, 50, 115)
    canvasContext.drawImage(stair, 380, 390, 50, 255)
    canvasContext.drawImage(stair, 200, 615, 50, 285)
    canvasContext.drawImage(stair, 550, 740, 50, 100)
    canvasContext.drawImage(stair, 100, 920, 50, 150)
    canvasContext.drawImage(gorilla, 0, 0, 90, 90)
    drawPlatformers(PLATFORM1.x1, PLATFORM1.y1, PLATFORM1.x2, PLATFORM1.y2, PLATFORM1.x3, PLATFORM1.y3, PLATFORM1.x4, PLATFORM1.y4);
    drawPlatformers(PLATFORM2.x1, PLATFORM2.y1, PLATFORM2.x2, PLATFORM2.y2, PLATFORM2.x3, PLATFORM2.y3, PLATFORM2.x4, PLATFORM2.y4);
    drawPlatformers(PLATFORM3.x1, PLATFORM3.y1, PLATFORM3.x2, PLATFORM3.y2, PLATFORM3.x3, PLATFORM3.y3, PLATFORM3.x4, PLATFORM3.y4);
    drawPlatformers(PLATFORM4.x1, PLATFORM4.y1, PLATFORM4.x2, PLATFORM4.y2, PLATFORM4.x3, PLATFORM4.y3, PLATFORM4.x4, PLATFORM4.y4);
    drawPlatformers(PLATFORM5.x1, PLATFORM5.y1, PLATFORM5.x2, PLATFORM5.y2, PLATFORM5.x3, PLATFORM5.y3, PLATFORM5.x4, PLATFORM5.y4);
    for (var ball of BALLS) {
        drawBall(ball)
    }
    drawPers()
    drawDigits()
    drawInstruction()
}

function drawPlatformers(x1, y1, x2, y2, x3, y3, x4, y4) {
    canvasContext.fillStyle = "#2F4F4F"
    canvasContext.beginPath()
    canvasContext.moveTo(x1, y1)
    canvasContext.lineTo(x2, y2)
    canvasContext.lineTo(x3, y3)
    canvasContext.lineTo(x4, y4)
    canvasContext.closePath()
    canvasContext.fill()
}

function drawInstruction() {
    canvasContext.fillStyle = RACKET.color;
    canvasContext.fillRect(700, 0, 1850, 900);
    canvasContext.font = "60px Arial"
    canvasContext.fillStyle = "white"
    canvasContext.fillText("Прыжок - Пробел", 700, 50)
    canvasContext.fillText("Влево - Стрелка Влево", 700, 110)
    canvasContext.fillText("Вправо - Стрелка Вправо", 700, 170)
    canvasContext.fillText("По лестнице - Стрелка Вверх", 700, 230)
    canvasContext.fillText("Старт через 5 секунд", 700, 290)
    canvasContext.fillText("Цель: дойти до принцессы", 700, 350)
    canvasContext.fillText("Жизнь всего одна", 700, 410)
    canvasContext.fillText("Отдали страницу, чтобы видеть всю игру", 700, 470)
    canvasContext.fillText("Чтобы отдалить или приблизить, нужно", 700, 530)
    canvasContext.fillText("зажать ctrl и вращать колесико мыши", 700, 590)
    canvasContext.fillText("Удачи!!! Пройдет сильнейший!!!", 700, 650)
    canvasContext.fillText("Если не прошли - нажмите на LOSE", 700, 710)
}

function drawPers() {
    if (PERS.R) {
        canvasContext.drawImage(persright, PERS.x, PERS.y, PERS.w, PERS.h)
    }
    if (PERS.L) {
        canvasContext.drawImage(persleft, PERS.x, PERS.y, PERS.w, PERS.h)
    }
}


function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}


function drawBall(ball) {
    canvasContext.fillStyle = ball.color;
    canvasContext.beginPath();
    canvasContext.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    canvasContext.fill();
}

function updateBall(ball) {
    ball.x += ball.xDirection;
    ball.y += ball.yDirection;
    if (((ball.y < 250) && (607 < ball.x) && (ball.x < 611)) || ((ball.y < 460) && (85 < ball.x) && (ball.x < 90) && (ball.y > 250)) || ((ball.y < 730) && (607 < ball.x) && (ball.x < 611) && (ball.y > 460)) || ((ball.y < 940) && (85 < ball.x) && (ball.x < 90) && (ball.y > 611)) || ((ball.y < 1200) && (607 < ball.x) && (ball.x < 611) && (ball.y > 940))) {
        ball.yDirection = 4;
        ball.xDirection = 0;
    }
    if (((325 < ball.y) && (ball.y < 327) && (607 < ball.x) && (ball.x < 611)) || ((803 < ball.y) && (ball.y < 807) && (607 < ball.x) && (ball.x < 611))) {
        ball.yDirection = 0.7733333;
        ball.xDirection = -4;
    }
    if (((565 < ball.y) && (ball.y < 570) && (85 < ball.x) && (ball.x < 90)) || ((1042 < ball.y) && (ball.y < 1047) && (85 < ball.x) && (ball.x < 90))) {
        ball.yDirection = 0.7733333;
        ball.xDirection = 4;
    }
    if (ball.y > GAME.height) {
        ball.y = 85
        ball.x = 90
    }
    if (ball.y === 85 && ball.x === 90) {
        ball.yDirection = 0.7733333;
        ball.xDirection = 4;
    }
    if (PERS.y < ball.y + ball.radius * 2 && PERS.y + PERS.h > ball.y && PERS.x < ball.x + ball.radius * 2 && PERS.x + PERS.w > ball.x) {
        over = true
    }
}


function initEventsListeners() {
    window.addEventListener("keydown", onCanvasKeyDown);
    window.addEventListener("keyup", onCanvasKeyUp);
    window.addEventListener("mousedown", onCanvasMouseDown);
}

function onCanvasMouseDown(event) {
    if (event.clientX >= 80 && event.clientX < 1000 && event.clientY >= 600 && event.clientY <= 1200 && over) {
        over = false
        BALLS = []
        PERS.x = 550
        PERS.y = 1105
        PERS.L = true
        PERS.R = false
        starttime_ = Date.now()
        starttime = Date.now()
        canvasContext.clearRect(0, 0, GAME.width, GAME.height)
        start = false
    }
}

function onCanvasKeyUp(event) {
    if (event.key === "ArrowLeft") {
        left = false
    }
    if (event.key === "ArrowRight") {
        right = false
    }
    if (event.key === "ArrowUp") {
        up = false
    }
}

function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        left = true
    }
    if (event.key === "ArrowRight") {
        right = true
    }
    if (event.key === "ArrowUp") {
        up = true
    }
    if (event.key === " " && !jump) {
        speed = -7
        jump = true
    }
}

function Jump() {
    if (jump) {
        speed += a
    }
    if (speed > 7) {
        jump = false
        speed = 0
    }
}

function updatePlayer(player) {
    player.y += speed
    if (left && PERS.x <= 552 && PERS.x > 2 && (PERS.y > 999 || (PERS.y > 470 && PERS.y < 680) || (PERS.y < 200 && PERS.y > 0))) {
        PERS.x -= PERS.xDirection;
        PERS.y -= 0.7733333;
        PERS.L = true
        PERS.R = false
    }
    if (right && PERS.x < 550 && PERS.x >= 0 && (PERS.y > 999 || (PERS.y > 470 && PERS.y < 680) || (PERS.y < 200 && PERS.y > 0))) {
        PERS.x += PERS.xDirection;
        PERS.y += 0.7733333;
        PERS.L = false
        PERS.R = true
    }
    if (left && PERS.x <= GAME.width - 78 && PERS.x > 72 && ((PERS.y < 870 && PERS.y > 680) || (PERS.y < 490 && PERS.y > 250))) {
        PERS.x -= PERS.xDirection;
        PERS.y += 0.7733333;
        PERS.L = true
        PERS.R = false
    }
    if (right && PERS.x < GAME.width - 80 && PERS.x >= 70 && ((PERS.y < 870 && PERS.y > 680) || (PERS.y < 490 && PERS.y > 250))) {
        PERS.x += PERS.xDirection;
        PERS.y -= 0.7733333;
        PERS.L = false
        PERS.R = true
    }
    if (up && (PERS.x >= 70 && PERS.x <= 100 && PERS.y > 863)) {
        PERS.y -= 7
    }
    if (up && (PERS.x >= 166 && PERS.x <= 202 && PERS.y < 847 && PERS.y > 550)) {
        PERS.y -= 5.5
    }
    if (up && (PERS.x >= 346 && PERS.x <= 386 && PERS.y < 610 && PERS.y > 323)) {
        PERS.y -= 4.5
    }
    if (up && (PERS.x >= 466 && PERS.x <= 502 && PERS.y < 330 && PERS.y > 140)) {
        PERS.y -= 6
    }
    if (up && (PERS.x >= 214 && PERS.x <= 254 && PERS.y < 100 && PERS.y > 20)) {
        PERS.y -= 80
    }
}

function drawDigits() {
    canvasContext.font = "600px Arial"
    canvasContext.fillStyle = "#00008B"
    if (Math.floor((Date.now() - starttime_) / 1000) === 0) {
        canvasContext.fillText("5", 200, 750)
    }
    if (Math.floor((Date.now() - starttime_) / 1000) === 1) {
        canvasContext.fillText("4", 200, 750)
    }
    if (Math.floor((Date.now() - starttime_) / 1000) === 2) {
        canvasContext.fillText("3", 200, 750)
    }
    if (Math.floor((Date.now() - starttime_) / 1000) === 3) {
        canvasContext.fillText("2", 200, 750)
    }
    if (Math.floor((Date.now() - starttime_) / 1000) === 4) {
        canvasContext.fillText("1", 200, 750)
    }
    if (Math.floor((Date.now() - starttime_) / 1000) === 5) {
        canvasContext.font = "150px Arial"
        canvasContext.fillText("START!!!", 50, 500)
    }
}

function drawOver() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
    canvasContext.font = "200px Arial"
    canvasContext.fillStyle = "white"
    canvasContext.fillText("LOSE", 80, 1000)
    canvasContext.drawImage(lose, 50, 100)
}

function play() {
    time = Date.now() - starttime
    console.log(time)
    if (!win_ && !over) {
        drawFrame();
        for (var ball of BALLS) {
            updateBall(ball);
        }
        Jump();
        if (PERS.y < 20 && PERS.x >= 200 && PERS.x <= 300) {
            win_ = true
            canvasContext.clearRect(0, 0, GAME.width, GAME.height);
            canvasContext.fillStyle = "#87CEEB";
            canvasContext.fillRect(0, 0, GAME.width, GAME.height);
            canvasContext.drawImage(win, 0, 0, 600, 450)
            canvasContext.font = "200px Arial"
            canvasContext.fillStyle = "#00008B"
            canvasContext.fillText("You win", 10, 600)
        }
        if (over) {
            drawOver()
        }
        if (Math.floor(time / 100) === 17 && BALLS.length <= 7) {
            addball()
            starttime += 1700
        }
        if (Math.floor((Date.now() - starttime_) / 100) === 50) {
            start = true
        }
        if (start) {
            updatePlayer(PERS);
    }
    }
    requestAnimationFrame(play);
}
initEventsListeners();
play();
