var canvas = document.getElementById('canvas');
var canvasContext = canvas.getContext('2d');

//var Timer = window.setInterval(xdeceleration, 500);
var TimerId = window.setInterval(acceleration, 80);

var yPosDown = 0;
var drawStatus;
var counter = 0;
var isfly = Boolean(false);
var isenterdowned = Boolean(false);
var notstartleave = Boolean(true);
var isstartbuttondowned = Boolean(false);
var levelTexture = 'hard';
var isPlayerMove = false;

var MENU_BUTTON = {
    x: 800,
    y: 400,
    radius: 200,
}

var AUDIO = {
    src: new Audio('./mp3/audio.mp3'),
    audioIsOn: false,
}


var START_BUTTON = {
    Width: 300,
    Height: 100,

}
var LEVEL_BUTTON = {
    x: 1600,
    y: 50,
    radius: 35.

}

var BALL_BUTTON = {
    x: 1600,
    y: 150,
    radius: 35.

}


var BACKGROUND = {
    img: new Image(),
    imgIsLoad: false
}

var BALL = {
    color: "#FF6E40",
    x: 90,
    y: 0,
    l: 0,
    radius: 10,
    radius2: 10,
    xDirection: 0,
    yDirection: 0,
    time: 0,
    acceleration: 0.08,
    flystatus: false,
    slump: true,
    turnOn: false

}

var ANIMATION = {
    img: new Image(),
    imgIsLoad: false,
    size: 80
}

var PINGstart = {
    img: new Image(),
    imgIsLoad: false,
    size: 50
}


var PINGfly = {
    img: new Image(),
    imgIsLoad: false,
    size: 50
}


var PINGfall = {
    img: new Image(),
    imgIsLoad: false,
    size: 50
}

var PINGbottom = {
    img: new Image(),
    imgIsLoad: false,
    size: 50
}

var GAME = {
    Width: 1700,
    Height: 900,
    backgraund: '#F0FFFF',
    record: 0,
    status: true,
}

var PLAYER = {
    x: 10,
    y: 600,
    Height: 80,
    Width: 40,
    texture: 'simple',
}

canvas.width = GAME.Width;
canvas.height = GAME.Height;


function initEventsListeners() {
    window.addEventListener("click", onCanvasMouseClick);
    window.addEventListener("keydown", onCanvasKeyDown);
    window.addEventListener("click", openMenu);
}

function onCanvasKeyDown(event) {
    if (event.key === "Enter") {
        playerhit();
        isenterdowned = false;
    }
    if (event.key === "p") {
        AUDIO.audioIsOn = !AUDIO.audioIsOn
    }
    if (event.key === "r") {
        reset();
    }

}

function onCanvasMouseClick(event) {

    playerhit();
    isenterdowned = false;

}

function checkposX() {
    if ((BALL.x + BALL.radius >= GAME.Width)) {
        notstartleave = false;
        BALL.xDirection *= 0.3;
        BALL.x = 200;
    }

}

function Level() {
    if (counter % 2 == 0) {
        levelTexture = 'simple';
    }
    else {
        levelTexture = 'hard';
    }
    counter += 1;
}

function isOnLevelButton(event) {
    if (((event.x >= LEVEL_BUTTON.x - LEVEL_BUTTON.radius) && (event.x <= LEVEL_BUTTON.x + LEVEL_BUTTON.radius)) &&
        ((event.y >= LEVEL_BUTTON.y - LEVEL_BUTTON.radius) && (event.y <= LEVEL_BUTTON.y + LEVEL_BUTTON.radius))) {
        return true;
    }
}

function isOnMenuButton(event) {
    if (((event.x >= MENU_BUTTON.x - MENU_BUTTON.radius) && (event.x <= MENU_BUTTON.x + MENU_BUTTON.radius)) &&
        ((event.y >= MENU_BUTTON.y - MENU_BUTTON.radius) && (event.y <= MENU_BUTTON.y + MENU_BUTTON.radius)) && (!isfly) && (!GAME.status)) {
        return true;
    }
}

