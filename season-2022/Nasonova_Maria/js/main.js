var canvasContext;
var GAME = {
  width: 600,
  height: 600,
  background: "black",
  score: 0,
  money: 0,
  cellSize: 0,
  tick: 0
}

var PLAYER = {
  x: 4,
  y: 12,
  rot: 3,
  state: 0,
  lastJump: 0
}

const variationsMap = [
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 2, 8, 0, 1, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [3, 0, 11, 2, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 3, 10, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [3, 0, 6, 2, 2, 2, 7, 0, 5, 0, 0, 0, 0, 0, 0],
  [3, 0, 1, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0],
  [3, 0, 1, 0, 0, 0, 3, 0, 0, 1, 0, 3, 4, 1, 0],
  [3, 0, 1, 0, 0, 0, 0, 11, 0, 5, 0, 4, 0, 5, 1],
  [3, 0, 5, 0, 0, 1, 3, 2, 0, 0, 0, 8, 0, 0, 1],
  [3, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 9, 1],
  [3, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 2, 1],
  [3, 0, 0, 0, 0, 1, 3, 0, 0, 0, 10, 0, 0, 0, 1],
  [3, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 2, 2, 2, 1]
]

const gameMap = [
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 2, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 3, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 4, 1, 0],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 0, 1, 2, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 3, 0, 0, 2, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0]
]

GAME.cellSize = GAME.width / gameMap.length;

const squares = ['black', 'blue', 'red', 'yellow', 'cyan']

const animations = {
  player_idle: [
    "player1",
    "player2",
    "player3",
    "player4",
    "player5",
    "player6",
    "player5",
    "player4",
    "player3",
    "player2",
  ],
  coin: [
    "coin1",
    "coin2",
    "coin3",
    "coin5",
    "coin6",
    "coin7",
  ],
  wall_normal: [
    "wall1",
    "wall2",
    "wall3",
    "wall4",
  ],
  portal: [
    "portal_1",
    "portal_2",
    "portal_3",
    "portal_4",
  ],
  wall_corner_inner2: [
    "wall_corner_inner2_1",
    "wall_corner_inner2_2",
    "wall_corner_inner2_3",
    "wall_corner_inner2_4",
  ],
  wall_corner_inner3: [
    "wall_corner_inner3_1",
    "wall_corner_inner3_2",
    "wall_corner_inner3_3",
    "wall_corner_inner3_4",
  ],
  star: [
    "star1",
    "star2",
    "star3",
  ],
  player_takeoff: [
    "player7",
    "player8",
    "player9",
    "player10",
    "player11",
    "player12",
    "player13",
    "player14",
    "player15",
    "player16",
  ]
}

let animators = {
  player: {
    tpf: 10,
  },
  walls: {
    tpf: 30,
  },
  coins: {
    tpf: 10,
  },
  stars: {
    tpf: 20,
  },
}

let aliases = {
  wall: [
    {
      rot: 0,
      animation: animations.wall_normal
    },
    {
      rot: Math.PI / 2,
      animation: animations.wall_normal
    },
    {
      rot: Math.PI,
      animation: animations.wall_normal
    },
    {
      rot: 3 * Math.PI / 2,
      animation: animations.wall_normal
    },
    {
      rot: 0,
      animation: animations.wall_corner_inner2
    },
    {
      rot: Math.PI / 2,
      animation: animations.wall_corner_inner2
    },
    {
      rot: Math.PI,
      animation: animations.wall_corner_inner2
    },
    {
      rot: 3 * Math.PI / 2,
      animation: animations.wall_corner_inner2
    },
    {
      rot: 0,
      animation: animations.wall_corner_inner3
    },
    {
      rot: Math.PI / 2,
      animation: animations.wall_corner_inner3
    },
    {
      rot: Math.PI,
      animation: animations.wall_corner_inner3
    },
    {
      rot: 3 * Math.PI / 2,
      animation: animations.wall_corner_inner3
    },
  ]
}

function getAnimFrame(animator, animation) {
  const offset = animator.offset ?? 0;
  return animation[Math.floor((GAME.tick - offset) / animator.tpf) % animation.length];
}

function resetAnimator(animator) {
  animator.offset = GAME.tick;
}

