// константы
var GAME = {
    score: 0,
    width: 800,
    height: 500,
    background: "#F5F0E1",
}
var PLAYER = {
    color: "white",
    x: 120,
    y: 360,
    speed: 0,
    size: 40,
}

var TRIANGLE1 = {
    color: "black",
    colorstroke: "white",
    x1: 580,
    y1: 400,
    x2: 600,
    y2: 360,
    x3: 620,
    y3: 400,
    speed: 5,
    shape: "triangle",
}
var LITTLETRIANGLE2 = {
    color: "black",
    colorstroke: "white",
    x1: 880,
    y1: 400,
    x2: 900,
    y2: 380,
    x3: 920,
    y3: 400,
    speed: 5,
    shape: "triangle",
}
var TRIANGLE3 = {
    color: "black",
    colorstroke: "white",
    x1: 920,
    y1: 400,
    x2: 940,
    y2: 360,
    x3: 960,
    y3: 400,
    speed: 5,
    shape: "triangle",
}

var LITTLETRIANGLE4 = {
    color: "black",
    colorstroke: "white",
    x1: 1280,
    y1: 400,
    x2: 1300,
    y2: 380,
    x3: 1320,
    y3: 400,
    speed: 5,
    shape: "triangle",
}
var TRIANGLE5 = {
    color: "black",
    colorstroke: "white",
    x1: 1320,
    y1: 400,
    x2: 1340,
    y2: 360,
    x3: 1360,
    y3: 400,
    speed: 5,
    shape: "triangle",
}
var BLOCK6 = {
    x: 1360,
    y: 360,
    width: 40,
    height: 40,
    speed: 5,
    shape: "block",
}
var THORNS7 = {
    x1: 1400,
    y1: 400,
    x2: 1410,
    y2: 380,
    x3: 1420,
    y3: 400,
    speed: 5,
    color: "#cda4de",
    shape: "thorns",
    colorstroke: "black",
    count: 10,
}
var BLOCK8 = {
    x: 1600,
    y: 360,
    width: 40,
    height: 40,
    speed: 5,
    shape: "block",
}
var BLOCK9 = {
    x: 1600,
    y: 320,
    width: 40,
    height: 40,
    speed: 5,
    shape: "block",
}
var THORNS10 = {
    x1: 1640,
    y1: 400,
    x2: 1650,
    y2: 380,
    x3: 1660,
    y3: 400,
    speed: 5,
    color: "#cda4de",
    shape: "thorns",
    colorstroke: "black",
    count: 10,
}
var BLOCK11 = {
    x: 1840,
    y: 360,
    width: 40,
    height: 40,
    speed: 5,
    shape: "block",
}
var BLOCK12 = {
    x: 1840,
    y: 320,
    width: 40,
    height: 40,
    speed: 5,
    shape: "block",
}
var BLOCK13 = {
    x: 1840,
    y: 280,
    width: 40,
    height: 40,
    speed: 5,
    shape: "block",
}
var TRIANGLE14 = {
    color: "black",
    colorstroke: "white",
    x1: 2140,
    y1: 400,
    x2: 2160,
    y2: 360,
    x3: 2180,
    y3: 400,
    speed: 5,
    shape: "triangle",
}
var GO15 = {
    color: "#ff1493",
    x1: 2140,
    y1: 100,
    x2: 2190,
    y2: 150,
    x3: 2140,
    y3: 200,
    speed: 5,
}
var BLOCK15 = {
    x: 2180,
    y: 360,
    width: 500,
    height: 40,
    speed: 5,
    shape: "block",
}
var THORNS16 = {
    x1: 2680,
    y1: 400,
    x2: 2690,
    y2: 380,
    x3: 2700,
    y3: 400,
    speed: 5,
    color: "#cda4de",
    shape: "thorns",
    colorstroke: "black",
    count: 10,
}
var BLOCK17 = {
    x: 2880,
    y: 320,
    width: 300,
    height: 80,
    speed: 5,
    shape: "block",
}
var THORNS18 = {
    x1: 3180,
    y1: 400,
    x2: 3190,
    y2: 380,
    x3: 3200,
    y3: 400,
    speed: 5,
    color: "#cda4de",
    shape: "thorns",
    colorstroke: "black",
    count: 10,
}
var BLOCK19 = {
    x: 3380,
    y: 280,
    width: 300,
    height: 120,
    speed: 5,
    shape: "block",
}
var TRIANGLE20 = {
    color: "black",
    colorstroke: "white",
    x1: 3680,
    y1: 400,
    x2: 3700,
    y2: 360,
    x3: 3720,
    y3: 400,
    speed: 5,
    shape: "triangle",
}
var BLOCK21 = {
    x: 3720,
    y: 320,
    width: 40,
    height: 80,
    speed: 5,
    shape: "block",
}
var TRIANGLE22 = {
    color: "black",
    colorstroke: "white",
    x1: 3760,
    y1: 400,
    x2: 3780,
    y2: 360,
    x3: 3800,
    y3: 400,
    speed: 5,
    shape: "triangle",
}
var BLOCK23 = {
    x: 3800,
    y: 360,
    width: 40,
    height: 40,
    speed: 5,
    shape: "block",
}
var LITTLETRIANGLE24 = {
    color: "black",
    colorstroke: "white",
    x1: 3840,
    y1: 400,
    x2: 3860,
    y2: 380,
    x3: 3880,
    y3: 400,
    speed: 5,
    shape: "triangle",
}
var TRIANGLE25 = {
    color: "black",
    colorstroke: "white",
    x1: 4240,
    y1: 400,
    x2: 4260,
    y2: 360,
    x3: 4280,
    y3: 400,
    speed: 5,
    shape: "triangle",
}
var TRIANGLE26 = {
    color: "black",
    colorstroke: "white",
    x1: 4640,
    y1: 400,
    x2: 4660,
    y2: 360,
    x3: 4680,
    y3: 400,
    speed: 5,
    shape: "triangle",
}
var LITTLETRIANGLE27 = { //////////
    color: "black",
    colorstroke: "white",
    x1: 5240,
    y1: 400,
    x2: 5260,
    y2: 380,
    x3: 5280,
    y3: 400,
    speed: 5,
    shape: "triangle",
}
var TRIANGLE28 = {
    color: "black",
    colorstroke: "white",
    x1: 5280,
    y1: 400,
    x2: 5300,
    y2: 360,
    x3: 5320,
    y3: 400,
    speed: 5,
    shape: "triangle",
}
var BLOCK29 = {
    x: 5320,
    y: 360,
    width: 40,
    height: 40,
    speed: 5,
    shape: "block",
}
var THORNS30 = {
    x1: 5360,
    y1: 400,
    x2: 5370,
    y2: 380,
    x3: 5380,
    y3: 400,
    speed: 5,
    color: "#cda4de",
    shape: "thorns",
    colorstroke: "black",
    count: 10,
}
var BLOCK31 = {
    x: 5560,
    y: 360,
    width: 40,
    height: 40,
    speed: 5,
    shape: "block",
}
var BLOCK32 = {
    x: 5560,
    y: 320,
    width: 40,
    height: 40,
    speed: 5,
    shape: "block",
}
var THORNS33 = {
    x1: 5600,
    y1: 400,
    x2: 5610,
    y2: 380,
    x3: 5620,
    y3: 400,
    speed: 5,
    color: "#cda4de",
    shape: "thorns",
    colorstroke: "black",
    count: 10,
}
var BLOCK34 = {
    x: 5800,
    y: 360,
    width: 40,
    height: 40,
    speed: 5,
    shape: "block",
}
var BLOCK35 = {
    x: 5800,
    y: 320,
    width: 40,
    height: 40,
    speed: 5,
    shape: "block",
}
var BLOCK36 = {
    x: 5800,
    y: 280,
    width: 40,
    height: 40,
    speed: 5,
    shape: "block",
}
var TRIANGLE37 = {
    color: "black",
    colorstroke: "white",
    x1: 5840,
    y1: 400,
    x2: 5860,
    y2: 360,
    x3: 5880,
    y3: 400,
    speed: 5,
    shape: "triangle",
}
var BACKGROUND = {
    x: 0,
    y: 0,
    width: 800,
    height: 800,
}
var GROUND = {
    x: 0,
    y: 400,
    width: 800,
    height: 400,
}
var STARTOFGAME = {
    x: 0,
    y: 0,
    width: 800,
    height: 500,
}
var LOGO = {
    x: 50,
    y: 150,
    width: 700,
    height: 110,
}
var BUTTONOFSTART = {
    x: 355,
    y: 270,
    width: 100,
    height: 100,
}
var ENDOFGAME = {
    x: 150,
    y: 45,
    width: 500,
    height: 370,
    color: 'rgba(0, 0, 0, 0.5)',
    colorstroke: '#99ff33',
    colorelem: '#33ffff'
}
var BUTTONOFREPEAT = {
    x: ENDOFGAME.x + ENDOFGAME.width / 2 - 50,
    y: ENDOFGAME.y + ENDOFGAME.height - 25,
    width: 100,
    height: 100,
}
var WIN = 0;
var BUTTON = {
    x: 358,
    y: 388,
    r: 42,
    d: 84,
}
// массив со всеми препятствиями
var OBSTACLES = [
    TRIANGLE1,
    LITTLETRIANGLE2,
    TRIANGLE3,
    LITTLETRIANGLE4,
    TRIANGLE5,
    BLOCK6,
    THORNS7,
    BLOCK8,
    BLOCK9,
    THORNS10,
    BLOCK11,
    BLOCK12,
    BLOCK13,
    TRIANGLE14,
    BLOCK15,
    THORNS16,
    BLOCK17,
    THORNS18,
    BLOCK19,
    TRIANGLE20,
    BLOCK21,
    TRIANGLE22,
    BLOCK23,
    LITTLETRIANGLE24,
    TRIANGLE25,
    TRIANGLE26,
    LITTLETRIANGLE27,
    TRIANGLE28,
    BLOCK29,
    THORNS30,
    BLOCK31,
    BLOCK32,
    THORNS33,
    BLOCK34,
    BLOCK35,
    BLOCK36,
    TRIANGLE37,
];
// var WIN = 0;
var ATTEMPT = {
    x: 350,
    y: 150,
    count: 1,
}
var aud = new Audio();
aud.src = './music.mp3';
var START = 0;
var NUMBEROFJUMPS = 0;
var SAVEOBSTACLES = JSON.parse(JSON.stringify(OBSTACLES));
var SECONDS = 0;
var FLY = false;
var UP = true;
var GAMEOVER = false;
// переменные фона, пола и старта
var ground = new Image();
ground.src = './ground.jpg';
var background = new Image();
background.src = './background.jpg';
var startofgame = new Image();
startofgame.src = './startofgame.png';
var logo = new Image();
logo.src = './logo.png';
var buttonofstart = new Image();
buttonofstart.src = './buttonofstart.png';
var picblock = new Image();
picblock.src = './block.jpg';
var buttonofrepeat = new Image();
buttonofrepeat.src = './buttonofrepeat.png';