function isOnBallButton(event) {

    if (((event.x >= BALL_BUTTON.x - BALL_BUTTON.radius) && (event.x <= BALL_BUTTON.x + BALL_BUTTON.radius)) &&
        ((event.y >= BALL_BUTTON.y - BALL_BUTTON.radius) && (event.y <= BALL_BUTTON.y + BALL_BUTTON.radius))) {
        return true;
    }
}


function openMenu(event) {
    if (isOnMenuButton(event)) {
        console.log("reset");
        reset();
    }
    if (isOnLevelButton(event)) {
        console.log('harder');
        Level();
    }
    if (isOnBallButton(event)) {
        console.log('other ball');
        otherBall();
    }
}

function drawBackground() {
    canvasContext.fillStyle = GAME.backgraund;
    canvasContext.fillRect(0, 0, GAME.Width, GAME.Height);
    canvasContext.fillStyle = '#B0C4DE';
    canvasContext.fillRect(0, 750, GAME.Width, GAME.Height);
    if (BACKGROUND.imgIsLoad) {
        if (notstartleave){
        canvasContext.drawImage(
            BACKGROUND.img,
            200,
            590,
        );
        canvasContext.drawImage(
            BACKGROUND.img,
            1470,
            590,
        );
        }
        if (!notstartleave){
            canvasContext.drawImage(
            BACKGROUND.img,
            0,
            590,
        );
        canvasContext.drawImage(
            BACKGROUND.img,
            1270,
            590,
        );

}

        
    }
}

function playerhit() {
    if (isenterdowned) {
        isPlayerMove = true;
        PLAYER.x += 40;
        fly();
        setTimeout(playerback, 500);
    }
}

function playerback() {
    PLAYER.x = 10;
    isfly = false;
    isPlayerMove = false;
}

function initAnimation() {

    ANIMATION.img.src = "./img/spr.png"
    ANIMATION.img.onload = () => {
        ANIMATION.imgIsLoad = true;
    }

    PINGfly.img.src = "./img/fly.png"
    PINGfly.img.onload = () => {
        PINGfly.imgIsLoad = true;
    }

    PINGfall.img.src = "./img/fall.png"
    PINGfall.img.onload = () => {
        PINGfall.imgIsLoad = true;
    }

    PINGbottom.img.src = "./img/pingbottom.png"
    PINGbottom.img.onload = () => {
        PINGbottom.imgIsLoad = true;
    }

    PINGstart.img.src = "./img/startping.png"
    PINGstart.img.onload = () => {
        PINGstart.imgIsLoad = true;
    }

    BACKGROUND.img.src = "./img/yolki.png"
    BACKGROUND.img.onload = () => {
        BACKGROUND.imgIsLoad = true;
    }
}

function Player1() {
    if (ANIMATION.imgIsLoad) {
        canvasContext.drawImage(
            ANIMATION.img,
            0,
            0,
            250,
            500,
            0,
            PLAYER.y,
            ANIMATION.size * 1,
            ANIMATION.size * 2,
        );

    }
}

function Player2() {
    if (ANIMATION.imgIsLoad) {
        canvasContext.drawImage(
            ANIMATION.img,
            300,
            0,
            250,
            500,
            0,
            PLAYER.y,
            ANIMATION.size * 1,
            ANIMATION.size * 2,
        );

    }
}

function playeranimator() {
    if (isPlayerMove == true) {
        Player2();
        setTimeout(Player1, 500);
    }
    else {
        Player1();

    }
}

function otherBall() {
    BALL.turnOn = !BALL.turnOn;
    if (BALL.turnOn === true) {
        BALL.radius = 10;

    }
    if (BALL.turnOn === false) {
        BALL.radius = 0;
    }
    PINGbottom.imgIsLoad = !PINGbottom.imgIsLoad;
    PINGstart.imgIsLoad = !PINGstart.imgIsLoad;
    PINGfly.imgIsLoad = !PINGfly.imgIsLoad;
    PINGfall.imgIsLoad = !PINGfall.imgIsLoad;

}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.Width, GAME.Height);

    drawBackground();
    drawBalls();
    drawScore();
    drawLevelButton();
    drawBallButton()
    if (GAME.status === false) { drawMenuButton(); }
    // if (PLAYER.texture === 'beauty') {
    //     player1();
    // }
    checkposX();
    playeranimator();
    if (notstartleave) {
        drawPlayer();

    }
    if (!notstartleave) {
        ANIMATION.size = 0;
    }
    CorrectRenderErr();

}

