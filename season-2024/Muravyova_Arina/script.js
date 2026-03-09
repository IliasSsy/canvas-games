var canvas = document.getElementById("canvas");
const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

var GAME = {
  width: canvasWidth,
  height: canvasHeight,
  background: "#f7e2d5",
};

var canvasContext = canvas.getContext("2d");
canvasContext.fillStyle = GAME.background;
canvasContext.fillRect(0, 0, GAME.width, GAME.height);
canvas.height = canvasHeight;
canvas.width = canvasWidth;
let getVolumeCoefficient = null;
// игрок

var PLAYER = {
  x: 0.05 * canvasWidth,
  y: 0.3 * canvasHeight,
  speed: 0,
  boost: 0.5,
  score: 0,
  height: 40,
  width: 60,
  onJump: false,
  upBlock1: true,
  upBlock2: false,
  lastY: 0,
  lose: false,
  jumpHeight: 0,
  image: new Image(),
  score: 0,
};

PLAYER.image.src = "./static/images/season2024_preview.png";

const HEIGHT = 500;
const WIDTH = 300;
const SPACE = 100;
const MAX_BLOCKS_FRAME = 10;
const SOME_THRESHOLD = 5;
const MAX_JUMP_HEIGHT = 100;

var blocks = [];
var speed = 2;

const backgroundImage = new Image();
backgroundImage.src = './static/images/4480456_1.png'; // Set the path to your image
const blockImage = new Image();
blockImage.src = './static/images/blocks.jpg';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  if (max > canvasHeight - 100) {
    max = canvasHeight - 100;
  }
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBlock(difficult, x) {
  heightBlock = getRandomInt(100, difficult * HEIGHT);
  spacePlace = getRandomInt(PLAYER.width, SPACE * difficult);
  if (!(blocks.length === 0)) {
    widthBlock = getRandomInt(50, WIDTH / difficult);
    coin = Boolean(Math.round(Math.random()));
  } else {
    widthBlock = 0.5 * canvasWidth;
    coin = false;
  }
  return {
    x: x,
    y: canvasHeight - heightBlock,
    width: widthBlock,
    space: spacePlace,
    coin: coin,
    height: heightBlock,
    coordsCoin: {x: x + (widthBlock / 2) - 5, 
      y: canvasHeight - heightBlock - 20,
      width: 10, 
      height: 10,
      xCentr: widthBlock / 2,
      yCentr: canvasHeight - heightBlock - 15,
    },
    checkCoin: false,
  };
}

function generateMas(difficult) {
  var x = 0;
  for (var i = 0; i < MAX_BLOCKS_FRAME; i++) {
    var block = generateBlock(difficult, x);
    x = block.x + block.space + block.width;
    blocks.push(block);
  }
}

function updateMas(difficult) {
  for (var i = 0; i < MAX_BLOCKS_FRAME; i++) {
    if (blocks[i].x + blocks[i].width < 0) {
      blocks.shift();
      blocks.push(
        generateBlock(
          difficult,
          blocks[MAX_BLOCKS_FRAME - 2].x +
          blocks[MAX_BLOCKS_FRAME - 2].width +
          blocks[MAX_BLOCKS_FRAME - 2].space
        ));
        PLAYER.score += 1;
      
    }
    
    blocks[i].x -= speed;
    blocks[i].coordsCoin.x -= speed;
  }
}

function drawBlock() {
  for (var i = 0; i < blocks.length; i++) {
    block = blocks[i];
    canvasContext.drawImage(
      blockImage,
      block.x,
      block.y,
      block.width,
      block.height);
      if (block.coin && !block.checkCoin){
        // console.log('coin');
        canvasContext.fillStyle = 'yellow';
        canvasContext.fillRect(block.coordsCoin.x, block.coordsCoin.y, block.coordsCoin.width, block.coordsCoin.height);
      }
  }
}

function drawScore(){
  canvasContext.font = "48px serif";
  canvasContext.fillText("Score: " + PLAYER.score, 10, 50);
}

