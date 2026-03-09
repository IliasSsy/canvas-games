var GAME = {
    width: 600,
    height: 600,
}

var canvas = document.getElementById('canvas');
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext('2d');
var drawStatus;
var isGameStart = false
var START_BUTTON = {
    x: 200,
    y: 310,
    width: 200,
    height: 100,
}
var RACKET = {
    color: "#FF6E40",
    x: -120,
    y: 0,
    width: 70,
    height: 120,
    alive: false,
}
var RACKET2 = {
    color: "#FF6E40",
    x: -120,
    y: 0,
    width: 70,
    height: 120,
    alive: false,
}
var RACKET3 = {
    color: "#FF6E40",
    x: -120,
    y: 0,
    width: 120,
    height: 70,
    alive: false,
}
var RACKET4 = {
    color: "#FF6E40",
    x: -120,
    y: 0,
    width: 120,
    height: 70,
    alive: false,
}
var wasrestart2 = false;
var HERO = {
    color: "black",
    x: 20,
    y: 200,
    width:40,
    height: 60,
    xDirection: 20,
    yDirection: 20,
    count: 0,
    alive: true

}
var RESTART_BUTTON = {
    x: 150,
    y: 310,
    width: 300,
    height: 100,
}
var RESTART_BUTTON2 = {
    x: 150,
    y: 310,
    width: 300,
    height: 100,
}
var CONTINUE_BUTTON = {
    x: 150,
    y: 200,
    width: 300,
    height: 100,
}
var MENU_BUTTON = {
    x: 550,
    y: 45,
    radius: 25,
}
var AUDIO = {
    src: new Audio('./sound/kaplya.mp3'),
    audioIsOn: false,
 } 
var BALL = {
    x: Math.floor(Math.random() * GAME.width - 10 * 2),
    y: Math.floor(Math.random() * GAME.height - 10 * 2),
    radius: 10,
    color: "yellow",
    xDirection: 4,
    yDirection: 3,
}
var backgroundImage = new Image();
backgroundImage.src = './akula.jpg';
backgroundImage.onload = () => {
    GAME.background = backgroundImage;
}
function draw() {
    canvasContext.fillStyle = " black ";
    canvasContext.font = "50px serif";
    canvasContext.fillText('Score:' + HERO.count ,wasrestart2?80:100,80);
}
function drawStartButton() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(START_BUTTON.x, START_BUTTON.y, START_BUTTON.width, START_BUTTON.height);
    canvasContext.fillStyle = "white";
    canvasContext.font = "50px serif";
    canvasContext.fillText("Start", START_BUTTON.x + 50, START_BUTTON.y + 70);
}
function drawContinueButton() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(CONTINUE_BUTTON.x, CONTINUE_BUTTON.y, CONTINUE_BUTTON.width, CONTINUE_BUTTON.height);
    canvasContext.fillStyle = "white";
    canvasContext.font = "50px serif";
    canvasContext.fillText("Continue", wasrestart2?295:210, CONTINUE_BUTTON.y + 70);
}

function drawRestartButton() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(RESTART_BUTTON.x, RESTART_BUTTON.y, RESTART_BUTTON.width, RESTART_BUTTON.height);
    canvasContext.fillStyle = "white";
    canvasContext.font = "50px serif";
    canvasContext.fillText("Restart", wasrestart2?290:225, RESTART_BUTTON.y + 70);

}

function drawRestart2Button() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(RESTART_BUTTON2.x, RESTART_BUTTON2.y, RESTART_BUTTON2.width, RESTART_BUTTON2.height);
    canvasContext.fillStyle = "white";
    canvasContext.font = "50px serif";
    canvasContext.fillText("Restart", RESTART_BUTTON2.x + 147, RESTART_BUTTON2.y + 70);
}

function drawMenuButton() {
    canvasContext.fillStyle = RACKET.color;
    canvasContext.beginPath();
    canvasContext.arc(MENU_BUTTON.x, MENU_BUTTON.y, MENU_BUTTON.radius, 0, 2 * Math.PI);
    canvasContext.stroke();
    canvasContext.fillRect(MENU_BUTTON.x - 8, MENU_BUTTON.y - 10, 5, 20)
    canvasContext.fillRect(MENU_BUTTON.x + 3, MENU_BUTTON.y - 10, 5, 20)
}

function drawBackground() {
    if (GAME.background) {
        canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height);
    }
}

