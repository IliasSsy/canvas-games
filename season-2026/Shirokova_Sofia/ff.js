
var Victory = false;

// Холст
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Конфигурация игры
const config = {
    width: 600,
    height: 600,
    fillColor: 'rgb(235, 250, 140)',
    borderColor: 'black',
    borderWidth: 5,
};

const x = (canvas.width - config.width) / 2;
const y = (canvas.height - config.height) / 2;

// Отрисовка игрового поля
function board() {
    ctx.fillStyle = config.fillColor;
    ctx.fillRect(x, y, config.width, config.height);

    ctx.strokeStyle = config.borderColor;
    ctx.lineWidth = config.borderWidth;
    ctx.strokeRect(x, y, config.width, config.height);
}

// Объект сыр
const Cheese = {
    x: getRandomInt(x + 10, x + 550),
    y: getRandomInt(y + 10, y + 550),
    width: 50,
    height: 50,
    img: new Image(),
    time: 0,
};

Cheese.img.src = './Сыр мой.png';

function NewCheese() {
    ctx.drawImage(Cheese.img, Cheese.x, Cheese.y, Cheese.width, Cheese.height);
}

function CheeseTime() {
    if (Cheese.time === 150) {
        const dx = Mouse.x - Cheese.x;
        const dy = Mouse.y - Cheese.y;

        // Проверяем, что мышь не рядом с сыром
        if (!(Math.abs(dx) < 50 && Math.abs(dy) < 50)) {
            Cheese.x = getRandomInt(x + 10, x + 550);
            Cheese.y = getRandomInt(y + 10, y + 550);
        }
        Cheese.time = 0;
    } else {
        Cheese.time += 1;
    }
}

// Объект мышь
const Mouse = {
    x: x + 260,
    y: y + 450,
    width: 80,
    height: 140,
    img: new Image(),
    xSpeed: 10,
    ySpeed: 10,
    move: 1,
};

Mouse.img.src = './Сыч1.png';

function NewMouse() {
    Mouse.img.src = './Сыч' + Mouse.move + '.png';
    ctx.drawImage(Mouse.img, Mouse.x, Mouse.y, Mouse.width, Mouse.height);
}

function Mouse13() {
    Mouse.width = 80;
    Mouse.height = 140;
}

function Mouse24() {
    Mouse.width = 140;
    Mouse.height = 80;
}

// Обработка событий
function initEventsListeners() {
    window.addEventListener('keydown', onCanvasKeyDown);
}

// Ограничение позиции мыши
function clampRacketPosition() {
    if (Mouse.x < x) Mouse.x = x;
    if (Mouse.y < y) Mouse.y = y;
    if (Mouse.x + Mouse.width > x + config.width) Mouse.x = x + config.width - Mouse.width;
    if (Mouse.y + Mouse.height > y + config.height) Mouse.y = y + config.height - Mouse.height;
}

function onCanvasKeyDown(event) {
    switch (event.key) {
        case 'ArrowLeft':
        case 'a':
            Mouse.x -= Mouse.xSpeed;
            Mouse.move = 4;
            Mouse24();
            break;
        case 'ArrowRight':
        case 'd':
            Mouse.x += Mouse.xSpeed;
            Mouse.move = 2;
            Mouse24();
            break;
        case 'ArrowUp':
        case 'w':
            Mouse.y -= Mouse.ySpeed;
            Mouse.move = 1;
            Mouse13();
            break;
        case 'ArrowDown':
        case 's':
            Mouse.y += Mouse.ySpeed;
            Mouse.move = 3;
            Mouse13();
            break;
    }
    clampRacketPosition();
}

// Счёт
let score = 0;

function newScore() {
    // Проверка пересечения прямоугольников
    const mouseRect = {
        left: Mouse.x,
        right: Mouse.x + Mouse.width,
        top: Mouse.y,
        bottom: Mouse.y + Mouse.height
    };
    
    const cheeseRect = {
        left: Cheese.x,
        right: Cheese.x + Cheese.width,
        top: Cheese.y,
        bottom: Cheese.y + Cheese.height
    };

    if (mouseRect.left < cheeseRect.right &&
        mouseRect.right > cheeseRect.left &&
        mouseRect.top < cheeseRect.bottom &&
        mouseRect.bottom > cheeseRect.top) {
        score += 1;
        Cheese.time = 150;
        return true;
    }
    return false;
}

function drawCanvastext() {
    ctx.font = '42px serif';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, x, y - 10);
}

function startVictory() {
    ctx.font = '116px serif';
    ctx.fillStyle = 'rgba(255, 255, 255)';
    ctx.fillText('You won!', x, y + config.height * 0.5);

    ctx.font = '50px serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillText('Good job', x + 120, y + config.height * 0.6);
}

function play() {
    if (newScore()) {
        // Сыр переместится при следующем вызове CheeseTime
    }

    if (score >= 25) {
        Victory = true;
    }

    board();
    CheeseTime();
    NewCheese();
    NewMouse();
    drawCanvastext();

    if (!Victory) {
        requestAnimationFrame(play);
    } else {
        startVictory();
    }
}

// Генерация случайного числа
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Запуск игры
initEventsListeners();
play();