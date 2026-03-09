
// var canvasContext = canvas.getContext("2d")
var score = 0;
var keys = {}
var gameOver = false;
var victory = false
var BIRD = {
    x: 80,
    y: 100,
    width: 100,
    height: 90,
    img: new Image(),
    //gravity: 7,
    stepSize: 4
}
BIRD.img.src = "./bird.png"

function drawBird() {
    // Проверяем, загрузилось ли изображение
    if (BIRD.img.complete) {
        canvasContext.drawImage(BIRD.img, BIRD.x, BIRD.y, BIRD.width, BIRD.height);
    } else {
        // Если изображение ещё не загрузилось, рисуем placeholder (например, прямоугольник)
        canvasContext.fillStyle = "yellow";
        canvasContext.fillRect(BIRD.x, BIRD.y, BIRD.width, BIRD.height);
    }
}

var PIPE = {
    width: 80,
    gap: 500,  // Расстояние между трубами
    speed: 3,
    color: "green",
    pipes: [],
    imgTop: new Image(),
    imgBottom: new Image()

}
PIPE.imgTop.src = "./top-pipe.png"
PIPE.imgBottom.src = "./bottom-pipe.png"
var GAME = {
    width: 1700,
    height: 900,
    fillcolor: "rgba(74, 170, 197, 1)",
    img: new Image()
}
GAME.img.src = "./bg.png"

var canvas = document.createElement("canvas")
document.body.appendChild(canvas);

// Устанавливаем размеры canvas
canvas.width = GAME.width
canvas.height = GAME.height

var bodyWidth = document.body.clientWidth
var bodyHeight = document.body.clientHeight
var canvasLeft = (bodyWidth - GAME.width) / 2
var canvasTop = (bodyHeight - GAME.height) / 2

// Устанавливаем позицию через style
canvas.style.position = 'absolute'
canvas.style.left = canvasLeft + 'px'
canvas.style.top = canvasTop + 'px'
var canvasContext = canvas.getContext("2d")

// canvasContext.fillStyle = GAME.fillcolor
// canvasContext.fillRect(GAME.img, 0, 0, GAME.width, GAME.height)
// Обработчик нажатий клавиш

function setupTextStyle() {
    canvasContext.font = "35px serif";
    canvasContext.fillStyle = "black";
    canvasContext.textAlign = "left";  // Явно задаём выравнивание
    canvasContext.textBaseline = "top"; // Явно задаём базовую линию
}

function drawScore() {
    setupTextStyle()
    canvasContext.font = "35px serif";
    canvasContext.fillStyle = "black";
    
    // Фиксированные координаты: 10px от левого края, 20px от верхнего
    const x = 10;
    const y = 20;
    
    canvasContext.fillText("Score: " + score, x, y);
}

function checkGameOver() {

    // Проверка столкновений со всеми трубами
    for (var i = 0; i < PIPE.pipes.length; i++) {
        if (checkCollision(PIPE.pipes[i])) {
            gameOver = true;
            return;
        }
    }
}
function checkVictory () {
    if (score===10) {
        victory = true
        return
    } 
}
 
function drawGameOver() {
    if (gameOver) {
        canvasContext.font = "60px serif";
        canvasContext.fillStyle = "red";
        canvasContext.textAlign = "center";
        canvasContext.fillText("Game Over!", GAME.width / 2, GAME.height / 2)
        canvasContext.fillText("Press space to continue ", GAME.width / 2, GAME.height / 2 + 85)
    }
}

function drawVictory () {
    if (victory) {
        canvasContext.font = "60px serif";
        canvasContext.fillStyle = "blue";
        canvasContext.textAlign = "center";
        canvasContext.fillText("Victory!", GAME.width / 2, GAME.height / 2)
        canvasContext.fillText("Press space to continue ", GAME.width / 2, GAME.height / 2 + 85)
    }
}

const gameOverScreen = document.createElement('div');
gameOverScreen.id = 'gameOver';
gameOverScreen.style.cssText = `
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 60px;
    color: red;
    z-index: 1000;
`;
gameOverScreen.innerHTML = 'Game Over!<br>Press Space to restart';
document.body.appendChild(gameOverScreen);

// Проверяем, что обработчики установлены

function updateBird() {
    // Всегда обрабатываем клавиши, даже если микрофон активен
    if (keys["ArrowUp"] || keys["w"]) {
        BIRD.y -= BIRD.stepSize;
    }
    if (keys["ArrowDown"] || keys["s"]) {
        BIRD.y += BIRD.stepSize;
    }

    //BIRD.y += BIRD.gravity;

    const topEdge = 0;
    const bottomEdge = GAME.height - BIRD.height;

    if (BIRD.y < topEdge) {
        BIRD.y = topEdge;
    } else if (BIRD.y > bottomEdge) {
        BIRD.y = bottomEdge;
    }
}
function drawBackground() {
    // Проверяем, загрузилось ли фоновое изображение
    if (GAME.img.complete) {
        canvasContext.drawImage(GAME.img, 0, 0, GAME.width, GAME.height);
    } else {
        // Если изображение не загрузилось — рисуем цветной фон как запасной вариант
        canvasContext.fillStyle = GAME.fillcolor;
        canvasContext.fillRect(0, 0, GAME.width, GAME.height);
    }
}
function createPipe() {
    var topHeight = Math.random() * (GAME.height / 2);
    var bottomHeight = GAME.height - PIPE.gap - topHeight;

    PIPE.pipes.push({
        x: GAME.width,
        top: {
            y: 0,
            height: topHeight
        },
        bottom: {
            y: GAME.height - bottomHeight,
            height: bottomHeight
        }
    });
}
function drawPipe(pipe) {
    // Рисуем верхнюю трубу
    canvasContext.drawImage(
        PIPE.imgTop,  // используем изображение верхней трубы
        pipe.x,       // x-координата
        pipe.top.y,   // y-координата
        PIPE.width,   // ширина
        pipe.top.height  // высота
    );

    // Рисуем нижнюю трубу
    canvasContext.drawImage(
        PIPE.imgBottom,  // используем изображение нижней трубы
        pipe.x,         // x-координата
        pipe.bottom.y,  // y-координата
        PIPE.width,     // ширина
        pipe.bottom.height  // высота
    );
}