function drawBallButton() {
    // Рисуем окржуность для кнопки
    canvasContext.fillStyle = 'black';
    canvasContext.beginPath();
    canvasContext.arc(BALL_BUTTON.x, BALL_BUTTON.y, BALL_BUTTON.radius, 0, 2 * Math.PI);
    canvasContext.stroke();
    canvasContext.fillText('B', 1595, 167.5);
}

function drawScore() {
    if (GAME.record < BALL.l) { GAME.record = BALL.l }
    canvasContext.fillStyle = 'grey';
    canvasContext.font = "48px onyx";
    canvasContext.fillText((Math.round(BALL.l) / 10) + 'm', 10, 50);
    canvasContext.fillText('RECORD: ' + (Math.round(GAME.record) / 10) + 'm', 10, 110);
}

function drawLevelButton() {
    // Рисуем окржуность для кнопки
    canvasContext.fillStyle = 'black';
    canvasContext.beginPath();
    canvasContext.arc(LEVEL_BUTTON.x, LEVEL_BUTTON.y, LEVEL_BUTTON.radius, 0, 2 * Math.PI);
    canvasContext.stroke();
    canvasContext.fillText('C', 1595, 67.5);
}

function drawMenuButton() {

    canvasContext.fillStyle = 'grey';
    canvasContext.beginPath();
    canvasContext.arc(MENU_BUTTON.x, MENU_BUTTON.y, MENU_BUTTON.radius, 0, 2 * Math.PI);
    canvasContext.closePath();
    canvasContext.stroke();

    canvasContext.moveTo(MENU_BUTTON.x + 30, MENU_BUTTON.y)
    canvasContext.strokeStyle = 2;
    canvasContext.arc(MENU_BUTTON.x, MENU_BUTTON.y, MENU_BUTTON.radius / 3, 0, 1.5 * Math.PI);
    canvasContext.moveTo(MENU_BUTTON.x + MENU_BUTTON.radius / 3, MENU_BUTTON.y)
    canvasContext.lineTo(MENU_BUTTON.x + MENU_BUTTON.radius / 3 + 20, MENU_BUTTON.y + 30)
    canvasContext.stroke();
}
// canvasContext.fillRect(MENU_BUTTON.x - 8, MENU_BUTTON.y - 10, 5, 20)
// canvasContext.fillRect(MENU_BUTTON.x + 3, MENU_BUTTON.y - 10, 5, 20)


function pageStart() {
    canvasContext.fillStyle = '#4682B4';
    canvasContext.fillRect(0, 0, GAME.Width, GAME.Height);
    canvasContext.font = '60px Ariel'

    canvasContext.strokeStyle = 'black';
    canvasContext.rect(580, 400, START_BUTTON.Width, START_BUTTON.Height)
    canvasContext.stroke();
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Play", 670, 460);

}

function reset() {
    PLAYER.x = 10;
    BALL.time = 0;
    BALL.x = 90;
    BALL.y = 0;
    BALL.l = 0;
    BALL.slump = true;
    BALL.xDirection = 0;
    BALL.yDirection = 0;
    BALL.acceleration = 0.08;
    BALL.flystatus = false;
    GAME.status = true;
    isPlayerMove = false;
    ANIMATION.size = 80;
    isenterdowned = true;
    notstartleave = true;
    isfly = false;

    drawPlayer();
}

function drawPlayer() {
    if (levelTexture === 'simple') {
        ANIMATION.size = 0;
        canvasContext.fillStyle = 'black';
        canvasContext.lineWidth = 3;
        canvasContext.beginPath();
        canvasContext.moveTo(PLAYER.x, PLAYER.y);
        canvasContext.lineTo(PLAYER.x + PLAYER.Width, PLAYER.y + PLAYER.Height / 2);
        canvasContext.lineTo(PLAYER.x, PLAYER.y + PLAYER.Height);
        canvasContext.closePath();
        canvasContext.fill();
    }
    else { ANIMATION.size = 80 }

}