function updatePlayer() {
  num = Math.max(0, (PLAYER.score % 10) - 1);
  blockNow = blocks[0];
  blockNext = blocks[1];
  heightNow = blockNow.y;
  xNow = blockNow.x;
  widthNow = blockNow.width;
  numNext = blockNext.y;
  heightNext = blockNext.y;
  xNext = blockNext.x;
  widthNext = blockNext.width;
  thicknessBlock = 1;
  coordsCoinNow = blockNow.coordsCoin;
  coordsCoinNext = blockNext.coordsCoin;


  PLAYER.y -= PLAYER.speed;
  PLAYER.speed -= PLAYER.boost;

  if (PLAYER.x + PLAYER.width > xNow && PLAYER.x < xNow + widthNow) {
    PLAYER.upBlock1 = true;
  } else {
    PLAYER.upBlock1 = false;
  }

  if (PLAYER.x + PLAYER.width > xNext && PLAYER.x < xNext + widthNext) {
    PLAYER.upBlock2 = true;
  } else {
    PLAYER.upBlock2 = false;
  }

  if (PLAYER.upBlock1) {
    if (PLAYER.y >= heightNow) {
      PLAYER.onJump = false;
      PLAYER.y = heightNow;
      PLAYER.speed = 0;
    }

    if (PLAYER.y === canvas.height) {
      PLAYER.lose = true;
      PLAYER.upBlock2 = false;
      PLAYER.upBlock1 = false;
    }
  }

  if (PLAYER.upBlock2) {
    if (PLAYER.y >= heightNext) {
      PLAYER.onJump = false;
      PLAYER.y = heightNext;
      PLAYER.speed = 0;
    }
  }

  if (!PLAYER.upBlock1 && !PLAYER.upBlock2) {
    PLAYER.lastY = PLAYER.y;
  }

  if (xNow < 0) {
    if (PLAYER.y> heightNext + thicknessBlock  && PLAYER.upBlock2) {
      PLAYER.lose = true;
      console.log(PLAYER.score)
    } else {
      console.log(PLAYER.x + PLAYER.width >= coordsCoinNext.xCentr, PLAYER.x <= coordsCoinNext.xCentr, 
        PLAYER.y + PLAYER.height >= coordsCoinNext.yCentr, PLAYER.y <= coordsCoinNext.yCentr, !blocks[1].checkCoin)
      if (PLAYER.x + PLAYER.width >= coordsCoinNext.xCentr && PLAYER.x <= coordsCoinNext.xCentr &&
        PLAYER.y + PLAYER.height >= coordsCoinNext.yCentr && PLAYER.y <= coordsCoinNext.yCentr && !blocks[1].checkCoin){
          PLAYER.score += 1;
          blocks[1].checkCoin = true;
          console.log(PLAYER.score)
    };
  }
  } else {
    if (PLAYER.lastY > heightNow + thicknessBlock  && PLAYER.upBlock1) {
      PLAYER.lose = true;
    } else {
      if (PLAYER.x + PLAYER.width >= coordsCoinNow.xCentr && PLAYER.x <= coordsCoinNow.xCentr &&
        PLAYER.y + PLAYER.height >= coordsCoinNow.yCentr && PLAYER.y <= coordsCoinNow.yCentr && !blocks[0].checkCoin){
          PLAYER.score += 1;
          blocks[0].checkCoin = true;
          console.log(PLAYER.score)
    };
  };
  }
}

function drawPlayer() {
  canvasContext.fillStyle = "white";
  if (PLAYER.y > 0) {canvasContext.drawImage(
    PLAYER.image,
    PLAYER.x,
    PLAYER.y,
    PLAYER.width,
    -PLAYER.height
  );
} else {canvasContext.drawImage(
  PLAYER.image,
  PLAYER.x,
  0,
  PLAYER.width,
  PLAYER.height
);
}
}

