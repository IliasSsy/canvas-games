var GAME = {
    width: 800,
    height: 600,
    background: '#FDD9B5',
    count: 0,
}

//подготовка инструментов к рисованию
var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

var HEART = {
    x0: 100,
    y0: 80,
    x: 100,
    y: 80,
    size: 30,
    xDirection: 3,
    yDirection: 2,
}

var HEARTS = new Array()

var RACKET = {
    x: 0,
    y: 450,
    height: 50,
    width: 50,
    speed: 6,
}




function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function createHearts(hearts, x0, y0) {
    for (var i = 0; i < 4; i++) {
        hearts[i] = {
            x0: x0,
            y0: y0,
            x: x0,
            y: y0,
            size: 30,
            xDirection: 1,
            yDirection: 1,
        }

        console.log(hearts[i])
        
        newX0 = x0 * getRandomInt(6);
        newY0 = y0 * getRandomInt(6);

        
        while (!( newX0 > 0 && newX0 < GAME.width) || !(newY0 > 0 && newY0 < GAME.height)) {
            newX0 = x0 * getRandomInt(6);
            newY0 = y0 * getRandomInt(6);
        }

        x0 = newX0;
        y0 = newY0;

    }
}

//функция отрисовки кадра
function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBack();
    drawHeart(HEARTS);
    drawRacket(RACKET);
}


//рисуем фон
function drawBack() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);

}


// рисуем ракетку
function drawRacket(RACKET) {
    var img = new Image();   // Создаём новый объект Image
    img.src = './basket.png'; // Устанавливаем путь к источнику
    canvasContext.drawImage(img, RACKET.x, RACKET.y); //рисуем картинку в канвас
}



// рисуем сердечки
function drawHeart(hearts) {
    for (var i = 0; i < hearts.length; i++){
        var img = new Image();   // Создаём новый объект Image
        img.src = './heart.png'; // Устанавливаем путь к источнику
        canvasContext.drawImage(img, hearts[i].x, hearts[i].y, 50, 26); //рисуем картинку в канвас
        
    }
}

//объявляем функцию пересчета позиции
function updateHearts(hearts, racket) {
    for (var i = 0; i < hearts.length; i++) {
        updateheart(hearts[i], racket);
        
    }

}

function updateheart(heart, racket) {
    var RacTop = heart.y + heart.size / 2 >= racket.y;
    var RacLeft = heart.x + heart.size / 2 >= racket.x;
    var RacRight = heart.y - heart.size / 2 <= racket.y + racket.height;
    var RacBottom = heart.x - heart.size / 2 <= racket.x + racket.width;

    if ((heart.y - heart.size / 2 < 0) || (heart.y + heart.size / 2 > GAME.height)) {
        heart.yDirection = -heart.yDirection;
    }

    if ((heart.x + heart.size / 2 > GAME.width) || (heart.x - heart.size / 2 <= 0)) {
        heart.xDirection = -heart.xDirection;
    }
   
        if (RacTop && RacLeft && RacRight && RacBottom) {
        GAME.count = GAME.count + 1;
        heart.x = heart.x0;
        heart.y = heart.y0;
    }
    
    
    if (GAME.count >= 50){
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.font = "50px serif";
        ctx.fillStyle = '#9F8170';
        ctx.fillText("YOU WIN", 250, 250);
        GAME.count = 50; 
    }
    for (var i = 0; i < 4; i++){
         if (HEARTS[i] != HEARTS[i+1]){
            draw();
            heart.x += heart.xDirection;
            heart.y += heart.yDirection;
        }
    }
   
    
}

//объявляем функйию прослушивания событий
function initEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove);
    //window.addEventListener("keydown", onCanvasKeyDown);
}

//объявляем обрвботчик перемещения мыши
function onCanvasKeyDown(event) {
    //RACKET.x = event.clientX;
    if (event.key === "ArrowLeft") {
        RACKET.x = RACKET.x - RACKET.speed;
    }
    if (event.key === "ArrowRight") {
        RACKET.x = RACKET.x + RACKET.speed;
    }

    clampRacketPosition();
}

function onCanvasMouseMove(event) {
    RACKET.x = event.clientX;
    clampRacketPosition();
}


function clampRacketPosition() {
    if (RACKET.x < 0) {
        RACKET.x = 0;
    }
    if (RACKET.x + RACKET.width > GAME.width) {
        RACKET.x = GAME.width - RACKET.width;
    }
}
//движение ракетки
function updateRacket(racket) {
    if ((racket.x < 0) || (racket.x + racket.width > GAME.width)) {
        racket.speed = -racket.speed;
    }
}

//объявляем функцию перелистывания кадров
function play() {
    drawFrame();
    updateHearts(HEARTS, RACKET);
    updateRacket(RACKET);
    requestAnimationFrame(play);
}

function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = "24px serif";
    ctx.fillStyle = '#FFA474';
    ctx.fillText("Score: " + GAME.count, 10, 50);
}

createHearts(HEARTS, 100, 100);
initEventsListeners();
play();


