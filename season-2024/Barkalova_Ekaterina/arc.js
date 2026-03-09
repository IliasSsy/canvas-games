//Обьект определяет параметры игрового пространства
var GAME = {
  width: 500,
  height: 500,
  background: "#eeace4",
};
//обьект беговая дорожка
var RUN = {
  width: 500,
  height: 50,
  background: "#100b02",
  x: 0,
  y: GAME.height - 50,
};
var PLAYER1 = {
  img: new Image(),
  imgIsLoad: false,
  width: 75,
  height: 120,
  x: 0,
  y: GAME.height - RUN.height - 100,
  color: "red",
  score: 0,
  pose: 1,
};

var PLAYER2 = {
  img: new Image(),
  imgIsLoad: false,
  width: 75,
  height: 120,
  x: 350,
  y: GAME.height - RUN.height - 100,
  color: "green",
  xDirection: -1,
  pose: 2,
};

var PLAYER3 = {
  img: new Image(),
  imgIsLoad: false,
  width: 75,
  height: 120,
  x: 25,
  y: 50,
  color: "red",
  pose: 1,
};
var PLAYER4 = {
  img: new Image(),
  imgIsLoad: false,
  width: 75,
  height: 120,
  x: 125,
  y: 50,
  color: "green",
  pose: 2,
};
var PLAYER5 = {
  img: new Image(),
  imgIsLoad: false,
  width: 75,
  height: 120,
  x: 225,
  y: 50,
  xDirection: -1,
  color: "#fc4e2d",
  pose: 3,
};

var PLAYER6 = {
  img: new Image(),
  imgIsLoad: false,
  width: 120,
  height: 140,
  x: 325,
  y: 50,
  color: "#e1fc2d",
  pose: 4,
};
var PLAYER7 = {
  img: new Image(),
  imgIsLoad: false,
  width: 90,
  height: 130,
  x: 425,
  y: 50,
  color: "#db2dfc",
  pose: 5,
};
var AUDIO ={
  src: new Audio('./audio/Lady_Gaga_-_Poker_Face_47836180.mp3'),
  audioIsOn:true,
}
var keys = {};
//Получение элемента canvas из документа и установка размеров канваса
var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");
//Создание изображения для фона победы 
var victoryBackground = new Image();
victoryBackground.src = "./img/pngwing.com11.png"; // Укажите путь к вашему изображению фона
victoryBackground.onload = function() {
  
};
//Функция для рисования фона игры
function drawBackground() {
  canvasContext.fillStyle = GAME.background;
  canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}
