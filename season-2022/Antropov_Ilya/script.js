const game = {
    pressUp: false,
    pressDown: false,
    pressLeft: false,
    pressRight: false,
    hitboxes: false,
}

let over = true;

let BEGINER = {
    x: 150,
    y: 50,
    width: 400,
    height: 400,
    background: "Grey",
    initEventsListeners1: 1,
}

let GAME = {
    x: 0,
    y: 0,
    width: 800,
    height: 500,
    background: "Blue",
}

let GAME1 = {
    x: 0,
    y: 0,
    width: 700,
    height: 400,
    background: "Grey",
    scoreP1: 0,
    scoreP2: 0,
}

let BALL = {
    color: "Red",
    x: 350,
    y: 200,
    radius: 10,
    xDirection: 3,
    yDirection: 3,
}

let RACKET1 = {
    color: "green",
    x: 665,
    y: 180,
    width: 30,
    height: 40,
    speed: 7,
}

let RACKET = {
    color: "Yellow",
    x: 5,
    y: 180,
    width: 30,
    height: 40,
    speed: 7,
}

let VOROTA = {
    color: "Black",
    x: 0,
    y: 125,
    width: 2,
    height: 150,
}

let VOROTA1 = {
    color: "Black",
    x: 698,
    y: 125,
    width: 2,
    height: 150,
}

let RAZMETKA = {
    color: "Black",
    x: 349,
    y: 0,
    width: 3,
    height: 400,
}

let RAZMETKA1 = {
    color: "Black",
    x: 350,
    y: 200,
    radius: 50,
}

const canvas = document.getElementById('canvas');
canvas.width = GAME.width;
canvas.height = GAME.height;

const canvasContext = canvas.getContext('2d');
canvasContext.fillStyle = GAME.color;
canvasContext.fillRect(0, 0, GAME.width, GAME.height);

function draw() {
    let ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = '46px serif';
    ctx.fillStyle = RACKET.color;
    ctx.fillText(GAME1.scoreP1, 200, 450);
    ctx.fillStyle = RACKET1.color;
    ctx.fillText(GAME1.scoreP2, 440, 450)
}

function drawFrame() {
    drawBackground();
    drawBackground1();
    drawVOROTA1();
    drawVOROTA();
    drawRAZMETKA();
    drawRAZMETKA1();
    drawRACKET();
    drawRACKET1();
    drawBall();
    draw();
}

function score() {

    if ((GAME1.scoreP1 < 10) && (GAME1.scoreP2 < 10)) {
        if ((BALL.x - BALL.radius <= VOROTA.x + VOROTA.width) && (BALL.y - BALL.radius >= VOROTA.y) && (BALL.y + BALL.radius <= VOROTA.y + VOROTA.height)) {
            GAME1.scoreP2 = GAME1.scoreP2 + 1;
        }
        if ((BALL.x + BALL.radius >= VOROTA1.x) && (BALL.y - BALL.radius >= VOROTA1.y) && (BALL.y + BALL.radius <= VOROTA1.y + VOROTA1.height)) {
            GAME1.scoreP1 = GAME1.scoreP1 + 1;
        }
    } else{

        if ((GAME1.scoreP1 === 10) || (GAME1.scoreP2 === 10)) {
            over = false;
            console.log(over);
            gameover();
        }
    }
}

function drawBall() {
    canvasContext.fillStyle = BALL.color;
    canvasContext.beginPath();
    canvasContext.arc(BALL.x, BALL.y, BALL.radius, 0, 2 * Math.PI);
    canvasContext.fill();
}
5

function play() {

    updateFrame1();
    updateFrame2();
    drawFrame();
    updateBall();
    score();
    requestAnimationFrame(play);
}

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(GAME.x, GAME.y, GAME.width, GAME.height);
}

function drawBackground1() {
    canvasContext.fillStyle = GAME1.background;
    canvasContext.fillRect(GAME1.x, GAME1.y, GAME1.width, GAME1.height);
}

