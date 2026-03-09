var GAME = { // объявляем объект GAME
   width: 1200,
   height: 900,
    background: "#F5F0E1",
   win: false
}

// подготовка инструментов рисования
var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");
var BALL1 = { // Создание мячика
   color: "red",
   x: 50,
   y: 50,
   size: 100,
   xDirection: 8  ,
   yDirection: 5,
}

var BALL2 = { // Создание мячика
   color: "green",
   x: 120,
   y: 5,
   size: 20,
   xDirection: 3  ,
   yDirection: 5,
}





var BALL = { // Создание мячика
   color: "yellow",
   x: 0,
   y: 120,
   size: 20,
   xDirection: 15  ,
   yDirection: 10,
}

var BALL3 = { // Создание мячика
   color: "brown",
   x: 900,
   y: 120,
   size: 20,
   xDirection: 5  ,
   yDirection: 9,
}


var BALL4 = { // Создание мячика
   color: "wheat",
   x: 90,
   y: 120,
   size: 20,
   xDirection: 2  ,
   yDirection: 9,
}



var BALL5 = { // Создание мячика
   color: "coral",
   x: 120,
   y: 120,
   size: 20,
   xDirection: 10  ,
   yDirection: 9,
}

var BALL6 = { // Создание мячика
   color: "azyre",
   x: 160,
   y: 120,
   size: 30,
   xDirection: 1  ,
   yDirection: 2,
}


var BALL7 = { // Создание мячика
   color: "blue",
   x: 50,
   y: 50,
   size: 100,
   xDirection: 0  ,
   yDirection: 10,
}



var BALL8 = { // Создание мячика
   color: "blue",
   x: 50,
   y: 50,
   size: 100,
   xDirection: 10  ,
   yDirection: 0,
}



var BALL9 = { // Создание мячика
   color: "blue",
   x: 1150,
   y: 50,
   size: 100,
   xDirection: 0  ,
   yDirection: 10,
}

var BALL10 = { // Создание мячика
   color:"blue",
   x: 100,
   y: 850,
   size: 100,
   xDirection: 10  ,
   yDirection: 0,
}
//Зона победы
let destination = {
    x: 1100,
    y: 0,
    width: 100,
    height: 100
}

var RACKET = { // Создание ракетки
   color: "#1E3D59",
   x: 150,
   y: 780,
   width: 10,
   height: 10,
   speed: 20,
   score: 0,
}
// объявляем функцию отрисовки кадра
function drawFrame() {
   canvasContext.clearRect(0, 0, GAME.width, GAME.height);
   drawBackground();
   drawBall1(BALL1);
   drawBall2(BALL2);
   drawBall(BALL);
   drawBall3(BALL3);
   drawBall4(BALL4);
   drawBall5(BALL5);
   drawBall6(BALL6);
   drawBall7(BALL7);
   drawBall8(BALL8);
   drawBall9(BALL9);
   drawBall10(BALL10);
   drawRacket(RACKET);
    drawRacketScore(RACKET);
    
}
// объявляем функцию отрисовки ракетки
function drawRacketScore(racket) {
   canvasContext.fillStyle = racket.color;
   canvasContext.font = "32px Arial";
   canvasContext.fillText("Score: " + racket.score, 20, 50);
}

// объявляем функцию отрисовки ракетки
function drawRacket(racket) {
   canvasContext.fillStyle = racket.color;
    canvasContext.fillRect(racket.x, racket.y, racket.width, racket.height);
    canvasContext.fillStyle = 'yellow';
    canvasContext.fillRect(destination.x, destination.y, destination.height, destination.height);
    if ((RACKET.x > destination.x) && (racket.y < destination.height)) {
        alert('YOU WIN!!!')
        game.win = true;
    };
}

// объявляем функцию отрисовки фона
function drawBackground() {
   canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
    }

function drawBall(ball) {
   canvasContext.fillStyle = ball.color;
   canvasContext.beginPath();
   canvasContext.arc(ball.x, ball.y, ball.size / 2, 0, 2 * Math.PI);
   canvasContext.fill();
}

// объявляем функцию отрисовки мячика
function drawBall1(ball1) {
   canvasContext.fillStyle = ball1.color;
   canvasContext.beginPath();
   canvasContext.arc(ball1.x, ball1.y, ball1.size / 2, 0, 2 * Math.PI);
   canvasContext.fill();
}

