var GAME = {
    width: 500,
    height: 750,
    background: "lime",
    score: 0,
    clicks: 0
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;

var canvasContext = canvas.getContext("2d");

var GRASS = {
    img: new Image(),
    imgIsLoad: false,
    width: 500,
    height: 800,
}
var HOLES = [
    {
        x: 210,
        y: 350,
        radius: 14,
        color: "black"
    },
    {
        x: 410,
        y: 280,
        radius: 14,
        color: "black"
    },
    {
        x: 310,
        y: 110,
        radius: 14,
        color: "black"
    },
    {
        x: 130,
        y: 50,
        radius: 14,
        color: "black"
    },
    {
        x: 370,
        y: 650,
        radius: 14,
        color: "black"
    },
    {
        x: 100,
        y: 600,
        radius: 14,
        color: "black"
    },
    {
        x: 450,
        y: 500,
        radius: 14,
        color: "black"
    },
    {
        x: 35,
        y: 250,
        radius: 14,
        color: "black"
    },
]

function drawHoles() {
    for (var i = 0; i < HOLES.length; i = i + 1) {
        canvasContext.fillStyle = HOLES[i].color;
        canvasContext.beginPath();
        canvasContext.arc(HOLES[i].x, HOLES[i].y, HOLES[i].radius, 0, 2 * Math.PI);
        canvasContext.fill();
    }
}

function drawFlag() {
    for (var i = 0; i < HOLES.length; i = i + 1) {
        canvasContext.fillStyle = "brown";
        canvasContext.fillRect(HOLES[i].x, HOLES[i].y - 35, 2, 35);
    }
    for (var i = 0; i < HOLES.length; i = i + 1) {
        canvasContext.fillStyle = "red";
        canvasContext.beginPath();
        canvasContext.moveTo(HOLES[i].x + 2, HOLES[i].y - 35);
        canvasContext.lineTo(HOLES[i].x + 27, HOLES[i].y - 25);
        canvasContext.lineTo(HOLES[i].x + 2, HOLES[i].y - 15);
        canvasContext.closePath();
        canvasContext.fill();
    }
}




function drawScore() {
    canvasContext.font = "24px Arial sans-serif";
    canvasContext.fillStyle = "blue";
    canvasContext.fillText(`Score: ${GAME.score}`, 200, 50);
}

function drawHits() {
    canvasContext.font = "24px Arial sans-serif";
    canvasContext.fillStyle = "red";
    canvasContext.fillText(`Hits: ${GAME.clicks}`, 200, 80);
}

function deleteHoles() {
    for (var i = 0; i < HOLES.length; i = i + 1) {
        if ((BALL.y > HOLES[i].y - HOLES[i].radius)
            && (BALL.y + BALL.height < HOLES[i].y + HOLES[i].radius)
            && (BALL.x > HOLES[i].x - HOLES[i].radius)
            && (BALL.x + BALL.width < HOLES[i].x + HOLES[i].radius)) {
            HOLES.splice(i, 1);
            GAME.score += 1;
            BALL.xDirection = 0;
            BALL.yDirection = 0;
            console.log(`Score: ${GAME.score}`);
        }
    }
}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawGrass();
    drawScore();
    drawHits();
    drawHoles();
    drawBox();
    drawBall();
    drawFlag();
}

function updateBall() {
    BALL.x += BALL.xDirection;
    BALL.y += BALL.yDirection;

    var ballCollidedWallsVertically = (BALL.y + BALL.height > GAME.height) || (BALL.y < BALL.height);
    var ballCollidedWallsHorizontally = (BALL.x + BALL.width > GAME.width) || (BALL.x < BALL.width);

    if (ballCollidedWallsVertically) {
        BALL.yDirection = -   BALL.yDirection
    }
    if (ballCollidedWallsHorizontally) {
        BALL.xDirection = -   BALL.xDirection
    }

    for (var i = 0; i < BOX.length; i = i + 1) {
        var ballCollidedBarrierVertically = (BALL.y + BALL.height >= BOX[i].y)
            && (BALL.y <= BOX[i].y + BOX[i].height)
            && (BALL.x + BALL.width > BOX[i].x)
            && (BALL.x < BOX[i].x + BOX[i].width);
        if (ballCollidedBarrierVertically) {
            BALL.yDirection = -   BALL.yDirection
        }

        var ballCollidedBarrierHorizontally = (BALL.x + BALL.width >= BOX[i].x)
            && (BALL.x <= BOX[i].x + BOX[i].width)
            && (BALL.y + BALL.height > BOX[i].y)
            && (BALL.y < BOX[i].y + BOX[i].height)
        if (ballCollidedBarrierHorizontally) {
            BALL.xDirection = -   BALL.xDirection
        }
    }
}

