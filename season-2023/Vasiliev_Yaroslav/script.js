var GAME = {
    width: 1000,
    height: 800,
    background,
}

var cosmolet = {
    width: 50,
    height: 100,
    x: 400,
    y: 500,
    samolet,
    xDirection: 6,
    yDirection: 6,
}
var patron = {
    width: 100,
    height: 100,
    x: -100,
    y: -100,
    yDirection: 10,
    patron1: false,
    shotted: false,
}
var CONTINUE_BUTTON = {
    x: 150,
    y: 150,
    width: 200,
    height: 50,
    color: 'black'
}
var RESTART_BUTTON = {
    x: 150,
    y: 210,
    width: 200,
    height: 50,
}

var drawStatus;
var Enemies = [];
var countEnemies = 10;
var score = 0
var MaxScore = 0

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function initEnemies() {
    for (var i = 0; i < countEnemies; i++) {
        Enemies[i] = {
            x: getRandomArbitrary(1, 650),
            y: 0,
            speedY: getRandomArbitrary(2, 3),
            width: 50,
            height: 100
        }
    }
}

var patroni = new Image();

patroni.src = './kosmo/poou.png';

patroni.onload = function () {
    patron.patron1 = true;
}
function drawPatron() {
    if (patron.patron1) {
        canvasContext.drawImage(patroni, patron.x, patron.y, 10, 30);
    }
}

initEnemies();
console.log(Enemies);
var canvas = document.getElementById('canvas');
var canvasContext = canvas.getContext('2d');
canvas.width = GAME.width;
canvas.height = GAME.height;

var background = new Image();

background.src = './kosmo/kosmo.png';

background.onload = function () {
    GAME.background = background;
}

function drawBackground() {
    if (GAME.background) {
        canvasContext.drawImage(GAME.background, 0, 0, 1000, 800);
    }
}
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.heidth);
    drawBackground();
    drawSamolet();
    if (patron.shotted == true) {
        drawPatron()
    };
    drawScore()
    drawMenuButton();


}

var samolet = new Image();

samolet.src = './kosmo/space2.px.png';

samolet.onload = function () {
    cosmolet.samolet = samolet;
}

function drawSamolet() {
    if (cosmolet.samolet) {
        canvasContext.drawImage(cosmolet.samolet, cosmolet.x, cosmolet.y, 100, 150);
    }
}

function initEventsListeners() {
    window.addEventListener('mousemove', onCanvasMouseMove);
    window.addEventListener('keydown', onCanvasKeyDown);
    window.addEventListener('click', onCanvasMouseClick);
    window.addEventListener("click", openMenu);
}
function onCanvasMouseMove(event) {
    cosmolet.x = event.clientX;
    cosmolet.y = event.clientY;
    clampRocketposition()
}
function onCanvasKeyDown(event) {
    if (event.key === "ArrowRight") {
        cosmolet.x += cosmolet.xDirection;
    }
    if (event.key === 'ArrowLeft') {
        cosmolet.x -= cosmolet.xDirection
    }
    if (event.key === "ArrowUp") {
        cosmolet.y += cosmolet.yDirection;
    }
    if (event.key === 'ArrowDown') {
        cosmolet.y -= cosmolet.yDirection
    }

    clampRocketposition()
}
function clampRocketposition() {
    if (cosmolet.x + cosmolet.width > GAME.width) {
        cosmolet.x = GAME.width - cosmolet.width

    }
    if (cosmolet.x < 0) {
        cosmolet.x = 0;
    }
    if (cosmolet.y + cosmolet.height > GAME.height) {
        cosmolet.y = GAME.height - cosmolet.height

    }
    if (cosmolet.y < 0) {
        cosmolet.y = 0;
    }
}
function onCanvasMouseClick() {
    patron.x = cosmolet.x;
    patron.y = cosmolet.y;
    patron.shotted = true;


}

initEventsListeners();

var picture;

var vragi = new Image();

vragi.src = './kosmo/meteor1.px.png';

vragi.onload = function () {
    picture = vragi;
}


function drawVragi(enemy) {
    if (picture) {
        canvasContext.drawImage(picture, enemy.x, enemy.y, 50, 100);
    }
}
function updateEnemy() {
    for (var i = 0; i < countEnemies; i++) {
        Enemies[i].y += Enemies[i].speedY

        if (Enemies[i].y >= 800) {

            Enemies[i].y = 0,
                Enemies[i].x = getRandomArbitrary(-70, 900)
            Enemies[i].speedY = getRandomArbitrary(2, 3)
        }

    }
}
function drawScore() {
    canvasContext.fillStyle = 'white'
    canvasContext.font = "48px serif";
    canvasContext.fillText("Score: " + score, 10, 50);
}