// подготовка инструментов рисования
var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

function drawBackgroundGround() {
    canvasContext.drawImage(background, BACKGROUND.x, BACKGROUND.y, BACKGROUND.width, BACKGROUND.height);
    canvasContext.drawImage(ground, GROUND.x, GROUND.y, GROUND.width, GROUND.height);
}
// объявляем функцию отрисовки игрока
function drawPlayer(player) {
    canvasContext.fillStyle = player.color;
    canvasContext.beginPath();
    canvasContext.moveTo(player.x + 5, player.y);
    canvasContext.lineTo(player.x + 5, player.y + 5);
    canvasContext.lineTo(player.x, player.y + 5);
    canvasContext.lineTo(player.x, player.y + player.size - 10);
    canvasContext.lineTo(player.x + 7, player.y + player.size - 10);
    canvasContext.lineTo(player.x + 7, player.y + player.size); // 132 137
    canvasContext.lineTo(player.x + player.size - 7, player.y + player.size);
    canvasContext.lineTo(player.x + player.size - 7, player.y + player.size - 10);
    canvasContext.lineTo(player.x + player.size, player.y + player.size - 10);
    canvasContext.lineTo(player.x + player.size, player.y + 5);
    canvasContext.lineTo(player.x + player.size - 5, player.y + 5);
    canvasContext.lineTo(player.x + player.size - 5, player.y);
    canvasContext.closePath();
    canvasContext.fill();
    canvasContext.fillStyle = "blue";
    canvasContext.fillRect(player.x + 9, player.y + 15, 7, 7);
    canvasContext.fillStyle = "blue";
    canvasContext.fillRect(player.x + 24, player.y + 12, 7, 10);
}
// объявляем функцию отрисовки блока
function drawBlock(block) {
    canvasContext.drawImage(picblock, block.x, block.y, block.width, block.height);
}
function drawTriangle(triangle) {
    canvasContext.fillStyle = triangle.color;
    canvasContext.strokeStyle = triangle.colorstroke;
    canvasContext.lineWidth = 2;
    canvasContext.beginPath();
    canvasContext.moveTo(triangle.x1, triangle.y1);
    canvasContext.lineTo(triangle.x2, triangle.y2);
    canvasContext.lineTo(triangle.x3, triangle.y3);
    canvasContext.closePath();
    canvasContext.fill();
    canvasContext.stroke();
}
function drawGo(go) {
    canvasContext.fillStyle = go.color;
    canvasContext.strokeStyle = go.colorstroke;
    canvasContext.lineWidth = 2;
    canvasContext.beginPath();
    canvasContext.moveTo(go.x1, go.y1);
    canvasContext.lineTo(go.x2, go.y2);
    canvasContext.lineTo(go.x3, go.y3);
    canvasContext.closePath();
    canvasContext.fill();
    canvasContext.stroke();
}
function drawAttempt(attempt) {
    canvasContext.font = "30px Verdana";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Attempt " + attempt.count, attempt.x, attempt.y); // название уровня Odintsov_Andrey БЛОК
}
function drawThorns(thorns) {
    for(var i = 0; i < thorns.count; i++){
        canvasContext.fillStyle = thorns.color;
        canvasContext.strokeStyle = thorns.colorstroke;
        canvasContext.lineWidth = 2;
        canvasContext.beginPath();
        canvasContext.moveTo(thorns.x1 + 20 * i, thorns.y1);
        canvasContext.lineTo(thorns.x2 + 20 * i, thorns.y2);
        canvasContext.lineTo(thorns.x3 + 20 * i, thorns.y3);
        canvasContext.closePath();
        canvasContext.fill();
        canvasContext.stroke();
      }
      
}
function drawObstacles() {
    for (el of OBSTACLES) {
        if (el.shape === "triangle"){
            drawTriangle(el);
        }
        else if (el.shape === "block"){
            drawBlock(el);
        }
        else if (el.shape === "thorns"){
            drawThorns(el);
        }
    }
    // drawTriangle(TRIANGLE1);
    // drawTriangle(TRIANGLE2);
    // drawTriangle(LITTLETRIANGLE3);
}
// объявляем функцию отрисовки кадра
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackgroundGround();
    drawGo(GO15);
    drawPlayer(PLAYER);
    drawObstacles(OBSTACLES);
    drawAttempt(ATTEMPT);
}
function updateObstacles() {
    updateGo(GO15);
    for (el of OBSTACLES) {
        if (el.shape === "triangle") {
            // проверка правой нижней точки игрока на вхождение в треугольник и его границы
            var first = Square(el.x1, el.y1, el.x2, el.y2, PLAYER.x + PLAYER.size, PLAYER.y + PLAYER.size);
            var second = Square(el.x1, el.y1, el.x3, el.y3, PLAYER.x + PLAYER.size, PLAYER.y + PLAYER.size);
            var third = Square(el.x2, el.y2, el.x3, el.y3, PLAYER.x + PLAYER.size, PLAYER.y + PLAYER.size);
            var big = Square(el.x1, el.y1, el.x2, el.y2, el.x3, el.y3);
            // проверка левой нижней точки игрока на вхождение в треугольник и его границы
            var first2 = Square(el.x1, el.y1, el.x2, el.y2, PLAYER.x, PLAYER.y + PLAYER.size);
            var second2 = Square(el.x1, el.y1, el.x3, el.y3, PLAYER.x, PLAYER.y + PLAYER.size);
            var third2 = Square(el.x2, el.y2, el.x3, el.y3, PLAYER.x, PLAYER.y + PLAYER.size);
            var big2 = Square(el.x1, el.y1, el.x2, el.y2, el.x3, el.y3);
            // проверка средней нижней точки игрока на вхождение в треугольник и его границы
            var first3 = Square(el.x1, el.y1, el.x2, el.y2, PLAYER.x + PLAYER.size / 2, PLAYER.y + PLAYER.size);
            var second3 = Square(el.x1, el.y1, el.x3, el.y3, PLAYER.x + PLAYER.size / 2, PLAYER.y + PLAYER.size);
            var third3 = Square(el.x2, el.y2, el.x3, el.y3, PLAYER.x + PLAYER.size / 2, PLAYER.y + PLAYER.size);
            var big3 = Square(el.x1, el.y1, el.x2, el.y2, el.x3, el.y3);
            if ((first + second + third === big) || (first2 + second2 + third2 === big2) ||
            (first3 + second3 + third3 === big3)) {
                GAMEOVER = true;
            }
            updateTriange(el);
        }
        else if (el.shape === "thorns") {
            if (PLAYER.x + PLAYER.size >= el.x1 && PLAYER.x <= el.x1 + 20 * el.count &&
                 PLAYER.y + PLAYER.size >= el.y2 && PLAYER.y <= el.y1) {
                GAMEOVER = true;
            }
            updateThorns(el);
        }
        else if (el.shape === "block") {
            if (PLAYER.x + PLAYER.size >= el.x && PLAYER.x <= el.x + el.width && 
                PLAYER.y + PLAYER.size - 11 >= el.y && PLAYER.y <= el.y + el.height) {
                GAMEOVER = true;
            }
            updateBlock(el);
    }
}
}
function Square(x1, y1, x2, y2, x3, y3) {
  return Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)) / 2
}
function updateThorns(thorns) {
    thorns.x1 -= thorns.speed;
    thorns.x2 -= thorns.speed;
    thorns.x3 -= thorns.speed;
    if (thorns.x3 <= -1000) {
        OBSTACLES.splice(0, 1);
    }
}
// объявляем функцию пересчета позиции блока
function updateBlock(block) {
    block.x -= block.speed;
    if (block.x <= -1000) {
        OBSTACLES.splice(0, 1);
    }
}

