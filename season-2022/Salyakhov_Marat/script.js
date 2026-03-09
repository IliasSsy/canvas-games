// поле для пятнашек
var GAME = {
    width: 405,
    height: 405,
    background: "lightblue",
}

// ячейки под цифры
var CELL = {
    x: 2.5,
    y: 2.5,
    width: 100,
    height: 100,
    lineWidth: 5,
}

// количество кликов
var SCORE = {
    value: 0,
    color: "black",
    font: "60px Arial",
    x: 600,
    y: 175,
    width: 600,
    background: "#CEE6F7"
}

// объект для вывода победы
var WINNER = {
    font: "60px Arial",
    color: "red",
    x: 525,
    y: 275,
    text: "You done this!",
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width + SCORE.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

// значения чисел в пятнашках
var values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// перемешиваем
for (var i = 0; i < 4; i++) {
    values.sort(() => Math.random() - 0.5);
}

// перемешанный массив запихиваем в наше поле
var field = [[], [], [], []];
var k = 0;
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        field[i][j] = values[k];
        k += 1;
    }
}

// отрисовка ячеек
function drawCells() {
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = CELL.lineWidth;
    var x = CELL.x;
    var y = CELL.y;
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 4; j++) {
            canvasContext.strokeRect(x, y, CELL.width, CELL.height);
            x += CELL.width;
        }
        y += CELL.height;
        x = CELL.x;
    }
}

// отрисовка чисел
function drawNumbers() {
    var x = CELL.x;
    var y = CELL.y;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            canvasContext.fillStyle = "black";
            canvasContext.font = "60px Arial";
            if (field[i][j] !== 0) {
                if (field[i][j] < 10) {
                    canvasContext.fillText(field[i][j], x + (CELL.width / 2) - 15, y + (CELL.height / 2) + 20);
                }
                else {
                    canvasContext.fillText(field[i][j], x + (CELL.width / 2) - 35, y + (CELL.height / 2) + 20);
                }
            }
            x += CELL.width;
        }
        y += CELL.height;
        x = CELL.x;
    }
}

// отрисовка счета (кликов)
function drawScore() {
    canvasContext.fillStyle = SCORE.background;
    canvasContext.fillRect(GAME.width, 0, SCORE.width, GAME.height);
    canvasContext.fillStyle = SCORE.color;
    canvasContext.font = SCORE.font;
    canvasContext.fillText("Score: " + SCORE.value, SCORE.x, SCORE.y);
}

function initEventsListeners() {
    window.addEventListener("click", onCanvasMouseClick);
}

// передвигание значений ячеек внутри массива
function moveCells(xInd, yInd) {
    var swap = 0;
    if ((yInd !== 3) && (field[yInd + 1][xInd] === 0)) {
        swap = field[yInd + 1][xInd];
        field[yInd + 1][xInd] = field[yInd][xInd];
        field[yInd][xInd] = swap;
        SCORE.value += 1;
    }
    if ((yInd !== 0) && (field[yInd - 1][xInd] === 0)) {
        swap = field[yInd - 1][xInd];
        field[yInd - 1][xInd] = field[yInd][xInd];
        field[yInd][xInd] = swap;
        SCORE.value += 1;
    }
    if ((xInd !== 3) && (field[yInd][xInd + 1] === 0)) {
        swap = field[yInd][xInd + 1];
        field[yInd][xInd + 1] = field[yInd][xInd];
        field[yInd][xInd] = swap;
        SCORE.value += 1;
    }
    if ((xInd !== 0) && (field[yInd][xInd - 1] === 0)) {
        swap = field[yInd][xInd - 1];
        field[yInd][xInd - 1] = field[yInd][xInd];
        field[yInd][xInd] = swap;
        SCORE.value += 1;
    }
}

// получение координат ячейки массива, по которой кликнули
function onCanvasMouseClick(event) {
    var yInd = 0;
    var xInd = 0;
    for (var i = 0; i < 4; i++) {
        if ((event.clientY > CELL.y + i * CELL.height) && (event.clientY < CELL.y + (i + 1) * CELL.height)) {
            yInd = i;
        }
        if ((event.clientX > CELL.x + i * CELL.width) && (event.clientX < CELL.x + (i + 1) * CELL.width)) {
            xInd = i;
        }
    }
    moveCells(xInd, yInd);
}

// проверка на победителя
function checkWinner() {
    var winField = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 0]
    ]
    var winOrNot = false;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (winField[i][j] !== field[i][j]) {
                winOrNot = false;
                break;
            }
            else {
                winOrNot = true;
            }
        }
    }
    return winOrNot;
}

// отрисовка победного знамени :)
function drawWinner() {
    canvasContext.font = WINNER.font;
    canvasContext.fillStyle = WINNER.color;
    canvasContext.fillText(WINNER.text, WINNER.x, WINNER.y);
}

// солянка из отрисовок всего, что есть
function drawFrame() {
    drawBackground();
    drawCells();
    drawNumbers();
    drawScore();
    if (checkWinner()) {
        drawWinner();
    }
}

function play() {
    drawFrame();
    requestAnimationFrame(play);
}

initEventsListeners();
play();