function updateBullets() {
    if (patron.shotted == true) {
        patron.y -= patron.yDirection
        for (var i = 0; i < countEnemies; i++) {
            if (((Enemies[i].x <= patron.x) && (Enemies[i].x + Enemies[i].width >= patron.x) && (Enemies[i].y + Enemies[i].height >= patron.y)) || ((Enemies[i].x <= patron.x + patron.width) && (Enemies[i].x + Enemies[i].width >= patron.x + patron.width) && (Enemies[i].y >= patron.height + patron.y))) {
                Enemies[i].y = -70;
                Enemies[i].x = getRandomArbitrary(1, 650);
                Enemies[i].speedY = getRandomArbitrary(1, 3);
                score += 1;
                patron.shotted = false;
            }
        }
    }
}


function play() {
    drawFrame();
    for (var i = 0; i < countEnemies; i++) {
        drawVragi(Enemies[i])
    }
    updateEnemy();
    updateBullets()

    drawStatus = requestAnimationFrame(play);
}
var MENU_BUTTON = {
    x: 500,
    y: 50,
    radius: 25,
    color: 'white,'
}
function drawMenuButton() {
    canvasContext.fillStyle = MENU_BUTTON.color;
    canvasContext.beginPath();
    canvasContext.arc(MENU_BUTTON.color, MENU_BUTTON.x, MENU_BUTTON.y, MENU_BUTTON.radius, 0, 2 * Math.PI);
    canvasContext.stroke();
    canvasContext.fillRect(MENU_BUTTON.x - 8, MENU_BUTTON.y - 10, 5, 20)
    canvasContext.fillRect(MENU_BUTTON.x + 3, MENU_BUTTON.y - 10, 5, 20)
}
function drawContinueButton() {
    canvasContext.fillStyle = MENU_BUTTON.color;
    canvasContext.fillRect(CONTINUE_BUTTON.x, CONTINUE_BUTTON.y, CONTINUE_BUTTON.width, CONTINUE_BUTTON.height);
    canvasContext.fillStyle = CONTINUE_BUTTON.color;
    canvasContext.fillText("Continue", 185, 185);
}
function drawRestartButton() {
    canvasContext.fillStyle = 'white';

    canvasContext.fillRect(RESTART_BUTTON.x, RESTART_BUTTON.y, RESTART_BUTTON.width, RESTART_BUTTON.height);

    canvasContext.fillStyle = CONTINUE_BUTTON.color;

    canvasContext.fillText("Restart", 250, 245);

}
function drawMenu() {
    drawContinueButton();
    drawRestartButton();
}
function isOnMenuButton(event) {
    if (((event.x >= MENU_BUTTON.x - MENU_BUTTON.radius) && (event.x <= MENU_BUTTON.x + MENU_BUTTON.radius)) && ((event.y >= MENU_BUTTON.y - MENU_BUTTON.radius) && (event.y <= MENU_BUTTON.y + MENU_BUTTON.radius))) {
        return true;
    }
}
function openMenu(event) {
    if ((isOnMenuButton)(event)) {
        cancelAnimationFrame(drawStatus);
        cancelEventListeners();
        window.addEventListener("click", closeMenu);
        drawMenu();
    }
}
function isOnContinueButton(event) {
    if (((event.x >= CONTINUE_BUTTON.x) && (event.x <= CONTINUE_BUTTON.x + CONTINUE_BUTTON.width)) &&
        ((event.y >= CONTINUE_BUTTON.y) && (event.y <= CONTINUE_BUTTON.y + CONTINUE_BUTTON.height))) {
        return true;
    }
 }
 function closeMenu(event) {
    if (isOnContinueButton(event)) {
        window.removeEventListener("click", closeMenu);
       initEventsListeners();

        play();
    }
 }
 function cancelEventListeners() {
    window.removeEventListener("mousemove", onCanvasMouseMove);
    window.removeEventListener("keydown", onCanvasKeyDown);
    window.removeEventListener("keydown", openMenu)
    window.removeEventListener("click", openMenu)
 }
  


play()