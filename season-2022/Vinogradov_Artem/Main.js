var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");

var score = 0;
var coin_k = 0;



var endGame = false;
var SameGame = false;
var dead = false;
var magz = false;
var back = false;
drawMagz = false;


var pers = new Image();
var coin = new Image();
var bg = new Image();
var bgnight = new Image();
var fg = new Image();
var trubaU = new Image();
var trubaB = new Image();
var shop = new Image();
var skin_ch = pers;
var persSkin = skin_ch;



var skin2 = new Image();
var skin3 = new Image();
var skin4 = new Image();
var skin5 = new Image();
var skin6 = new Image();
var skin7 = new Image();


var u = 290;
var b = 180;


var Pers = {
    x: 100,
    y: 300,
    grav: 0,
}

var skin = [1, 2, 3, 4, 5, 6, 7];
skin[0]={
    skin_ch:  pers
}
skin[1]={
    skin_ch:  skin2
}
skin[2]={
    skin_ch:  skin3
}
skin[3]={
    skin_ch:  skin4
}
skin[4]={
    skin_ch:  skin5
}
skin[5]={
    skin_ch:  skin6
}
skin[6]={
    skin_ch:  skin7
}




var coinm = [];
coinm[0] = {
    x: 450,
    y: 0,
}

var blocks = [];
blocks[0] = {
    x: 450,
    y: 0,
}

document.addEventListener("keydown", move);

document.addEventListener("keydown", start);

document.addEventListener("keydown", dead_f);

function start() {
    if (endGame != true && SameGame != true) {
        Pers.grav = 1;
        Pers.y -= 80;
        SameGame = true;
    }
}

function dead_f() {
    if (endGame != false && SameGame != false && dead != false) {
        location.reload();
    }
}


function move(){
    if (endGame != true && SameGame != false) {
        Pers.y -= 80;
    }
    else {
        Pers.y -= 0;
    }
}




