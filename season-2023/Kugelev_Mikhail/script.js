var sec = 0;
var ms = 0;
var GAME = {
    width: 1800,
    height: 950,
    backgroundLeft: "black",
    backgroundRight: "white",
}

var SQUARE = {
    width: 50,
    height: 50,
    x: 850,
    y: 600,
    color: "white",
    score: 0,
}

var OBSTACLES = [
    {
        width: 25,
        height: 25,
        x: 875,
        y: 0,
        color: "white",
        speed: 5,
    },
    {
        width: 25,
        height: 25,
        x: 875,
        y: 230,
        color: "white",
        speed: 5,
    },
    {
        width: 25,
        height: 25,
        x: 900,
        y: 460,
        color: "black",
        speed: 5,
    },
    {
        width: 25,
        height: 25,
        x: 900,
        y: 690,
        color: "black",
        speed: 5,
    },
]



function drawStart() {
    canvasContext.fillStyle = GAME.backgroundLeft;
    canvasContext.fillRect(0, 0, GAME.width / 2, GAME.height);
    canvasContext.fillStyle = GAME.backgroundRight;
    canvasContext.fillRect(GAME.width / 2, 0, GAME.width / 2, GAME.height);
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = GAME.backgroundRight;
    canvasContext.fillText("Press 'S'", 725, 500);
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = GAME.backgroundLeft;
    canvasContext.fillText("to Start", 905, 500);
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = GAME.backgroundRight;
    canvasContext.fillText("Move The Squ", 615, 600);
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = GAME.backgroundLeft;
    canvasContext.fillText("are with '<' and '>'", 901, 600);

}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

function drawBackground() {
    canvasContext.fillStyle = GAME.backgroundLeft;
    canvasContext.fillRect(0, 0, GAME.width / 2, GAME.height);
    canvasContext.fillStyle = GAME.backgroundRight;
    canvasContext.fillRect(GAME.width / 2, 0, GAME.width / 2, GAME.height);
}

function drawSquare() {
    canvasContext.fillStyle = SQUARE.color;
    canvasContext.beginPath();
    canvasContext.fillRect(SQUARE.x, SQUARE.y, SQUARE.width, SQUARE.height);
    canvasContext.closePath();
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

function getRandomInterval(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function drawObstacle(num) {
    canvasContext.fillStyle = OBSTACLES[num].color;
    canvasContext.beginPath();
    canvasContext.fillRect(OBSTACLES[num].x, OBSTACLES[num].y, OBSTACLES[num].width, OBSTACLES[num].height);
    canvasContext.closePath();
}

function drawObstacles() {
    for (var i = 0; i < OBSTACLES.length; i++) {
        drawObstacle(i);
    }
}

function updateObstacles() {
    for (var i = 0; i < OBSTACLES.length; i++) {
        updateObstacle(i);
    }
}

var random_1 = 0;
var random_2 = 0;

function updateObstacle(num) {
    OBSTACLES[num].y += OBSTACLES[num].speed;
    if (OBSTACLES[num].y >= GAME.height) {
        for (var i = 0; i < OBSTACLES.length; i++) {
            if (SQUARE.score % 5 === 0) {
                OBSTACLES[i].speed += 1;
            }
        }
        SQUARE.score++;
        console.log(SQUARE.score);
        random_1 = -getRandomInterval(1, 26);
        random_2 = -getRandomInterval(26, 51);
        if (getRandom(2) === 0) {
            OBSTACLES[num].y = random_1;
            OBSTACLES[num].color = "white";
            OBSTACLES[num].x = 875;
        } else {
            OBSTACLES[num].y = random_2;
            OBSTACLES[num].color = "black";
            OBSTACLES[num].x = 900;
        }
    }
}


function initEventsListrners() {
    window.addEventListener("keydown", onCanvasKeyDown);
}

var count = 0;

function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        SQUARE.x = 850;
        SQUARE.y = 600;
        SQUARE.color = "white";
    }
    if (event.key === "ArrowRight") {
        SQUARE.x = 900;
        SQUARE.y = 600;
        SQUARE.color = "black";
    }
    if ((event.key === "S") || (event.key === "Ы") || (event.key === "ы") || (event.key === "s")) {
        play();
    }
    if ((event.key === "й") || (event.key === "Й") || (event.key === "Q") || (event.key === "q")) {
        location.reload();
    }
}



function drawScore() {
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Score: " + SQUARE.score, 10, 50);
}

function drawTime() {
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = "white";
    if (Math.floor(ms / 10) == 0)
        canvasContext.fillText("Life Time: " + sec + ":0" + ms, 100, 50)
    else
        canvasContext.fillText("Life Time: " + sec + ":" + ms, 100, 50)
}

var lose = false;

function endGame() {
    canvasContext.fillStyle = GAME.backgroundLeft;
    canvasContext.fillRect(0, 0, GAME.width / 2, GAME.height);
    canvasContext.fillStyle = GAME.backgroundRight;
    canvasContext.fillRect(GAME.width / 2, 0, GAME.width / 2, GAME.height);
    canvasContext.font = "90px serif";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("YOU", 700, 300);
    canvasContext.font = "90px serif";
    canvasContext.fillStyle = "black";
    canvasContext.fillText("LOSE", 905, 300);
    canvasContext.font = "50px serif";
    canvasContext.fillStyle = "white";
    //canvasContext.fillText("Your Score: " + SQUARE.score, 905, 350);
    canvasContext.fillText("Life Ti ", 760, 360);
    canvasContext.font = "50px serif";
    canvasContext.fillStyle = "black";
    if (Math.floor(ms / 10) === 0) {
        canvasContext.fillText("me:" + sec + ".0" + ms + "s", 901, 360)
    } else {
        canvasContext.fillText("me:" + sec + "." + ms + "s", 901, 360)
    }
    count = 1;
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Press 'Q'", 725, 430);
    canvasContext.font = "50px serif";
    canvasContext.fillStyle = "black";
    canvasContext.fillText("to Restart", 905, 430);
    canvasContext.font = "50px serif";

}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawSquare();
    drawObstacles();
    drawTime();
}



function tick() {
    ms++;
    if (ms >= 60) {
        sec++;
        ms = 0;
    }

}

function play() {
    tick();
    drawFrame();
    for (let i = 0; i < OBSTACLES.length; i++) {
        if (OBSTACLES[i].y + OBSTACLES[i].height > SQUARE.y && OBSTACLES[i].y + OBSTACLES[i].height < SQUARE.y + SQUARE.height && OBSTACLES[i].color === SQUARE.color) {
            lose = true;
        }
    }
    if (lose) {
        console.log("lose");
        endGame();
    } else {
        updateObstacles();
        requestAnimationFrame(play);
    }
}
initEventsListrners();
drawStart();
