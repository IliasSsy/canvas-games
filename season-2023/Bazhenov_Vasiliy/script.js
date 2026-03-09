var GAME = {
    width: 750,
    height: 1200,
    img: new Image(),
    imgIsLoad: false

}
var canvas = document.getElementById("canvas");

canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");


function drawBackground() {
    if (GAME.imgIsLoad) {
        canvasContext.drawImage(GAME.img, 0, 0, GAME.width, GAME.height)
    }
}

function initImage() {
    GAME.img.src = "./foto/ball pudge_vs_creeps.png"
    GAME.img.onload = () => {
        GAME.imgIsLoad = true;
    }
}

var BALL = {
    img: new Image(),
    imgIsLoad: false,
    x: 375,
    y: 600,
    radius: 45,
    xDirection: 0,
    yDirection: 17,
    defaltXDirection: 10
}

function drawBall1() {
    if (BALL.imgIsLoad) {
        canvasContext.drawImage(BALL.img, BALL.x, BALL.y, BALL.radius, BALL.radius)
    }
}

function initImageBall() {
    BALL.img.src = "./foto/vz1.png"
    BALL.img.onload = () => {
        BALL.imgIsLoad = true;
    }
}

var ROCKET = {
    x: 375,
    y: 1000,
    width: 75,
    height: 75,
    img: new Image(),
    imgIsLoad: false,
    xDirection: 21,
}
function drawRaket1() {
    if (ROCKET.imgIsLoad) {
        canvasContext.drawImage(ROCKET.img, ROCKET.x, ROCKET.y, ROCKET.width, ROCKET.height)
    }
}

function initImageRocket() {
    ROCKET.img.src = "./foto/rus.png"
    ROCKET.img.onload = () => {
        ROCKET.imgIsLoad = true;
    }
}

var ROCKET2 = {
    x: 375,
    y: 105,
    width: 75,
    height: 75,
    img: new Image(),
    imgIsLoad: false,
    xDirection: 3,
    secondLvlXDirection: 6
}

function drawRaket2() {
    if (ROCKET.imgIsLoad) {
        canvasContext.drawImage(ROCKET2.img, ROCKET2.x, ROCKET2.y, ROCKET2.width, ROCKET2.height)
    }
}

function initImageRocket2() {
    ROCKET2.img.src = "./foto/brz.png"
    ROCKET2.img.onload = () => {
        ROCKET2.imgIsLoad = true;
    }
}

var DOOR = {
    img: new Image(),
    imgIsLoad: false,
    x: 225,
    y: 1100,
    width: 300,
    height: 80,
    score: 0
}

function drawDoor1() {
    if (DOOR.imgIsLoad) {
        canvasContext.drawImage(DOOR.img, DOOR.x, DOOR.y, DOOR.width, DOOR.height)
    }
}

function initImageDoor() {
    DOOR.img.src = "./foto/door aero_hockey.png"
    DOOR.img.onload = () => {
        DOOR.imgIsLoad = true;
    }
}

var DOOR2 = {
    img: new Image(),
    imgIsLoad: false,
    x: 225,
    y: 25,
    width: 300,
    height: 80,
    score: 0
}

function drawDoor2() {
    if (DOOR.imgIsLoad) {
        canvasContext.drawImage(DOOR2.img, DOOR2.x, DOOR2.y, DOOR2.width, DOOR2.height)
    }
}

function initImageDoor2() {
    DOOR2.img.src = "./foto/door.png"
    DOOR2.img.onload = () => {
        DOOR2.imgIsLoad = true;
    }
}


var AUDIO = {
    src: new Audio("./audio/pass.mp3"),
    audioIsOn: false,
}



