

var GAME = {
    width: 1000,
    height: 600,
    background: "#F5F0E1",
    score: 0,
}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;

var canvasContext = canvas.getContext("2d");

// фон
function drawBackground() {
    const image3 = new Image();
    image3.src = 'https://oir.mobi/uploads/posts/2021-01/1611928586_12-p-zadnii-fon-dlya-igri-12.jpg';
    image3.onload = () => {
        canvasContext.drawImage(image3, 0, 0, GAME.width, GAME.height);
    }
}

const image1 = new Image();
image1.src = 'http://pngimg.com/uploads/birds/birds_PNG92.png';

// птица
    const image2 = new Image();
    image2.src = 'http://pngimg.com/uploads/birds/birds_PNG92.png';


// птица

    const image3 = new Image();
    image3.src = 'http://pngimg.com/uploads/birds/birds_PNG92.png';


// птица

    const image4 = new Image();
    image4.src = 'http://pngimg.com/uploads/birds/birds_PNG92.png';



    const image5 = new Image();
    image5.src = 'http://pngimg.com/uploads/cloud/small/cloud_PNG27.png';


 var PLANE = {
    x: 75,
    y: 250,
    width: 125,
    height: 105,
    speed: 35,
  }

var OBJ = [{
    x: 1000,
    y: 250,
    width: 50,
    height: 10000,
    speed: 9,
    color: "orange"
},
{
    x: 2000,
    y: 1,
    width: 100,
    height: 350,
    speed: 9,
    color: "red"
},
{
    x: 2500,
    y: 1,
    width: 100,
    height: 450,
    speed: 9,
    color: "violet"
},
{
    x: 3000,
    y: 500,
    width: 100,
    height: 450,
    speed: 9,
    color: "yellow"
},
{
    x: 4500,
    y: 200,
    width: 100,
    height: 450,
    speed: 9,
    color: "blue"
},
{
    x: 5000,
    y: 370,
    width: 100,
    height: 310,
    speed: 9,
    color: "skyblue"
},
{
    x: 6000,
    y: 0,
    width: 60,
    height: 470,
    speed: 9,
    color: "violet"
},
{
    x: 7000,
    y: 200,
    width: 150,
    height: 400,
    speed: 9,
    color: "brown"
},
{
    x: 8000,
    y: 0,
    width: 50,
    height: 475,
    speed: 9,
    color: "darkgreen"
},
{
    x: 1300,
    y: 250,
    width: 80,
    height: 80,
    speed: 7,
    img: image1,
  },
  {
    x: 3800,
    y: 250,
    width: 80,
    height: 80,
    speed: 7,
    img: image2,
  },
  {
    x: 4170,
    y: 75,
    width: 80,
    height: 80,
    speed: 7,
    img: image3,
  },
  {
    x: 4250,
    y: 450,
    width: 80,
    height: 80,
    speed: 7,
    img: image4,
  },
  {
    x: 2999,
    y: 125,
    width: 300,
    height: 200,
    speed: 7,
    img: image5,
  }]
//отрисовка домов
function drawOBJ(Obj) {
    for (var obj of Obj) {
        if (obj.speed == 9) {
    canvasContext.fillStyle = obj.color;
    canvasContext.beginPath();
    canvasContext.fillRect(obj.x, obj.y, obj.width, obj.height);
    canvasContext.fill();
        }
        else {
            canvasContext.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        }
    }
}

//функция пересчёта движения объектов
function updateOBJ(Obj) {
    for (var obj of Obj) {
    obj.x -= obj.speed;
    }
}



function drawPlain() {
    const image = new Image();
    image.src = 'https://ouch-cdn2.icons8.com/IHTFa7wpuO7p7cCHG-6uqmF8yMqhwMvlO9fETV9Mwuc/rs:fit:256:263/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzkw/LzQ3NGE1YjE1LTIw/YzYtNDA2Yi05MWM1/LWVlOTIzZWQxYTE2/Ny5zdmc.png';
    image.onload = () => {
        canvasContext.drawImage(image, PLANE.x, PLANE.y, PLANE.width, PLANE.height);
    }
}

 //функция прослушивания событий
 function initEventsListeners() {
    window.addEventListener("keydown", onCanvasKeyDown);
}

//обработчик премещения мыши
function onCanvasKeyDown(event) {
    if (event.key === "ArrowUp") {
        PLANE.y = PLANE.y - PLANE.speed;
    }
    if (event.key === "ArrowDown") {
        PLANE.y = PLANE.y + PLANE.speed;
    }
}

function updatePlain() {
    for (var obj of OBJ) {
        if (PLANE.x + PLANE.width >= obj.x && PLANE.x <= obj.x + obj.width && PLANE.y + PLANE.height >= obj.y && PLANE.y <= obj.y + obj.height) {
            var count = (3800 - OBJ[10].x) / OBJ[10].speed;
            for (var o of OBJ) {
                o.x += o.speed * count;
            }
            GAME.score = 0;
            break;
        }
        console.log(obj.x)
    }
}

// функция удержания самолёта в поле
function lampPlanePosition() {
    if (PLANE.y < 0) {
        PLANE.y = 0;
    }
    if (PLANE.y + PLANE.height > GAME.height) {
        PLANE.y = GAME.height - PLANE.height;
    }
}
function playingGame() {
        GAME.score += 1;
}

// текст
function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = "40px serif";
    ctx.fillStyle = "green";
    ctx.fillText("score:" + GAME.score, 10, 40);
  }

function youWin() {
    if (GAME.score === 918){
    alert("YOU WIN");
    location.reload();
    }
}

function drawFrame() {
    drawBackground();
    drawPlain();
    drawOBJ(OBJ);
}

function play() {
    drawFrame();
    updatePlain();
    draw();
    playingGame();
    youWin();
    updateOBJ(OBJ);
    lampPlanePosition();
    requestAnimationFrame(play);
    console.log("Score:" , GAME.score);
}

initEventsListeners()
play();
