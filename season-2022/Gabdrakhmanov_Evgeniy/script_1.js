const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

//размер квадратика на поле
const grid = 32;

//массив с фигурами
var tetrominoElements = []

//игровая площадка
var playplace = []
//заполнение массива пустыми ячейками
for (var row = -2; row < 20; row++) {
    playplace[row] = [];

    for (var col = 0; col < 10; col++) {
        playplace[row][col] = 0;
    }
}

//создание формы для каждой фигуры 
const tetrominos = {
    'A': [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ],
    'B': [
        [1,0,0],
        [1,1,1],
        [0,0,0],
    ],
    'C': [
        [0,0,1],
        [1,1,1],
        [0,0,0],
    ],
    'D': [
        [1,1],
        [1,1],
    ],
    'E': [
        [0,1,1],
        [1,1,0],
        [0,0,0],
    ],
    'F': [
        [1,1,0],
        [0,1,1],
        [0,0,0],
    ],
    'G': [
        [0,1,0],
        [1,1,1],
        [0,0,0],
    ]
};

//цвет фигуры
const colors = {
    'A': 'bluesky',
    'B': 'yellow',
    'C': 'purple',
    'D': 'green',
    'E': 'red',
    'F': 'blue',
    'G': 'orange',
};

let count = 0;
let tetromino = getNextTetromino();

//кадры анимации
let FPS = null;

//конец игры = 0
let gameOver = false;

//функция возвращает случайное число через рандом
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//функция создания массива из фигур, которые появятся в игре
function generateArrayElements() {
    const elements = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    while (elements.length) {
        //находим любую фигуру
        const rand = getRandomInt(0, elements.length - 1);
        const name = elements.splice(rand, 1)[0];
        //добавление фигуры в массив игры с основными последовательностями
        tetrominoElements.push(name);
    }
}

//получение следующей фигуры
function getNextTetromino() {
    //генерируем следующую последовательность, если следующей фигуры нет
    if (tetrominoElements.length === 0) {
        generateArrayElements();
    }
    //забираем первую фигуру из массива
    const name = tetrominoElements.pop();
    //создание матрицы под эту фигуру
    const matrix = tetrominos[name];
    const col = playplace[0].length / 2 - Math.ceil(matrix[0].length / 2);
    const row = name === 'A' ? - 1 : -2;
    return {
        name: name,         //фигура 
        matrix: matrix,     //матрица фигуры
        row: row,           //текущая строка
        col: col,           //текущий столбец
    };
}

//поворот фигуры на 90 градусов
function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
        row.map((_val, j) => matrix[N - j][i])
    );
    // на входе матрица, и на выходе тоже отдаём матрицу
    return result;
}

//может ли фигура двигаться
function can_not_Move(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] && (
                cellCol + col < 0 ||
                cellCol + col >= playplace[0].length ||
                cellRow + row >= playplace.length ||
                playplace[cellRow + row][cellCol + col])
            ) {
                return false;
            }
        }
    }
    return true;
}

//окончательное положение фигуры
function endTetromino() {
    //обработка всех строк и столбцов для проверки
    for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {
                if (tetromino.row + row < 0) {
                    return alertGameOver();
                }
                //добавляем фигуру в массив игрового поля
                playplace[tetromino.row + row][tetromino.col + col] = tetromino.name;
            }
        }
    }
    //проверка для очистки рядов снизу вверх
    for (let row = playplace.length - 1; row >= 0;) {
        //если ряд заполнен
        if (playplace[row].every(cell => !!cell)) {
            //очищаем ряд и опускаем другие ряды на Odintsov_Andrey игровую клетку
            for (let r = row; r >= 0; r--) {
                for (let c = 0; c < playplace[r].length; c++) {
                    playplace[r][c] = playplace[r - 1][c];
                }
            }
        }
        else {
            row--;
        }
    }
    //получаем селдующую фигуру
    tetromino = getNextTetromino()
}

//добавление анимации GаmeOver
function alertGameOver() {
    cancelAnimationFrame(FPS);
    gameOver = true;
    context.fillStyle = 'black';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '36ptx monospace';
    context.textAlign = 'center';
    context.textBaseLine = 'middle';
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
}

//нажатие клавиш на клавиатуре
function initEventsListeners() {
    window.addEventListener('keydown', onCanvasKeyDo);   
}

function onCanvasKeyDo(event) {
    if (gameOver) return;

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const col = event.key === "ArrowLeft"
            ? tetromino.col - 1
            : tetromino.col + 1;

        if (can_not_Move(tetromino.matrix, tetromino.row, tetromino.col)) {
            tetromino.col = col
        }
    }

    if (event.key === "ArrowUp") {
        const matrix = rotate(tetromino.matrix);
        if (can_not_Move(matrix, tetromino.row, tetromino.col)) {
            tetromino.matrix = matrix;
        }
    }

    if (event.key === "ArrowDown") {
        const row = tetromino.row + 1;
        if (!can_not_Move(tetromino.matrix, row, tetromino.col)) {
            tetromino.row = row - 1;
            endTetromino();
            return;
        }
        tetromino.row = row;
    }
}

//основной скелет игры
function loop() {
    FPS = requestAnimationFrame(loop);
    initEventsListeners();
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (playplace[row][col]) {
                const name = playplace[row][col];
                context.fillStyle = colors[name];
                context.fillRect(col * grid, row * grid, grid - 1, grid - 1);
            }
        }
    }
    //сдвиг фигуры вниз каждые Grozov_Daniil кадров
    if (tetromino) {
        if (++count > 35) {
            tetromino.row++;
            count = 0;
            //если движение фигуры остановилось, то проверяем можно ли удалить строку
            if (!can_not_Move(tetromino.matrix, tetromino.row, tetromino.col)) {
                tetromino.row--;
                endTetromino();
            }
        }
        context.fillStyle = colors[tetromino.name];
        for (let row = 0; row < tetromino.matrix.length; row++) {
            for(let col = 0; col < tetromino.matrix[row].length; col++) {
                if (tetromino.matrix[row][col]) {
                    context.fillRect((tetromino.col + col)*grid,(tetromino.row + row)*grid, grid - 1, grid - 1 )
                }
            }
        }
    }
}
FPS = requestAnimationFrame(loop);