//Функция для рисования беговой дорожки на канвасе
function drawRun() {
  canvasContext.fillStyle = RUN.background;
  canvasContext.fillRect(RUN.x, RUN.y, RUN.width, GAME.height);
}
// Функция для инициализации изображений для игроков
function initImages() {
  PLAYER1.img.src = "./img/pngwing.com6.png";
  PLAYER1.img.onload = () => {
    PLAYER1.imgIsLoad = true;
  };
  PLAYER2.img.src = "./img/pngwing.com7.png";
  PLAYER2.img.onload = () => {
    PLAYER2.imgIsLoad = true;
  };
  PLAYER3.img.src = "./img/pngwing.com6.png";
  PLAYER3.img.onload = () => {
    PLAYER3.imgIsLoad = true;
  };
  PLAYER4.img.src = "./img/pngwing.com7.png";
  PLAYER4.img.onload = () => {
    PLAYER4.imgIsLoad = true;
  };
  PLAYER5.img.src = "./img/pngwing.com8.png";
  PLAYER5.img.onload = () => {
    PLAYER5.imgIsLoad = true;
  };
  PLAYER6.img.src = "./img/pngwing.com9.png";
  PLAYER6.img.onload = () => {
    PLAYER6.imgIsLoad = true;
  };
  PLAYER7.img.src = "./img/pngwing.com10.png";
  PLAYER7.img.onload = () => {
    PLAYER7.imgIsLoad = true;
  };
}
// Функция обновления позиции PLAYER2 на канвасе
function updatePlayer2() {
  PLAYER2.x += PLAYER2.xDirection; // Обновляем позицию PLAYER2
  // Проверяем, не выходит ли PLAYER2 за границы канваса
  if (PLAYER2.x <= 0) {
    PLAYER2.x = 0; // Останавливаем на левой границе
    PLAYER2.xDirection = 0; // Останавливаем движение
  }

  scoreCollision();// Проверка на столкновение со счётом.
}
// Обработчик события клика по канвасу для изменения образа PLAYER1, если PLAYER2 движется
canvas.addEventListener("click", function (event) {
AUDIO.src.play();
  if (PLAYER2.xDirection == -1) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    if (
      x >= PLAYER3.x &&
      x <= PLAYER3.x + PLAYER3.width &&
      y >= PLAYER3.y &&
      y <= PLAYER3.y + PLAYER3.height
    ) {
      PLAYER1.img = PLAYER3.img;
      PLAYER1.pose = PLAYER3.pose;
    } else if (
      x >= PLAYER4.x &&
      x <= PLAYER4.x + PLAYER4.width &&
      y >= PLAYER4.y &&
      y <= PLAYER4.y + PLAYER4.height
    ) {
      PLAYER1.img = PLAYER4.img;
      PLAYER1.pose = PLAYER4.pose;
    } else if (
      x >= PLAYER5.x &&
      x <= PLAYER5.x + PLAYER5.width &&
      y >= PLAYER5.y &&
      y <= PLAYER5.y + PLAYER5.height
    ) {
      PLAYER1.img = PLAYER5.img;
      PLAYER1.pose = PLAYER5.pose;
    } else if (
      x >= PLAYER6.x &&
      x <= PLAYER6.x + PLAYER6.width &&
      y >= PLAYER6.y &&
      y <= PLAYER6.y + PLAYER6.height
    ) {
      PLAYER1.img = PLAYER6.img;
      PLAYER1.pose = PLAYER6.pose;
    } else if (
      x >= PLAYER7.x &&
      x <= PLAYER7.x + PLAYER7.width &&
      y >= PLAYER7.y &&
      y <= PLAYER7.y + PLAYER7.height
    ) {
      PLAYER1.img = PLAYER7.img;
      PLAYER1.pose = PLAYER7.pose;
    }
  }
});
// Функция для обработки столкновения PLAYER1 и PLAYER2 и обновления счета
function scoreCollision() {
  if (PLAYER1.x + PLAYER1.width > PLAYER2.x) {
    if (PLAYER1.pose === PLAYER2.pose) {
      PLAYER1.score += 1;
      console.log(PLAYER1.score);
      PLAYER2.x = 450;

      var num = Math.floor(Math.random() * 5);
      if (num === 1) {
        PLAYER2.pose = PLAYER3.pose;
        PLAYER2.img = PLAYER3.img;
      }
      if (num === 2) {
        PLAYER2.pose = PLAYER4.pose;
        PLAYER2.img = PLAYER4.img;
      }
      if (num === 3) {
        PLAYER2.pose = PLAYER5.pose;
        PLAYER2.img = PLAYER5.img;
      }
      if (num === 4) {
        PLAYER2.pose = PLAYER6.pose;
        PLAYER2.img = PLAYER6.img;
      }
      if (num === 5) {
        PLAYER2.pose = PLAYER7.pose;
        PLAYER2.img = PLAYER7.img;
      }
    }

    if (PLAYER1.pose !== PLAYER2.pose) {
      PLAYER1.score -= 1;
      console.log(PLAYER1.score);
    }
  }
}
// Функция для рисования счета на канвасе
function darwScore() {
  canvasContext.font = "35px serif";
  canvasContext.fillText("Score:" + PLAYER1.score, 10, 50);
}
// Функция для рисования экрана победы
function drawVictory() {
  drawBackground();
  canvasContext.drawImage(victoryBackground,0,0,GAME.width,GAME.height)
  canvasContext.textAlign = "center";
  canvasContext.fillStyle = 'red';
  canvasContext.font = " 100px serif";
  canvasContext.fillText("Victory!", GAME.height / 2, GAME.width / 2);
}