function drawBall2(ball2) {
   canvasContext.fillStyle = ball2.color;
   canvasContext.beginPath();
   canvasContext.arc(ball2.x, ball2.y, ball2.size / 2, 0, 2 * Math.PI);
   canvasContext.fill();
}

function drawBall3(ball3) {
   canvasContext.fillStyle = ball3.color;
   canvasContext.beginPath();
   canvasContext.arc(ball3.x, ball3.y, ball3.size / 2, 0, 2 * Math.PI);
   canvasContext.fill();
}

function drawBall4(ball4) {
   canvasContext.fillStyle = ball4.color;
   canvasContext.beginPath();
   canvasContext.arc(ball4.x, ball4.y, ball4.size / 2, 0, 2 * Math.PI);
   canvasContext.fill();
}

function drawBall5(ball5) {
   canvasContext.fillStyle = ball5.color;
   canvasContext.beginPath();
   canvasContext.arc(ball5.x, ball5.y, ball5.size / 2, 0, 2 * Math.PI);
   canvasContext.fill();
}

function drawBall6(ball6) {
   canvasContext.fillStyle = ball6.color;
   canvasContext.beginPath();
   canvasContext.arc(ball6.x, ball6.y, ball6.size / 2, 0, 2 * Math.PI);
   canvasContext.fill();
}
 
function drawBall7(ball7) {
   canvasContext.fillStyle = ball7.color;
   canvasContext.beginPath();
   canvasContext.arc(ball7.x, ball7.y, ball7.size / 2, 0, 2 * Math.PI);
   canvasContext.fill();
}

function drawBall8(ball8) {
   canvasContext.fillStyle = ball8.color;
   canvasContext.beginPath();
   canvasContext.arc(ball8.x, ball8.y, ball8.size / 2, 0, 2 * Math.PI);
   canvasContext.fill();
}

function drawBall9(ball9) {
   canvasContext.fillStyle = ball9.color;
   canvasContext.beginPath();
   canvasContext.arc(ball9.x, ball9.y, ball9.size / 2, 0, 2 * Math.PI);
   canvasContext.fill();
}

function drawBall10(ball10) {
   canvasContext.fillStyle = ball10.color;
   canvasContext.beginPath();
   canvasContext.arc(ball10.x, ball10.y, ball10.size / 2, 0, 2 * Math.PI);
   canvasContext.fill();
}
// объявляем функцию перелистывания кадров
   
   function play() {
      if (RACKET.score  < 1)  {
      drawFrame();
      updateBall(BALL, RACKET);
      updateBall1(BALL1, RACKET);
      updateBall2(BALL2, RACKET);
      updateBall(BALL3, RACKET);
      updateBall(BALL4, RACKET);
      updateBall(BALL5, RACKET);
      updateBall(BALL6, RACKET);
      updateBall(BALL7, RACKET);
      updateBall(BALL8, RACKET);
      updateBall(BALL9, RACKET);
      updateBall(BALL10, RACKET);
      requestAnimationFrame(play);
      } else {
         alert('Game Over');
      }

   }
   
 //объявляем функцию удержания ракетки в поле
 function clampRacketPosition() {
    if (RACKET.x < 0) {
       RACKET.x = 0;
    }
    if (RACKET.x + RACKET.width > GAME.width) {
       RACKET.x = GAME.width - RACKET.width;
    }
 }
//объявляем функцию пересчета позиции мячика
function updateBall1(ball1, racket) {
   ball1.x += ball1.xDirection;
   ball1.y += ball1.yDirection;
   if ((ball1.y + ball1.size / 2 > GAME.height) || (ball1.y - ball1.size / 2 < 0)) {
      ball1.yDirection = -ball1.yDirection;
   }
   if ((ball1.x + ball1.size / 2 > GAME.width) || (ball1.x - ball1.size / 2 < 0)) {
      ball1.xDirection = -ball1.xDirection;
   }
   var racketTopLineCollision = ball1.y + ball1.size / 2 > racket.y;
   var racketLeftLineCollision = ball1.x + ball1.size / 2 > racket.x;
   var racketBottomLineCollision = ball1.y - ball1.size / 2 < racket.y + racket.height;
   var racketRightLineCollision = ball1.x - ball1.size / 2 < racket.x + racket.width;
   if (racketTopLineCollision && racketBottomLineCollision && racketLeftLineCollision && racketRightLineCollision) {
      ball1.yDirection = -ball1.yDirection;
      ball1.xDirection = -ball1.xDirection;
      racket.score = racket.score + 1;
   }
}