console.log(`Score: ${GAME.score}`);
function play() {
    drawFrame();
    deleteHoles();
    updateBall();
    if (HOLES.length !== 0) {
        requestAnimationFrame(play);
    }
    else {
        alert("Congratulations, you won")
    }
}


function initEventsListeners() {
    window.addEventListener("mousedown", onCanvaMouseDown);
}

function onCanvaMouseDown(event) {
    BALL.xDirection = 0.025 * (event.clientX - BALL.x);
    BALL.yDirection = 0.025 * (event.clientY - BALL.y);
    GAME.clicks += 1;

}
function initGrass() {
    GRASS.img.src = './images.jpg'
    GRASS.img.onload = () => {
        GRASS.imgIsLoad = true;
    }
}
function drawGrass() {
    if (GRASS.imgIsLoad) {
        canvasContext.drawImage(GRASS.img, 0, 0, 500, 800);
    }
}
var BALL = {
    img: new Image(),
    imgIsLoad: false,
    width: 20,
    height: 20,
    x: 240,
    y: 700,
    xDirection: 0,
    yDirection: 0,
}
function initBall() {
    BALL.img.src = './ball.png'
    BALL.img.onload = () => {
        BALL.imgIsLoad = true;
    }
}
function drawBall() {
    if (GRASS.imgIsLoad) {
        canvasContext.drawImage(BALL.img, BALL.x, BALL.y, 20, 20);
    }
}
var BOX = [
    {
        img: new Image(),
        imgIsLoad: true,
        x: 460,
        y: 0,
        width: 40,
        height: 40,
    },
    {
        img: new Image(),
        imgIsLoad: true,
        x: 440,
        y: 700,
        width: 40,
        height: 40,
    },
    {
        img: new Image(),
        imgIsLoad: true,
        x: 10,
        y: 150,
        width: 40,
        height: 40,
    },
    {
        img: new Image(),
        imgIsLoad: true,
        x: 460,
        y: 40,
        width: 40,
        height: 40,
    },
    {
        img: new Image(),
        imgIsLoad: true,
        x: 242.5,
        y: 100,
        width: 40,
        height: 40,
    },
    {
        img: new Image(),
        imgIsLoad: true,
        x: 70,
        y: 400,
        width: 40,
        height: 40,
    },
    {
        img: new Image(),
        imgIsLoad: true,
        x: 242.5,
        y: 600,
        width: 40,
        height: 40,
    },
    {
        img: new Image(),
        imgIsLoad: true,
        x: 30,
        y: 400,
        width: 40,
        height: 40,
    },
    {
        img: new Image(),
        imgIsLoad: true,
        x: 30,
        y: 360,
        width: 40,
        height: 40,
    },
    {
        img: new Image(),
        imgIsLoad: true,
        x: 360,
        y: 400,
        width: 40,
        height: 40,
    }
]
function initBox() {
    for (var i = 0; i < BOX.length; i = i + 1) {
        BOX[i].img.src = './pngegg.jpg'
        BOX[i].img.onload = () => {
            BOX.imgIsLoad = true;
        }
    }
}
function drawBox() {
    for (var i = 0; i < BOX.length; i = i + 1) {
        if (BOX.imgIsLoad) {
            canvasContext.drawImage(BOX[i].img, BOX[i].x, BOX[i].y, BOX[i].width, BOX[i].height);
        }
    }
}
initEventsListeners();
initGrass();
initBall();
initBox();
play()