// объявляем функцию пересчета позиции треугольника
function updateTriange(triangle) {
    triangle.x1 -= triangle.speed;
    triangle.x2 -= triangle.speed;
    triangle.x3 -= triangle.speed;
    if (triangle.x3 <= -1000) {
        OBSTACLES.splice(0, 1);
    }
}
function updateGo(go) {
    go.x1 -= go.speed;
    go.x2 -= go.speed;
    go.x3 -= go.speed;
}
function updateAttempt(attempt) {
    if (attempt.x > -200) {
        attempt.x -= TRIANGLE1.speed;
    } 
}
function timer() {
    if (GAMEOVER === false) {
        SECONDS += 1;
    }
}

// объявляем функцию перелистывания кадров
function play() { 
    //console.log(SECONDS);
    if (WIN === 1) {
        drawWinner(ENDOFGAME);
    }
    else if (! GAMEOVER && START === 1) {
        if (SECONDS === 23) {
            drawFrame();
            drawWinner(ENDOFGAME);
            stop(aud);
            WIN = 1;
        }
        else {
            drawFrame();
            updatePlayer();
            updateObstacles();
            updateAttempt(ATTEMPT);
            if (FLY === true && !GAMEOVER) {
                fly();
        }
        }
    }
    else if (START === 0) {
        drawStartOfGame();
    }
    else {
        PLAYER.speed = 0;
        drawFrame();
        drawEndOfGame(ENDOFGAME);
        stop(aud);
    }
    requestAnimationFrame(play);
}
function drawStartOfGame() {
    canvasContext.drawImage(startofgame, STARTOFGAME.x, STARTOFGAME.y, STARTOFGAME.width, STARTOFGAME.height);
    canvasContext.drawImage(logo, LOGO.x, LOGO.y, LOGO.width, LOGO.height);
    canvasContext.drawImage(buttonofstart, BUTTONOFSTART.x, BUTTONOFSTART.y, BUTTONOFSTART.width, BUTTONOFSTART.height);
}
function drawWinner() {
    drawWindow(ENDOFGAME);
    canvasContext.font = "35px Verdana";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("You are the winner!", 260, 250); // победитель
}
function drawWindow(endofgame){
    canvasContext.fillStyle = endofgame.color;
    canvasContext.fillRect(endofgame.x, endofgame.y, endofgame.width, endofgame.height);
    canvasContext.fillStyle = endofgame.colorstroke;
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 4;
    canvasContext.fillRect(endofgame.x, endofgame.y, endofgame.width, 40); // зелёный сверху
    canvasContext.strokeRect(endofgame.x, endofgame.y, endofgame.width, 40);
    canvasContext.fillStyle = endofgame.colorstroke;
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 4;
    canvasContext.fillRect(endofgame.x, endofgame.y, 15, endofgame.height); // зелёный слева
    canvasContext.strokeRect(endofgame.x, endofgame.y, 15, endofgame.height);
    canvasContext.fillStyle = endofgame.colorstroke;
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 4;
    canvasContext.fillRect(endofgame.x + endofgame.width - 15, endofgame.y, 15, endofgame.height); // зелёный справа
    canvasContext.strokeRect(endofgame.x + endofgame.width - 15, endofgame.y, 15, endofgame.height);
    canvasContext.fillStyle = endofgame.colorstroke;
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 4;
    canvasContext.fillRect(endofgame.x + 20, endofgame.y + endofgame.height, endofgame.width - 40, 40); // зелёный снизу
    canvasContext.strokeRect(endofgame.x + 20, endofgame.y + endofgame.height, endofgame.width - 40, 40);
    canvasContext.fillStyle = endofgame.colorelem; // бирюзовый слева сверху
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 4;
    canvasContext.fillRect(endofgame.x - 20, endofgame.y, 40, 40);
    canvasContext.strokeRect(endofgame.x - 20, endofgame.y, 40, 40);
    canvasContext.fillStyle = endofgame.colorelem; // бирюзовый справа сверху
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 4;
    canvasContext.fillRect(endofgame.x + endofgame.width - 20, endofgame.y, 40, 40);
    canvasContext.strokeRect(endofgame.x + endofgame.width - 20, endofgame.y, 40, 40);
    canvasContext.fillStyle = endofgame.colorelem; // бирюзовый слева снизу
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 4;
    canvasContext.fillRect(endofgame.x - 20, endofgame.y + endofgame.height, 40, 20);
    canvasContext.strokeRect(endofgame.x - 20, endofgame.y + endofgame.height, 40, 20);
    canvasContext.fillStyle = endofgame.colorelem; // бирюзовый справа снизу
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 4;
    canvasContext.fillRect(endofgame.x + endofgame.width - 20, endofgame.y + endofgame.height, 40, 20);
    canvasContext.strokeRect(endofgame.x + endofgame.width - 20, endofgame.y + endofgame.height, 40, 20);
    canvasContext.fillStyle = endofgame.colorelem; // бирюзовый посередине снизу
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 4;
}
function drawEndOfGame(endofgame) {
    drawWindow(endofgame);
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 4;
    canvasContext.fillRect(endofgame.x + endofgame.width / 2 - 75, endofgame.y + endofgame.height, 150, 40);
    canvasContext.strokeRect(endofgame.x + endofgame.width / 2 - 75, endofgame.y + endofgame.height, 150, 40);
    canvasContext.drawImage(buttonofrepeat, BUTTONOFREPEAT.x, BUTTONOFREPEAT.y, BUTTONOFREPEAT.width, BUTTONOFREPEAT.height);
    canvasContext.font = "30px Verdana";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Striker", 352, 150); // название уровня 1 БЛОК
    canvasContext.font = "20px Verdana";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Attempt " + ATTEMPT.count, 360, 190); // попытка
    canvasContext.font = "20px Verdana";
    canvasContext.fillStyle = "white";
    var proc = SECONDS * 100 / 20;
    canvasContext.fillText(proc+"%", 380, 230); // процент прохождения
    canvasContext.font = "25px Verdana";
    canvasContext.fillStyle = "#ffbf00";
    canvasContext.fillText("Jumps: " + NUMBEROFJUMPS, 350, 280); // количество прыжков 2 БЛОК
    var min = (SECONDS - SECONDS % 60) / 60;
    if (min <= 9) {
        min = "0" + min;
    }
    var sec = SECONDS  - min * 60;
    if (sec <= 9) {
        sec = "0" + sec;
    }
    canvasContext.font = "25px Verdana";
    canvasContext.fillStyle = "#ffbf00";
    canvasContext.fillText("Time: " + min + ":"+sec, 330, 320); // время
}
//объявляем функцию прослушивания событий
function initEventsListeners() {
    window.addEventListener("keydown", onCanvasKeyDown);
    window.addEventListener("mousedown", onCanvasMouseDown);
}

