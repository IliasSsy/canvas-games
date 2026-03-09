var GAME = {
    width: 1200,
    height: 900,
    background: new Image(),
    paused: false,
}

var BOTTOM = {
    image: new Image(),
    y: 700,
    x: 0,
    width: 34993,
    height: 723,
}

var MENU = {
    x: 1150,
    y: 50,
    radius: 25,
}

var CREED = {
    image: new Image(),
    x: 100,
    y: 430,
    width: 300,
    height: 100,
    yDirection: 3,
    xDirection: 0,
    score: 0,
    jump: 1000
}

var PRODA = {
    image: new Image(),
    x: 450,
    y: 325,
    width: 300,
    height: 100,
}

var RESTART = {
    image: new Image(),
    x: 450,
    y: 475,
    width: 300,
    height: 100,

}

var AUDIO = {
    src: new Audio('./song.mp3'),
    audioON: false,
}

var BADBOY = [{
    image: new Image(),
    x: 1200,
    y: 600,
    width: 100,
    height: 100,
    xDirection: 5,
},
{
    image: new Image(),
    x: 1300,
    y: 600,
    width: 100,
    height: 100,
    xDirection: 5,
},
{
    image: new Image(),
    x: 1700,
    y: 600,
    width: 100,
    height: 100,
    xDirection: 5,
},
{
    image: new Image(),
    x: 2100,
    y: 600,
    width: 100,
    height: 100,
    xDirection: 5,
}]

const gravitation = 1;

BOTTOM.image.src = './papka/bottom.png'
GAME.background.src = './papka/imagine.jpg'
CREED.image.src = './papka/creed.png'
PRODA.image.src = './papka/proda.png'
RESTART.image.src = './papka/rest.png'
BADBOY[0].image.src = './papka/payton.png'
BADBOY[1].image.src = './papka/granny.png'
BADBOY[2].image.src = './papka/freddy.webp'
BADBOY[3].image.src = './papka/bunny.png'

var canvas = document.getElementById("canvas");

canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

function drawFrame() {
    canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.height);
    drawMenu()
    drawBottom()
    drawBadBoys()
    drawCreed()
    drawScore()
    fall()

    if (GAME.paused === true) {
        drawProda();
        drawRestart();
    }
}

function drawMenu() {
    canvasContext.fillStyle = "red";
    canvasContext.beginPath();
    canvasContext.arc(MENU.x, MENU.y, MENU.radius, 0, 2 * Math.PI);
    canvasContext.fill();

    canvasContext.fillStyle = "white";
    canvasContext.fillRect(MENU.x - 8, MENU.y - 10, 5, 20);
    canvasContext.fillRect(MENU.x + 3, MENU.y - 10, 5, 20);


}

function drawBottom() {
    canvasContext.drawImage(BOTTOM.image, BOTTOM.x, BOTTOM.y);
}

function updateBottom() {
    BOTTOM.x -= 3
    if (BOTTOM.x + BOTTOM.width <= GAME.width) {
        BOTTOM.x = 0;
    }
}

function drawCreed() {
    canvasContext.drawImage(CREED.image, CREED.x, CREED.y, CREED.height, CREED.width);
}

function drawBadBoys() {
    for (var i = 0; i < BADBOY.length; i++) {
        canvasContext.drawImage(BADBOY[i].image, BADBOY[i].x, BADBOY[i].y, BADBOY[i].width, BADBOY[i].height)
    }
}

function updateBadBoys() {
    for (var i = 0; i < BADBOY.length; i++) {
        BADBOY[i].x -= BADBOY[i].xDirection;
        if (BADBOY[i].x < 0) {
            BADBOY[i].x = 1200;
        }
    }
}

function creedJump() {
    CREED.y -= CREED.yDirection;
    if (CREED.y < 100) {
        CREED.y += CREED.yDirection;
    }
    if (CREED.y >= 500) {
        CREED.y += 0;
    }
    console.log('aa')
}

function initEventsListener() {
    window.addEventListener("keydown", onCanvasKeyDown);
    window.addEventListener("click", openMenu);
}

function onCanvasKeyDown(event) {
    if (event.key === "ArrowUp") {
        creedJump();
    }
    if (event.key === "z") {
        AUDIO.audioON = !AUDIO.audioON
    console.log("ee")
    }
}

function drawProda() {
    canvasContext.drawImage(PRODA.image, PRODA.x, PRODA.y, PRODA.width, PRODA.height);
}

function drawRestart() {
    canvasContext.drawImage(RESTART.image, RESTART.x, RESTART.y, RESTART.width, RESTART.height);
}

function isOnMenu(event) {
    if (((event.x >= MENU.x - MENU.radius) && (event.x <= MENU.x + MENU.radius)) && ((event.y >= MENU.y - MENU.radius) && (event.y <= MENU.y + MENU.radius))) {
        GAME.paused = !GAME.paused;
    }

    if (((event.x >= PRODA.x) && (event.x <= PRODA.x + PRODA.width)) && ((event.y >= PRODA.y) && (event.y <= PRODA.y + PRODA.height))) {
        GAME.paused = !GAME.paused;
        console.log('sgfasf')
    }

    if (((event.x >= RESTART.x) && (event.x <= RESTART.x + RESTART.width)) && ((event.y >= RESTART.y) && (event.y <= RESTART.y + RESTART.height))) {
        GAME.paused = !GAME.paused;
        BADBOY[0].x = 1200;
        BADBOY[1].x = 1300;
        BADBOY[2].x = 1700;
        BADBOY[3].x = 2100;
}
}

function openMenu(event) {
    isOnMenu(event);
}

function drawScore() {
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = "red"
    canvasContext.fillText("Score:" + CREED.score, 10, 50);
}

function drawWinScreen() {
    canvasContext.font = "48px serif";
    canvasContext.fillText("YOU WIN! YOUR SCORE: " + CREED.score, 150, 250);
}

function updateScore(){
    CREED.score += 5
}

function drawwin() {
    canvasContext.fillStyle = "black"
    canvasContext.fillText("Победа!", 520, 470)
}

function jumpCREED() {
    CREED.y -= CREED.yDirection;
    if (CREED.y < CREED.y + CREED.height -CREED.jump) {
        CREED.y += CREED.yDirection
    }
}

function clampSantekhnikPosition() {

}

function gravityCREED() {
    drawCreed ();
    CREED.y += CREED.yDirection; 
    CREED.x += CREED.xDirection; 
    if (CREED.y + CREED.height + CREED.yDirection <= 530) { 
        CREED.yDirection += gravitation; 
    } 
    else { 
        CREED.yDirection = 0; 
    } 
}

function onCanvasKeyDown(event) { 
    if (event.key === "ArrowUp") { 
        CREED.yDirection -= 20; 
        if (CREED.yDirection != -20) { 
            CREED.yDirection = 0; 
        } 
        console.log(CREED.yDirection); 
    } 
} 
     
function onCanvasKeyUp(event) { 
      if (event.key === "ArrowUp") { 
        CREED.yDirection = 0; 
        console.log('jump'); 
    }  
}

function fall() {
        AUDIO.src.play();
}

setInterval(updateScore,500)

initEventsListener();

function play() {
    if(AUDIO.audioON) {
        AUDIO.src.play();
    }
    drawFrame()
    updateBottom()

    if (GAME.paused === false) {
    updateBadBoys();
    }
    requestAnimationFrame(play)
    if (CREED.score >= 500) {
        drawwin();
        GAME.paused = true;
    }
    gravityCREED();
}


play();