function updateBall(ball, racket) {
   ball.x += ball.xDirection;
   ball.y += ball.yDirection;
   if ((ball.y + ball.size / 2 > GAME.height) || (ball.y - ball.size / 2 < 0)) {
      ball.yDirection = -ball.yDirection;
   }
   if ((ball.x + ball.size / 2 > GAME.width) || (ball.x - ball.size / 2 < 0)) {
      ball.xDirection = -ball.xDirection;
   }
   var racketTopLineCollision = ball.y + ball.size / 2 > racket.y;
   var racketLeftLineCollision = ball.x + ball.size / 2 > racket.x;
   var racketBottomLineCollision = ball.y - ball.size / 2 < racket.y + racket.height;
   var racketRightLineCollision = ball.x - ball.size / 2 < racket.x + racket.width;
   if (racketTopLineCollision && racketBottomLineCollision && racketLeftLineCollision && racketRightLineCollision) {
      ball.yDirection = -ball.yDirection;
      ball.xDirection = -ball.xDirection;
      racket.score = racket.score + 1;
   }
}


function updateBall2(ball2, racket) {
   ball2.x += ball2.xDirection;
   ball2.y += ball2.yDirection;
   if ((ball2.y + ball2.size / 2 > GAME.height) || (ball2.y - ball2.size / 2 < 0)) {
      ball2.yDirection = -ball2.yDirection;
   }
   if ((ball2.x + ball2.size / 2 > GAME.width) || (ball2.x - ball2.size / 2 < 0)) {
      ball2.xDirection = -ball2.xDirection;
   }
   var racketTopLineCollision = ball2.y + ball2.size / 2 > racket.y;
   var racketLeftLineCollision = ball2.x + ball2.size / 2 > racket.x;
   var racketBottomLineCollision = ball2.y - ball2.size / 2 < racket.y + racket.height;
   var racketRightLineCollision = ball2.x - ball2.size / 2 < racket.x + racket.width;
   if (racketTopLineCollision && racketBottomLineCollision && racketLeftLineCollision && racketRightLineCollision) {
      ball2.yDirection = -ball2.yDirection;
      ball2.xDirection = -ball2.xDirection;
      racket.score = racket.score + 1;
   }
}


function updateBall(ball3, racket) {
   ball3.x += ball3.xDirection;
   ball3.y += ball3.yDirection;
   if ((ball3.y + ball3.size / 2 > GAME.height) || (ball3.y - ball3.size / 2 < 0)) {
      ball3.yDirection = -ball3.yDirection;
   }
   if ((ball3.x + ball3.size / 2 > GAME.width) || (ball3.x - ball3.size / 2 < 0)) {
      ball3.xDirection = -ball3.xDirection;
   }
   var racketTopLineCollision = ball3.y + ball3.size / 2 > racket.y;
   var racketLeftLineCollision = ball3.x + ball3.size / 2 > racket.x;
   var racketBottomLineCollision = ball3.y - ball3.size / 2 < racket.y + racket.height;
   var racketRightLineCollision = ball3.x - ball3.size / 2 < racket.x + racket.width;
   if (racketTopLineCollision && racketBottomLineCollision && racketLeftLineCollision && racketRightLineCollision) {
      ball3.yDirection = -ball3.yDirection;
      ball3.xDirection = -ball3.xDirection;
      racket.score = racket.score + 1;
   }
}

