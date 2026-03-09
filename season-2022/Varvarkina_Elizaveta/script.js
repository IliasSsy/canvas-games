var GAME = {
    width: 900,
    height: 500,
    background: "#FFCCCC"
}

var canvas = document.getElementById("canvas");
var canvasWidth = 300;
var canvasHeight = 300;
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");


var BALL = {
    color: "#9999FF",
    x: 300,
    y: 80,
    size: 20,
    width: 40,
    height: 40,
    xDirection: 5,
    yDirection: 7,
    score: 0,
}

var RACKET = {
    color: "#1E3D59",
    x: 200,
    y: 450,
    a: 60,
    b: 70,
    xDirection: 45,
}

function drawBall(BALL) {
    var img = new Image();
    img.src = './sun.png';
    canvasContext.drawImage(img, BALL.x, BALL.y, BALL.width, BALL.height);
}

function draw(ball) {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = "36px serif";
    ctx.fillStyle = '#FCBA03'
    ctx.fillText("Score: " + ball.score, 10, 50);
}

function drawRacket(RACKET) {
    var img = new Image();
    img.src = './rainb.png';
    canvasContext.drawImage(img, RACKET.x, RACKET.y, RACKET.b, RACKET.a);
}

function drawLose() {
    var img = new Image();
    img.src = './lose.png';
    canvasContext.drawImage(img, 370, 270, 100, 100);
}

//пересчет позиции мячика
function updateBall(ball, racket) {
    ball.x += ball.xDirection;
    ball.y += ball.yDirection;
    if (ball.y + ball.size / 2 > GAME.height) {
        canvasContext.fillStyle = GAME.background;
        canvasContext.fillRect(0, 0, GAME.width, GAME.height);

        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.font = "64px serif";
        ctx.fillStyle = '#FCBA03'
        ctx.fillText("You lose", 320, 250);
        drawLose();
    }

    if (ball.y - ball.size / 2 < 0) {
        ball.yDirection = -ball.yDirection;
    }

    if ((ball.x + ball.size / 2 > GAME.width) || (ball.x - ball.size / 2 < 0)) {
        ball.xDirection = -ball.xDirection;
    }
    if (
        (ball.y + ball.size / 2 > racket.y) &&
        (ball.x + ball.size / 2 > racket.x) &&
        (ball.y - ball.size / 2 < racket.y + racket.a) &&
        (ball.x - ball.size / 2 < racket.x + racket.b)
    ) {
        ball.yDirection = -ball.yDirection;
        ball.xDirection = -ball.xDirection;

        if (ball.y <= racket.y) {
            ball.score = ball.score + 1;
            console.log('score = ', ball.score)
        }
    }
}    

    //перелистывание кадров
    function play() {
        drawFrame();
        updateBall(BALL, RACKET);
        draw(BALL);
        requestAnimationFrame(play);
    }
    //функция отрисовки кадров
    function drawFrame() {
        canvasContext.clearRect(0, 0, GAME.width, GAME.height);
        drawBackground();
        drawBall(BALL);
        drawRacket(RACKET)
    }
    //фон
    function drawBackground() {
        var img = new Image();
        img.src = './2.jpg';
        canvasContext.drawImage(img, 0, 0, GAME.width, GAME.height);
    }

    function initEventsListeners() {
        window.addEventListener("mousemove", onCanvasMouseMove);
        window.addEventListener("keydown", onCanvasKeyDown);
    }

    function onCanvasMouseMove(event) {
        RACKET.x = event.clientX;
        clampRacketPosition();
    }
    initEventsListeners();

    function onCanvasKeyDown(event) {
        if (event.key === "ArrowLeft") {
            RACKET.x = RACKET.x - RACKET.xDirection;
        }
        if (event.key === "ArrowRight") {
            RACKET.x = RACKET.x + RACKET.xDirection;
        }
        clampRacketPosition();
    }

    function clampRacketPosition() {
        if (RACKET.x + RACKET.b > GAME.width) {
            RACKET.x = GAME.width - RACKET.b;
        }
        if (RACKET.x < 0) {
            RACKET.x = 0;
        }
    }

    play();