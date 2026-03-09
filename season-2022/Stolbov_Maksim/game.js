var GAME = {
    width: 1300,
    height: 1000,
    background: "#F5F0E1",
    score: 0
}


var MARIO = {
    x: 1000,
    y: 650,
    width: 20,
    height: 20,
    color: "red",
    speed: 30,
}

function drawMario(mario) {
    canvasContext.fillStyle = mario.color;
    canvasContext.fillRect(mario.x, mario.y, mario.width, mario.height)
}
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawMario(MARIO);
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}
function play() {
    drawFrame();
}
function initEvent() {
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener("keydown", onCanvasKeyDown);
} if (player.x < aster[a].x + player.width &&
    player.x + player.width > aster[a].x &&
    player.y < aster[a].y + player.height &&
    player.y + player.height > aster[a].y);

function play() {
    drawFrame();
    requestAnimationFrame(play);
}
function onCanvasMouseMove(event) {
    MARIO.x = event.clientX;
    MARIO.y = event.clientY;
}
function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        MARIO.x = MARIO.x - MARIO.speed;
    }
    if (event.key === "ArrowRight") {
        MARIO.x = MARIO.x + MARIO.speed;
    }
    if (event.key === "ArrowUp") {
        MARIO.y = MARIO.y - MARIO.speed;
    }
    if (event.key === "ArrowDown") {
        MARIO.y = MARIO.y + MARIO.speed;
    }
    clampMarioPosition();
}

function clampMarioPosition() {
    if (MARIO.x < 0) {
        MARIO.x = 0;
    }
    if (MARIO.x + MARIO.width > GAME.width) {
        MARIO.x = GAME.width - MARIO.width;
    }
    if (MARIO.y < 0) {
        MARIO.y = 0;
    }
    if (MARIO.y + MARIO.height > GAME.height) {
        MARIO.y = GAME.height - MARIO.height;
    }
}
function Timer() {
    var startTimer = function Timer() {
        console.log("Функция startTimer сработала");
    }
    setTimeout(startTimer, 3000);
}
initEvent();
play();
function stop() {
    if (Math.abs(player.x <= aster[a].x + aster[a].width) && Math.abs(player.x + player.width >= aster[a].x)) {

        alert("GAME OVER");
    }
}

function drawFrames() {
    drawGame();
}
var GAME = {
    x: 0,
    y: 0,
    width: 600,
    height: 600,
}

function doCollison(player, aster) {
    for (a in aster) {
        if (player.x < aster[a].x + 50 &&
            player.x + 50 > aster[a].x &&
            player.y < aster[a].y + 60 &&
            40 + player.y > aster[a].y) {
            return true;
        } else {
            return false;
        }
    }
    for (var t = 0; t < aster.length; t++) {
        console.log("ну типа вот");
        if (Math.abs(player.x <= aster[t].x + aster[t].width) && Math.abs(player.x + player.width >= aster[t].x)) {
            alert("GAME OVER");
        }
    }
    function stops() {
        for (var t = 0; t < aster.length; t++) {
            if (Math.abs(player.x < aster[t].x + aster[t].width)) {
                alert("GAME OVER");
            }
        }
    }
    if ((player.x + player.width >= aster[a].x)
        && (player.x <= aster[a].x + aster[a].width)
        && (player.y + player.height >= aster[a].y + aster[a].height)
        && (player.y <= aster[a].y - aster[a].height)) {
        if (Math.abs(player.x < aster[t].x + aster[t].width)) {
            alert("GAME OVER");
        }
    }
}
if (aster[t].y >= 660) aster.splice(a, 1);
if ((player.x + player.width >= aster[t].x)
&& (player.x <= aster[t].x + aster[t].width)
&& (player.y + player.height >= aster[t].y + aster[t].height)
&& (player.y <= aster[t].y - aster[t].height)) {
    if (Timer%30==0) {
        fire.push({x:ship.x+30,y:ship.y,dx:0,dy:-5});
        fire.push({x:ship.x-5,y:ship.y,dx:0,dy:-5});
    }