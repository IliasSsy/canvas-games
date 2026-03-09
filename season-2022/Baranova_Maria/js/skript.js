var GAME = {
    width: 500,
    height: 500,
    background: "#EFAF8C",
    score: 0,
    canvasContext: null,
    play: false,
    lose: false,
    win: false,
}

var TEXT = {
    color: '',
    name: '',
    font: '50px Dosis',
    x: 100,
    y: 100,
}

var COLORS = ['red', 'yellow', 'green', 'blue', 'purple', 'white'];
console.log(COLORS.length)

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
GAME.canvasContext = canvas.getContext("2d");

function drawFrame() {
    GAME.canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground()
    drawText();
    draw();
    menu();
}

function drawBackground() {
    GAME.canvasContext.fillStyle = GAME.background;
    GAME.canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

function play() {
    update();
    drawFrame();
    timer();
}

function drawText(color) {
    if (GAME.play && GAME.lose == false && GAME.win == false) {
        GAME.canvasContext.fillStyle = TEXT.color;
        GAME.canvasContext.font = TEXT.font;
        GAME.canvasContext.fillText(TEXT.name, TEXT.x, TEXT.y);
    }
}

function redrawText() {
    update();
    drawText();
}

function update() {
    if (time < 10) {
        TEXT.color = COLORS[getRandomInt(0, 3)];
        TEXT.name = COLORS[getRandomInt(0, 3)]
    }
    if ((time > 10) && (time < 20)) {
        TEXT.color = COLORS[getRandomInt(0, 4)];
        TEXT.name = COLORS[getRandomInt(0, 4)]
    }
    if ((time > 20) && (time < 30)) {
        TEXT.color = COLORS[getRandomInt(0, 5)];
        TEXT.name = COLORS[getRandomInt(0, 5)]
    }
    if ((time > 30) && (time < 40)) {
        TEXT.color = COLORS[getRandomInt(0, 6)];
        TEXT.name = COLORS[getRandomInt(0, 6)]
    }

    while (TEXT.color === TEXT.name) {
        TEXT.name = COLORS[getRandomInt(0, 4)]
    }

    TEXT.x = getRandomInt(50, 330);
    TEXT.y = getRandomInt(80, 350);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function onCanvasKeyDown(event) {
    if (GAME.play) {
        if ((event.code === "KeyR") && (TEXT.color === 'red')) {
            GAME.score += 1;
            redrawText();
        }
        else if ((event.code === "KeyR") && (TEXT.color !== 'red')) {
            GAME.score -= 2;
            redrawText();
        }
        if ((event.code === "KeyB") && (TEXT.color === 'blue')) {
            GAME.score += 1;
            redrawText();
        }
        else if ((event.code === "KeyB") && (TEXT.color !== 'blue')) {
            GAME.score -= 2;
            redrawText();
        }
        if ((event.code === "KeyY") && (TEXT.color === 'yellow')) {
            GAME.score += 1;
            redrawText();
        }
        else if ((event.code === "KeyY") && (TEXT.color !== 'yellow')) {
            GAME.score -= 2;
            redrawText();
        }
        if ((event.code === "KeyG") && (TEXT.color === 'green')) {
            GAME.score += 1;
            redrawText();
        }
        else if ((event.code === "KeyG") && (TEXT.color !== 'green')) {
            GAME.score -= 2;
            redrawText();
        }
        if ((event.code === "KeyP") && (TEXT.color === 'purple')) {
            GAME.score += 1;
            redrawText();
        }
        else if ((event.code === "KeyP") && (TEXT.color !== 'purple')) {
            GAME.score -= 2;
            redrawText();
        }
        if ((event.code === "KeyW") && (TEXT.color === 'white')) {
            GAME.score += 1;
            redrawText();
        }
        else if ((event.code === "KeyW") && (TEXT.color !== 'white')) {
            GAME.score -= 2;
            redrawText();
        }

    }
    if (event.code === "Space" && GAME.play == false) {
        GAME.play = true;
        GAME.win = false;
        GAME.lose = false;
        time = 0;
        GAME.score = 0;
        play();
    }
}

function initEventsListeners() {
    window.addEventListener('keydown', onCanvasKeyDown);
}

function draw() {

    if (GAME.play) {
        GAME.canvasContext.fillStyle = '#1E3D59';
        GAME.canvasContext.font = '20px Arial';
        GAME.canvasContext.fillText("Score: " + GAME.score, 15, 25);

        GAME.canvasContext.fillStyle = '#1E3D59';
        GAME.canvasContext.font = '20px Arial';
        GAME.canvasContext.fillText("Time: " + time, 370, 25);
    }

    if ((GAME.play == false) && (GAME.lose == true) && (GAME.win == false)) {
        GAME.canvasContext.font = '40px Arial';
        GAME.canvasContext.fillStyle = 'black';
        GAME.canvasContext.fillText('ИГРА ОКОНЧЕНА', 90, 250);
    }

    if ((GAME.win == true) && (GAME.play == false) && (GAME.lose == false)) {
        GAME.canvasContext.font = '40px Arial';
        GAME.canvasContext.fillStyle = 'black';
        GAME.canvasContext.fillText('ПОБЕДА', 120, 250);
    }
}

function menu() {
    if ((GAME.play == false) && (GAME.lose == false) && (GAME.win == false)) {

        GAME.canvasContext.font = '40px Arial';
        GAME.canvasContext.fillStyle = 'black';
        GAME.canvasContext.fillText('Be attentive', 140, 130);

        GAME.canvasContext.font = '11px Arial';
        GAME.canvasContext.fillStyle = 'black';
        GAME.canvasContext.fillText('Сейчас тебе предстоит состредоточить и проверить свою внимательность ', 60, 200);
        GAME.canvasContext.fillText('Успей набрать как можно больше очков. Нажимай на на клавишу, ', 60, 220);
        GAME.canvasContext.fillText('соответствующую первой букве цвета, но не соответствующей смыслу слова,', 60, 240);
        GAME.canvasContext.fillText('Игра длится 60 секунд, каждые 10 сек будет увеличиваться количество', 60, 260);
        GAME.canvasContext.fillText('требуемых отгаданных слов. Тебе нужно набрать не менее 35 очков за игру', 60, 280);
        GAME.canvasContext.fillText('Со временем количество цветов будет увеличиваться, успевай реагировать :)', 60, 300);
        GAME.canvasContext.fillText('Если ты готов, нажимай пробел и начинай игру', 120, 340);
    }

}

var time = 0;
var mTime = 60;
var limitTime = 10;

function timer() {
    if ((time !== limitTime) && (GAME.play == true)) {
        drawFrame();
        if (mTime === 0) {
            mTime = 60;
            time++;
            if (time === 10 && GAME.score >= 7) limitTime = 20;
            if (time === 20 && GAME.score >= 14) limitTime = 30;
            if (time === 30 && GAME.score >= 24) limitTime = 40;
        }
        mTime--;
        requestAnimationFrame(timer);
    }
    else {
        if ((time == limitTime) && (GAME.score < 35) && (GAME.play == true) && (GAME.lose == false) && (GAME.win == false)) {
            GAME.lose = true;
            GAME.play = false;
            drawFrame()
        }
        else if (time == 40 && GAME.score >= 35) {
            GAME.play = false;
            GAME.win = true;
            drawFrame()
        }
    }
}

timer();
initEventsListeners();
play();