function updateBall(ball4, racket) {
   ball4.x += ball4.xDirection;
   ball4.y += ball4.yDirection;
   if ((ball4.y + ball4.size / 2 > GAME.height) || (ball4.y - ball4.size / 2 < 0)) {
      ball4.yDirection = -ball4.yDirection;
   }
   if ((ball4.x + ball4.size / 2 > GAME.width) || (ball4.x - ball4.size / 2 < 0)) {
      ball4.xDirection = -ball4.xDirection;
   }
   var racketTopLineCollision = ball4.y + ball4.size / 2 > racket.y;
   var racketLeftLineCollision = ball4.x + ball4.size / 2 > racket.x;
   var racketBottomLineCollision = ball4.y - ball4.size / 2 < racket.y + racket.height;
   var racketRightLineCollision = ball4.x - ball4.size / 2 < racket.x + racket.width;
   if (racketTopLineCollision && racketBottomLineCollision && racketLeftLineCollision && racketRightLineCollision) {
      ball4.yDirection = -ball4.yDirection;
      ball4.xDirection = -ball4.xDirection;
      racket.score = racket.score + 1;
   }
}

function updateBall(ball5, racket) {
   ball5.x += ball5.xDirection;
   ball5.y += ball5.yDirection;
   if ((ball5.y + ball5.size / 2 > GAME.height) || (ball5.y - ball5.size / 2 < 0)) {
      ball5.yDirection = -ball5.yDirection;
   }
   if ((ball5.x + ball5.size / 2 > GAME.width) || (ball5.x - ball5.size / 2 < 0)) {
      ball5.xDirection = -ball5.xDirection;
   }
   var racketTopLineCollision = ball5.y + ball5.size / 2 > racket.y;
   var racketLeftLineCollision = ball5.x + ball5.size / 2 > racket.x;
   var racketBottomLineCollision = ball5.y - ball5.size / 2 < racket.y + racket.height;
   var racketRightLineCollision = ball5.x - ball5.size / 2 < racket.x + racket.width;
   if (racketTopLineCollision && racketBottomLineCollision && racketLeftLineCollision && racketRightLineCollision) {
      ball5.yDirection = -ball5.yDirection;
      ball5.xDirection = -ball5.xDirection;
      racket.score = racket.score + 1;
   }
}

function updateBall6(ball6, racket) {
   ball6.x += ball6.xDirection;
   ball6.y += ball6.yDirection;
   if ((ball6.y + ball6.size / 2 > GAME.height) || (ball6.y - ball6.size / 2 < 0)) {
      ball6.yDirection = -ball6.yDirection;
   }
   if ((ball6.x + ball6.size / 2 > GAME.width) || (ball6.x - ball6.size / 2 < 0)) {
      ball6.xDirection = -ball6.xDirection;
   }
   var racketTopLineCollision = ball6.y + ball6.size / 2 > racket.y;
   var racketLeftLineCollision = ball6.x + ball6.size / 2 > racket.x;
   var racketBottomLineCollision = ball6.y - ball6.size / 2 < racket.y + racket.height;
   var racketRightLineCollision = ball6.x - ball6.size / 2 < racket.x + racket.width;
   if (racketTopLineCollision && racketBottomLineCollision && racketLeftLineCollision && racketRightLineCollision) {
      ball6.yDirection = -ball6.yDirection;
      ball6.xDirection = -ball6.xDirection;
      racket.score = racket.score + 1;
   }
}

function updateBall7(ball7, racket) {
   ball7.x += ball7.xDirection;
   ball7.y += ball7.yDirection;
   if ((ball7.y + ball7.size / 2 > GAME.height) || (ball7.y - ball7.size / 2 < 0)) {
      ball7.yDirection = -ball7.yDirection;
   }
   if ((ball7.x + ball7.size / 2 > GAME.width) || (ball7.x - ball7.size / 2 < 0)) {
      ball7.xDirection = -ball7.xDirection;
   }
   var racketTopLineCollision = ball7.y + ball7.size / 2 > racket.y;
   var racketLeftLineCollision = ball7.x + ball7.size / 2 > racket.x;
   var racketBottomLineCollision = ball7.y - ball7.size / 2 < racket.y + racket.height;
   var racketRightLineCollision = ball7.x - ball7.size / 2 < racket.x + racket.width;
   if (racketTopLineCollision && racketBottomLineCollision && racketLeftLineCollision && racketRightLineCollision) {
      ball7.yDirection = -ball7.yDirection;
      ball7.xDirection = -ball7.xDirection;
      racket.score = racket.score + 1;
   }
}

