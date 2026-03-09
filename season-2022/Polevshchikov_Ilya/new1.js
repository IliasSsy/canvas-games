var GAME = {
    width: 1000,
    height: 690,
    background: "#68DFFA",
    score: 0,
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

var CHARACTER = {
    color: "#F59E10",
    x: 235,
    y: 670,
    width: 100,
    height: 20,
    xDirection: 10,
    yDirection: 10
}

var PLATFORM = {
    color: "#FFFFFF",
    x: 250,
    y: 0,
    width: 20,
    height: 20,
    speed: 5
}

function updatePlatform(platform, character) {
    platform.y += platform.speed;
    if (platform.y + platform.height > GAME.height) {
        console.log("U lose");
        platform.y = 0;
        GAME.score = 0;
        platform.x = Math.random()*700;
        location = location;
    }
    if ((platform.y + platform.height > character.y) && (platform.x + platform.width > character.x) && (platform.x < character.x + character.width)) {
        GAME.score += 1;
        platform.y = 0;
        platform.x = Math.random()*700;
    }
}

//copiing of platform
var PLATFORM2 = {
    color: "#FFFFFF",
    x: 250,
    y: -230,
    width: 20,
    height: 20,
    speed: 5
}

function updatePlatform2(platform2, character) {
    platform2.y += platform2.speed;
    if (platform2.y + platform2.height > GAME.height) {
        console.log("U lose");
        platform2.y = 0;
        GAME.score = 0;
        platform2.x = Math.random()*900;
        location = location;
    }
    if ((platform2.y + platform2.height > character.y) && (platform2.x + platform2.width > character.x) && (platform2.x < character.x + character.width)) {
        GAME.score += 1;
        platform2.y = 0;
        platform2.x = Math.random()*900;
    }
}

function drawPlatform2(platform2) {
    canvasContext.fillStyle = platform2.color;
    canvasContext.fillRect(platform2.x, platform2.y, platform2.width, platform2.height);
}

var PLATFORM3 = {
    color: "#FFFFFF",
    x: 250,
    y: -460,
    width: 20,
    height: 20,
    speed: 5
}

function updatePlatform3(platform3, character) {
    platform3.y += platform3.speed;
    if (platform3.y + platform3.height > GAME.height) {
        console.log("U lose");
        platform3.y = 0;
        GAME.score = 0;
        platform3.x = Math.random()*600;
        location = location;
    }
    if ((platform3.y + platform3.height > character.y) && (platform3.x + platform3.width > character.x) && (platform3.x < character.x + character.width)) {
        GAME.score += 1;
        platform3.y = 0;
        platform3.x = Math.random()*600;
    }
}

function drawPlatform3(platform3) {
    canvasContext.fillStyle = platform3.color;
    canvasContext.fillRect(platform3.x, platform3.y, platform3.width, platform3.height);
}

function drawCharacter(character) {
    canvasContext.fillStyle = character.color;
    canvasContext.fillRect(character.x, character.y, character.width, character.height);
}

function drawPlatform(platform) {
    canvasContext.fillStyle = platform.color;
    canvasContext.fillRect(platform.x, platform.y, platform.width, platform.height);
}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawPlatform(PLATFORM);
    drawCharacter(CHARACTER);
    drawScore();
    drawPlatform2(PLATFORM2);
    drawPlatform3(PLATFORM3);
}

function drawBackground() {
    canvasContext.fillStyle = "#68DFFA";
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

function initEventsListener() {
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener("keydown", onCanvasKeyDown);
}

function onCanvasMouseMove(event) {
    CHARACTER.x = event.clientX;
    clampCharacterPosition();
}

function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        CHARACTER.x = CHARACTER.x - CHARACTER.speed;
    }
    if (event.key === "ArrowRight") {
        CHARACTER.x = CHARACTER.x + CHARACTER.speed;
    }
    clampCharacterPosition();
}

function clampCharacterPosition() {
    if (CHARACTER.x < 0) {
        CHARACTER.x = 0;
    }
    if (CHARACTER.x + CHARACTER.width > GAME.width) {
        CHARACTER.x = GAME.width - CHARACTER.width;
    }
}

initEventsListener();

function play() {
    drawFrame();
    updatePlatform(PLATFORM, CHARACTER);
    requestAnimationFrame(play);
    updatePlatform2(PLATFORM2, CHARACTER);
    updatePlatform3(PLATFORM3, CHARACTER);
}

function drawScore() {
    canvasContext.font = "24px Arial";
    canvasContext.fillText("Score: " + GAME.score, 10, 50);
  }

play();