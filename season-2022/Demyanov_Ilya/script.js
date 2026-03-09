var canvas=document.getElementById("canvas");

var GAME = {
    Width: 1000,
    Height: 750,
    Bg: "#F5F0E1",
}

canvas.width=GAME.Width;
canvas.height=GAME.Height;
var canvasContext=canvas.getContext("2d");

canvasContext.fillStyle="grey";
canvasContext.fillRect(0,0,GAME.Width,GAME.Height);

var map= new Image()
map.src="images/map.png"
map.x=0
map.y=0

var player={
    x:GAME.Width*0.5,
    y:GAME.Height*0.5,
    v:5,
    maxxp:100,
    xp:100,
    ex:0,
    dam:20,
    direction:0,
    lvl:1,
}

var player1= new Image()
player1.src="images/player_a1.png"

var player2= new Image()
player2.src="images/player_a2.png"

var  enemy1= new Image()
enemy1.src="images/enemy1.png"

var  enemy2= new Image()
enemy2.src="images/enemy2.png"

var  Shoot1= new Image()
Shoot1.src="images/Shoot1.png"

var Shoot2=new Image()
Shoot2.src="images/Shoot2.png"

var vbp=7; vbe1=7; vbe2=-7; timeenemy=5000; timeplayer=2000; ex=0; spore=0; GameOv=0;

var bulletplayer={
    x:player.x,
    y:player.y,
    v:10,
    Color:"yellow",
    r:5,
}

var bulletenemy1={
    x:enemy1.x+90,
    y:enemy1.y+30,
    v:vbe1,
    Color:"red",
    r:5,
}

var bulletenemy2={
    x:enemy2.x,
    y:enemy2.y+30,
    v:vbe2,
    Color:"red",
    r:5,
}

var Shoot={
    SizeX:10,
    SizeY:20,
}

var en1={
    x:10,
    y:10,
    xpmax:100,
    xp:100,
    v:1,
    dam:10,
    lvl:1,
}

var en2={
    x:GAME.Width-100,
    y:10,
    xpmax:100,
    xp:100,
    v:1,
    dam:10,
    lvl:1,
}

en1.y=Math.random()*597+10;
en2.y=Math.random()*597+10;

function drawBg() {
    canvasContext.drawImage(map,map.x,map.y);
}

function drawplayer(){
    if (player.direction === 0){
        canvasContext.drawImage(player1, player.x, player.y);
    }
    if (player.direction === 1){
        canvasContext.drawImage(player2, player.x, player.y);
    }
}

function drawenemy(){
    canvasContext.drawImage(enemy1,en1.x,en1.y);
    canvasContext.drawImage(enemy2,en2.x,en2.y);
}

function drawenemybullet(){
    canvasContext.fillStyle=bulletenemy1.Color;
    canvasContext.beginPath();
    canvasContext.arc(bulletenemy1.x,bulletenemy1.y,bulletenemy1.r, 0, 2 * Math.PI);
    canvasContext.arc(bulletenemy2.x,bulletenemy2.y,bulletenemy2.r, 0, 2 * Math.PI);
    canvasContext.fill();
}

function Shootenemy(){
    bulletenemy1.x=en1.x+90+bulletenemy1.r;
    bulletenemy1.y=en1.y+75;
    bulletenemy2.x=en2.x-bulletenemy1.r;
    bulletenemy2.y=en2.y+75;
}

function Damage(){
    if (bulletplayer.x+bulletplayer.r>=en2.x && bulletplayer.y+bulletplayer.r>=en2.y && bulletplayer.y-bulletplayer.r<=en2.y+143 && bulletplayer.x+bulletplayer.r<=en2.x+90){
        bulletplayer.y=GAME.Height+1+bulletplayer.r;
        en2.xp-=player.dam;
    }
    if (bulletplayer.x+bulletplayer.r<=en1.x+90 && bulletplayer.y+bulletplayer.r>=en1.y && bulletplayer.y-bulletplayer.r<=en1.y+143 && bulletplayer.x+bulletplayer.r>=en1.x){
        bulletplayer.y=GAME.Height+1+bulletplayer.r;
        en1.xp-=player.dam;
    }
    if (bulletenemy1.x>=player.x-bulletenemy1.r && bulletenemy1.x<=player.x+167+bulletplayer.r && bulletenemy1.y>=player.y-bulletenemy1.r && bulletenemy1.y<=player.y+197+bulletplayer.r){
        bulletenemy1.y=GAME.Height+1+bulletenemy1.r;
        player.xp-=en1.dam;
    }
    if (bulletenemy2.x>=player.x-bulletenemy2.r && bulletenemy2.x<=player.x+167+bulletplayer.r && bulletenemy2.y>=player.y-bulletenemy2.r && bulletenemy2.y<=player.y+197+bulletplayer.r){
        bulletenemy2.y=GAME.Height+1+bulletenemy2.r;
        player.xp-=en2.dam;
    }
}

function uplvl(){
    if (ex>=player.lvl){
        ex=ex-player.lvl;
        player.lvl+=1;
        player.maxxp=player.maxxp*1.2;
        player.xp=player.maxxp;
        player.dam=player.dam*1.2;
        player.v=player.v*1.2;
        vbp=vbp*1.2;
    }
}

