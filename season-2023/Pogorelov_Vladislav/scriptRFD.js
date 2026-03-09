//игровая зона
var GAME = {
    width: 900,
    height: 1200,
    background: "#888888",
}
//инструменты для рисования
var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

//объявляем функцию отрисовки фона
function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

//финальный экран
function endWindow() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

//фоновая музыка
var AUDIOFON = {
    src: new Audio("./audio/fon.mp3"),
    audioIsOn: false,
}

//звук монетки
var AUDIOCOIN = {
    src: new Audio("./audio/coin.mp3"),
    audioIsOn: false,
}
 
//создаем ГГ
var HERO = {
    color: "#FFFFFF",
    x: 300,
    y: 70,
    width: 20,
    height: 20,
    xDirection: 10,
    yDirection: 10,
    startX: 300,
    startY: 70,
    money: 0
}

//создаем врага
var EVIL = {
    color: "black",
    x: 0,
    y: -2500,
    width: 700,
    height: 2500,
    yDirection: 0,
    xDirection: 0,
}

//враг начинает идти и скоряться только когда собираются монетки
function takeMONEY() {
    if (HERO.money === 0.5) {
        EVIL.yDirection += 0.1;
        AUDIOFON.audioIsOn = !AUDIOFON.audioIsOn;
        AUDIOCOIN.audioIsOn = !AUDIOCOIN.audioIsOn;
    }
    if (HERO.money === 1.5) {
        EVIL.yDirection += 0.1;
        AUDIOCOIN.audioIsOn = !AUDIOCOIN.audioIsOn
    }
    if (HERO.money === 2.5) {
        EVIL.yDirection += 0.1;
        AUDIOCOIN.audioIsOn = !AUDIOCOIN.audioIsOn;
    }
    if (HERO.money === 3.5) {
        EVIL.yDirection += 0.1;
        AUDIOCOIN.audioIsOn = !AUDIOCOIN.audioIsOn;
    }
    if (HERO.money === 4.5) {
        EVIL.yDirection += 0.2;
        AUDIOCOIN.audioIsOn = !AUDIOCOIN.audioIsOn;
    }
    if (HERO.money === 5.5) {
        EVIL.yDirection += 0.1;
        AUDIOCOIN.audioIsOn = !AUDIOCOIN.audioIsOn;
    }
    if (HERO.money === 6.5) {
        EVIL.yDirection += 0.2;
        AUDIOCOIN.audioIsOn = !AUDIOCOIN.audioIsOn;
    }
    if (HERO.money === 7.5) {
        EVIL.yDirection += 0.2;
        AUDIOCOIN.audioIsOn = !AUDIOCOIN.audioIsOn;
    }
    if (HERO.money === 8.5) {
        EVIL.yDirection += 0.1;
        AUDIOCOIN.audioIsOn = !AUDIOCOIN.audioIsOn;
    }
    if (HERO.money === 9.5) {
        EVIL.yDirection += 0.1;
        AUDIOCOIN.audioIsOn = !AUDIOCOIN.audioIsOn;
    }
}

//создаем монетки
var COIN = [
    {
        color: "#FFD700", //1
        width: 20,
        height: 27,
        x: 490,
        y: 70,
        yDirection: 5,
    },
    {
        color: "#FFD700", //2
        width: 20,
        height: 27,
        x: 400,
        y: 70,
        yDirection: 5,
    },
    {
        color: "#FFD700", //3
        width: 20,
        height: 27,
        x: 390,
        y: 370,
        yDirection: 5,
    },
    {
        color: "#FFD700", //4
        width: 20,
        height: 27,
        x: 100,
        y: 250,
        yDirection: 5,
    },
    {
        color: "#FFD700", //5
        width: 20,
        height: 27,
        x: 200,
        y: 500,
        yDirection: 5,
    },
    {
        color: "#FFD700", //6
        width: 20,
        height: 27,
        x: 550,
        y: 630,
        yDirection: 5,
    },
    {
        color: "#FFD700", //7
        width: 20,
        height: 27,
        x: 180,
        y: 720,
        yDirection: 5,
    },
    {
        color: "#FFD700", //8
        width: 20,
        height: 27,
        x: 580,
        y: 900,
        yDirection: 5,
    },
    {
        color: "#FFD700", //9
        width: 20,
        height: 27,
        x: 480,
        y: 1060,
        yDirection: 5,
    },
    {
        color: "#FFD700", //10
        width: 20,
        height: 27,
        x: 140,
        y: 1120,
        yDirection: 5,
    },
]

//рисуем ГГ
function drawHERO() {
    canvasContext.fillStyle = HERO.color;
    canvasContext.fillRect(HERO.x, HERO.y, HERO.width, HERO.height);
}

