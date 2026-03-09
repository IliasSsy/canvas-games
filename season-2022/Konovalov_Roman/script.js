/*
Палитра Odintsov_Andrey
#F5F0E1
tomato
black
*/

var GAME = {
    width: 1000,
    height: 1000,
    background: "#F5F0E1",
    update: 3,
    gameOverScreen: false,
    textOpacity: 0,

    UpButton: "ArrowUp",
    RightButton: "ArrowRight",
    DownButton: "ArrowDown",
    LeftButton: "ArrowLeft",

    gameModeReload: 20,
    secondGameMode: true,
}
var CIRCLE = {
    size: 20,
    color: "tomato",
    x: GAME.width / 2,
    y: GAME.height / 2,
    noDamageTime: 500,
    hitted: false,
    lifes: 3,
    score: 0,
}
var RECT = {
    x: 500,
    y: 500,
    width: 45,
    height: 7,
    color: "#03254C",
    position: 0,
    offset: 30,
}
var TRIANGLE = {
    x: 600,
    y: 200,
    position: 0,
    color: "tomato",
    width: 15,
    height: 15,
    speed: 3,
    offset: -80,
    thickness: 5,
    reload: 20,
    opacity: 0,
}
triangleArr = []
var numpadimg = new Image();
numpadimg.src = 'images/numpad.jpg';
var maxLifes = CIRCLE.lifes;
var buttonsArr = ["5", "3", "2", "1"];

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height)
}
function drawCircle(circle) {
    canvasContext.fillStyle = circle.color;
    canvasContext.beginPath();
    canvasContext.arc(circle.x, circle.y, circle.size / 2, 0, 2 * Math.PI);
    canvasContext.fill();
}
function updateCircle(circle) {
    if (circle.lifes > 0) {
        if (circle.hitted) {
            circle.x = GAME.width / 2 + Math.random() * 6 - 3;
            circle.y = GAME.height / 2 + Math.random() * 6 - 3;
        }
        else {
            circle.x = GAME.width / 2;
            circle.y = GAME.height / 2;
        }
    }
    else if (circle.size <= GAME.width * 2) {
        circle.size += 50;
    }
    else {
        GAME.gameOverScreen = true;
    }
}
function drawRect(rect) {
    function horizontal() {
        canvasContext.fillRect(rect.x, rect.y, rect.width, rect.height)
    }
    function vertical() {
        canvasContext.fillRect(rect.x, rect.y, rect.height, rect.width)
    }
    canvasContext.fillStyle = rect.color;
    if (rect.position == "0") {
        rect.x = CIRCLE.x - rect.width / 2;
        rect.y = CIRCLE.y - rect.offset - rect.height / 2;
    }
    if (rect.position == "1") {
        rect.x = CIRCLE.x + rect.offset - rect.height / 2;
        rect.y = CIRCLE.y - rect.width / 2;
    }
    if (rect.position == "2") {
        rect.x = CIRCLE.x - rect.width / 2;
        rect.y = CIRCLE.y + rect.offset - rect.height / 2;
    }
    if (rect.position == "3") {
        rect.x = CIRCLE.x - rect.offset - rect.height / 2;
        rect.y = CIRCLE.y - rect.width / 2;
    }

    if ((rect.position == "0") || (rect.position == "2")) {
        horizontal();
    }
    if ((rect.position == "1") || (rect.position == "3")) {
        vertical();
    }
}
function drawTriangle(arr) {
    for (var triangle of arr) {
        //console.log(triangle);

        if (triangle.opacity <= 1) {
            triangle.opacity += 0.08;
        }
        canvasContext.globalAlpha = triangle.opacity;
        canvasContext.strokeStyle = triangle.color;
        canvasContext.lineWidth = triangle.thickness;
        canvasContext.beginPath();
        if (triangle.position === 0) {
            canvasContext.moveTo(triangle.x - triangle.width / 2, triangle.y - triangle.height);
            canvasContext.lineTo(triangle.x + triangle.width / 2, triangle.y - triangle.height);
        }
        else if (triangle.position === 1) {
            canvasContext.moveTo(triangle.x + triangle.height, triangle.y - triangle.width / 2);
            canvasContext.lineTo(triangle.x + triangle.height, triangle.y + triangle.width / 2);
        }
        else if (triangle.position === 2) {
            canvasContext.moveTo(triangle.x - triangle.width / 2, triangle.y + triangle.height);
            canvasContext.lineTo(triangle.x + triangle.width / 2, triangle.y + triangle.height);
        }
        else if (triangle.position === 3) {
            canvasContext.moveTo(triangle.x - triangle.height, triangle.y - triangle.width / 2);
            canvasContext.lineTo(triangle.x - triangle.height, triangle.y + triangle.width / 2);
        }
        canvasContext.lineTo(triangle.x, triangle.y);
        canvasContext.closePath();
        canvasContext.stroke();
        canvasContext.globalAlpha = 1;
    }
}
function createTriangle(arr, speed) {
    console.log("Ok");
    var triangle = {};
    Object.assign(triangle, TRIANGLE);

    triangle.speed = speed;
    triangle.position = Math.round(Math.random() * 3);

    if (triangle.position === 0) {
        triangle.x = GAME.width / 2;
        triangle.y = -triangle.offset;
    }
    else if (triangle.position === 1) {
        triangle.x = GAME.width + triangle.offset;
        triangle.y = GAME.height / 2;
    }
    else if (triangle.position === 2) {
        triangle.x = GAME.width / 2;
        triangle.y = GAME.height + triangle.offset;
    }
    else if (triangle.position === 3) {
        triangle.x = -triangle.offset;
        triangle.y = GAME.height / 2;
    }
    arr.push(triangle);
    //console.log(triangle);
}
/*
Где-то тут надо сделать анимацию появления треугольника
Сначала из прозрачного он становится красным, а потом из красного - черным
*/
function updateTriangle(arr) {
    for (var i = 0; i < arr.length; i++) {
        var triangle = arr[i];
        if (triangle.position === 0) {
            triangle.y += triangle.speed;
        }
        else if (triangle.position === 1) {
            triangle.x -= triangle.speed;
        }
        else if (triangle.position === 2) {
            triangle.y -= triangle.speed;
        }
        else if (triangle.position === 3) {
            triangle.x += triangle.speed;
        }

        // условие удаление треугольника
        if ((RECT.position == triangle.position) && (Math.abs(triangle.x - CIRCLE.x) + Math.abs(triangle.y - CIRCLE.y) <= RECT.offset + RECT.height / 2)) {
            arr.splice(i, 1);
            CIRCLE.score += 1;
            //i -= Odintsov_Andrey;
        }
        else if (Math.abs(triangle.x - CIRCLE.x) + Math.abs(triangle.y - CIRCLE.y) <= CIRCLE.size / 2) {
            console.log("hit");
            arr.splice(i, 1);
            //i -= Odintsov_Andrey;
            if (!CIRCLE.hitted) {
                CIRCLE.hitted = true;
                setTimeout(() => { CIRCLE.hitted = false; }, CIRCLE.noDamageTime);
                CIRCLE.lifes -= 1;
            }
        }
    }
}