function drawBackground() {
  canvasContext.fillStyle = GAME.background;
  canvasContext.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function drawFrame() {
  canvasContext.clearRect(0, 0, GAME.width, GAME.height);
  drawBackground();
  drawScore();
  drawBlock();
  drawPlayer();
}

function play() {
  if (!PLAYER.lose) {
    if (getVolumeCoefficient) {
      const volumeCoefficient = getVolumeCoefficient();
      // console.log(volumeCoefficient);
      const jumpHeight = volumeCoefficient * MAX_JUMP_HEIGHT;
  
      if (jumpHeight > SOME_THRESHOLD && !PLAYER.onJump) {
        PLAYER.speed += jumpHeight;
        PLAYER.onJump = true;
        PLAYER.y -= PLAYER.speed;
      }
    }
    drawFrame();
    updateMas(Math.max(1, PLAYER.score / 10));
    updatePlayer();
    requestAnimationFrame(play);
  } else {
    speed = 0;
    showGameOver();
  }
}

function showGameOver() {
  const overlay = document.getElementById("gameOverOverlay");
  overlay.style.display = "flex"; 
}

function getMicrophoneInput() {
  return navigator.mediaDevices.getUserMedia({ audio: true });
}

function setupAudioProcessing(stream) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  const dataArray = new Uint8Array(analyser.fftSize);
  source.connect(analyser);

  function getVolumeCoefficient() {
    analyser.getByteTimeDomainData(dataArray);
    let sum = 0;

    for (let i = 0; i < dataArray.length; i++) {
      let value = dataArray[i] - 128;
      sum += value * value;
    }

    const rms = Math.sqrt(sum / dataArray.length);
    return rms / 128;
  }

  return getVolumeCoefficient;
}

function initGame() {
  getMicrophoneInput()
    .then((stream) => {
      getVolumeCoefficient = setupAudioProcessing(stream);
    })
    .catch((error) => {
      console.error("Ошибка доступа к микрофону:", error);
    });

  generateMas(1);
  blocks[0].y = canvasHeight * 0.3;
  blocks[0].height = canvasHeight * 0.7;

  play();
}

async function startGameAfterMicrophoneAccess() {
  try {
    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log("Microphone access granted.");
    initializeGame(stream);
  } catch (err) {
    console.error("Microphone access denied: ", err);
    if (err.name === "NotAllowedError") {
      console.log("User  denied microphone access.");
    } else if (err.name === "NotFoundError") {
      console.log("No microphone found.");
    }
  }
}

function initializeGame(stream) {
  // Setup audio processing and start the game
  getVolumeCoefficient = setupAudioProcessing(stream);
  generateMas(1);
  blocks[0].y = canvasHeight * 0.3;
  blocks[0].height = canvasHeight * 0.7;
  play(); // Start the game loop
}

document.getElementById("startButton").addEventListener("click", function () {
  document.getElementById("startScreen").style.display = "none";
  canvas.style.display = "block";
  startGameAfterMicrophoneAccess(); // Request microphone access and start the game
});

document.getElementById("newGameButton").addEventListener("click", function () {
  // console.log("aaa");
  window.location.reload();
  // resetGame(); // Reset the game state
  // showStartScreen(); // Show the start screen
});

document.getElementById("newGameButton").addEventListener("click", startGame);

function showStartScreen() {
  currentState = "startScreen"; // Set the current state to start screen
  document.getElementById("startScreen").style.display = "flex"; // Show the start screen
}

function startGame() {
  // console.log("aaa");
  currentState = "playing"; // Set the current state to playing
  document.getElementById("startScreen").style.display = "none"; // Hide the start screen
  document.getElementById("gameOverOverlay").style.display = "none"; // Ensure the game over overlay is hidden
  resetGame(); // Call reset game to initialize the player state
  startGameAfterMicrophoneAccess; // Start the game loop
}

// Function to show the game over screen
function showGameOver() {
  currentState = "gameOver"; // Set the current state to game over
  const overlay = document.getElementById("gameOverOverlay");
  overlay.style.display = "flex"; // Show the overlay
}

function resetGame() {
  PLAYER.lose = false;
}
