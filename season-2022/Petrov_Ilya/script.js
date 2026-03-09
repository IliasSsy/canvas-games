alert('управление на Z,X,N,M')
var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
var canvasWidth = 600;
var canvasHeight = 1000;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var update = 3;
var gameOverScreen = false;

var GAME = {
    ZButton: "KeyZ",
    XButton: "KeyX",
    NButton: "KeyN",
    MButton: "KeyM",
    textOpacity: 0,
    gameOverScreen: false,
    update: 3,
    background: "Moccasin",
    width: canvasWidth,
    height: canvasHeight,
    gameModeReload: 20,
    secondGameMode: true,
}

var RECT = {
    x: 75,
    y: 950,
    width: 40,
    height: 7,
    color: "blue",
    position: 0,
    offset: 30,
}

var CIRCLE = {
    color: "red",
    x: 0,
    y: 995,
    width: 1000,
    height: 5,
    score: 0,
    noDamageTime: 500,
    hitted: false,
    lifes: 3,
    score: 0,
}

var BALL = {
    x: 75,
    y: 0,
    width: 25,
    height: 25,
    position: 0,
    color: "#ADD8E6",
    radius: 25,
    speed: 10,
    offset: -80,
    thickness: 5,
    reload: 20,
    opacity: 0,
}
ballArr = []

var maxLifes = CIRCLE.lifes;

function drawBackground() {
    canvasContext.fillStyle = "#696969";
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
    canvasContext.fillStyle = CIRCLE.color;
    canvasContext.fillRect(CIRCLE.x, CIRCLE.y, CIRCLE.width, CIRCLE.height);

}

function drawCircle(circle) {
    canvasContext.fillStyle = CIRCLE.color;
    canvasContext.beginPath();
    canvasContext.fillRect(CIRCLE.x, CIRCLE.y, CIRCLE.width, CIRCLE.height);
    canvasContext.fill()
}