pers.onload = function drawImage(){

    
    if (magz == true) {
        canvasContext.drawImage(shop, 0, 0);
    }

    if (score >= 10 && score <= 20){
        canvasContext.drawImage(bgnight, 0, 0, 600, 800);
        canvasContext.drawImage(fg, 0, canvas.height - fg.height + 50);
        canvasContext.drawImage(pers, Pers.x, Pers.y);
    }

    if (score < 10 || score >20){
        canvasContext.drawImage(bg, 0, 0, 600, 800);
        canvasContext.drawImage(fg, 0, canvas.height - fg.height + 50);
        canvasContext.drawImage(pers, Pers.x, Pers.y);

    }

    for (var i = 0; i< blocks.length; i++) {
        if (endGame != true && SameGame != false){
        canvasContext.drawImage(trubaU, blocks[i].x, blocks[i].y)
        canvasContext.drawImage(trubaB, blocks[i].x, blocks[i].y + trubaU.height + b)
        blocks[i].x--;
        }

        if (endGame === true && score >=10 && score <= 20){
            canvasContext.drawImage(bgnight, 0, 0, 600, 800);
            canvasContext.drawImage(fg, 0, canvas.height - fg.height + 50);
            canvasContext.drawImage(pers, Pers.x, Pers.y);
            canvasContext.drawImage(trubaU, blocks[i].x, blocks[i].y)
            canvasContext.drawImage(trubaB, blocks[i].x, blocks[i].y + trubaU.height + b)
        }

        if (endGame === true && score < 10 || score > 20){
            canvasContext.drawImage(bg, 0, 0, 600, 800);
            canvasContext.drawImage(fg, 0, canvas.height - fg.height + 50);
            canvasContext.drawImage(pers, Pers.x, Pers.y);
            canvasContext.drawImage(trubaU, blocks[i].x, blocks[i].y)
            canvasContext.drawImage(trubaB, blocks[i].x, blocks[i].y + trubaU.height + b)

        }

        if (blocks[i].x == -1){
            blocks.push({
                x: 600,
                y: Math.random()*trubaU.height - trubaU.height
            });
        }

        if ((Pers.x + pers.width  >= blocks[i].x && Pers.x <= blocks[i].x + trubaU.width && (Pers.y <= blocks[i].y + trubaU.height - 9  || Pers.y + pers.height >= blocks[i].y + trubaU.height + b + 9)) || Pers.y + pers.height >= 650) {
            console.log("Конец Игры")
            if(Pers.y + pers.height <= 670){
                Pers.grav = 1;
            }
            else{
                Pers.grav = 0;
                dead = true;
                canvasContext.font = "30px Arial";
                canvasContext.fillStyle = "#f53900";
                canvasContext.fillText("Нажмите любую кнопку для перезапуска" , 20, 450);
            }
            endGame = true;

            canvasContext.font = "35px Arial";
            canvasContext.fillStyle = "#f53900";
            if (score === 0){
                canvasContext.fillText("Конец игры, вы  набрали " + score + " очков", 35, 250);
            }
            if (score === 1){
                canvasContext.fillText("Конец игры, вы  набрали " + score + " очко", 35, 250);
            }
            if (score === 2){
                canvasContext.fillText("Конец игры, вы  набрали " + score + " очкa", 35, 250);
            } 
            if (score === 3){
                canvasContext.fillText("Конец игры, вы  набрали " + score + " очкa", 35, 250);
            } 
            if (score === 4){
                canvasContext.fillText("Конец игры, вы  набрали " + score + " очкa", 35, 250);
            } 
            if(score > 4){
                canvasContext.fillText("Конец игры, вы  набрали " + score + " очков", 35, 250);
            }
        }
        if (blocks[i].x == 1){
            score += 1;
            console.log(score)
        }
    }

    for (var i = 0; i < coinm.length; i++) {
        if (endGame === false && SameGame === true) {

            canvasContext.drawImage(coin, coinm[i].x, coinm[i].y + trubaU.height + 50)
            coinm[i].x--;
            console.log("drow coin")
        }


        if (coinm[i].x === -100){
            coinm.push({
                x: 490,
                y: Math.floor(Math.random() * (500 - 300) + 300) - 500,
            })
            console.log("cREATE COIN")
        }


        if (pers.x >= coinm[i].x - 40 && pers.x + pers.width <= coinm[i].x + 40 && pers.y + pers.height >= coinm[i].y + 20 && pers.y  >= coinm[i].y - 20 ){
            coin_k++;
            console.log(coin_k)
            coinm[i].x = -50
        }

    }



    
    canvasContext.font = "30px Arial";
    canvasContext.fillStyle = "#fc6203";
    canvasContext.fillText("Очки: " + score, 8, 40);

    canvasContext.font = "30px Arial";
    canvasContext.fillStyle = "#fc6203";
    canvasContext.fillText("Монеты: " + coin_k, 8, 80);

    if (SameGame != true) {
    canvasContext.font = "30px Arial";
    canvasContext.fillStyle = "#2fad1c";
    canvasContext.fillText("Нажмите любую кнопку для старта" , 55, 450);
    }
    else{

    }

    canvasContext.drawImage(fg, 0, canvas.height - fg.height + 50);

    canvasContext.drawImage(pers, Pers.x, Pers.y);




    Pers.y += Pers.grav;
    if (magz == false && back == false) {
        
        requestAnimationFrame(drawImage);

    }
    if (magz == true && (SameGame == false || endGame == true)) {
        canvasContext.drawImage(shop, 0, 0);

        canvasContext.font = "30px Arial";
        canvasContext.fillStyle = "#fc6203";

        canvasContext.drawImage(skin2, 50, 150);
        canvasContext.fillText("cartoon" , 35, 250);

        canvasContext.drawImage(skin3, 250, 150);
        canvasContext.fillText("RED" , 265, 255);

        canvasContext.drawImage(skin4, 450, 150);
        canvasContext.fillText("red bird" , 435, 255);
        canvasContext.fillText("(USSR?)" , 425, 295);

        canvasContext.drawImage(skin5, 50, 350);
        canvasContext.fillText("ERROR" , 35, 450);

        canvasContext.drawImage(skin6, 250, 350);
        canvasContext.fillText("MLG" , 250, 450);

        canvasContext.drawImage(skin7, 450, 350);
        canvasContext.fillText("???" , 465, 450);
    }

}