function updateBall() {
    BALL.x += BALL.xDirection;
    BALL.y += BALL.yDirection;

    if ((BALL.y + BALL.radius +1  > GAME1.height) || (BALL.y -1  < BALL.radius)) {
        BALL.yDirection = -BALL.yDirection;
    }

    if ((BALL.x + BALL.radius + 1> GAME1.width) || (BALL.x -1 < BALL.radius)) {
        BALL.xDirection = -BALL.xDirection;
    }


    let crossUpperWall = BALL.x + BALL.radius + 1 >= RACKET1.x &&
        BALL.x - BALL.radius - 1 <= RACKET1.x + RACKET1.width &&
        BALL.y + BALL.radius  + 1>= RACKET1.y &&
        BALL.y - BALL.radius - 1 <= RACKET1.y;

    let crossDownWall = BALL.x + BALL.radius + 1 >= RACKET1.x &&
        BALL.y + BALL.radius + 1 >= RACKET1.y + RACKET1.height &&
        BALL.x - BALL.radius - 1 <= RACKET1.x + RACKET1.width &&
        BALL.y - BALL.radius - 1 <= RACKET1.y + RACKET1.height;

    let crossLeftWall = BALL.x + BALL.radius + 1>= RACKET1.x &&
        BALL.x - BALL.radius - 1 <= RACKET1.x &&
        BALL.y + BALL.radius + 1>= RACKET1.y &&
        BALL.y - BALL.radius - 1 <= RACKET1.y + RACKET1.height;

    let crossRightWall = BALL.x - BALL.radius - 1<= RACKET1.x + RACKET1.width &&
        BALL.x + BALL.radius + 1 >= RACKET1.x + RACKET1.width &&
        BALL.y + BALL.radius + 1 >= RACKET1.y &&
        BALL.y - BALL.radius - 1 <= RACKET1.y + RACKET1.height;

    let crossUpperWall1 = BALL.x + BALL.radius + 1 >= RACKET.x &&
        BALL.x - BALL.radius - 1 <= RACKET.x + RACKET.width &&
        BALL.y + BALL.radius + 1 >= RACKET.y &&
        BALL.y - BALL.radius - 1 <= RACKET.y;

    let crossDownWall1 = BALL.x + BALL.radius + 1>= RACKET.x &&
        BALL.y + BALL.radius + 1 >= RACKET.y + RACKET.height &&
        BALL.x - BALL.radius - 1 <= RACKET.x + RACKET.width &&
        BALL.y - BALL.radius - 1 <= RACKET.y + RACKET.height;

    let crossLeftWall1 = BALL.x + BALL.radius + 1 >= RACKET.x &&
        BALL.x - BALL.radius - 1 <= RACKET.x &&
        BALL.y + BALL.radius + 1 >= RACKET.y &&
        BALL.y - BALL.radius - 1 <= RACKET.y + RACKET.height;

    let crossRightWall1 = BALL.x - BALL.radius - 1<= RACKET.x + RACKET.width &&
        BALL.x + BALL.radius + 1 >= RACKET.x + RACKET.width &&
        BALL.y + BALL.radius + 1 >= RACKET.y &&
        BALL.y - BALL.radius - 1 <= RACKET.y + RACKET.height;

    if ((crossUpperWall1) || (crossDownWall1)) {
        BALL.yDirection = -BALL.yDirection;
    }

    if (crossRightWall1 || crossLeftWall1) {
        BALL.xDirection = -BALL.xDirection;
    }

    if ((crossUpperWall) || (crossDownWall)) {
        BALL.yDirection = -BALL.yDirection;
    }

    if (crossRightWall || crossLeftWall) {
        BALL.xDirection = -BALL.xDirection;
    }

}

function drawRACKET1() {
    canvasContext.fillStyle = RACKET1.color;
    canvasContext.fillRect(RACKET1.x, RACKET1.y, RACKET1.width, RACKET1.height);
}

function drawRACKET() {
    canvasContext.fillStyle = RACKET.color;
    canvasContext.fillRect(RACKET.x, RACKET.y, RACKET.width, RACKET.height);
}

function drawVOROTA1() {
    canvasContext.fillStyle = VOROTA1.color;
    canvasContext.fillRect(VOROTA1.x, VOROTA1.y, VOROTA1.width, VOROTA1.height);
}

function drawVOROTA() {
    canvasContext.fillStyle = VOROTA.color;
    canvasContext.fillRect(VOROTA.x, VOROTA.y, VOROTA.width, VOROTA.height);
}

function drawRAZMETKA() {
    canvasContext.fillStyle = RAZMETKA.color;
    canvasContext.fillRect(RAZMETKA.x, RAZMETKA.y, RAZMETKA.width, RAZMETKA.height);
}

function drawRAZMETKA1() {
    canvasContext.fillStyle = RAZMETKA1.color;
    canvasContext.beginPath();
    canvasContext.arc(RAZMETKA1.x, RAZMETKA1.y, RAZMETKA1.radius, 0, 2 * Math.PI);
    canvasContext.fill();
}

function updateFrame1() {
    canvasContext.clearRect(0, 0, GAME1.width, GAME1.height);
    if ((game.pressDown)) {
        RACKET.y += RACKET.speed;
    };
    if ((game.pressUp)) {
        RACKET.y -= RACKET.speed;
    };
    if ((game.pressLeft)) {
        RACKET.x -= RACKET.speed;
    };
    if ((game.pressRight)) {
        RACKET.x += RACKET.speed;
    };
    if (RACKET.y < GAME1.y) {
        RACKET.y = GAME1.y + 1;
    }
    if (RACKET.y + RACKET.height > GAME1.height) {
        RACKET.y = GAME1.height - RACKET.height - 1;
    }
    if (RACKET.x < VOROTA.width) {
        RACKET.x = VOROTA.width + 1;
    }
    if (RACKET.x + RACKET.width > RAZMETKA.x) {
        RACKET.x = RAZMETKA.x - RACKET.width - 1;
    }
}

