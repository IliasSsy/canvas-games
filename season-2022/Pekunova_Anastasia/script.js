var SQUARE_WIDTH = 100;
var SQUARE_HEIGHT = 100;

var GAME = {
    width: 1500,
    height: 1500,
    background: "#FFB6C1",
    score: 0,
}

var SQUARE = {
    color: "#483D8B",
    x: 100,
    y: 0,
    width: SQUARE_WIDTH,
    height: SQUARE_HEIGHT,
    speed: 100,
}

var BLOCKER1 = {
    color: "#DB7093",
    x: 300,
    y: 500,
    width: SQUARE_WIDTH,
    height: SQUARE_HEIGHT,
    speed: 10,
}

var BLOCKER2 = {
    color: "#DB7093",
    x: 1300,
    y: 100,
    width: SQUARE_WIDTH,
    height: SQUARE_HEIGHT,
    speed: 10,
}

var BLOCKER3 = {
    color: "#DB7093",
    x: 600,
    y: 1200,
    width: SQUARE_WIDTH,
    height: SQUARE_HEIGHT,
    speed: 10,
}

var BLOCKER4 = {
    color: "#DB7093",
    x: 100,
    y: 500,
    width: SQUARE_WIDTH,
    height: SQUARE_HEIGHT,
    speed: 10,
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;

var canvasContext = canvas.getContext("2d");
canvasContext.fillStyle = "#FFE4E1"
canvasContext.fillRect(0, 0, GAME.width, GAME.height);

function drawFrame(){
    canvasContext.clearRect(0,0,GAME.width, GAME.height);
    drawBackground(ARR);
    drawSquare(SQUARE);
    drawBlocker(BLOCKER1, BLOCKER2, BLOCKER3, BLOCKER4);
}
//создание масива 
var ARR = [[true, false, true, true, true, true, true, true, true, true, true,true, true, true, true],
                [true, false, true, false, false, false, false, false, false, false, true, false,false,false, true],
                [true, false, true, true, true, false, true, true, false, true, true, false, true, false, true],
                [true, false, false, false, false, false, true, false, false, true, false, false, false, false, true],
                [true, true, true, true, true,true, true, true, false, true,true, false, true, false, true],
                [true, false, true, false,false,false,false,false,false,false,false,false, true, false, true],
                [true, false, true, true, false,false, true, true, false, true,true, true, true, false, true],
                [true, false, false, true, true, true, true, false,false,false,false, true, false,false, true],
                [true, false, false,false,false,false,false,false, true, true, false, true, false, true, true],
                [true, false, true, true, true, true, true, true, true, true, true, true, false, true, true],
                [true, false, false, true,false,false, true, false,false,false,false,false,false, true, true],
                [true, false, true, true, false, true, true, false, true, true, true, true, true, true, true],
                [true, false, true, false, false, true, false,false,false,false,false,false,false,false, true],
                [true, false, false,false, true, true, true, true, false,false,false, true, true, false, true],
                [true, true, true, true, true, true, true, true, true, true, true, true, true, false, true]];
// функция отрисовки фона-лабиринта
function drawBackground(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            const element = arr[i][j];
            if (element) {
                canvasContext.fillStyle = "#87ceeb";
                canvasContext.beginPath();
                canvasContext.fillRect(j * SQUARE_WIDTH, i * SQUARE_HEIGHT, SQUARE_WIDTH, SQUARE_HEIGHT);
                canvasContext.fill();
            } else {
                canvasContext.fillStyle = "#E0FFFF";
                canvasContext.beginPath();
                canvasContext.fillRect(j * SQUARE_WIDTH, i * SQUARE_HEIGHT, SQUARE_WIDTH, SQUARE_HEIGHT);
                canvasContext.fill();
            }
        }
    }
}
// функция отрисовки препятствий(blocker)
function drawBlocker(blocker1, blocker2, blocker3, blocker4){
    canvasContext.fillStyle = blocker1.color;
    canvasContext.beginPath();
    canvasContext.fillRect(blocker1.x, blocker1.y, blocker1.width, blocker1.height);
    canvasContext.fillRect(blocker2.x, blocker2.y, blocker2.width, blocker2.height);
    canvasContext.fillRect(blocker3.x, blocker3.y, blocker3.width, blocker3.height);
    canvasContext.fillRect(blocker4.x, blocker4.y, blocker4.width, blocker4.height);
    canvasContext.fill();
     
}

