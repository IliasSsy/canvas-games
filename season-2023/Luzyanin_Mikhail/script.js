var game = {
    width: 750,
    height: 750,
    background: "#ffffff"
}

var canvas = document.getElementById('canvas');
canvas.width = game.width;
canvas.height = game.height;
var canvasContext = canvas.getContext('2d');

var Ball = {
    color: "#000000",
    x: 375,
    y: 375,
    radius: 10,
    xDirection: 1,
    yDirection: 2,
}

var Racket = {
    color: "#ff0000",
    x: 20,
    y: 320,
    width: 5,
    height: 100,
    yDirection: 50,
    Score: 0,
}

var Racket2 = {
    color: "#0000ff",
    x: 725,
    y: 320,
    width: 5,
    height: 100,
    yDirection: 50,
    Score: 0,
}

function drawBall() {
    canvasContext.fillStyle = Ball.color;
    canvasContext.beginPath();
    canvasContext.arc(Ball.x, Ball.y, Ball.radius, 0, 2 * Math.PI);
    canvasContext.fill();
}

function drawRacket() {
    canvasContext.fillStyle = Racket.color;
    canvasContext.fillRect(Racket.x, Racket.y, Racket.width, Racket.height);
}

function drawRacket2() {
    canvasContext.fillStyle = Racket2.color;
    canvasContext.fillRect(Racket2.x, Racket2.y, Racket2.width, Racket2.height);
}
function drawScore() {
    canvasContext.fillStyle = '#ff0000';
    canvasContext.font = "48px serif";
    canvasContext.fillText("Score:" + Racket.Score, 20, 50);
}

function drawScore2() {
    canvasContext.fillStyle = '#0000ff';
    canvasContext.font = "48px serif";
    canvasContext.fillText("Score:" + Racket2.Score, 575, 50);
}

function drawVictoryP1() {
    canvasContext.clearRect(0, 0, game.width, game.height);
    drawBackground();
    canvasContext.fillStyle = '#ff0000';
    canvasContext.font = "48px serif";
    canvasContext.fillText("VICTORY PLAYER 1", 150, 375);
}

function drawVictoryP2() {
    canvasContext.clearRect(0, 0, game.width, game.height);
    drawBackground();
    canvasContext.fillStyle = '#0000ff';
    canvasContext.font = "48px serif";
    canvasContext.fillText("VICTORY PLAYER 2", 150, 375);
}

function updateBall() {
    Ball.x += Ball.xDirection;
    Ball.y += Ball.yDirection;
    if ((Ball.y + Ball.radius > game.height) || (Ball.y - Ball.radius < 0)) {
        Ball.yDirection = -Ball.yDirection;
    }
    if (Ball.x + Ball.radius > game.width) {
        Ball.x = 375;
        Ball.y = 375;
        Ball.xDirection = 1;
        Ball.yDirection = 2;
        Racket.Score += 1;
        Racket.x = 20;
        Racket.y = 320;
        Racket.yDirection = 50;
        Racket2.x = 725;
        Racket2.y = 320;
        Racket2.yDirection = 50;
    }
    if (Ball.x - Ball.radius < 0) {
        Ball.x = 375;
        Ball.y = 375;
        Ball.xDirection = -1;
        Ball.yDirection = -2;
        Racket2.Score += 1;
        Racket.x = 20;
        Racket.y = 320;
        Racket.yDirection = 50;
        Racket2.x = 725;
        Racket2.y = 320;
        Racket2.yDirection = 50;
    }

    var racketTopLineCollision = Ball.y + Ball.radius > Racket.y;
    var racketLeftLineCollision = Ball.x + Ball.radius > Racket.x;
    var racketRightLineCollision = Ball.x - Ball.radius < Racket.x + Racket.width
    var racketBottonLineCollision = Ball.y - Ball.radius < Racket.y + Racket.height
    if (racketTopLineCollision && racketLeftLineCollision && racketRightLineCollision && racketBottonLineCollision) {
        //Ball.yDirection = -Ball.yDirection
        Ball.xDirection = -Ball.xDirection
    }
    var racketTopLineCollision2 = Ball.y + Ball.radius > Racket2.y;
    var racketLeftLineCollision2 = Ball.x + Ball.radius > Racket2.x;
    var racketRightLineCollision2 = Ball.x - Ball.radius < Racket2.x + Racket2.width
    var racketBottonLineCollision2 = Ball.y - Ball.radius < Racket2.y + Racket2.height
    if (racketTopLineCollision2 && racketLeftLineCollision2 && racketRightLineCollision2 && racketBottonLineCollision2) {
        //Ball.yDirection = -Ball.yDirection
        Ball.xDirection = -Ball.xDirection

    }
}