function drawGameOverScreen(game) {
    canvasContext.fillStyle = "white";
    canvasContext.font = "100px Century Gothic";
    canvasContext.textAlign = "center";
    if (GAME.textOpacity <= 1) {
        canvasContext.globalAlpha = GAME.textOpacity;
        GAME.textOpacity += 0.005;
        canvasContext.fillText("Game over!", game.width / 2, game.height / 2 - 30);
        canvasContext.font = "30px Century Gothic";
        canvasContext.fillText("your score: " + CIRCLE.score, game.width / 2, game.height / 2);
    }
}
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    //canvasContext.drawImage(numpadimg, 600, 800, 400, 200);
    drawRect(RECT);
    drawCircle(CIRCLE);
    drawTriangle(triangleArr);
}
function initEventsListeners() {
    window.addEventListener("keydown", onCanvasKeyDown);
}
function onCanvasKeyDown(event) {
    if (event.key === GAME.UpButton) {
        RECT.position = 0;
    }
    if (event.key === GAME.RightButton) {
        RECT.position = 1;
    }
    if (event.key === GAME.DownButton) {
        RECT.position = 2;
    }
    if (event.key === GAME.LeftButton) {
        RECT.position = 3;
    }
}

function easyMode() {
    for (var i = 0; i < 200; i++) {
        setTimeout(() => { createTriangle(triangleArr); }, i * (600 - i));
    }
}


var time = 0;

function play() {
    time += 1;
    if (time % (TRIANGLE.reload - Math.floor(time / 600)) == 0) {
        setTimeout(() => { createTriangle(triangleArr, TRIANGLE.speed); }, 400);  
        //console.log();
    }
    if (((time % (GAME.gameModeReload * 60) == 0) && (GAME.secondGameMode))) {
        gameMode = Math.floor(Math.random() * 2);
        if (gameMode == 0) {
            GAME.background = "#F5F0E1";
            RECT.color = "#03254C";
            CIRCLE.color = "tomato";
            for (triangle of triangleArr) {
                triangle.color = "tomato";
            }
            TRIANGLE.color = "tomato";

            GAME.UpButton = buttonsArr[0];
            GAME.RightButton = buttonsArr[1];
            GAME.DownButton = buttonsArr[2];
            GAME.LeftButton = buttonsArr[3];
        }
        if (gameMode == 1) {
            GAME.background = "#03254C";
            RECT.color = "#F5F0E1";
            CIRCLE.color = "#2EB990";
            for (triangle of triangleArr) {
                triangle.color = "#2EB990";
            }
            TRIANGLE.color = "#2EB990";

            GAME.UpButton = buttonsArr[2];
            GAME.RightButton = buttonsArr[3];
            GAME.DownButton = buttonsArr[0];
            GAME.LeftButton = buttonsArr[1];
        }
    }

    if (!GAME.gameOverScreen) {
        drawFrame();
        updateTriangle(triangleArr);
        updateCircle(CIRCLE);
    }
    else {
        drawGameOverScreen(GAME);
    }
    requestAnimationFrame(play);
}

initEventsListeners();
play();
