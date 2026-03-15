var GAME = {
    xOffset: 0,
    yOffset: 0,
    width: 1250,
    height: 700,
    background: 'black',
    state: 'start_menu',
    mouseX: 0,
    mouseY: 0
};

var DICE = {
    width: 80,
    height: 80,
    color: 'white',
    speed: 0,
    coolDown: 0,
    x: (GAME.width / 2) - 40,
    y: (GAME.height / 2) - 40,
    deg1: 0,
    rotateSpeed: 0,
    score: 0,
    value: 3,
    maxDeg: 200,
    maxMoveSpeed: 25,
};

var NUMBERS = [];

var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

GAME.mouseX = GAME.width / 2;
GAME.mouseY = GAME.height / 2;

function getCanvasMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();

    if (GAME.state === 'start_menu') {
        drawMenu();
    } else if (GAME.state === 'playing') {
        drawNumbers();
        drawScore();
        drawPower();
    } else if (GAME.state === 'gameover') {
        gameOver();
        drawScore();
    }

    drawDice();
}

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

function drawMenu() {
    canvasContext.fillStyle = 'white';
    canvasContext.font = "48px consolas";
    canvasContext.textAlign = "center";
    canvasContext.fillText('Tap on dice to start', GAME.width / 2, GAME.height / 2 + 100);
    canvasContext.textAlign = "start";
}

function gameOver() {
    canvasContext.fillStyle = 'red';
    canvasContext.font = "150px consolas";
    canvasContext.textAlign = "center";
    canvasContext.fillText('GAME OVER', GAME.width / 2, GAME.height / 2);
    canvasContext.textAlign = "start";
}

function drawDice() {
    canvasContext.save();

    var rotationIncrement = 0;
    if (DICE.deg1 > 40) {
        rotationIncrement = 45;
    } else if (DICE.deg1 > 0) {
        rotationIncrement = DICE.deg1 * 0.3;
    }

    if (GAME.state !== 'gameover') {
        DICE.rotateSpeed += rotationIncrement;
    }
    var rad = DICE.rotateSpeed * (Math.PI / 180);

    canvasContext.translate(DICE.x + DICE.width / 2, DICE.y + DICE.height / 2);
    canvasContext.rotate(rad);

    canvasContext.fillStyle = DICE.color;
    canvasContext.fillRect(-DICE.width / 2, -DICE.height / 2, DICE.width, DICE.height);

    if (DICE.deg1 < 50 || GAME.state === 'gameover' || GAME.state === 'start_menu') {
        canvasContext.fillStyle = 'black';
        var dotRadius = 5;
        var offset = 20;

        var dotPositions = {
            tl: [-offset, -offset], tr: [offset, -offset],
            bl: [-offset, offset], br: [offset, offset],
            ml: [-offset, 0], mr: [offset, 0],
            c: [0, 0]
        };

        var diceDots = {
            1: [dotPositions.c],
            2: [dotPositions.tl, dotPositions.br],
            3: [dotPositions.tl, dotPositions.c, dotPositions.br],
            4: [dotPositions.tl, dotPositions.tr, dotPositions.bl, dotPositions.br],
            5: [dotPositions.tl, dotPositions.tr, dotPositions.c, dotPositions.bl, dotPositions.br],
            6: [dotPositions.tl, dotPositions.tr, dotPositions.ml, dotPositions.mr, dotPositions.bl, dotPositions.br]
        };

        var dots = diceDots[DICE.value];
        if (dots) {
            dots.forEach(function (pos) {
                canvasContext.beginPath();
                canvasContext.arc(pos[0], pos[1], dotRadius, 0, Math.PI * 2);
                canvasContext.fill();
            });
        }
    }

    canvasContext.restore();
}

function drawNumbers() {
    for (var i = 0; i < NUMBERS.length; i += 1) {
        var number = NUMBERS[i];
        canvasContext.fillStyle = number.color;
        canvasContext.font = number.font;
        canvasContext.fillText(number.value, number.x, number.y);
    }
}

function drawScore() {
    canvasContext.fillStyle = 'white';
    canvasContext.font = "30px consolas";
    canvasContext.fillText('Score: ' + DICE.score, GAME.xOffset + 10, GAME.yOffset + 30);
}

function drawPower() {
    canvasContext.fillStyle = 'white';
    canvasContext.font = "30px consolas";
    var power = DICE.score > 0 ? DICE.value * DICE.score : 0;
    canvasContext.fillText('Power: ' + power, GAME.width - 200, GAME.yOffset + 30);
}