function drawFrame() {
  canvasContext.clearRect(0, 0, GAME.width, GAME.height);
  drawBackground();
  for (let i = 0; i < gameMap.length; i++) {
    const gameRow = gameMap[i];
    for (let j = 0; j < gameRow.length; j++) {
      const element = gameRow[j];
      canvasContext.fillStyle = squares[element];
      // canvasContext.fillRect(j * GAME.cellSize, i * GAME.cellSize, GAME.cellSize, GAME.cellSize)
      switch (element) {
        case 1:
          drawSprite(j * GAME.cellSize,
            i * GAME.cellSize,
            GAME.cellSize,
            GAME.cellSize,
            aliases.wall[variationsMap[i][j]].rot,
            getAnimFrame(animators.walls, aliases.wall[variationsMap[i][j]].animation))
          break;
        case 2:
          drawSprite(j * GAME.cellSize,
            i * GAME.cellSize,
            GAME.cellSize,
            GAME.cellSize,
            0,
            getAnimFrame(animators.coins, animations.coin))
          break;
        case 3:
          drawSprite(j * GAME.cellSize,
            i * GAME.cellSize,
            GAME.cellSize,
            GAME.cellSize,
            0,
            getAnimFrame(animators.stars, animations.star))
          break;
        case 4:
          drawSprite(j * GAME.cellSize,
            i * GAME.cellSize,
            GAME.cellSize,
            GAME.cellSize,
            0,
            getAnimFrame(animators.player, animations.portal))
          break;
      }
    }
  }

  drawSprite(PLAYER.x * GAME.cellSize,
    PLAYER.y * GAME.cellSize,
    GAME.cellSize,
    GAME.cellSize,
    PLAYER.rot * Math.PI / 2,
    getAnimFrame(animators.player, PLAYER.state === 1 ? animations.player_takeoff : animations.player_idle))

  canvasContext.fillStyle = "cyan";
  canvasContext.font = "48px Consolas";
  canvasContext.textAlign = "right";
  canvasContext.fillText(GAME.money+"₽", GAME.width - 10, 50);
  canvasContext.fillText(GAME.score+"★", GAME.width - 10, 100);
}

function compute() {
  if (GAME.tick - PLAYER.lastJump > 10) {
    PLAYER.lastJump = GAME.tick;
    if (PLAYER.state !== 0) {
      switch (PLAYER.rot) {
        case 0:
          // up
          if (gameMap[PLAYER.y - 1][PLAYER.x] !== 1)
            PLAYER.y--
          else {
            PLAYER.state = 0
            PLAYER.rot = 2
          }
          break;
        case 1:
          // right
          if (gameMap[PLAYER.y][PLAYER.x + 1] !== 1)
            PLAYER.x++
          else {
            PLAYER.state = 0
            PLAYER.rot = 3
          }
          break;
        case 2:
          // down
          if (gameMap[PLAYER.y + 1][PLAYER.x] !== 1)
            PLAYER.y++
          else {
            PLAYER.state = 0
            PLAYER.rot = 0
          }
          break;
        case 3:
          // left
          if (gameMap[PLAYER.y][PLAYER.x - 1] !== 1)
            PLAYER.x--
          else {
            PLAYER.state = 0
            PLAYER.rot = 1
          }
          break;
      }
    }
    switch (gameMap[PLAYER.y][PLAYER.x]) {
      case 2:
        gameMap[PLAYER.y][PLAYER.x] = 0;
        GAME.money++;
        break;
      case 3:
        gameMap[PLAYER.y][PLAYER.x] = 0;
        GAME.score++;
        break;
      case 4:
        alert("Oh my god, you've finished!")
        location.reload()
        break;
    }
  }
}

function drawBackground() {
  canvasContext.fillStyle = "#000000";
  canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

function play() {
  drawFrame();
  GAME.tick++;
  compute();
  requestAnimationFrame(play);
}

function init() {
  load(tilesSchemata).then(() => {
    console.log("Loaded spritesheet.")
  })
  initCanvas()
  initEventsListeners()
  play()
}

function initCanvas() {
  var canvas = document.getElementById("canvas");
  canvas.width = GAME.width;
  canvas.height = GAME.height;
  canvasContext = canvas.getContext("2d");
}
canvasContext.imageSmoothingEnabled = false

function initEventsListeners() {
  document.addEventListener("keydown", onDocumentKeyDown);
}

function onDocumentKeyDown(event) {
  if (PLAYER.state === 0)
    if (event.key === "ArrowUp") {
      PLAYER.rot = 0
      PLAYER.state = 1;
      resetAnimator(animators.player);
    } else if (event.key === "ArrowDown") {
      PLAYER.rot = 2;
      PLAYER.state = 1;
      resetAnimator(animators.player);
    } else if (event.key === "ArrowLeft") {
      PLAYER.rot = 3;
      PLAYER.state = 1;
      resetAnimator(animators.player);
    } else if (event.key === "ArrowRight") {
      PLAYER.rot = 1;
      PLAYER.state = 1;
      resetAnimator(animators.player);
    }
}
