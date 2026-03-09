var POLE = {
    width: window.innerWidth,
    height: window.innerHeight,
    background: "#C0C0C0",
    score: 0,
}

var backx = 0;
var backy = 0;

//подготовка инстрментов
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var canvasContext = canvas.getContext("2d");


//фон
canvasContext.fillStyle = POLE.background;
canvasContext.fillRect(0, 0, POLE.width, POLE.height);
console.log(window.innerWidth, window.innerHeight);


//создание мяча
var BALL = {
    color: "red",
    x: (1340),
    y: (681),
    radius: 60,
}

//массивы
let i = 0;
let arrx = 0;
let arry = 0;
let colorball = 0;

var arrBALLSR = [];
var arrBALLSX = [];
var arrBALLSY = [];
var arrCOLOR = [];

while (i <= 100) {
    arrBALLSR[i] = Math.random() * 15;
    i++;
}
while (arrx <= 100) {
    arrBALLSX[arrx] = (Math.random() * (POLE.width));
    arrx++;
}
while (arry <= 100) {
    arrBALLSY[arry] = (Math.random() * (POLE.height));
    arry++;
}
while (colorball <= 100) {
    arrCOLOR[colorball] = 'rgb(' + Math.random() * 256 + ',' + Math.random() * 256 + ',' + Math.random() * 256 + ')';
    colorball++
}
//конец массивов



//отрисока мячя
function drawBALL() {
    canvasContext.fillStyle = BALL.color;
    canvasContext.beginPath();
    canvasContext.arc(BALL.x, BALL.y, BALL.radius, 0, 2 * Math.PI)
    canvasContext.fill();
}

//объявляем функцию отрисовки кадра
function drawFrame() {
    canvasContext.clearRect(0, 0, POLE.width, POLE.height);
    drawBackground();
    drawsmallBALL();
    drawBALL();
    ballif();
}


//объявляем функцию отрисовки фона
function drawBackground() {
    canvasContext.fillStyle = POLE.background;
    canvasContext.fillRect(0, 0, POLE.width, POLE.height);
}



//отрисовка мелких мячиков
function drawsmallBALL() {
    let b = 0;
    while (b <= 100) {
        if (BALL.radius <= Math.sqrt((arrBALLSX[b] - BALL.x) * (arrBALLSX[b] - BALL.x) + (arrBALLSY[b] - BALL.y) * (arrBALLSY[b] - BALL.y))) {
            canvasContext.fillStyle = arrCOLOR[b];
            canvasContext.beginPath();
            canvasContext.arc(arrBALLSX[b], arrBALLSY[b], arrBALLSR[b], 0, 2 * Math.PI);
            canvasContext.fill();
        } else {
            BALL.radius = BALL.radius + arrBALLSR[b];
            arrBALLSR[b] = 0;
            arrBALLSX[b] = 0;
            arrBALLSY[b] = 0;
            POLE.score++;
        }
        b++;
    };

}


function ballif() {
    if (BALL.x >= POLE.width - BALL.radius) {
        BALL.x = POLE.width - BALL.radius;
    }
    if (BALL.y >= POLE.height - BALL.radius) {
        BALL.y = POLE.height - BALL.radius;
    }
    if (BALL.y - BALL.radius <= 0) {
        BALL.y = BALL.radius;
    }
    if (BALL.x - BALL.radius <= 0) {
        BALL.x = BALL.radius;
    };
}

//объявляем функцию перелистывания кадров
function play() {
    drawFrame();         //рисуем фон
    drawtext();
    drawend();
    requestAnimationFrame(play);    //просим браузер повторить то же самое на некст кадре
}


//функция движения мышки
function initEventListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove);
}

function drawend() {
    if (POLE.score >= 101 ||
        BALL.radius >= POLE.height/2 ) {
        let end = confirm("Поздравляю, ты прошел игру");
        if (end = true) {
            location.reload()
        }
    }
}

//функция события
function onCanvasMouseMove(event) {
    BALL.x = event.clientX;
    BALL.y = event.clientY;
}

function drawtext() {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = "48px times new roman";
    ctx.fillStyle = "#454545";
    ctx.fillText("Score " + POLE.score, 10, 50);
    ctx.strokeText("Score " + POLE.score, 10, 50);
}

initEventListeners();
play();

