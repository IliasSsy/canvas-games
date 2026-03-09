var GAME = {
    width: 1500,
    height: 750,
    background: "Black",
}
var gameOver = false
var spearCount = 0
var maxSpearsReached = false
var health = 20

var Leopold = new Image()
Leopold.src = "./Leopold.jpg"
var undine = new Image()
undine.src = "./undine.jpg"
var textStage = 0
var textTimer = 0
var WALL = {
    x: 600,
    x2: 610,
    y: 400,
    y2: 410,
    diff: 10,
    width: 300,
    width2: 280,
    height: 300,
    height2: 280,
    color: "white",
    color2: "gray"
}
var singleCutsX = WALL.width / 3
var singleCutsY = WALL.height / 3
var SPEAR = {
    x: WALL.x - singleCutsX,
    y: WALL.y - singleCutsY,
    xSpeed: 10,
    ySpeed: 10,
    width: 50,//50
    height: 50,
    rotation: 0,
    isFlying: false,
    isCell: false
}
var HEART = {
    x: 730,
    y: 525,
    width: 30,
    height: 30,//30
    xSpeed: 30,
    ySpeed: 30,
}
var canvas = document.createElement("canvas")
document.body.appendChild(canvas)
var canvasWidth = 500
var canvasHeight = 500
canvas.width = GAME.width
canvas.height = GAME.height
var canvasContext = canvas.getContext("2d")
function drawBackground() {
    canvasContext.fillStyle = GAME.background
    canvasContext.fillRect(0, 0, GAME.width, GAME.height)
    canvasContext.fillStyle = WALL.color
    canvasContext.fillRect(WALL.x, WALL.y, WALL.width, WALL.height)
    canvasContext.fillStyle = WALL.color2
    canvasContext.fillRect(WALL.x2, WALL.y2, WALL.width2, WALL.height2)
    drawHeart()

}
function drawHeart() {
    canvasContext.drawImage(ig, HEART.x, HEART.y, HEART.width, HEART.height)

}

var ig = new Image();
ig.src = "./heart2.png";

var undine = new Image();
undine.src = "undine.jpg";

var spear = new Image();
spear.src = "./Круг.png";

function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        HEART.x -= HEART.xSpeed
    }
    if (event.key === "ArrowRight") {
        HEART.x += HEART.xSpeed
    }
    if (event.key === "ArrowDown") {
        HEART.y += HEART.ySpeed
    }
    if (event.key === "ArrowUp") {
        HEART.y -= HEART.ySpeed
    }
    clampHeartPosition()
}


function initEventListeners() {
    window.addEventListener('keydown', onCanvasKeyDown);
}

function gameLose() {
    gameOver = true;
    HEART.xSpeed = 0;
    HEART.ySpeed = 0;
}

function SpearFly() {
    if ((!gameOver && !maxSpearsReached) && !SPEAR.isFlying && Math.random() < 0.08) {
        SPEAR.isFlying = true;
        let startSide = Math.floor(Math.random() * 4);
        let targetX = WALL.x + Math.random() * WALL.width;
        let targetY = WALL.y + Math.random() * WALL.height;
        if (startSide === 0) {
            SPEAR.x = WALL.x + Math.random() * WALL.width;
            SPEAR.y = WALL.y - SPEAR.height * 2;
        } else if (startSide === 1) {
            SPEAR.x = WALL.x + WALL.width + SPEAR.width;
            SPEAR.y = WALL.y + Math.random() * WALL.height;
        } else if (startSide === 2) {
            SPEAR.x = WALL.x + Math.random() * WALL.width;
            SPEAR.y = WALL.y + WALL.height + SPEAR.height;
        } else {
            SPEAR.x = WALL.x - SPEAR.width * 2;
            SPEAR.y = WALL.y + Math.random() * WALL.height;
        }
        let dx = targetX - SPEAR.x;
        let dy = targetY - SPEAR.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        SPEAR.xSpeed = (dx / distance) * 10;
        SPEAR.ySpeed = (dy / distance) * 10;
        SPEAR.rotation = Math.atan2(dy, dx) * 180 / Math.PI;
        spearCount++;
        if (spearCount >= 15) {
            maxSpearsReached = true;
            textStage = 1;
            textTimer = 0;
        }
    }
    drawImageSpear(SPEAR.rotation);
}



function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        HEART.x -= HEART.xSpeed
    }
    if (event.key === "ArrowRight") {
        HEART.x += HEART.xSpeed
    }
    if (event.key === "ArrowDown") {
        HEART.y += HEART.ySpeed
    }
    if (event.key === "ArrowUp") {
        HEART.y -= HEART.ySpeed
    }
    clampHeartPosition()
}
function initEventeListeners() {
    window.addEventListener('keydown', onCanvasKeyDown)
}
drawFrame()
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height)
    drawBackground()

}
function clampHeartPosition() {
    if (HEART.x < WALL.x2) {
        HEART.x = WALL.x2
    }
    if (HEART.x + HEART.width > WALL.x2 + WALL.width2) {
        HEART.x = WALL.x2 + WALL.width2 - HEART.width
    }
    if (HEART.y < WALL.y2) {
        HEART.y = WALL.y2
    }
    if (HEART.y + HEART.height > WALL.y2 + WALL.height2) {
        HEART.y = WALL.y2 + WALL.height2 - HEART.height
    }
}
function play() {

    drawFrame()
    SpearFly()
    requestAnimationFrame(play)
}
initEventeListeners()
play()