function kill(){
    if (en1.xp<=0) {
        en1.xpmax=en1.xpmax*1.1;
        en1.xp=en1.xpmax;
        en1.dam=en1.dam*1.1;
        vbe1=vbe1*1.1;
        en1.v=en1.v*1.1;
        en1.y=Math.random()*597+10;
        ex+=1;
        spore+=1;
        en1.lvl+=1;
    }
    if (en2.xp<=0){
        en2.xpmax=en2.xpmax*1.1;
        en2.xp=en2.xpmax;
        en2.dam=en2.dam*1.1;
        en2.y=Math.random()*597+10;
        vbe2=vbe2*1.1;
        en2.v=en2.v*1.1;
        ex+=1;
        spore+=1;
        en2.lvl+=1;
    }
    if (player.xp<=0){
        GameOver();
        GameOv=1;
    }
}

function Shootplayer(){
    if (player.direction===0){
    bulletplayer.x=player.x+167+bulletplayer.r;
    bulletplayer.y=player.y+74;
    bulletplayer.v=vbp;
    }
    if (player.direction===1){
     bulletplayer.x=player.x+bulletplayer.r;
    bulletplayer.y=player.y+74;
    bulletplayer.v=-vbp;
}
}
function drawstats(){
    canvasContext.fillStyle="yellow";
    canvasContext.font = "20px Arial";
    canvasContext.fillText("Player LVL:"+player.lvl, 10, 25);
    canvasContext.fillText("LVL:"+en1.lvl,en1.x+10,en1.y+10);
    canvasContext.fillText("LVL:"+en2.lvl,en2.x+30,en2.y+10);

    canvasContext.fillStyle="grey";
    canvasContext.fillRect(130,30,player.maxxp,20);
    canvasContext.fillRect(en1.x,en1.y+150,60,10);
    canvasContext.fillRect(en2.x+30,en2.y+150,60,10);
    canvasContext.fillRect(130,50,100,20)

    canvasContext.fillStyle = "red";
    canvasContext.font = "20px Arial";
    canvasContext.fillText("XP:" + Math.round(player.xp) + "/" + Math.round(player.maxxp), 10, 50);
    canvasContext.fillRect(130,30,player.xp,20);
    canvasContext.fillRect(en1.x,en1.y+150,en1.xp/en1.xpmax*60,10);
    canvasContext.fillRect(en2.x+30,en2.y+150,en2.xp/en2.xpmax*60,10);

    canvasContext.fillStyle="SpringGreen";
    canvasContext.font = "20px Arial";
    canvasContext.fillText("EXP:"+ex+"/"+player.lvl, 10, 75);
    canvasContext.fillRect(130,50,ex/player.lvl*100,20);

    canvasContext.fillStyle="Aqua";
    canvasContext.fillText("Score: "+spore,10,100);
}


function drawbulletplayer(){
    canvasContext.fillStyle=bulletplayer.Color;
    canvasContext.beginPath();
    canvasContext.arc(bulletplayer.x,bulletplayer.y,bulletplayer.r, 0, 2 * Math.PI);
    canvasContext.fill();
}

function upbulletplayer(){
    bulletplayer.x+=bulletplayer.v;
    drawbulletplayer();
}

function upbulletenemy(){
    bulletenemy1.x+=bulletenemy1.v;
    bulletenemy2.x+=bulletenemy2.v;
    drawenemybullet();
}

function upenemy(){
    if (en1.y>player.y+30){
        en1.y-=en1.v;
    }
    if (en2.y>player.y+30){
        en2.y-=en2.v;
    }
    if (en1.y<player.y+30){
        en1.y+=en1.v;
    }
    if (en2.y<player.y+30){
        en2.y+=en2.v;
    }
    drawenemy();
}

function limit(){
    if (player.y<0){
        player.y = 0;
    }
    if (player.x<100){
        player.x = 100;
    }
    if (player.x>GAME.Width-267){
        player.x = GAME.Width-267;
    }
    if (player.y>GAME.Height-197){
        player.y = GAME.Height-197;
    }
}

function GameOver(){
    drawBg();
    canvasContext.fillStyle="FireBrick";
    canvasContext.font = "150px Arial";
    canvasContext.fillText("Game Over", 100, 300);
    canvasContext.fillText("Your spore:"+spore,50,500);
}

var cont=1;
function iEL(){
    if (cont===1){
    document.addEventListener("keydown",onCanvasKeyDown);
    document.addEventListener("mousemove",onCanvasMouseMove);
    }
    else document.addEventListener("mousemove",onCanvasMouseMove);
}

function onCanvasMouseMove(event){
    player.x=event.x;
    player.y=event.y;
    limit();
}

function onCanvasKeyDown(event){
    if (event.key === "ArrowLeft") {
        player.x -= player.v;
        player.direction = 1;
    }
    if (event.key ==="ArrowRight"){
        player.x += player.v;
        player.direction = 0;
    }
    if (event.key === "ArrowUp"){
        player.y -= player.v;
    }
    if (event.key==="ArrowDown"){
        player.y += player.v;
    }
    limit();
}

setInterval(Shootplayer,timeplayer);
setInterval(Shootenemy, timeenemy);

function play(){
    drawBg();
    drawplayer();
    upenemy();
    upbulletenemy();
    upbulletplayer();
    drawstats();
    Damage();
    kill();
    uplvl();
    if (GameOv===0){
    requestAnimationFrame(play);
}
}

iEL();
play();