function shop_f(){
    
    if (SameGame == false || endGame == true){
        canvasContext.drawImage(shop, 0, 0);
        magz = true;
        back = true;
        canvasContext.drawImage(shop, 0, 0);
        canvasContext.drawImage(skin2, 50, 150);
        canvasContext.drawImage(skin3, 250, 150);
        canvasContext.drawImage(skin4, 450, 150);
        canvasContext.drawImage(skin5, 50, 350);
        canvasContext.drawImage(skin6, 250, 350);
        canvasContext.drawImage(skin7, 450, 350);
        
    }
}

function drawM(){
    if(drawM == true){
        canvasContext.drawImage(shop, 0, 0);
    }
    if (drawM == false){

    }
}

function back_f(drawImage){

    if (SameGame == false && endGame == false){
        dead = true;
        endGame = true;
        SameGame = true;
        magz = false;
        back = false;
        canvasContext.drawImage(bg, 0, 0, 600, 800);
        canvasContext.drawImage(fg, 0, canvas.height - fg.height + 50);
        canvasContext.drawImage(pers, Pers.x, Pers.y);
        canvasContext.font = "30px Arial";
        canvasContext.fillStyle = "#f53900";
        canvasContext.fillText("Нажмите любую кнопку для перезапуска" , 20, 450);

    }
    if (endGame == true ){
        endGame = true;
        SameGame = true;
        magz = false;
        back = false;
        canvasContext.drawImage(bg, 0, 0, 600, 800);
        canvasContext.drawImage(fg, 0, canvas.height - fg.height + 50);
        canvasContext.drawImage(pers, Pers.x, Pers.y);
        canvasContext.font = "30px Arial";
        canvasContext.fillStyle = "#f53900";
        canvasContext.fillText("Нажмите любую кнопку для перезапуска" , 20, 450);
    }


    magz = false;
    back = false;
    SameGame = true;
    endGame = true;
    canvasContext.drawImage(bg, 0, 0, 600, 800);
    canvasContext.drawImage(fg, 0, canvas.height - fg.height + 50);
    canvasContext.drawImage(pers, Pers.x, Pers.y);
    canvasContext.font = "30px Arial";
    canvasContext.fillStyle = "#f53900";
    canvasContext.fillText("Нажмите любую кнопку для перезапуска" , 20, 450);


    //restart();


}

function restart(){
    location.reload();
}

/*
function saveScore(){
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var a = fso.CreateTextFile("c:\\testfile.txt", true);
    a.WriteLine("This is a test.");
    a.Close();
}
*/

function skin2_f(){
    pers = skin2;
}
function skin3_f(){
    pers = skin3;
}
function skin4_f(){
    pers = skin4;
}
function skin5_f(){
    pers = skin5;
}
function skin6_f(){
    pers = skin6;
}
function skin7_f(){
    pers = skin7;
}






pers.src = "img/Flappy-Bird-PNG.png";
coin.src = "img/pngegg.png";
bg.src = "img/bg.png";
bgnight.src = "img/bgnight.png";
fg.src = "img/fg.png";
trubaU.src = "img/trubaU.png";
trubaB.src = "img/trubaB.png";
shop.src = "img/shoop.png";
skin2.src = "img/Flappy-Bird-PNG-CARTOON.png";
skin3.src = "img/Flappy-Bird-PNG-R.png";
skin4.src = "img/Flappy-Bird-PNG-R2.png";
skin5.src = "img/Flappy-Bird-PNG-ERROR.png";
skin6.src = "img/Flappy-Bird-PNG-MLG.png";
skin7.src = "img/Flappy-Bird-PNG-GR.png";













// удачи понять мой код )))
// vk. https://vk.com/stepstarshiysuetolog )))
// inst. b_bruh_