//рисуем врага
function drawEVIL() {
    canvasContext.fillStyle = EVIL.color;
    canvasContext.fillRect(EVIL.x, EVIL.y, EVIL.width, EVIL.height);
    takeMONEY();
}

//рисуем монетки
function drawCOIN() {
    for (var i = 0; i < COIN.length; i++) {
        canvasContext.fillStyle = COIN[i].color;
        canvasContext.beginPath();
        canvasContext.fillRect(COIN[i].x, COIN[i].y, COIN[i].width, COIN[i].height);
        canvasContext.fill();
    }
}

//функция движения врага
function updateEVIL() {
    EVIL.y += EVIL.yDirection
    EVIL.x += EVIL.xDirection
}

//функция написания текста кол-ва монет
function writeMoney() {
    canvasContext.fillStyle = '#FFFFFF'
    canvasContext.font = "30px CENTURY SCHOOLBOOK"
    canvasContext.fillText("Монетки: " + HERO.money, 710, 900)
}

//написание подсказок и условия
function writeTrips() {
    canvasContext.fillStyle = '#FFFFFF'
    canvasContext.font = "18px CENTURY SCHOOLBOOK"
    canvasContext.fillText("Собери все монетки", 55, 150)
    canvasContext.fillText("и выживи", 55, 180)
    canvasContext.fillText("ctrl + R - заново", 55, 30)
    canvasContext.fillText("W,A,S,D - управление", 55, 60)
    canvasContext.fillText("space - спуск страницы", 51, 90)
}

//создаем стены
var WALLS = [
    {
        color: "#111111", // [0]
        x: 0,
        y: 0,
        width: 50,
        height: 1500,
    },
    {
        color: "#111111", // [1]
        x: 650,
        y: 0,
        width: 50,
        height: 1500,
    },
    {
        color: "#111111", //вер1 [2]
        x: 250,
        y: 0,
        width: 20,
        height: 200,
        pos: 'vert',
    },
    {
        color: "#111111", //гор1 [3]
        x: 20,
        y: 200,
        width: 250,
        height: 20,
        pos: 'gor',
    },
    {
        color: "#111111", //вер2 [4]
        x: 350,
        y: 0,
        width: 20,
        height: 150,
        pos: 'vert',
    },
    {
        color: "#111111", //гор2 [5]
        x: 350,
        y: 150,
        width: 100,
        height: 20,
        pos: 'gor',
    },
    {
        color: "#111111", //вер3 [6]
        x: 550,
        y: 0,
        width: 20,
        height: 170,
        pos: 'vert',
    },
    {
        color: "#111111", //вер4 [7]
        x: 350,
        y: 300,
        width: 20,
        height: 150,
        pos: 'vert',
    },
    {
        color: "#111111", //гор3 [8]
        x: 20,
        y: 300,
        width: 250,
        height: 20,
        pos: 'gor',
    },
    {
        color: "#111111", //гор4 [9]
        x: 440,
        y: 300,
        width: 130,
        height: 20,
        pos: 'gor',
    },
    {
        color: "#111111", //вер5 [10]
        x: 550,
        y: 300,
        width: 20,
        height: 70,
        pos: 'vert',
    },
    {
        color: "#111111", //гор5 [11]
        x: 440,
        y: 430,
        width: 220,
        height: 20,
        pos: 'gor',
    },
    {
        color: "#111111", //вер6 [12]
        x: 150,
        y: 390,
        width: 20,
        height: 150,
        pos: 'vert',
    },
    {
        color: "#111111", //вер7 [13]
        x: 250,
        y: 390,
        width: 20,
        height: 150,
        pos: 'vert',
    },
    {
        color: "#111111", //гор6 [14]
        x: 0,
        y: 600,
        width: 440,
        height: 20,
        pos: 'gor',
    },
    {
        color: "#111111", //гор7 [15]
        x: 440,
        y: 700,
        width: 240,
        height: 70,
        pos: 'gor',
    },
    {
        color: "#111111", //вер8 [16]
        x: 120,
        y: 700,
        width: 40,
        height: 70,
        pos: 'vert',
    },
    {
        color: "#111111", //вер9 [17]
        x: 220,
        y: 700,
        width: 40,
        height: 70,
        pos: 'vert',
    },
    {
        color: "#111111", //вер10 [18]
        x: 320,
        y: 700,
        width: 40,
        height: 70,
        pos: 'vert',
    },
    {
        color: "#111111", //гор8 [19]
        x: 0,
        y: 850,
        width: 220,
        height: 20,
        pos: 'gor',
    },
    {
        color: "#111111", //гор9 [20]
        x: 320,
        y: 850,
        width: 200,
        height: 50,
        pos: 'gor',
    },
    {
        color: "#111111", //гор10 [21]
        x: 0,
        y: 970,
        width: 230,
        height: 35,
        pos: 'gor',
    },
    {
        color: "#111111", //вер11 [22]
        x: 460,
        y: 900,
        width: 60,
        height: 70,
        pos: 'vert',
    },
    {
        color: "#111111", //вер12 [23]
        x: 120,
        y: 1000,
        width: 50,
        height: 60,
        pos: 'vert',
    },
    {
        color: "#111111", //вер13 [24]
        x: 320,
        y: 1000,
        width: 70,
        height: 100,
        pos: 'vert',
    },
]

