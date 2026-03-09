var GAME = {
    width: 1000,
    height: 900,
    }
var IRON = {
    x: 0,
    y: GAME.height - 200,
    width: 150,
    height: 200
}
var puli = [];
var slivy = [];
var xS = 0;
var xD = 0;
var yD = 0;
var timer = 0;
var aaa = 0;
var ccc = 0;
var bbb = 3;
var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;

var canvasContext = canvas.getContext("2d");
canvasContext.fillRect(0, 0, GAME.width, GAME.height);

var bum = new Image();
bum.src = './bum.png';
var hole = new Image();
hole.src = './spacehole.jpg';
function drawBackground() {
    //window.addEventListener('load', function() {
        canvasContext.drawImage(hole, 0, 0, GAME.width, GAME.height);
    //});
}
var sliva = new Image();
sliva.src = './thebestsliva.png';
function drawSliva() {
    //window.addEventListener('load', function() {
        canvasContext.drawImage(sliva, 350, -10, 300, 200);
    //});
}
var slivochka = new Image();
slivochka.src = './realslivochka.png';
function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
    }
function getRandomliva() {
    xS = getRandomInt(0, 900);
    xD = getRandomInt(1, 5);
    yD = getRandomInt(1, 5);
    var SLIVAA = {
        y: -50,
        x: xS,
        xDirection: xD,
        yDirection: yD,
    }
    slivy.push(SLIVAA);
}
function drawSlivochka(){
    for (let i = 0; i < slivy.length; i +=1) {
        canvasContext.drawImage(slivochka, slivy[i].x, slivy[i].y, 100, 100);
    }
}
function getPuli() {
    var PULIA = {
        y: IRON.y,
        x: IRON.x +75,
        yDirection: -6,
    }
    puli.push(PULIA);
}
function drawPul(){
    for (let i = 0; i < puli.length; i +=1) {
        canvasContext.drawImage(bum, puli[i].x, puli[i].y, 40, 80);
    }
}
function update() {

    timer++
    
    if (timer % 100 === 0) {
        getRandomliva();
    }

    for (var a = 0; a < slivy.length; a++) {
        slivy[a].x += slivy[a].xDirection;
        slivy[a].y += slivy[a].yDirection;
        if ((slivy[a].y + 100 > GAME.height)) {
            slivy[a].yDirection = -slivy[a].yDirection;
        }
        if ((slivy[a].x + 100 > GAME.width) || (slivy[a].x < 0)) {
            slivy[a].xDirection = -slivy[a].xDirection;
        }
        if (slivy[a].y >= 800) slivy.splice(a, 1);   
    }
    for (var i = 0; i < puli.length; i++) {
        puli[i].y += puli[i].yDirection;
        if (puli[i].y < 0) puli.splice(i, 1);
    }
}
var iron = new Image();
iron.src = './ironsweet.png';
function drawIron() {
    //window.addEventListener('load', function() {
        canvasContext.drawImage(iron, IRON.x, IRON.y, IRON.width, IRON.height);
    //});
}
function bumSliva() {
    for (var i = 0; i < puli.length; i++) {
        var needToDeletePuli = false;
        for (var a = 0; a < slivy.length; a++) {
            if ((puli[i].x + 20 > slivy[a].x) && (puli[i].x + 20 < slivy[a].x + 100) && (puli[i].y <= slivy[a].y + 100)) {
                slivy.splice(a, 1);
                needToDeletePuli = true;
                aaa += 1;
                a -= 1;
            }
        }
        if (needToDeletePuli) {
            puli.splice(i, 1);
            i -= 1;
        }
    }

}
function bumIron() {
    for (var a = 0; a < slivy.length; a++) {
        if ((IRON.y < slivy[a].y + 100) && ((IRON.x > slivy[a].x) && (IRON.x  < slivy[a].x + 100))) {
            slivy.splice(a, 1);
            bbb -= 1;
        }
        if ((IRON.y < slivy[a].y + 100) && ((IRON.x + IRON.width > slivy[a].x) && (IRON.x + IRON.width < slivy[a].x + 100))) {
            slivy.splice(a, 1);
            bbb -= 1;
        }
    }
}
function drawText() {
    canvasContext.font = "48px Arial";
    canvasContext.fillStyle = "OrangeRed";
    canvasContext.fillText("Score: " + aaa, 10, 50);
    canvasContext.font = "48px Arial";
    canvasContext.fillStyle = "OrangeRed";
    canvasContext.fillText("Lives: " + bbb, 800, 50);
}
function initEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener("click", onCanvasMouseClick);
}
function onCanvasMouseMove(event){
    IRON.x = event.clientX;
    if ((IRON.x + IRON.width) > GAME.width) {
    IRON.x = GAME.width - IRON.width
    }
}
function onCanvasMouseClick(){
    getPuli();
    drawPul();
}
function stop() {
    if (aaa === 30) {
        alert('Winner!!!');
    }
    if (bbb === 0) {
        alert('Game over');
    }
}
function drawFrame() {
    //canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawSliva();
    drawSlivochka();
    drawIron();
    drawPul();
    drawText();
}
function play() {
    drawFrame();
    update();
    bumSliva();
    bumIron();
    requestAnimationFrame(play);
    stop();
}
//getRandomliva();
initEventsListeners();
play();