// функция пересчета позиций blocker
function updateBlocker(blocker1, blocker2, blocker3, blocker4) {
        blocker1.x += blocker1.speed;
        if ((blocker1.x + blocker1.width > 1200) || (blocker1.x < 300)) {
            blocker1.speed = -blocker1.speed;
        }
        blocker2.y += blocker2.speed;
        if ((blocker2.y + blocker2.height > 500) || (blocker2.y < 100)) {
            blocker2.speed = -blocker2.speed;
        }
        blocker3.x += blocker3.speed;
        if ((blocker3.x + blocker3.width > 1400) || (blocker3.x < 600)) {
            blocker3.speed = -blocker3.speed;
        }
        blocker4.y += blocker4.speed;
        if ((blocker4.y + blocker4.height > 1400) || (blocker4.y < 500)) {
            blocker4.speed = -blocker4.speed;
        }
}

// функция отрисовки маркера
function drawSquare(square){
    canvasContext.fillStyle = square.color;
    canvasContext.beginPath();
    canvasContext.fillRect(square.x, square.y, square.width, square.height);
    canvasContext.fill();
}

// функция пересчета позиций маркера
function updateSquare(square, blocker1, blocker2, blocker3, blocker4) {
   if (((square.x === blocker1.x) && (square.y === blocker1.y)) || ((square.x === blocker2.x) && (square.y === blocker2.y)) || 
        ((square.x === blocker3.x) && (square.y === blocker3.y)) || ((square.x === blocker4.x) && (square.y === blocker4.y))) {
       alert("YOU LOSE!");
       location.reload();
    }
}

//  функция прослушивания событий
function initEvenListeners() {
    window.addEventListener("keydown", onCanvasKeyDown);
}

// обьявляем обработчик перемещения мыши
function onCanvasKeyDown(event) {
    if ((SQUARE.y === 1400) && (SQUARE.x === 1300)) {
        alert("YOU WIN!");
        location.reload();
        return; 
    }
    if (event.key === "ArrowLeft" && checkForCollision(SQUARE.x - SQUARE.speed, SQUARE.y)) {
        SQUARE.x = SQUARE.x - SQUARE.speed;
    }
    if (event.key === "ArrowRight" && checkForCollision(SQUARE.x + SQUARE.speed, SQUARE.y)) {
        SQUARE.x = SQUARE.x + SQUARE.speed;
    } 
    if (event.key === "ArrowUp" && checkForCollision(SQUARE.x, SQUARE.y - SQUARE.speed)) {
        SQUARE.y = SQUARE.y - SQUARE.speed;
    }
    if (event.key === "ArrowDown" && checkForCollision(SQUARE.x, SQUARE.y + SQUARE.speed)) {
        SQUARE.y = SQUARE.y + SQUARE.speed;
    }
    clampSquarePosition();
}

// функция проверки краев холста
function clampSquarePosition() {
    if (SQUARE.x < 0) {
        SQUARE.x = 0;
    }
    if (SQUARE.y < 0) {
        SQUARE.y = 0;
    }
    if (SQUARE.x + SQUARE.width > GAME.width) {
        SQUARE.x = GAME.width - SQUARE.width;
    }
    if (SQUARE.y + SQUARE.width > GAME.width) {
        SQUARE.y = GAME.width - SQUARE.width;
    }
}
// функция проверки ходов лабиринта
function checkForCollision(x, y) {
    if (!ARR[y / SQUARE.speed][x / SQUARE.speed]) {
        return true // нет прохода
    } 
    return false // есть проход
}

//функция перелистывания кадров
function play(){
    drawFrame()
    updateBlocker(BLOCKER1, BLOCKER2, BLOCKER3, BLOCKER4);
    updateSquare(SQUARE, BLOCKER1, BLOCKER2, BLOCKER3, BLOCKER4);
    requestAnimationFrame(play);
    initEvenListeners();
}

play(); // вызов функции перелистывания кадров