//объявляем обработчик нажатия клавиши
function onCanvasKeyDown(event) {
    if (event.key === "ArrowUp" && !FLY) {
        FLY = true;
        NUMBEROFJUMPS += 1;
        UP = true;
        PLAYER.speed = 11;
    }
}
function stop(aud) {
    aud.pause();
    aud.currentTime = 0.0;
}
function onCanvasMouseDown(event) {
    if (START === 0 && event.clientX >= BUTTONOFSTART.x 
        && event.clientX <= BUTTONOFSTART.x + BUTTONOFSTART.width
        && event.clientY >= BUTTONOFSTART.y && event.clientY <= BUTTONOFSTART.y + BUTTONOFSTART.height) {
            START = 1;

            aud.play();
        }
    else if (event.clientX >= BUTTON.x && event.clientX <= BUTTON.x + BUTTON.d
        && event.clientY >= BUTTON.y && event.clientY <= BUTTON.y + BUTTON.d && GAMEOVER === true) {
            OBSTACLES = JSON.parse(JSON.stringify(SAVEOBSTACLES));
            GAMEOVER = false;
            PLAYER.x = 120;
            PLAYER.y = 360;
            FLY = false;
            NUMBEROFJUMPS = 0;
            ATTEMPT.x = 350;
            ATTEMPT.count += 1;
            GO15.x1 = 2140,
            GO15.x2 = 2190,
            GO15.x3 = 2140,
            aud.play();
            SECONDS = 0;
        }
}
function updatePlayer() {
    if (!checkFly()) {
        FLY = true;
    }

}