function updatePipes() {
    // Движение труб
    for (var i = 0; i < PIPE.pipes.length; i++) {
        var pipe = PIPE.pipes[i];
        pipe.x -= PIPE.speed;

        // Проверка на проход трубы
        if (pipe.x + PIPE.width < BIRD.x && !pipe.scored) {
            score++;
            pipe.scored = true;
        }

        // Удаление труб за пределами экрана
        if (pipe.x < -PIPE.width) {
            PIPE.pipes.splice(i, 1);
            i--;
        }
    }

    // Генерация новых труб
    if (PIPE.pipes.length === 0 || PIPE.pipes[PIPE.pipes.length - 1].x < GAME.width - 650) {
        createPipe();
    }
}

function checkCollision(pipe) {
    // Проверка столкновения с верхней трубой
    if (BIRD.x + BIRD.width > pipe.x &&
        BIRD.x < pipe.x + PIPE.width &&
        BIRD.y < pipe.top.y + pipe.top.height) {
        return true;
    }

    // Проверка столкновения с нижней трубой
    if (BIRD.x + BIRD.width > pipe.x &&
        BIRD.x < pipe.x + PIPE.width &&
        BIRD.y + BIRD.height > pipe.bottom.y) {
        return true;
    }

    return false;
}
const MIN_HEIGHT = 0; // минимальная Y-позиция птицы
const MAX_HEIGHT = GAME.height - BIRD.height; // максимальная Y-позиция
const SMOOTHING = 0.7; // коэффициент сглаживания RMS
let rms = 0; // текущее сглаженное значение громкости
let isMicActive = false; // флаг активности микрофона



async function initMic() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    isMicActive = true;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);

    function updateAudio() {
        if (!isMicActive) return;

    // Получаем текущие аудиоданные
        analyser.getByteTimeDomainData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
        const v = (dataArray[i] - 128) / 128; // Нормализация: 0–255 → -1..1
        sum += v * v;
    }
        const newRMS = Math.sqrt(sum / bufferLength);
        rms = rms * SMOOTHING + newRMS * (1 - SMOOTHING);
        const targetY = MAX_HEIGHT - (rms * MAX_HEIGHT * 8.0);
        const clampedTargetY = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, targetY));
    
        controlBirdByVolume(clampedTargetY);

        requestAnimationFrame(updateAudio);
    }

    // Запускаем анализ аудио
    updateAudio();

  } catch (err) {
    console.error("Ошибка микрофона:", err.message);
    // Если микрофон недоступен, продолжаем с управлением клавишами
    isMicActive = false;
  }
}

function controlBirdByVolume(targetY) {
    // Рассчитываем разницу между текущей и целевой позицией
    const delta = targetY - BIRD.y;
    
    // Плавно двигаем птицу: чем больше разница, тем сильнее сдвиг
    // Используем коэффициент 0.1 для сглаживания движения
    const step = delta * 0.1;
    
    // Обновляем позицию птицы
    BIRD.y += step;
    
    // Ограничиваем движение границами экрана
    if (BIRD.y < MIN_HEIGHT) {
        BIRD.y = MIN_HEIGHT;
    } else if (BIRD.y > MAX_HEIGHT) {
        BIRD.y = MAX_HEIGHT;
    }
}

let isGameOver = false;

// Функция завершения игры
function gameOver() {
  isGameOver = true;
  document.getElementById('game').style.display = 'none';
  document.getElementById('gameOver').style.display = 'block';
}

// Функция перезапуска


function restartGame() {
    if (gameOver || victory) {
        // Сброс состояний
        gameOver = false;
        victory = false;
        score = 0;
        PIPE.pipes = [];
        BIRD.y = 100;

        // Очищаем экран
        canvasContext.clearRect(0, 0, GAME.width, GAME.height);
        
        // Пересоздаём первую трубу
        createPipe();
        
        // Запускаем игру
        requestAnimationFrame(play)
    }
}


// Добавляем обработчик клавиши пробела для перезапуска
window.addEventListener('keydown', function(e) {
    if (e.key === ' ' && isGameOver) { // Пробел
        restartGame();
    }
});
//
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    
    // Рисуем все трубы
    for (var i = 0; i < PIPE.pipes.length; i++) {
        drawPipe(PIPE.pipes[i]);
    }

    drawBird()
    drawScore()
    drawVictory()
    drawGameOver()
}

function play() {
    if (gameOver || victory) {
        return; // Прекращаем анимацию, если игра окончена
    }
    
    updatePipes();
    drawScore()
    updateBird();
    checkVictory();
    checkGameOver();
    drawFrame();
    
    requestAnimationFrame(play); // Продолжаем цикл
}

window.addEventListener('keydown', function(e) {
    keys[e.key] = true;
    
    // Перезапуск по пробелу
    if (e.key === ' ' && (gameOver || victory)) {
        restartGame();
    }
});

window.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});

BIRD.img.onload = function() {
    PIPE.imgTop.onload = function() {
        PIPE.imgBottom.onload = function() {
            initMic();
            createPipe();    
            play();
        }
    }
}


// Если изображение уже загружено (например, из кэша), запускаем сразу
if (BIRD.img.complete) {
    createPipe()
    play()
}