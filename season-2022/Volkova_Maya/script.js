var GAME = {
    width: 1000,
    height: 1000,
    bg: 'grey',
    speed: 10, 
}

var LINE = {
    width: 40, 
    height: 300,
    x: GAME.width/2, 
    y: 0,
    color: 'white',
}

var CAR = {
    width: 100,
    height: 150,
    x: 500,
    y: 0,
    iscrashed: false,

}

var Img1 = new Image();
Img1.src = "image/car.png";


var Img2 = new Image();
Img2.src = "image/car2.png";

var Img3 = new Image();
Img3.src = "image/car3.png";

var Img4 = new Image();
Img4.src = "image/car4.png";

var GUY = {
    width: 100,
    height: 150,
    x: 500,
    y: 0,
    type: 0,

}
var lives = 5

var Gads = [];
    

var canvas = document.getElementById('canvas');
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext('2d');

function drawbg() {
    canvasContext.fillStyle = GAME.bg;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}


function drawline(line) {
    canvasContext.fillStyle = line.color;
    canvasContext.fillRect(line.x - line.width/2, line.y, line.width, line.height); 
}

function drawcar(car) {
    canvasContext.drawImage(Img1, car.x, car.y, car.width, car.height); 
}

function drawguy(arr) {
    for (var guy of arr) {
        var Bee = 0;
        if (guy.type === 0){
            Bee = Img1; 
        }

        if (guy.type === 1){
            Bee = Img2; 
        }

        if (guy.type === 2){
            Bee = Img3; 
        }

        if (guy.type === 3){
            Bee = Img4; 
        }
        //console.log(gay.type, Bee);
        canvasContext.drawImage(Bee, guy.x, guy.y, guy.width, guy.height);
    }
}

function creategads(arr) {
     var copy = { };
     Object.assign(copy, GUY); //присваивает переменной copy параметры переменной GUY!
     copy.x = Math.random() * (GAME.width - copy.width);
     copy.y = 0 - copy.height;
     copy.type = Math.floor(Math.random() * 4);
     arr.push(copy); //добавляет в массив arr элемент copy
}

function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = "48px serif";
    ctx.fillStyle = "white";
    ctx.fillText('Lifes: ' + lives, 10, 50);
}


function updateline(){
    LINE.y += GAME.speed / 2;
    if (LINE.y >= GAME.height) {
        LINE.y = 0 - LINE.height;
    }
}


function updateguy(arr){
    
    for (var i = 0; i < arr.length; i++) { //вводим счетчик i и увеличиваем его до тех пор, пока он меньше длины массива.
        var guy = arr[i];
        guy.y += GAME.speed;

        var guyToplineCollection = CAR.y <=  guy.y + guy.height;
        var guyLeftlineCollection = CAR.x <= guy.x + guy.width;
        var guyBottomlineCollection = CAR.y + CAR.height >= guy.y;
        var guyRightlineCollection = CAR.x + CAR.width >= guy.x ;
        
            
        if (guyToplineCollection && guyLeftlineCollection && guyBottomlineCollection && guyRightlineCollection) {
            if (guyToplineCollection) {
                CAR.y = guy.y + guy.height;
            }
            
            else if  (guyLeftlineCollection) {
                CAR.x = guy.x + guy.width;
            }

            else if (guyBottomlineCollection) {
                CAR.y = guy.y + CAR.height;
            }

            else if (guyRightlineCollection) {
                CAR.x = guy.x - CAR.width;
            }
            if (CAR.iscrashed == false) {
                lives -= 1;
                CAR.iscrashed = true;
                setTimeout(()=>{CAR.iscrashed = false}, 1000);
            } 
            
            if (lives < 0){
                lives = 0;
            }
            if (lives === 0) {
                alert("Game over");
                //canvasContext.clearRect(0, 0, GAME.height, GAME.width)
                location.reload();
            }
            console.log("Game over"); 
        }
        if (guy.y >= GAME.height) {
            arr.splice(i, 1); // удаляет один элемент, начиная с i-ого. 
            creategads(arr);
        }
    }
    
}

function onCanvasMouseMove(event) {
    CAR.x = event.clientX - CAR.width / 2;
    CAR.y = event.clientY - CAR.height / 2;
    clampCarPosistion();
    
}

function clampCarPosistion() {
    if (CAR.x < 0) {
        CAR.x = 0;
    }
    if (CAR.x + CAR.width > GAME.width) {
        CAR.x = GAME.width - CAR.width;
    }
    if (CAR.y < 0){
        CAR.y = 0;
    }
    if (CAR.y + CAR.height > GAME.height) {
        CAR.y = GAME.height - CAR.height;
    }
}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawbg();
    drawline(LINE);
    drawcar(CAR);
    drawguy(Gads);
}

function initEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove);
}

function play(){
    drawFrame();
    updateline();
    updateguy(Gads);
    draw();
    requestAnimationFrame(play);
}

for (var i = 0; i < 4;i++) {
    setTimeout(()=>{creategads(Gads)}, 500*i);
}

initEventsListeners();
play();