function checkFly() {
    for (el of OBSTACLES) {
        if (el.shape === "block") {
            if ((PLAYER.y + PLAYER.size >= el.y && PLAYER.x + PLAYER.size >= el.x 
                && PLAYER.x <= el.x + el.width)) {
                        PLAYER.y = el.y - PLAYER.size;
                        return true;
                    }
        }
    }
    if (PLAYER.y + PLAYER.size >= GROUND.y) {
        PLAYER.y = GROUND.y - PLAYER.size
        return true
    }
    return false;
}
// объявляем функцию прыжка
function fly(){
    PLAYER.y -= PLAYER.speed;
    if (PLAYER.speed > -12) {
        PLAYER.speed -= 0.5;
        }
    if (checkFly()) {
        FLY = false;
        PLAYER.speed = 0;
    }


    // if (PLAYER.speed > 0 && UP === true){
    //     PLAYER.y -= PLAYER.speed;
    //     PLAYER.speed -= 0.Nasonova_Maria;
    // }
    // else {
    //     PLAYER.y += PLAYER.speed;
    //     PLAYER.speed += 0.Nasonova_Maria;
    //     UP = false;
    // }
    // if (PLAYER.y + PLAYER.size >= GROUND.y) {
    //     JUMP = false;
    //     PLAYER.speed -= 0.Nasonova_Maria;
    //     PLAYER.y -= GROUND.y - PLAYER.y;
    // }
}



setInterval(timer, 1000);
// soundClick()
initEventsListeners();
play();