function updateBall8(ball8, racket) {
   ball8.x += ball8.xDirection;
   ball8.y += ball8.yDirection;
   if ((ball8.y + ball8.size / 2 > GAME.height) || (ball8.y - ball8.size / 2 < 0)) {
      ball8.yDirection = -ball8.yDirection;
   }
   if ((ball8.x + ball8.size / 2 > GAME.width) || (ball8.x - ball8.size / 2 < 0)) {
      ball8.xDirection = -ball8.xDirection;
   }
   var racketTopLineCollision = ball8.y + ball8.size / 2 > racket.y;
   var racketLeftLineCollision = ball8.x + ball8.size / 2 > racket.x;
   var racketBottomLineCollision = ball8.y - ball8.size / 2 < racket.y + racket.height;
   var racketRightLineCollision = ball8.x - ball8.size / 2 < racket.x + racket.width;
   if (racketTopLineCollision && racketBottomLineCollision && racketLeftLineCollision && racketRightLineCollision) {
      ball8.yDirection = -ball8.yDirection;
      ball8.xDirection = -ball8.xDirection;
      racket.score = racket.score + 1;
   }
}

function updateBall9(ball9, racket) {
   ball9.x += ball9.xDirection;
   ball9.y += ball9.yDirection;
   if ((ball9.y + ball9.size / 2 > GAME.height) || (ball9.y - ball9.size / 2 < 0)) {
      ball9.yDirection = -ball9.yDirection;
   }
   if ((ball9.x + ball9.size / 2 > GAME.width) || (ball9.x - ball9.size / 2 < 0)) {
      ball9.xDirection = -ball9.xDirection;
   }
   var racketTopLineCollision = ball9.y + ball9.size / 2 > racket.y;
   var racketLeftLineCollision = ball9.x + ball9.size / 2 > racket.x;
   var racketBottomLineCollision = ball9.y - ball9.size / 2 < racket.y + racket.height;
   var racketRightLineCollision = ball9.x - ball9.size / 2 < racket.x + racket.width;
   if (racketTopLineCollision && racketBottomLineCollision && racketLeftLineCollision && racketRightLineCollision) {
      ball9.yDirection = -ball9.yDirection;
      ball9.xDirection = -ball9.xDirection;
      racket.score = racket.score + 1;
   }
}

function updateBall10(ball10, racket) {
   ball10.x += ball10.xDirection;
   ball10.y += ball10.yDirection;
   if ((ball10.y + ball10.size / 2 > GAME.height) || (ball10.y - ball10.size / 2 < 0)) {
      ball10.yDirection = -ball10.yDirection;
   }
   if ((ball10.x + ball10.size / 2 > GAME.width) || (ball10.x - ball10.size / 2 < 0)) {
      ball10.xDirection = -ball10.xDirection;
   }
   var racketTopLineCollision = ball10.y + ball10.size / 2 > racket.y;
   var racketLeftLineCollision = ball10.x + ball10.size / 2 > racket.x;
   var racketBottomLineCollision = ball10.y - ball10.size / 2 < racket.y + racket.height;
   var racketRightLineCollision = ball10.x - ball10.size / 2 < racket.x + racket.width;
   if (racketTopLineCollision && racketBottomLineCollision && racketLeftLineCollision && racketRightLineCollision) {
      ball10.yDirection = -ball10.yDirection;
      ball10.xDirection = -ball10.xDirection;
      racket.score = racket.score + 1;
   }
}

// объявляем функцию прослушивания событий
function initEventsListeners() {
   window.addEventListener("keydown", onCanvasKeyDown);
   window.addEventListener("keydown", onCanvasKeyDown);
}
var img = new Image();   // Создаёт новое изображение
img.addEventListener("load", function() {
  // здесь выполняет drawImage функцию
}, false);






// объявляем обработчик перемещения мыши
function onCanvasKeyDown(event) {
   if (event.key === "ArrowLeft") {
       RACKET.x = RACKET.x - RACKET.speed;
   }
   if (event.key === "ArrowRight") {
       RACKET.x = RACKET.x + RACKET.speed;
   }
   if (event.key === "ArrowUp") {
      RACKET.y = RACKET.y - RACKET.speed;
  }
  if (event.key === "ArrowDown") {
      RACKET.y = RACKET.y + RACKET.speed;
  }
   clampRacketPosition();
   requestAnimationFrame(onCanvasKeyDown);
}
initEventsListeners();

play();
// вызываем функцию перелистывания кадров