function drawBackground() {
    canvasContext.fillStyle = game.background;
    canvasContext.fillRect(0, 0, game.width, game.height);
}

function drawPOLE() {
    canvasContext.fillStyle = '#ff0000'; //круг малый
    canvasContext.lineWidth = 1;
    canvasContext.beginPath();
    canvasContext.arc(375, 375, 10, 0, 2 * Math.PI);
    canvasContext.fill();

    canvasContext.fillStyle = '#ff0000'; //круг малый
    canvasContext.lineWidth = 10;
    canvasContext.beginPath();
    canvasContext.arc(150, 150, 10, 0, 2 * Math.PI);
    canvasContext.fill();

    canvasContext.fillStyle = '#ff0000'; //круг малый
    canvasContext.lineWidth = 10;
    canvasContext.beginPath();
    canvasContext.arc(600, 600, 10, 0, 2 * Math.PI);
    canvasContext.fill();

    canvasContext.fillStyle = '#ff0000'; //круг малый
    canvasContext.lineWidth = 10;
    canvasContext.beginPath();
    canvasContext.arc(600, 150, 10, 0, 2 * Math.PI);
    canvasContext.fill();

    canvasContext.fillStyle = '#ff0000'; //круг малый
    canvasContext.lineWidth = 10;
    canvasContext.beginPath();
    canvasContext.arc(150, 600, 10, 0, 2 * Math.PI);
    canvasContext.fill();

    canvasContext.fillStyle = "#0000ff"; //полоска
    canvasContext.fillRect(375, 5, 2, 325);

    canvasContext.fillStyle = "#0000ff"; //полоска
    canvasContext.fillRect(375, 420, 2, 320);

    canvasContext.fillStyle = "#0000ff"; //полоска
    canvasContext.fillRect(275, 6, 2, 735);

    canvasContext.fillStyle = "#0000ff"; //полоска
    canvasContext.fillRect(475, 4, 2, 735);

    canvasContext.strokeStyle = '#ff0000'; //круг
    canvasContext.lineWidth = 1;
    canvasContext.beginPath();
    canvasContext.arc(375, 375, 45, 0, 2 * Math.PI);
    canvasContext.stroke();

    canvasContext.strokeStyle = '#ff0000'; //круг
    canvasContext.beginPath();
    canvasContext.arc(150, 150, 45, 0, 2 * Math.PI);
    canvasContext.stroke();

    canvasContext.strokeStyle = '#ff0000'; //круг
    canvasContext.beginPath();
    canvasContext.arc(600, 600, 45, 0, 2 * Math.PI);
    canvasContext.stroke();

    canvasContext.strokeStyle = '#ff0000'; //круг
    canvasContext.beginPath();
    canvasContext.arc(150, 600, 45, 0, 2 * Math.PI);
    canvasContext.stroke();

    canvasContext.strokeStyle = '#ff0000'; //круг
    canvasContext.beginPath();
    canvasContext.arc(600, 150, 45, 0, 2 * Math.PI);
    canvasContext.stroke();

    canvasContext.strokeStyle = "#0000ff"; //поле
    canvasContext.beginPath();
    canvasContext.moveTo(10, 10);
    canvasContext.lineTo(740, 0);
    canvasContext.lineTo(740, 740);
    canvasContext.lineTo(0, 740);
    canvasContext.closePath();
    canvasContext.stroke();
}

function initEventListeners() {
    window.addEventListener("keydown", onCanvasKeyDown);
    window.addEventListener("click", openMenu);
}

function clampRacketPosition() {
    if (Racket.y < 0) {
        Racket.y = 0;
    }
    if (Racket.y + Racket.height > game.height) {
        Racket.y = game.height - Racket.height;
    }
    if (Racket2.y < 0) {
        Racket2.y = 0;
    }
    if (Racket2.y + Racket2.height > game.height) {
        Racket2.y = game.height - Racket2.height;
    }
}

function onCanvasKeyDown(event) {
    if (event.key === "w") {
        Racket.y -= Racket.yDirection;
    }
    if (event.key === "s") {
        Racket.y += Racket.yDirection;
    }
    if (event.key === "ArrowUp") {
        Racket2.y -= Racket2.yDirection;
    }
    if (event.key === "ArrowDown") {
        Racket2.y += Racket2.yDirection;
    }
    clampRacketPosition();
}

var MENU_BUTTON = {
    x: 375,
    y: 45,
    radius: 25,
}

