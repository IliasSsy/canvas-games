

var GAME = {
    width: 600,
    height: 1000,

}

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");
var ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = "40px serif";


// var PANEL = {
//     color: "#1E3D59",
//     x: 0,
//     y: 800,
//     width: 600,
//     height: 200,

// }

var fon = new Image();
fon.src = 'images/fon.jpeg';

function drawfon() {
    canvasContext.drawImage(fon, 0, 0, 600, 900);
    canvasContext.fillStyle = "Black";
    canvasContext.fillRect(0, 840, 600, 160);

    canvasContext.fillStyle = "white";
    canvasContext.fillRect(0, 845, 195, 150);
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(200, 845, 200, 150);
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(405, 845, 195, 150);
    
}


var kote = new Image();
kote.src= 'images/kote.png';
function drawkote() {
    canvasContext.drawImage(kote, 0, 450, 600, 395);

}
var fish23 = new Image();
fish23.src= 'images/fish23.png';
function drawfish23() {
    canvasContext.drawImage(fish23, 10, 865, 175, 125);

}

var klub = new Image();
klub.src= 'images/klub.png';
function drawklub() {
    canvasContext.drawImage(klub, 415, 865, 175, 125);

}

var serdce = new Image();
serdce.src= 'images/serdce.png';
function drawserdce() {
    canvasContext.drawImage(serdce, 10, 10, 125, 125);

}

var lapa= new Image();
lapa.src= 'images/lapa.png';

var home = new Image();
home.src= 'images/home.png';
function drawhome() {
    canvasContext.drawImage(home, 450, 10, 125, 100);

}
var soap = new Image();
soap.src= 'images/soap.png';
function drawsoap() {
    canvasContext.drawImage(soap, 220, 865, 165, 125);
   
}



var MOUSE = {
    x: 0,
    y: 0,
    click: false,
    img: lapa,
    score: 0,
}
function drawcursor() {
    canvasContext.drawImage(MOUSE.img, MOUSE.x, MOUSE.y, 125, 125);
}

function Events() {
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener("mousedown", onCanvasMouseDown);
}

function onCanvasMouseMove(event) {
    MOUSE.x = event.clientX;
    MOUSE.y = event.clientY;
}

function onCanvasMouseDown(event) {
    if (event.which == 1 && MOUSE.x >= 130 && MOUSE.x <= 300 && MOUSE.y >= 750 && MOUSE.y <= 900) {
        MOUSE.img = soap;
    }

    if (event.which == 1 && MOUSE.x >= 0 && MOUSE.x <= 175 && MOUSE.y >= 750 && MOUSE.y <= 900) {
        MOUSE.img = fish23;
    }

    if (event.which == 1 && MOUSE.x >= 400 && MOUSE.x <= 600 && MOUSE.y >= 10 && MOUSE.y <= 100) {
        MOUSE.img = lapa;
    }
    if (event.which == 1 && MOUSE.x >= 450 && MOUSE.x <= 600 && MOUSE.y >= 750 && MOUSE.y <= 900) {
        MOUSE.img = klub;
    }

    if (event.which == 1 && MOUSE.x >= 75 && MOUSE.x <= 400 && MOUSE.y >= 550 && MOUSE.y <= 700) {
        MOUSE.score = MOUSE.score + 15;
        console.log( MOUSE.score + "%") ;
        if (MOUSE.score>=500){
            alert( "your cat went for a walk :) refresh  the page");
        }

    }
    // console.log("Odintsov_Andrey")
    // console.log(MOUSE.x + ' ' + MOUSE.y + ' ' + event.which)
}
// if (MOUSE.score>=500){
//     alert("котик ушел гулять :)")
// }
function changeCursor(){
    document.body.style.cursor = 'pointer';
  }

  function drawframe() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawfon();
    drawkote();
    drawfish23();
    drawklub();
    drawserdce();
    drawhome();
    drawsoap();
    drawcursor();
    draw(MOUSE);
    
  }
function play() {
    drawframe();
    requestAnimationFrame(play);
}
function draw(mouse) {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = "40px serif";
    ctx.strokeText( MOUSE.score + "%", 35, 75) ;
  }

Events();
play();

// canvasContext.fillStyle = "LightBlue";
// canvasContext.fillRect(0, 800, 600, 200);

// function drawPanel(panel) {
//     canvasContext.fillStyle = panel.color;
//     canvasContext.beginPath();
//     canvasContext.fillRect(panel.x, panel.y, panel.width, panel.height);
//     canvasContext.fill();
// }


// function drawFrame() {
//     canvasContext.clearRect(0, 0, GAME.width, GAME.height);
//     drawPanel(PANEL);
// }