function updateFrame2() {
    canvasContext.clearRect(0, 0, GAME1.width, GAME1.height);
    if (game.pressDown1) {
        RACKET1.y += RACKET1.speed;
    };
    if (game.pressUp1) {
        RACKET1.y -= RACKET1.speed;
    };
    if (game.pressLeft1) {
        RACKET1.x -= RACKET1.speed;
    };
    if (game.pressRight1) {
        RACKET1.x += RACKET1.speed;
    };
    if (RACKET1.y < GAME1.y) {
        RACKET1.y = GAME1.y + 1;
    }
    if (RACKET1.y + RACKET1.height > GAME1.height) {
        RACKET1.y = GAME1.height - RACKET1.height - 1;
    }
    if (RACKET1.x + RACKET1.width > VOROTA1.x) {
        RACKET1.x = VOROTA1.x - RACKET1.width - 1;
    }
    if (RACKET1.x < RAZMETKA.x + RAZMETKA.width) {
        RACKET1.x = RAZMETKA.x + RAZMETKA.width + 1;
    }
}

function initEventsListeners() {
    window.addEventListener("keydown", onCanvasKeyDown);
    window.addEventListener("keyup", onCanvasKeyUp);
    window.addEventListener("keydown", onCanvasKeyDown2);
    window.addEventListener("keyup", onCanvasKeyUp2);
}

function onCanvasKeyDown(event) {
    if (event.key === 's') {
        game.pressUp = true;
    }
    if (event.key === 'a') {
        game.pressLeft = true;
    }
    if (event.key === 'z') {
        game.pressDown = true;
    }
    if (event.key === 'x') {
        game.pressRight = true;
    }
    console.log(event);
}

function onCanvasKeyUp(event) {
    if (event.key === 's') {
        game.pressUp = false;
    }
    if (event.key === 'a') {
        game.pressLeft = false;
    }
    if (event.key === 'z') {
        game.pressDown = false;
    }
    if (event.key === 'x') {
        game.pressRight = false;
    }
    console.log(event);
}

function onCanvasKeyDown2(event) {
    if (event.key === 'j') {
        game.pressUp1 = true;
    }
    if (event.key === 'n') {
        game.pressLeft1 = true;
    }
    if (event.key === 'm') {
        game.pressDown1 = true;
    }
    if (event.key === 'k') {
        game.pressRight1 = true;
    }
    console.log(event);
}

function onCanvasKeyUp2(event) {
    if (event.key === 'j') {
        game.pressUp1 = false;
    }
    if (event.key === 'n') {
        game.pressLeft1 = false;
    }
    if (event.key === 'm') {
        game.pressDown1 = false;
    }
    if (event.key === 'k') {
        game.pressRight1 = false;
    }
    console.log(event);
}

function onCanvasKeyDown3(event) {
    if (event.key === 'Enter') {
        initEventsListeners();
        if ((GAME1.scoreP1 <= 10) || (GAME1.scoreP2 <= 10)) {
            play();
            console.log("return");
            return;
        }
        BEGINER.initEventsListeners1 = 0;
    }
    console.log(BEGINER.initEventsListeners1);
    BEGINER.initEventsListeners1 = 0;
}

function initEventsListeners1() {
    if (BEGINER.initEventsListeners1 === 1) {
        window.addEventListener("keydown", onCanvasKeyDown3);
    }
    BEGINER.initEventsListeners1 = 0;

}

function begin() {
    let ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = '30px serif';
    ctx.fillStyle = BEGINER.background;
    ctx.fillRect(BEGINER.x, BEGINER.y, BEGINER.width, BEGINER.height);
    ctx.fillStyle = "Black";
    ctx.fillText("PRESS ENTER", BEGINER.width / 2 - 30 , BEGINER.height / 2 - 20);
    ctx.fillText("TO START THE GAME", BEGINER.width / 2 - 30 , BEGINER.height / 2 + 20);
    if (BEGINER.initEventsListeners1 === 1) {
        window.addEventListener("keydown", onCanvasKeyDown3);
    }
    return;
}
begin();

function gameover() {

    console.log('GAMEOVER');
    if (GAME1.scoreP1 === 10) {
        let ctx = document.getElementById('canvas').getContext('2d');
        ctx.font = '30px serif'
        ctx.fillStyle = "PINK";
        ctx.fillRect(GAME1.x, GAME1.y, GAME1.width, GAME1.height);
        ctx.fillStyle = "Black";
        ctx.fillText("Yellow Player win!!!", GAME1.width / 2 - 25, GAME1.height / 2 - 10);
        ctx.font = '20px serif';
        ctx.fillStyle = "yellow";
        ctx.fillText("Press Ctrl+R to restart",GAME1.width / 2 - 30, GAME1.height / 2 + 20);
    }

    if (GAME1.scoreP2 === 10) {
        let ctx = document.getElementById('canvas').getContext('2d');
        ctx.font = '30px serif';
        ctx.fillStyle = "PINK";
        ctx.fillRect(GAME1.x, GAME1.y, GAME1.width, GAME1.height);
        ctx.fillStyle = "Black";
        ctx.fillText("Green Player win!!!", GAME1.width / 2 - 25, GAME1.height / 2 - 10);
        ctx.font = '20px serif';
        ctx.fillStyle = "yellow";
        ctx.fillText("Press Ctrl+R to restart", GAME1.width / 2, GAME1.height / 2 + 30);

    }
}