//функция отрисовки кадров
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawCOIN();
    drawHERO();
    drawWALLS();
    writeTrips();
    drawEVIL();
    writeMoney();
    if (AUDIOFON.audioIsOn) {
        AUDIOFON.src.play()
  }

}

//рисуем стены
function drawWALLS() {
    for (var i = 0; i < WALLS.length; i++) {
        canvasContext.fillStyle = WALLS[i].color;
        canvasContext.beginPath();
        canvasContext.fillRect(WALLS[i].x, WALLS[i].y, WALLS[i].width, WALLS[i].height);
        canvasContext.fill();
    }
}

//управление ГГ через клавиатуру
function onCanvasKeyDown(event) {
    if (event.key === 'w') {
        HERO.y -= HERO.yDirection;
    }
    if (event.key === 's') {
        HERO.y += HERO.yDirection;
    }
    if (event.key === 'a') {
        HERO.x -= HERO.xDirection;
    }
    if (event.key === 'd') {
        HERO.x += HERO.xDirection;
    }
    if (event.key === 'ц') {
        HERO.y -= HERO.yDirection;
    }
    if (event.key === 'ы') {
        HERO.y += HERO.yDirection;
    }
    if (event.key === 'ф') {
        HERO.x -= HERO.xDirection;
    }
    if (event.key === 'в') {
        HERO.x += HERO.xDirection;
    }
    clampHEROPosition()
}

//ограничение ГГ в рамках стен и карты 
function clampHEROPosition() {
    if (HERO.y < 0) {
        HERO.y = 0;
    }
    if (HERO.y > 1180) {
        HERO.y = 1180;
    }
    if (HERO.x < WALLS[0].x + WALLS[0].width) {
        window.location.reload();
    }
    if (HERO.x > WALLS[1].x - HERO.width) {
        window.location.reload();
    }
    for (var i = 0; i < WALLS.length; i += 1) {
        if (HERO.x + HERO.width > WALLS[i].x && HERO.x < WALLS[i].x + WALLS[i].width && HERO.y > WALLS[i].y - HERO.height && HERO.y < WALLS[i].y + WALLS[i].height) {
            window.location.reload();
        }
    }
}

//проверка наличия игрока в монетке
function chekCoinPosition() {
    for (var i = 0; i < COIN.length; i += 1) {
        if (HERO.x + HERO.width > COIN[i].x && HERO.x < COIN[i].x + COIN[i].width && HERO.y > COIN[i].y - HERO.height && HERO.y < COIN[i].y + COIN[i].height) {
            HERO.money += 0.5;
            setTimeout(() => { HERO.money += 0.5; }, 20);
            COIN[i].x = -10;
            COIN[i].y = -10;
        }
    }
}
function writeLose() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    endWindow();
    canvasContext.fillStyle = HERO.color;
    canvasContext.font = "40px CENTURY SCHOOLBOOK"
    canvasContext.textAlign = 'center';
    canvasContext.fillText("ВАС ПОГЛОТИЛА ТЬМА", GAME.width / 2, GAME.height / 2);
}

//функция написания текста победы
function writeWin() {
    endWindow();
    canvasContext.fillStyle = HERO.color;
    canvasContext.font = "40px CENTURY SCHOOLBOOK"
    canvasContext.textAlign = 'center';
    canvasContext.fillText("ВЫ СМОГЛИ УБЕЖАТЬ ОТ ТЬМЫ", GAME.width / 2, GAME.height / 2);

}



//объявление функции перелистывания кадров
function play() {
    drawFrame();
    if (HERO.y < EVIL.y + EVIL.height) {
        writeLose();
        setTimeout(() => {window.location.reload();}, 3000);
        
    }
    chekCoinPosition();
    if (HERO.money < 10) {
        updateEVIL();
        requestAnimationFrame(play);
    }
    if (HERO.money >= 10) {
        writeWin();
    }
}

window.addEventListener("keydown", onCanvasKeyDown)
play()