function drawImageSpear(deg) {
    let bossWidth = 250;
    let bossHeight = 250;
    let bossY = WALL.y - 300;
    let bossX;

    if (maxSpearsReached && !gameOver) {
        bossX = WALL.x + WALL.width / 2 - bossWidth / 2 - 50;

        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, GAME.width, GAME.height);

        if (textStage === 3 && Leopold.complete) {
            canvasContext.drawImage(Leopold, 0, 0, GAME.width, GAME.height);
            return;
        }

        if (undine.complete) {
            canvasContext.drawImage(undine, bossX, bossY, bossWidth, bossHeight);
        }

        let rectWidth = 500;
        let rectHeight = 180;
        let rectX = WALL.x + WALL.width / 2 - rectWidth / 2;
        let rectY = bossY + bossHeight + 50;

        canvasContext.strokeStyle = "white";
        canvasContext.lineWidth = 2;
        canvasContext.strokeRect(rectX, rectY, rectWidth, rectHeight);

        if (textStage > 0) {
            textTimer++;
            if (textStage === 1 && textTimer >= 420) {
                textStage = 2;
                textTimer = 0;
            }
            if (textStage === 2 && textTimer >= 420) {
                textStage = 3;
            }
        }

        canvasContext.fillStyle = "white";
        canvasContext.font = "20px Arial";
        canvasContext.textAlign = "left";

        if (textStage === 1) {
            canvasContext.fillText("Now it's your turn.", rectX + 20, rectY + 40);
        } else if (textStage === 2) {
            canvasContext.fillText("Seriously?", rectX + 20, rectY + 40);
            canvasContext.fillText("Why aren't you attacking?", rectX + 20, rectY + 80);
        }

        let buttonWidth = 120;
        let buttonHeight = 50;
        let leftButtonX = WALL.x + WALL.width / 2 - buttonWidth - 50;
        let rightButtonX = WALL.x + WALL.width / 2 + 50;
        let buttonY = rectY + rectHeight + 50;

        canvasContext.strokeStyle = "orange";
        canvasContext.lineWidth = 2;
        canvasContext.strokeRect(leftButtonX, buttonY, buttonWidth, buttonHeight);
        canvasContext.strokeRect(rightButtonX, buttonY, buttonWidth, buttonHeight);

        canvasContext.fillStyle = "white";
        canvasContext.font = "18px Arial";
        canvasContext.textAlign = "center";
        canvasContext.fillText("Fight", leftButtonX + buttonWidth / 2, buttonY + buttonHeight / 2 + 5);
        canvasContext.fillText("Mercy", rightButtonX + buttonWidth / 2, buttonY + buttonHeight / 2 + 5);

        return;
    }

    bossX = WALL.x + WALL.width / 2 - bossWidth / 2;

    if (undine.complete) {
        canvasContext.drawImage(undine, bossX, bossY, bossWidth, bossHeight);
    }

    if (SPEAR.isFlying && !gameOver && !maxSpearsReached) {
        SPEAR.x += SPEAR.xSpeed;
        SPEAR.y += SPEAR.ySpeed;
        if (SPEAR.x < HEART.x + HEART.width &&
            SPEAR.x + SPEAR.width > HEART.x &&
            SPEAR.y < HEART.y + HEART.height &&
            SPEAR.y + SPEAR.height > HEART.y) {
            health -= 10;
            SPEAR.isFlying = false;
            if (health <= 0) {
                gameLose();
            }
        }
        if (SPEAR.x < -SPEAR.width || SPEAR.x > GAME.width ||
            SPEAR.y < -SPEAR.height || SPEAR.y > GAME.height) {
            SPEAR.isFlying = false;
        }
    }

    let healthBarWidth = WALL.width / 2;
    let healthBarHeight = 20;
    let healthBarX = WALL.x + WALL.width / 2 - healthBarWidth / 2;
    let healthBarY = WALL.y - 30;
    let segmentWidth = healthBarWidth / 20

    canvasContext.fillStyle = "white"
    canvasContext.font = "20px Arial"
    canvasContext.textAlign = "right"
    canvasContext.fillText(health + " / 20", healthBarX - 10, healthBarY + 15);

    canvasContext.fillStyle = "black"
    canvasContext.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

    canvasContext.fillStyle = "yellow"
    for (let i = 0; i < health;i++) {
        canvasContext.fillRect(healthBarX + i * segmentWidth, healthBarY, segmentWidth - 1, healthBarHeight);
    }

    canvasContext.fillStyle = "red";
    for (let i = health; i < 20; i++) {
        canvasContext.fillRect(healthBarX + i * segmentWidth, healthBarY, segmentWidth - 1, healthBarHeight);
    }

    if (SPEAR.isFlying && !gameOver && !maxSpearsReached) {
        canvasContext.save();
        var rad = deg * Math.PI / 180;
        canvasContext.translate(SPEAR.x + SPEAR.width / 2, SPEAR.y + SPEAR.height / 2);
        canvasContext.rotate(rad);
        canvasContext.drawImage(spear, -SPEAR.width / 2, -SPEAR.height / 2, SPEAR.width, SPEAR.height);
        canvasContext.restore();
    }

    if (gameOver) {
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, GAME.width, GAME.height);
        canvasContext.fillStyle
        canvasContext.fillStyle = "red";
        canvasContext.drawImage(ig, HEART.x, HEART.y, HEART.width, HEART.height);
        canvasContext.fillStyle = "white";
        canvasContext.font = "48px Arial";
        canvasContext.textAlign = "center";
        canvasContext.fillText("не теряй решимости", GAME.width / 2, GAME.height / 2);
    }
}

function gameLose() {
    gameOver = true;
    HEART.xSpeed = 0;
    HEART.ySpeed = 0;
}


function stopSpear() {
    isCell = false;
    SPEAR.isFlying = false;
    SPEAR.xSpeed = 0;
    SPEAR.ySpeed = 0;
}


