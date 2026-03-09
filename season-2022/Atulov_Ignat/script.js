var GAME = {
    width: 1500,
    height: 720,
    background: 'white',
    framesCnt: 0,

}

var canvas = document.getElementById('canvas');
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext('2d');

var Circle = {
    x: 100,
    y: 150,
    radius: 60,
    color: 'black',
    isVisible: true,
}

var Slider = {
    x: 100,
    y: 300,
    w: 660,
    h: 10,
    color: 'black',
    isVisible: false,
}

var Border = {
    x: Circle.x,
    y: Circle.y,
    radius: 180,
    color: 'grey',
    isVisible: true,
}

var Mouse = {
    x: 100,
    y: 100,
}

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}


function drawCircle() {
    if (Circle.isVisible) {
        canvasContext.fillStyle = Border.color;
        canvasContext.beginPath();
        canvasContext.arc(Circle.x, Circle.y, Circle.radius + 10, 0, 2 * Math.PI);
        canvasContext.fill();
        canvasContext.fillStyle = Circle.color;
        canvasContext.beginPath();
        canvasContext.arc(Circle.x, Circle.y, Circle.radius, 0, 2 * Math.PI);
        canvasContext.fill();
    }
}

function drawSlider() {
    if (Slider.isVisible) {
        canvasContext.fillStyle = Slider.color;
        canvasContext.beginPath();
        canvasContext.fillRect(Slider.x, Slider.y, Slider.w, Slider.h);
        canvasContext.fill();
        drawCircle();
        drawBorder();
    }
}

function UpdateSlider() {
    if (Slider.isVisible) {
        Circle.x = Slider.x + 4 * GAME.framesCnt;
        Circle.y = Slider.y + Slider.h / 2;
        Circle.isVisible = true
        Border.isVisible = true
        if (GAME.framesCnt == 180){
            Slider.isVisible = false;
        }

    }
}

function drawBorder() {
    if (Border.isVisible) {
        canvasContext.strokeStyle = Border.color;
        canvasContext.lineWidth = 3;
        canvasContext.beginPath();
        canvasContext.arc(Circle.x, Circle.y, Border.radius, 0, 2 * Math.PI);
        canvasContext.stroke();
    }
}


function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    if ((cnt + 1) % 10 != 0) {
        drawCircle();
        drawBorder();
        Update();
    }
    else{
        Slider.isVisible = true;
        UpdateSlider();
        drawSlider();
    }
    drawCnt();
    drawCntLives();
    framesCountHandler();
    requestAnimationFrame(play);
    initEventsListeners();
}

function initEventsListeners() {
    window.addEventListener('mousedown', onCanvasMouseMove);
    window.addEventListener('keydown', onCanvasKeyDown);
    window.addEventListener('mousedown', onCanvasMouseMoveMenu);
}

function onCanvasMouseMove(event) {
    if (event.which == 1) {
        Mouse.x = event.clientX;
        Mouse.y = event.clientY;

        deleteCircle();

    }
}

function onCanvasMouseMoveMenu(event) {
    if ((event.which == 1) && (showmenu)) {
        if ((Mouse.x >= 15) && (Mouse.y >= 252) && (Mouse.x <= 210) && (Mouse.y <= 300)) {
            showmenu = false;
            cntL = 3
            cnt = 0;
            cnt2 = cnt;
            Border.radius = 180;
            GAME.framesCnt = 0;
            play();
        }
        if ((Mouse.x >= 15) && (Mouse.y >= 315) && (Mouse.x <= 35) && (Mouse.y <= 335)) {
            GAME.background = 'black';
            Circle.color = 'white';
        }

        if ((Mouse.x >= 50) && (Mouse.y >= 315) && (Mouse.x <= 70) && (Mouse.y <= 335)) {
            GAME.background = 'white';
            Circle.color = 'black';
        }

        if ((Mouse.x >= 85) && (Mouse.y >= 315) && (Mouse.x <= 105) && (Mouse.y <= 335)) {
            GAME.background = 'purple';
            Circle.color = 'orange';
        }

        if ((Mouse.x >= 120) && (Mouse.y >= 315) && (Mouse.x <= 140) && (Mouse.y <= 335)) {
            GAME.background = 'red';
            Circle.color = 'green';
        }
    }

}

cnt = 0;
cnt2 = cnt;
cntL = 3;