function drawMenu() {
    drawContinueButton();
    drawRestartButton();
}

function drawBall() {
    canvasContext.fillStyle = BALL.color;
    canvasContext.beginPath();
    canvasContext.arc(BALL.x, BALL.y, BALL.radius, 0, 2 * Math.PI);
    canvasContext.closePath();
    canvasContext.fill();
}


function isOnMenuButton(event) {
    if (((event.x >= MENU_BUTTON.x - MENU_BUTTON.radius) && (event.x <= MENU_BUTTON.x + MENU_BUTTON.radius)) &&
        ((event.y >= MENU_BUTTON.y - MENU_BUTTON.radius) && (event.y <= MENU_BUTTON.y + MENU_BUTTON.radius))) {
        return true;
    }
}
function isOnStartButton(event) {
    if (((event.x >= START_BUTTON.x - START_BUTTON.width) && (event.x <= START_BUTTON.x + START_BUTTON.width)) &&
        ((event.y >= START_BUTTON.y - START_BUTTON.height) && (event.y <= START_BUTTON.y + START_BUTTON.height))) {
        return true;
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

function isOnRestart2Button(event) {
    if (((event.x >= RESTART_BUTTON2.x) && (event.x <= RESTART_BUTTON2.x + RESTART_BUTTON2.width)) &&
        ((event.y >= RESTART_BUTTON2.y) && (event.y <= RESTART_BUTTON2.y + RESTART_BUTTON2.height))) {
        return true;
    }
}

function cancelEventListeners() {
    window.removeEventListener("mousemove", onCanvasMouseMove);
    window.removeEventListener("click", openMenu);
    window.removeEventListener("keydown", openMenu)
}

function openMenu(event) {
    if (isOnStartButton(event)) {
        isGameStart = true;
    }
    if (isOnMenuButton(event)) {
        drawMenu();
        cancelAnimationFrame(drawStatus);
        cancelEventListeners();
        window.addEventListener("click", closeMenu);
    }
}
function openLose(event) {
    if (isOnRestart2Button(event)) {
        HERO.alive = true;
        window.removeEventListener("click", openLose);
        HERO.x = 300;
        HERO.y = 400;
        HERO.xDirection = 20;
        spawnRacket();
        spawnRacket2();
        spawnRacket3();
        spawnRacket4();
        HERO.count = 0;
        wasrestart2 = true;
    }
}

function closeMenu(event) {
    if (isOnContinueButton(event)) {
        window.removeEventListener("click", closeMenu);
        initEventsListeners();
        play();
    }
    if (isOnRestartButton(event)) {
        window.removeEventListener("click", closeMenu);
        HERO.x = 300;
        HERO.y = 400;
        HERO.xDirection = 20;
        spawnRacket();
        spawnRacket2();
        spawnRacket3();
        spawnRacket4();
        HERO.count = 0;

        initEventsListeners();
        play()
    }
}
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawMenuButton();
    drawRacket();
    drawHero();
    drawRacket2();
    drawRacket3();
    drawRacket4();
    drawBall();
    updateBall();
    draw();
    racketSpeed();
    racket2Speed();
    racket3Speed();
    racket4Speed();

    if ((RACKET3.alive)) {
        updateRacket3()
    }
    else {
        spawnRacket3();
    }
    if (RACKET4.alive) {
        updateRacket4()
    }
    else {
        spawnRacket4()
    }
    if ((RACKET.alive)) {
        updateRacket1()
    }
    else {
        spawnRacket();
    }
    if (RACKET2.alive) {
        updateRacket2()
    }
    else {
        spawnRacket2()
    }
}

function drawLoseScreen() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawRestart2Button();
    draw();
    canvasContext.fillStyle = "black";
    canvasContext.font = "96px Serif";
    canvasContext.textAlign = "center";
    canvasContext.fillText("YOU LOSE!", GAME.width / 2, GAME.height - 400);
    canvasContext.font = "30px Serif";
    canvasContext.fillText("SHARKS CAUGHT YOU!", GAME.width / 2, GAME.height - 340)

}

function spawnRacket() {
    RACKET.x = Math.floor(Math.random() * GAME.width / 2 - RACKET.width);
    RACKET.alive = true;
    RACKET.y = -160+Math.floor(Math.random()*60)
}