function updateBall() {
    BALL.x += BALL.xDirection;
    BALL.y += BALL.yDirection;
    if ((BALL.y + BALL.radius > DOOR.y) || (BALL.y - BALL.radius < DOOR2.y + DOOR.height)) {
        BALL.yDirection = - BALL.yDirection;
        if (BALL.x > DOOR.x && BALL.x < DOOR.x + DOOR.width) {
            if (BALL.y > GAME.height / 2) {
                DOOR.score++;
            } else {
                DOOR2.score++;
            }
        }
    }
    if ((BALL.x + BALL.radius >= GAME.width) || (BALL.x <= 0)) {
        BALL.xDirection = - BALL.xDirection;
    }
    var rocketTopLineCollision = BALL.y + BALL.radius > ROCKET.y;
    var rocketLeftLineCollision = BALL.x + BALL.radius > ROCKET.x;
    var rocketRightLineCollision = BALL.x - BALL.radius < ROCKET.x + ROCKET.width;
    var rocketDownLineCollicion = BALL.y - BALL.radius < ROCKET.y + ROCKET.height;

    if (rocketLeftLineCollision && rocketTopLineCollision && rocketRightLineCollision && rocketDownLineCollicion) {
        BALL.yDirection = - BALL.yDirection;
        BALL.xDirection = (Math.random() * 2 - 1) * BALL.defaltXDirection;
        if (AUDIO.audioIsOn) {
            AUDIO.src.play()
        }

    }
    var rocket2TopLineCollision = BALL.y + BALL.radius > ROCKET2.y;
    var rocket2LeftLineCollision = BALL.x + BALL.radius > ROCKET2.x;
    var rocket2RightLineCollision = BALL.x - BALL.radius < ROCKET2.x + ROCKET2.width;
    var rocket2DownLineCollicion = BALL.y - BALL.radius < ROCKET2.y + ROCKET2.height;

    if (rocket2LeftLineCollision && rocket2TopLineCollision && rocket2RightLineCollision && rocket2DownLineCollicion) {
        BALL.yDirection = - BALL.yDirection;
        BALL.xDirection = (Math.random() * 2 - 1) * BALL.defaltXDirection;
        if (AUDIO.audioIsOn) {
             AUDIO.src.play()
        }

    }
   
}

function updateRocket2() {
    if ((ROCKET2.x + ROCKET2.width > GAME.width) || (ROCKET2.x < 0)) {
        ROCKET2.xDirection = - ROCKET2.xDirection
    }
    if (BALL.x > ROCKET2.x) {
        ROCKET2.x += ROCKET2.xDirection;
    }
    if (BALL.x < ROCKET2.x) {
        ROCKET2.x -= ROCKET2.xDirection;
    }
}

function drowScore() {
    canvasContext.fillStyle = "back";
    canvasContext.font = "46px Manual";
    canvasContext.fillText("Score: " + DOOR.score, 30, 60)
}
function drowScore2() {
    canvasContext.fillStyle = "back";
    canvasContext.font = "46px Manual";
    canvasContext.fillText("Score: " + DOOR2.score, 30, 1140)
}



function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drowScore();
    drowScore2();
    drawRaket1();
    drawRaket2();
    drawDoor1();
    drawDoor2();
    drawBall1();
}


function initEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove)
    window.addEventListener("keydown", onCanvasKeyDown)
}


function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        ROCKET.x -= ROCKET.xDirection;
    }
    if (event.key === "ArrowRight") {
        ROCKET.x += ROCKET.xDirection;
    }
    if (event.key === "p") {
        AUDIO.audioIsOn = !AUDIO.audioIsOn
    }

    // DEBUG
    if (event.key === "r") {
        ROCKET2.x = GAME.width / 2;
    }
    if (event.key === "b") {
        BALL.x = GAME.width / 2;
        BALL.y = GAME.height / 2;
    }
    if (event.key == "a" && event.ctrlKey) {
        DOOR2.score++;
    }

    clampRocketPosition();
}

clampRocketPosition();

function onCanvasMouseMove(event) {
    ROCKET.x = event.clientX;
    clampRocketPosition();
}

function clampRocketPosition() {
    if (ROCKET.x < 0) {
        ROCKET.x = 0;
    }
    if (ROCKET.x + ROCKET.width > GAME.width) {
        ROCKET.x = GAME.width - ROCKET.width;

    }
}
initEventsListeners();

function drawText(text) {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    canvasContext.font = "96pt Arial";
    canvasContext.textAlign = "center";
    canvasContext.fillText(text, GAME.width / 2, GAME.height / 2);
}

function gameResume() {
    if (DOOR2.score > 12) {
        if (ROCKET2.xDirection != ROCKET2.secondLvlXDirection) {
            drawText("next level");
            DOOR.score = 0;
            DOOR2.score = 0;
            ROCKET2.x = GAME.width / 2;
            BALL.x = GAME.width / 2;
            BALL.y = GAME.height / 2;
            ROCKET2.xDirection = ROCKET2.secondLvlXDirection;
            setTimeout(play, 5000);
        } else {
            drawText("Victory");
        }
        return false;
    } else if (DOOR.score > 12) {
        drawText("You lost");
        return false;
    } else {
        return true;
    }
}


function play() {
    if (gameResume()) {
        drawFrame();
        updateBall();
        updateRocket2();
        requestAnimationFrame(play);
    }
}

initImage();
initImageBall();
initImageRocket();
initImageRocket2();
initImageDoor();
initImageDoor2()

play();