function drawMenuButton() {
    canvasContext.fillStyle = "#000000";
    canvasContext.beginPath();
    canvasContext.arc(MENU_BUTTON.x, MENU_BUTTON.y, MENU_BUTTON.radius, 0, 2 * Math.PI);
    canvasContext.strokeStyle = '#000000';
    canvasContext.stroke();
    canvasContext.fillRect(MENU_BUTTON.x - 8, MENU_BUTTON.y - 10, 5, 20);
    canvasContext.fillRect(MENU_BUTTON.x + 3, MENU_BUTTON.y - 10, 5, 20);
}

function drawMenu() {
    drawContinueButton();
    drawRestartButton();
}

var drawStatus;

var CONTINUE_BUTTON = {
    x: 275,
    y: 300,
    width: 200,
    height: 50,
}

function drawContinueButton() {
    canvasContext.fillStyle = '#808080';
    canvasContext.fillRect(CONTINUE_BUTTON.x, CONTINUE_BUTTON.y, CONTINUE_BUTTON.width, CONTINUE_BUTTON.height);
    canvasContext.fillStyle = "#000000";
    canvasContext.font = "38px Impact";
    canvasContext.fillText("Continue", 307, 340);
}


var RESTART_BUTTON = {
    x: 275,
    y: 400,
    width: 200,
    height: 50,
}

function drawRestartButton() {
    canvasContext.fillStyle = "#808080";
    
    canvasContext.fillRect(RESTART_BUTTON.x, RESTART_BUTTON.y, RESTART_BUTTON.width, RESTART_BUTTON.height);
    canvasContext.fillStyle = "#000000";
    canvasContext.font = "38px Impact";
    canvasContext.fillText("Restart", 320, 440);
}

function isOnMenuButton(event) {
    if (((event.x >= MENU_BUTTON.x - MENU_BUTTON.radius) && (event.x <= MENU_BUTTON.x + MENU_BUTTON.radius)) &&
        ((event.y >= MENU_BUTTON.y - MENU_BUTTON.radius) && (event.y <= MENU_BUTTON.y + MENU_BUTTON.radius))) {
        return true;
    }
}

function isOnMenuButton(event) {
    if (((event.x >= MENU_BUTTON.x - MENU_BUTTON.radius) && (event.x <= MENU_BUTTON.x + MENU_BUTTON.radius)) &&
        ((event.y >= MENU_BUTTON.y - MENU_BUTTON.radius) && (event.y <= MENU_BUTTON.y + MENU_BUTTON.radius))) {
        return true;
    }
}

function openMenu(event) {
    if (isOnMenuButton(event)) {
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

function isOnRestartButton(event) {
    if (((event.x >= RESTART_BUTTON.x) && (event.x <= RESTART_BUTTON.x + RESTART_BUTTON.width)) &&
        ((event.y >= RESTART_BUTTON.y) && (event.y <= RESTART_BUTTON.y + RESTART_BUTTON.height))) {
        return true;
    }
}


function closeMenu(event) {
    if (isOnContinueButton(event)) {
        window.removeEventListener("click", closeMenu);
        initEventListeners();
        play();
    }
    if (isOnRestartButton(event)) {
        Ball.x = 375;
        Ball.y = 375;
        Ball.xDirection = 1;
        Ball.yDirection = 2;
        Racket.Score = 0;
        Racket2.Score = 0;
        Racket.x = 20;
        Racket.y = 320;
        Racket2.x = 725;
        Racket2.y = 320; 

        window.removeEventListener("click", closeMenu);
        initEventListeners();
        play()
    }
}

function cancelEventListeners() {
    window.removeEventListener("keydown", onCanvasKeyDown);
    window.removeEventListener("keydown", openMenu)
    window.removeEventListener("click", openMenu)
}


function drawFrame() {
    canvasContext.clearRect(0, 0, game.width, game.height);
    drawBackground();
    drawMenuButton();
    drawPOLE();
    drawBall();
    drawScore();
    drawScore2()
    drawRacket();
    drawRacket2();
}

function drawSpeed() {
    if (Ball.xDirection > 0) {
        Ball.xDirection += 1;
    }
    else {
        Ball.xDirection -= 1;
    }

    if (Ball.yDirection < 0) {
        Ball.yDirection -= 1;
    }
    else {
        Ball.yDirection += 1
    }
    setTimeout(drawSpeed, 10000);
}
function play() {
    console.log("ahahah")
    drawFrame();
    if (Racket.Score >= 3) {
        drawVictoryP1();
    }
    if (Racket2.Score >= 3) {
        drawVictoryP2();
    }
    if ((Racket.Score < 3) || (Racket2.Score < 3)) {
        updateBall();
        drawStatus = requestAnimationFrame(play);
    }

}
setTimeout(drawSpeed, 10000);

initEventListeners();

play();

//урааааа конееееец!!!!!!!