function spawnRacket2() {
    RACKET2.x = Math.floor(Math.random() * GAME.width / 2 - RACKET2.width) + GAME.width / 2;
    RACKET2.alive = true;
    RACKET2.y = -160+Math.floor(Math.random()*60);
    if (!(RACKET.x + RACKET.width < RACKET2.x
        )) {
        RACKET2.alive = false;
    }
}

function spawnRacket3() {
    RACKET3.x = -160+Math.floor(Math.random()*60);
    RACKET3.alive = true;
    RACKET3.y = Math.floor(Math.random() * GAME.height / 2 - RACKET3.height);
}

function spawnRacket4() {
    RACKET4.x = -160 +Math.floor(Math.random()*60);
    RACKET4.y = Math.floor(Math.random() * GAME.height / 2 - RACKET4.height) + GAME.height / 2;
    RACKET4.alive = true;
    if (!(RACKET.y + RACKET.height < RACKET4.y)) {
        RACKET4.alive = false;
    }
}

function drawHero() {
    PickMe = new Image();
    PickMe.src = "dd.png";
    PickMe.onload = () => (PickMeState = true);
    canvasContext.drawImage(PickMe, HERO.x, HERO.y, HERO.width, HERO.height)
}

function updateBall() {
    var heroTopLineCollision = BALL.x + BALL.radius >= HERO.x;
    var heroBotLineCollision = BALL.x < HERO.x + HERO.width;
    var heroLeftLineCollision =  HERO.x < BALL.x + BALL.radius;
    var heroRightLineCollision = BALL.y < HERO.y + HERO.height;
    if ( heroTopLineCollision && heroBotLineCollision && heroLeftLineCollision && heroRightLineCollision ) {
        BALL.y = Math.floor(Math.random() * GAME.height - BALL.radius * 2) + BALL.radius;
        BALL.x = Math.floor(Math.random() * GAME.width - BALL.radius * 2) + BALL.radius;
        if (AUDIO.audioIsOn) {
            AUDIO.src.play()
        }


        HERO.count += 1;
        
    }

}

function updateRacket2() {
    RACKET2.y += 3;
    if (RACKET2.y + RACKET2.height >= GAME.height + 240) {
        RACKET2.alive = false
    }
    if (RACKET2.y + RACKET2.height >= HERO.y && RACKET2.x < HERO.x + HERO.width && HERO.x < RACKET2.x + RACKET2.width && RACKET2.y < HERO.y + HERO.height) {
        HERO.alive = false;
    }
}

function racketSpeed() {
    if (HERO.count >= 10) {
        RACKET.y += 4;
    }
    if (HERO.count >= 25) {
        RACKET.y += 5;
    }
    if (HERO.count >= 40) {
        RACKET4.y += 6;
    }
}

function racket2Speed() {
    if (HERO.count >= 10) {
        RACKET2.y += 4;
    }
    if (HERO.count >= 25) {
        RACKET2.y += 5;
    }
    if (HERO.count >= 40) {
        RACKET4.y += 6;
    }
}

function racket3Speed() {
    if (HERO.count >= 10) {
        RACKET3.x += 4;
    }
    if (HERO.count >= 25) {
        RACKET3.x += 5;
    }
    if (HERO.count >= 40) {
        RACKET4.x += 6;
    }
}

function racket4Speed() {
    if (HERO.count >= 10) {
        RACKET4.x += 4;
    }
    if (HERO.count >= 25) {
        RACKET4.x += 5;
    }
    if (HERO.count >= 40) {
        RACKET4.x += 6;
    }
}
function updateRacket1() {
    RACKET.y += 3;
    if (RACKET.y + RACKET.height >= GAME.height + 240) {
        RACKET.alive = false
    }
    if (RACKET.y + RACKET.height >= HERO.y && RACKET.x < HERO.x + HERO.width && HERO.x < RACKET.x + RACKET.width && RACKET.y < HERO.y + HERO.height) {
        HERO.alive = false;
    }
}

function updateRacket4() {
    RACKET4.x += 3;
    if (RACKET4.x + RACKET4.width >= GAME.width + 240) {
        RACKET4.alive = false
    }
    if (RACKET4.y + RACKET4.height >= HERO.y && RACKET4.x < HERO.x + HERO.width && HERO.x < RACKET4.x + RACKET4.width && RACKET4.y < HERO.y + HERO.height) {
        HERO.alive = false;
    }
}