function drawBalls() {
    if (BALL.turnOn === false) { BALL.radius = 0 }
    canvasContext.fillStyle = BALL.color;
    canvasContext.beginPath();
    canvasContext.arc(BALL.x, BALL.y, BALL.radius, 0, 2 * Math.PI);
    canvasContext.closePath();
    canvasContext.fill();
    if (BALL.turnOn) {
        canvasContext.fillStyle = BALL.color;
        canvasContext.beginPath();
        canvasContext.arc(BALL.x, BALL.y, BALL.radius, 0, 2 * Math.PI);
        canvasContext.closePath();
        canvasContext.fill();
    }

    if ((PINGfly.imgIsLoad) && (!BALL.flystatus) && (BALL.slump)) {
        canvasContext.drawImage(
            PINGstart.img,
            BALL.x,
            BALL.y - 80,
        );
    }

    if ((PINGfly.imgIsLoad) && (BALL.flystatus) && (BALL.yDirection < 0)) {
        canvasContext.drawImage(
            PINGfly.img,
            BALL.x,
            BALL.y,
        );

    }

    if ((PINGfall.imgIsLoad) && (BALL.flystatus) && (BALL.yDirection > 0) && (BALL.y < GAME.Width - 170)) {
        canvasContext.drawImage(
            PINGfall.img,
            BALL.x,
            BALL.y,
        );

    }

    if ((PINGbottom.imgIsLoad) && (!GAME.status)) {
        canvasContext.drawImage(
            PINGbottom.img,
            BALL.x,
            BALL.y
        );
    }

}


function fly() {
    if ((PLAYER.x + PLAYER.Width === BALL.x) && (PLAYER.y + PLAYER.Height > BALL.y) && (PLAYER.y < BALL.y)) {
        //stop();
        BALL.slump = false;
        yPosDown = BALL.y;
        BALL.xDirection = 0;
        BALL.yDirection = 0;
        BALL.flystatus = true;
        isfly = true;

        strike();
    }
}

function strike() {
    var h = BALL.radius2 / (BALL.y - PLAYER.y);
    h *= 70;
    
    if (yPosDown - BALL.radius2 < PLAYER.y + PLAYER.Width / 2) {
        BALL.yDirection -= h + 10;
        if (h < 30) { BALL.xDirection = 15 }
        if (h > 30) { BALL.xDirection = 7.5 }
        if (h > 120) { BALL.xDirection = 1.5 }

        console.log('Ускорение у:' + BALL.yDirection)
    }
    if (yPosDown + BALL.radius2 > PLAYER.y + PLAYER.Width / 2) {
        BALL.yDirection -= h - 10;
        BALL.xDirection = 15;
        console.log('Ускорение у:' + BALL.yDirection)
    }
    console.log("h=" + h);
    console.log('direction' + BALL.xDirection)
    if (BALL.y + 10 * BALL.radius2 >= GAME.Height) {
        stop();
        //CorrectRenderErr();
    }
}

function updateBall() {
    BALL.y += BALL.yDirection;
    BALL.x += BALL.xDirection;
    BALL.l += BALL.xDirection;
    console.log(BALL.yDirection);
    if (BALL.y + 10 * BALL.radius >= GAME.Height) {
        stop();
    }
    if (isfly) {
        if (AUDIO.audioIsOn) {
            AUDIO.src.play()
        }
    }

}

function stop() {
    BALL.acceleration = 0;
    BALL.yDirection = 0;
    BALL.xDirection = 0;
    BALL.flystatus = false;
    isfly = false;
    BALL.slump = false;
    GAME.status = false;
    drawMenuButton();

}

function acceleration() {

    BALL.time += 1;
    BALL.yDirection += BALL.acceleration * BALL.time;

}


function CorrectRenderErr() {
    if (!GAME.status) { BALL.y = GAME.Height - 50 }
    if (!GAME.status) { BALL.y = GAME.Height - 100 }


}
// function xdeceleration(){
//     Timer+=1;
//     BALL.xDirection -= BALL.xDirection*Timer;
// }

function play() {
    drawFrame();
    updateBall();
    drawStatus = requestAnimationFrame(play);
}


initAnimation();
initEventsListeners();
play();