// Функция для рисования экрана поражения
function drawLose() {
  drawBackground();
  canvasContext.drawImage(victoryBackground,0,0,GAME.width,GAME.height)
  canvasContext.textAlign = "center";
  canvasContext.fillStyle = 'red';
  canvasContext.font = " 100px serif";
  canvasContext.fillText("Loser!", GAME.height/2, GAME.width/2);
}
// Функции для отрисовки каждого игрока на канвасе
function drawPlayer1() {
  if (PLAYER1.imgIsLoad) {
    canvasContext.drawImage(
      PLAYER1.img,
      PLAYER1.x,
      PLAYER1.y,
      PLAYER1.width,
      PLAYER1.height
    );
  }

  //   canvasContext.fillStyle = PLAYER1.color;
  //   canvasContext.fillRect(PLAYER1.x, PLAYER1.y, PLAYER1.width, PLAYER1.height);
}
function drawPlayer2() {
  if (PLAYER2.imgIsLoad) {
    canvasContext.drawImage(
      PLAYER2.img,
      PLAYER2.x,
      PLAYER2.y,
      PLAYER2.width,
      PLAYER2.height
    );
  }
  //   canvasContext.fillStyle = PLAYER2.color;
  //   canvasContext.fillRect(PLAYER2.x, PLAYER2.y, PLAYER2.width, PLAYER2.height);
}
function drawPlayer3() {
  if (PLAYER3.imgIsLoad) {
    canvasContext.drawImage(
      PLAYER3.img,
      PLAYER3.x,
      PLAYER3.y,
      PLAYER3.width,
      PLAYER3.height
    );
  }
  //   canvasContext.fillStyle = PLAYER3.color;
  //   canvasContext.fillRect(PLAYER3.x, PLAYER3.y, PLAYER3.width, PLAYER3.height);
}
function drawPlayer4() {
  if (PLAYER4.imgIsLoad) {
    canvasContext.drawImage(
      PLAYER4.img,
      PLAYER4.x,
      PLAYER4.y,
      PLAYER4.width,
      PLAYER4.height
    );
  }
  //   canvasContext.fillStyle = PLAYER4.color;
  //   canvasContext.fillRect(PLAYER4.x, PLAYER4.y, PLAYER4.width, PLAYER4.height);
}
function drawPlayer5() {
  if (PLAYER5.imgIsLoad) {
    canvasContext.drawImage(
      PLAYER5.img,
      PLAYER5.x,
      PLAYER5.y,
      PLAYER5.width,
      PLAYER5.height
    );
  } //   canvasContext.fillStyle = PLAYER5.color;
  //   canvasContext.fillRect(PLAYER5.x, PLAYER5.y, PLAYER5.width, PLAYER5.height);
}
function drawPlayer6() {
  if (PLAYER6.imgIsLoad) {
    canvasContext.drawImage(
      PLAYER6.img,
      PLAYER6.x,
      PLAYER6.y,
      PLAYER6.width,
      PLAYER6.height
    );
  }
  //   canvasContext.fillStyle = PLAYER6.color;
  //   canvasContext.fillRect(PLAYER6.x, PLAYER6.y, PLAYER6.width, PLAYER6.height);
}
function drawPlayer7() {
  if (PLAYER7.imgIsLoad) {
    canvasContext.drawImage(
      PLAYER7.img,
      PLAYER7.x,
      PLAYER7.y,
      PLAYER7.width,
      PLAYER7.height
    );
  }
  //   canvasContext.fillStyle = PLAYER7.color;
  //   canvasContext.fillRect(PLAYER7.x, PLAYER7.y, PLAYER7.width, PLAYER7.height);
}
// Функция для отрисовки каждого кадра игры
function drawFrame() {
  canvasContext.clearRect(0, 0, GAME.width, GAME.height);
  drawBackground();
  drawRun();
  drawPlayer1();
  drawPlayer2();
  drawPlayer3();
  drawPlayer4();
  drawPlayer5();
  drawPlayer6();
  drawPlayer7();
  updatePlayer2();
  darwScore();
}

// Основная функция игры, которая отслеживает состояние и обновляет кадры
function play() {
  if (PLAYER1.score < 6 && PLAYER1.score >= 0) drawFrame();
  updatePlayer2();
  requestAnimationFrame(play);
  if (PLAYER1.score === 6) {
    drawVictory();
  }
  if (PLAYER1.score < 0){
    drawLose();
  }
}
// Инициализация изображений и запуск игры.
initImages();
initImages();
play();