function deleteCircle() {
    cnt2 = cnt;
    if ((Mouse.x >= Circle.x - Circle.radius) && (Mouse.x <= Circle.x + Circle.radius) && (Mouse.y >= Circle.y - Circle.radius) && (Mouse.y <= Circle.y + Circle.radius)) {
        Circle.isVisible = false;
        Border.isVisible = false;
        GAME.framesCnt = 0
        cnt = cnt + 1
        if ((Border.radius <= 70) && (Border.radius > 60)) {
            cnt = cnt + 1
        }
        Border.radius = 180;

    } else {
        cntL = cntL - 1;
    }
}

function framesCountHandler() {
    if (GAME.framesCnt === 120) {
        Circle.isVisible = false;
        Border.isVisible = false;
        Border.radius = 180;
        GAME.framesCnt = 0;
        if (cnt2 = cnt) {
            cntL = cntL - 1;
        }
    }
    ++GAME.framesCnt;
    Border.radius = Border.radius - 1;

}

function Update() {
    if (!Circle.isVisible) {
        Slider.x = getRandom(100, 1400 - Slider.w)
        Slider.y = getRandom(150, 620)
        Circle.x = getRandom(100, 1400)
        Circle.y = getRandom(150, 620)
        Circle.isVisible = true
        Border.isVisible = true

    }
}

function drawCnt() {
    var canvasCnt = document.getElementById('canvas').getContext('2d');
    canvasCnt.font = "34px serif";
    canvasCnt.fillText('Score: ' + cnt, 10, 50);
}

function drawCntLives() {
    var canvasCnt = document.getElementById('canvas').getContext('2d');
    canvasCnt.font = "34px serif";
    canvasCnt.fillText('Lives: ' + cntL, 150, 50);
}

function onCanvasKeyDown(event) {
    if ((event.key === 'r') || (event.key === 'к')) {
        cntL = 3
        cnt = 0;
        cnt2 = cnt;
        play();
    }

}

function endGame() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
    canvasContext.fillStyle = Circle.color;
    var canvasendGame = document.getElementById('canvas').getContext('2d');
    canvasendGame.font = "60px serif";
    canvasendGame.fillText('Game over', 550, 200);
    canvasendGame.font = "48px serif";
    canvasendGame.fillText('Score: ' + cnt, 400, 300);
    canvasendGame.fillText('press R, for junior lvl', 400, 350);
    canvasendGame.fillText('press R + R, for pro lvl', 400, 400);
    canvasendGame.fillText('press R + R + R, for senior lvl', 400, 450);
    canvasendGame.fillText('press R + R + R + R, for architect lvl', 400, 500);
    requestAnimationFrame(endGame);
}


var showmenu = true;
function menu() {

    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawCircle();
    drawBorder();
    Update();
    framesCountHandler();
    var canvasMenu = document.getElementById('canvas').getContext('2d');
    canvasMenu.font = "48px serif";
    canvasMenu.fillText('START', 15, 300);

    canvasMenu.fillStyle = 'black';
    canvasMenu.strokeStyle = 'white';
    canvasMenu.lineWidth = 1;
    canvasMenu.beginPath();
    canvasMenu.arc(25, 325, 10, 0, 2 * Math.PI);
    canvasMenu.fill();
    canvasMenu.stroke();

    canvasMenu.fillStyle = 'white';
    canvasMenu.strokeStyle = 'black';
    canvasMenu.lineWidth = 1;
    canvasMenu.beginPath();
    canvasMenu.arc(60, 325, 10, 0, 2 * Math.PI);
    canvasMenu.stroke();
    canvasMenu.fill();

    canvasMenu.fillStyle = 'purple';
    canvasMenu.strokeStyle = 'black';
    canvasMenu.lineWidth = 1;
    canvasMenu.beginPath();
    canvasMenu.arc(95, 325, 10, 0, 2 * Math.PI);
    canvasMenu.stroke();
    canvasMenu.fill();

    canvasMenu.fillStyle = 'red';
    canvasMenu.strokeStyle = 'black';
    canvasMenu.lineWidth = 1;
    canvasMenu.beginPath();
    canvasMenu.arc(130, 325, 10, 0, 2 * Math.PI);
    canvasMenu.stroke();
    canvasMenu.fill();
    initEventsListeners();
    requestAnimationFrame(menu);
}

function play() {
    if (showmenu) {
        menu();
    }
    else {
        if (cntL > 0) {
            drawFrame();
        } else {
            endGame();
        }
    }

}

play();