function generateNumber() {
    if (GAME.state !== 'playing') return;

    var minValue = DICE.score;
    var maxValue = DICE.score * 7;
    if (minValue > maxValue) { minValue = maxValue }

    var value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    var currentSpeed = 5 * (1 + DICE.score / 20);

    NUMBERS.push({
        value: value,
        x: Math.random() * (GAME.width - 50) + 25,
        y: 0,
        deg: (Math.random() * (Math.PI / 2)) + Math.PI / 4,
        color: 'red',
        font: "48px consolas",
        speed: currentSpeed,
    });
}

function updateDice() {
    if (GAME.state === 'gameover') {
        DICE.deg1 = 0;
        DICE.speed = 0;
        return;
    }

    if (DICE.deg1 > 0) {

        var decayRate;
        if (DICE.deg1 > 40) {
            decayRate = 0.4;
        } else {
            decayRate = 1.5;
        }

        DICE.deg1 -= decayRate;
        if (DICE.deg1 < 0) DICE.deg1 = 0;

        DICE.speed = (DICE.deg1 / DICE.maxDeg) * DICE.maxMoveSpeed;

        var dx = GAME.mouseX - (DICE.x + DICE.width / 2);
        var dy = GAME.mouseY - (DICE.y + DICE.height / 2);
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1) {
            var moveStep = Math.min(dist, DICE.speed);

            DICE.x += (dx / dist) * moveStep;
            DICE.y += (dy / dist) * moveStep;
        }

        if (DICE.deg1 === 0) {
            DICE.coolDown = 20;
        }
    } else {
        if (DICE.coolDown > 0) {
            DICE.coolDown -= 1;
        }
    }

    if (DICE.y + DICE.height > GAME.height) DICE.y = GAME.height - DICE.height;
    if (DICE.y < GAME.yOffset) DICE.y = GAME.yOffset;
    if (DICE.x + DICE.width > GAME.width + GAME.xOffset) DICE.x = GAME.width + GAME.xOffset - DICE.width;
    if (DICE.x < GAME.xOffset) DICE.x = GAME.xOffset;
}

function updateNumbers() {
    if (GAME.state !== 'playing') return;

    var dicePower = DICE.value * DICE.score;

    for (var i = NUMBERS.length - 1; i >= 0; i--) {
        var number = NUMBERS[i];

        number.x += number.speed * Math.cos(number.deg);
        number.y += number.speed * Math.sin(number.deg);

        var textWidth = String(number.value).length * 25;
        var textHeight = 48;

        var hitX = number.x < DICE.x + DICE.width && number.x + textWidth > DICE.x;
        var hitY = number.y - textHeight < DICE.y + DICE.height && number.y > DICE.y;

        if (hitX && hitY) {
            if (dicePower >= number.value) {
                DICE.score += 1;
                NUMBERS.splice(i, 1);
            } else {
                GAME.state = 'gameover';
                DICE.deg1 = 0;
                DICE.coolDown = 0;
                return;
            }
        }

        if (number.y > GAME.height) {
            NUMBERS.splice(i, 1);
        }
    }
}

function play() {
    drawFrame();
    updateDice();
    if (GAME.state == 'playing') {
        updateNumbers();
    }
    requestAnimationFrame(play);
}

function initEventeListeners() {
    window.addEventListener('click', onCanvasMouseClick);
    window.addEventListener('mousemove', onCanvasMouseMove);
}

function onCanvasMouseClick(event) {
    var mousePos = getCanvasMousePos(event);

    var diceLeftLine = mousePos.x > DICE.x;
    var diceRightLine = mousePos.x < DICE.x + DICE.width;
    var diceTopLine = mousePos.y > DICE.y;
    var diceBottomLine = mousePos.y < DICE.y + DICE.height;

    if (diceLeftLine && diceRightLine && diceTopLine && diceBottomLine) {

        if (GAME.state === 'start_menu') {
            GAME.state = 'playing';

            DICE.score = 1;
            DICE.deg1 = DICE.maxDeg;
            DICE.rotateSpeed = 0;
            NUMBERS = [];
        }

        else if (GAME.state === 'playing' && DICE.coolDown === 0 && DICE.deg1 === 0) {
            DICE.deg1 = DICE.maxDeg;
            DICE.value = Math.floor(Math.random() * 6) + 1;
            DICE.rotateSpeed = 0;
        }

        else if (GAME.state === 'gameover') {
            DICE.x = (GAME.width / 2) - 40;
            DICE.y = (GAME.height / 2) - 40;

            DICE.value = 3;
            DICE.score = 0;
            NUMBERS = [];
            DICE.deg1 = 0;
            DICE.coolDown = 0;

            GAME.state = 'start_menu';
        }
    }
}

function onCanvasMouseMove(event) {
    var mousePos = getCanvasMousePos(event);
    GAME.mouseX = mousePos.x;
    GAME.mouseY = mousePos.y;
}

initEventeListeners();
setInterval(generateNumber, 200);
play();