function updateRacket3() {
    RACKET3.x += 3;
    if (RACKET3.x + RACKET3.width >= GAME.width + 240) {
        RACKET3.alive = false
    }
    if (RACKET3.y + RACKET3.height >= HERO.y && RACKET3.x < HERO.x + HERO.width && HERO.x < RACKET3.x + RACKET3.width && RACKET3.y < HERO.y + HERO.height) {
        HERO.alive = false;
    }

}
function drawStartMenu() {
    canvasContext.fillStyle = "black"
    canvasContext.fillRect(0, 0, GAME.width, GAME.height),
        drawBackground();
    drawStartButton();
    canvasContext.fillStyle = "black"
    canvasContext.fillText("SHARK ATTACK GAME", 30, 100);
    canvasContext.fillStyle = "white"
    canvasContext.fillText("created by emql", 150, +550);
}

function drawRacket() {
    DdNet = new Image();
    DdNet.src = "acool.png";
    DdNet.onload = () => (DdNetState = true);
    canvasContext.drawImage(DdNet, RACKET.x, RACKET.y, RACKET.width, RACKET.height)
}

function drawRacket2() {
    DdNet = new Image();
    DdNet.src = "acool.png";
    DdNet.onload = () => (DdNetState = true);
    canvasContext.drawImage(DdNet, RACKET2.x, RACKET2.y, RACKET2.width, RACKET2.height)
}

function drawRacket3() {
    DdNet = new Image();
    DdNet.src = "acool2.png";
    DdNet.onload = () => (DdNetState = true);
    canvasContext.drawImage(DdNet, RACKET3.x, RACKET3.y, RACKET3.width, RACKET3.height)
}

function drawRacket4() {
    DdNet = new Image();
    DdNet.src = "acool2.png";
    DdNet.onload = () => (DdNetState = true);
    canvasContext.drawImage(DdNet, RACKET4.x, RACKET4.y, RACKET4.width, RACKET4.height)
}

function play() {
    if (isGameStart) {

        if (HERO.alive) {
            drawFrame();

        }
        else {
            window.addEventListener("click", openLose);
            drawLoseScreen();
        }
    }
    else {
        drawStartMenu();

    }
    drawStatus = requestAnimationFrame(play);
}

function initEventsListeners() {
    window.addEventListener('mousemove', onCanvasMouseMove);
    window.addEventListener("click", openMenu);
    window.addEventListener("keydown", onCanvasKeyDown);
}

function onCanvasMouseMove(event) {
    HERO.x = event.clientX - HERO.width / 2;
    if (HERO.x < 0) {
        HERO.x = 0;
    }
    if (HERO.x + HERO.width > GAME.width) {
        HERO.x = GAME.width - HERO.width;
    }
    HERO.y = event.clientY - HERO.height / 2;
    if (HERO.y < 0) {
        HERO.y = 0;
    }
    if (HERO.y + HERO.height > GAME.height) {
        HERO.y = GAME.height - HERO.height;
    }
}

function onCanvasKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        HERO.x -= HERO.xDirection;

    }
    if (event.key === 'ArrowRight') {
        HERO.x += HERO.xDirection;
    }
    if (event.key === 'ArrowUp') {
        HERO.y -= HERO.yDirection;

    }
    if (event.key === 'ArrowDown') {
        HERO.y += HERO.yDirection;
    }
    if (event.key === "p") {
        Audio.audioIsOn = !Audio.audioIsOn
    }
    if (HERO.x < 0) {
        HERO.x = 0;
    }
    if (HERO.x + HERO.width > GAME.width) {
        HERO.x = GAME.width - HERO.width;
    }
    if (HERO.y < 0) {
        HERO.y = 0;
    }
    if (HERO.y + HERO.height > GAME.height) {
        HERO.y = GAME.height - HERO.height;
    }
    clampHeroPosition();

}

function clampHeroPosition() {
    if (HERO.x < 0) {
        HERO.x = 0;
    }
    if (HERO.x + HERO.width > GAME.width) {
        HERO.x = GAME.width - HERO.width;
    }
    if (HERO.y < 0) {
        HERO.y = 0;
    }
    if (HERO.y + HERO.height > GAME.height) {
        HERO.y = GAME.height - HERO.height;
    }
}

function clampHeroPosition() {
    if (HERO.x < 0) {
        HERO.x = 0;
    }
    if (HERO.x + HERO.width > GAME.width) {
        HERO.x = GAME.width - HERO.width;
    }
}

initEventsListeners();
play(); 



