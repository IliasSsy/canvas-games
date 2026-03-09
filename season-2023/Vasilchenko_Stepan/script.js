var GAME = {
    width: 1257,
    height: 760,
    is_game: true,
}

var RESTART = {
    coordX: 550,
    coordY: 500,
    width: 200,
    height: 40,
    text: "RESTART",
    color: "LightCoral"
}

var NEXT_LEVEL = {
    coordX: 750,
    coordY: 500,
    width: 200,
    height: 40,
    text: "NEXT LVL?",
    color: "LightCoral",
    level: 0,
}
var cnt = 0;
var canvas = document.getElementById("canvas");
var canvasWidth = GAME.width;
var canvasHeight = GAME.height;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var canvasContext = canvas.getContext("2d");

var ground = new Image();
ground.src = 'img/background.jpg';
ground.onload = function () {
    canvasContext.drawImage(ground, 0, 0);
}

var pudge = new Image();
pudge.src = "img/pudgik.png";
pudge.onload = function () {
    canvasContext.drawImage(pudge, 450, 0);
}

var tower = new Image();
tower.src = "img/towe.png";
tower.onload = function () {
    canvasContext.drawImage(tower, 1080, 250);
}

var hook = new Image();
hook.src = "img/hook.png";
hook.onload = function () {
    canvasContext.drawImage(hook, 520, 55);
}

var creep = new Image();
creep.src = "img/pngegg.png";
creep.onload = function () {
    canvasContext.drawImage(creep, 0, 250);
}

var creep2 = new Image();
creep2.src = 'img/cr.png';
creep2.onload = function () {
    canvasContext.drawImage(creep2, 0, 450);
}

var GROUND = {
    width: 1257,
    height: 760,
    coordX: 0,
    coordY: 0,
    model: ground,
}

var TOWER = {
    width: 200,
    height: 200,
    coordX: 1080,
    coordY: 250,
    model: tower,
    HP: 6,
}

var CREEP = {
    width: 80,
    height: 120,
    coordX: 0,
    coordY: 300,
    dx: 3,
    dy: 0,
    startDx: 3,
    startDy: 0,
    starty: 300,
    startx: 0,
    model: creep,
    path: "sound/phraze.mp3",
    is_dead: false,
}

var HOOK = {
    width: 50,
    height: 50,
    coordX: 520,
    coordY: 55,
    starty: 55,
    startx: 520,
    dx: 0,
    dy: 0,
    disX: 0,
    disY: 0,
    model: hook,
    killCount: 0,
    lvl: 4,
    startlvl: 4,
}

var CREEP2 = {
    width: 90,
    height: 90,
    coordX: -200,
    coordY: 450,
    dx: 6,
    dy: -1.5 / 2,
    startx: 0,
    slag: 1,
    starty: 450,
    model: creep2,
    path: "sound/Creep2.mp3",
    is_dead: false,
    startDx: 6,
}

var PUDGE = {
    width: 120,
    height: 101,
    coordX: 450,
    coordY: 0,
    model: pudge,
}

function draw(obj) {
    canvasContext.drawImage(obj.model, obj.coordX, obj.coordY);
}

function suma(obj) {
    obj.coordX += obj.dx;
    obj.coordY += obj.dy
    if (obj.coordX > 1080) {
        obj.coordX = obj.startx;
        obj.coordY = obj.starty;
        TOWER.HP -= 1;
        var hit = new Audio();
        hit.src = 'sound/hit.mp3';
        hit.play();
        console.log(TOWER.HP);
    }
    draw(obj);
}

function playSound(obj) {
    var phraze = new Audio();
    phraze.src = obj.path;
    phraze.play();
}

function niceHook(obj) {
    var hookLeft = HOOK.coordX > obj.coordX;
    var hookRight = HOOK.coordX + HOOK.width < obj.coordX + obj.width;
    var hookTop = HOOK.coordY + HOOK.height > obj.coordY;
    var hookBottom = HOOK.coordY < obj.coordY + obj.height;
    obj.is_dead = (hookLeft && hookRight && hookTop && hookBottom);
}

function initEventsListeners() {
    window.addEventListener("click", clickmouse);
    window.addEventListener("click", gameEnd);
    
}

function drawButtons(obj) {
    canvasContext.fillStyle = obj.color;
    canvasContext.beginPath();
    canvasContext.fillRect(obj.coordX, obj.coordY, obj.width, obj.height + 10);
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(obj.text, obj.coordX + 50, obj.coordY + 25);
}

function gameEnd(event) {
    if (!GAME.is_game) {
            if (event.clientX >= RESTART.coordX && event.clientX < RESTART.coordX + RESTART.width && event.clientY >= RESTART.coordY && event.clientY <= RESTART.coordY + RESTART.height) {
                location.reload();
        }
    }
}