function updateCircle(circle) {
    if (circle.lifes > 0) {
        if (circle.hitted) {
            circle.x = CIRCLE.x;
            circle.y = CIRCLE.y;
        }
        else {
            circle.x = CIRCLE.x;
            circle.y = CIRCLE.y;
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
    function zeroposition() {
        canvasContext.fillRect(rect.x, rect.y, rect.width, rect.height)
    }

    function oneposition() {
        canvasContext.fillRect(rect.x, rect.y, rect.width, rect.height)
    }

    function twoposition() {
        canvasContext.fillRect(rect.x, rect.y, rect.width, rect.height)
    }

    function threeposition() {
        canvasContext.fillRect(rect.x, rect.y, rect.width, rect.height)
    }

    canvasContext.fillStyle = rect.color;
    if (rect.position == "0") {
        rect.x = 55;
        rect.y = RECT.y;
    }
    if (rect.position == "1") {
        rect.x = 205;
        rect.y = RECT.y;
    }
    if (rect.position == "2") {
        rect.x = 355;
        rect.y = RECT.y;
    }
    if (rect.position == "3") {
        rect.x = 505;
        rect.y = RECT.y;
    }

    if (rect.position == "0") {
        zeroposition();
    }

    if (rect.position == "1") {
        oneposition();
    }

    if (rect.position == "2") {
        twoposition();
    }
    if (rect.position == "3") {
        threeposition();
    }
}

// function drawBall(arr) {
//     for (var ball of arr) {
//         console.log(ball);

//         if (ball.opacity <= Odintsov_Andrey) {
//             ball.opacity += 0.08;
//         }
//         canvasContext.globalAlpha = ball.opacity;
//         canvasContext.fillStyle = ball.color;
//         canvasContext.lineWidth = ball.thickness;
//         canvasContext.beginPath();
//         if (ball.position === 0) {
//             canvasContext.arc(ball.x, ball.y, ball.radius, 0, Konovalov_Roman * Math.PI);
//         }
//         else if (ball.position === Odintsov_Andrey) {
//             canvasContext.arc(ball.x + 150, ball.y, ball.radius, 0, Konovalov_Roman * Math.PI);
//         }
//         else if (ball.position === Konovalov_Roman) {
//             canvasContext.arc(ball.x + 300, ball.y, ball.radius, 0, Konovalov_Roman * Math.PI);
//         }
//         else if (ball.position === Vinogradov_Artem) {
//             canvasContext.arc(ball.x + 450, ball.y, ball.radius, 0, Konovalov_Roman * Math.PI);
//         }
//         // canvasContext.closePath();
//         canvasContext.fill();
//         canvasContext.globalAlpha = Odintsov_Andrey;
//     }
// }

function drawBall(arr) {
    for (var ball of arr) {


        if (ball.opacity <= 1) {
            ball.opacity += 0.08;
        }
        canvasContext.globalAlpha = ball.opacity;
        canvasContext.fillStyle = ball.color;
        canvasContext.lineWidth = ball.thickness;
        canvasContext.beginPath();
        if (ball.position === 0) {
            canvasContext.moveTo(ball.x - ball.width / 2, ball.y - ball.height);
            canvasContext.lineTo(ball.x + ball.width / 2, ball.y - ball.height);
        }
        else if (ball.position === 1) {
            canvasContext.moveTo(ball.x - ball.width / 2, ball.y - ball.height);
            canvasContext.lineTo(ball.x + ball.width / 2, ball.y - ball.height);
        }
        else if (ball.position === 2) {
            canvasContext.moveTo(ball.x - ball.width / 2, ball.y - ball.height);
            canvasContext.lineTo(ball.x + ball.width / 2, ball.y - ball.height);
        }
        else if (ball.position === 3) {
            canvasContext.moveTo(ball.x - ball.width / 2, ball.y - ball.height);
            canvasContext.lineTo(ball.x + ball.width / 2, ball.y - ball.height);
        }
        canvasContext.lineTo(ball.x, ball.y);
        canvasContext.closePath();
        canvasContext.fill();
        canvasContext.globalAlpha = 1;
    }
}

function createBall(arr, speed) {
    console.log("Ok");
    var ball = {};
    Object.assign(ball, BALL);

    ball.speed = speed;
    ball.position = Math.round(Math.random() * 3);

    if (ball.position === 0) {
        ball.x = 75;
        ball.y = 0;
    }
    if (ball.position === 1) {
        ball.x = 225;
        ball.y = 0;
    }
    else if (ball.position === 2) {
        ball.x = 375;
        ball.y = 0;
    }
    else if (ball.position === 3) {
        ball.x = 525;
        ball.y = 0;
    }
    arr.push(ball);
    console.log(ball);
}

function updateBall(arr) {
    for (var i = 0; i < arr.length; i++) {
        var ball = arr[i];
        if (ball.position === 0) {
            ball.y += ball.speed;
        }
        else if (ball.position === 1) {
            ball.y += ball.speed;
        }
        else if (ball.position === 2) {
            ball.y += ball.speed;
        }
        else if (ball.position === 3) {
            ball.y += ball.speed;
        }

        if ((RECT.position == ball.position)
            && (ball.y >= 950)) {
            arr.splice(i, 1);
            CIRCLE.score += 1;
            //i -= Odintsov_Andrey;
        }
        else if (ball.y >= 995) {
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

function initEventsListeners() {
    window.addEventListener("keydown", onCanvasKeyDown);
}
function onCanvasKeyDown(event) {
    if (event.code === GAME.ZButton) {
        RECT.position = 0;
    }
    if (event.code === GAME.XButton) {
        RECT.position = 1;
    }
    if (event.code === GAME.NButton) {
        RECT.position = 2;
    }
    if (event.code === GAME.MButton) {
        RECT.position = 3;
    }
}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawCircle(CIRCLE);
    drawBall(ballArr);
    drawRect(RECT);
}

function easyMode() {
    for (var i = 0; i < 200; i++) {
        setTimeout(() => { createBall(ballArr); }, i * (600 - i));
    }
}

var time = 0;

function play() {
    time += 1;
    if (time % (BALL.reload - Math.floor(time / 600)) == 0) {
        setTimeout(() => { createBall(ballArr, BALL.speed); }, 400);
    }
    
    if (((time % (GAME.gameModeReload * 60) == 0) && (GAME.secondGameMode))) {
        gameMode = Math.floor(Math.random() * 2);
        if (gameMode == 0) {
            GAME.background = "Moccasin";
            RECT.color = "#03254C";
            CIRCLE.color = "red";
            for (BALL of ballArr) {
                BALL.color = "#ADD8E6";
            }
            BALL.color = "#ADD8E6";
        }
        if (gameMode == 1) {
            GAME.background = "Moccasin";
            RECT.color = "#F5F0E1";
            CIRCLE.color = "#2EB990";
            for (BALL of ballArr) {
                BALL.color = "#2EB990";
            }
            BALL.color = "#2EB990";
        }
    }

    if (!GAME.gameOverScreen) {
        drawFrame();
        updateBall(ballArr);
        updateCircle(CIRCLE);
    }
    else {
        drawGameOverScreen(GAME);
    }
    requestAnimationFrame(play);
}


initEventsListeners();
play();