function clickmouse(event) {
    if (GAME.is_game === true) {
        HOOK.disX = event.clientX;
        HOOK.disY = event.clientY;
        if (HOOK.dx === 0 && HOOK.dy === 0) {
            HOOK.dx = Math.round(((HOOK.disX - HOOK.coordX) / (((Math.abs(HOOK.disX - HOOK.coordX) ** 2) + Math.abs(HOOK.disY - HOOK.coordY) ** 2) ** (1 / 2) / HOOK.height * HOOK.lvl)));
            HOOK.dy = Math.abs(Math.round(((HOOK.disY - HOOK.coordY) / (((Math.abs(HOOK.disX - HOOK.coordX) ** 2) + Math.abs(HOOK.disY - HOOK.coordY) ** 2) ** (1 / 2) / HOOK.height * HOOK.lvl))));
        }
    }
}

function removeObject(obj) {
    obj.coordX = obj.startx;
    obj.coordY = obj.starty;
    obj.is_dead = false;
    HOOK.dx = 0;
    HOOK.dy = 0;
    HOOK.coordX = HOOK.startx;
    HOOK.coordY = HOOK.starty;
}

function runningObj() {
    canvasContext.clearRect(0, 0, 1257, 760);
    if (HOOK.coordX + HOOK.dx > GAME.width || HOOK.coordY + HOOK.dy > GAME.height || HOOK.coordX + HOOK.dx < 0) {
        HOOK.coordX = HOOK.startx;
        HOOK.coordY = HOOK.starty;
        HOOK.dx = 0;
        HOOK.dy = 0;
        draw(HOOK);
    }
    HOOK.coordX += HOOK.dx;
    HOOK.coordY += HOOK.dy;
    draw(GROUND);
    draw(TOWER);
    draw(PUDGE);
    suma(CREEP);
    suma(CREEP2);
    draw(HOOK);
    drawLin();
    hpLeft();
    killCnt();
    niceHook(CREEP);
    if (CREEP.is_dead === true) {
        if (CREEP.starty < 350) {
            CREEP.starty += 50;
        }
        else {
            CREEP.starty = 250;
        }
        removeObject(CREEP);
        playSound(CREEP);
        HOOK.killCount += 1;
    }

    niceHook(CREEP2);
    if (CREEP2.is_dead === true) {

        if (CREEP2.starty > 350) {
            CREEP2.starty -= 50;
        }
        else {
            CREEP2.starty = 450;
        }
        playSound(CREEP2);
        HOOK.killCount += 1;
        removeObject(CREEP2);
    }
}

function drawLin() {
    canvasContext.fillStyle = 'grey';
    canvasContext.beginPath();
    canvasContext.moveTo(HOOK.startx + HOOK.width - 20, HOOK.starty);
    if (HOOK.dx > 0) {
        canvasContext.lineTo(HOOK.coordX + HOOK.width - 20, HOOK.coordY);
    }
    else {
        canvasContext.lineTo(HOOK.coordX + HOOK.width - 10, HOOK.coordY);
    }

    canvasContext.stroke();
}

function killCnt() {
    canvasContext.fillStyle = "red";
    canvasContext.font = "bold 16px Arial";
    canvasContext.fillText("Kills left: " + (10 - HOOK.killCount), 1000, 235);
    if (HOOK.killCount > 9) {
        GAME.is_game = false;
    }
}

function hpLeft() {
    canvasContext.fillStyle = "white";
    canvasContext.font = "bold 16px Arial";
    canvasContext.fillText("HP left: " + TOWER.HP, 1150, 235);
    if (TOWER.HP < 1) {
        GAME.is_game = false
    }
}

function playG() {
    runningObj();
    if (GAME.is_game === true) {
        requestAnimationFrame(playG);
        console.log(cnt)
    }

    else {
        if (HOOK.killCount > 9) {
            drawWin();
        }
        else {
            drawLose();
        }
    }
}

function textW() {
    canvasContext.fillStyle = "white";
    canvasContext.font = "bold 35px Arial";
    canvasContext.fillText("Level passed", 540, 380);
}

function drawWin() {
    canvasContext.clearRect(0, 0, 1257, 760);
    var serega = new Image();
    serega.src = "img/blaab.jpg";
    serega.onload = function () {
        var win = new Audio();
        win.src = "sound/obrez.mp3",
        win.play();
        canvasContext.drawImage(serega, 0, 0);
        textW();
        loseRestart();
    }
}

function drawLose() {
    canvasContext.clearRect(0, 0, 1257, 760);
    var kot = new Image();
    kot.src = "img/kit.jpg";
    kot.onload = function () {
        canvasContext.drawImage(kot, 0, 0);
        textLose();
        loseRestart();
        var loze = new Audio();
        loze.src = "sound/loze.mp3";
        loze.play();
    }
}

function textLose() {
    canvasContext.fillStyle = "LightCoral";
    canvasContext.font = "bold 35px Arial";
    canvasContext.fillText("NICE TRY", 640, 300);
}

function loseRestart() {
    canvasContext.fillStyle = 'LightCoral';
    canvasContext.beginPath();
    canvasContext.fillRect(RESTART.coordX, RESTART.coordY, RESTART.width, RESTART.height);
    canvasContext.fillStyle = "white";
    canvasContext.fillText(RESTART.text, RESTART.coordX + 20, RESTART.coordY + 30);
}

initEventsListeners();
playG();


