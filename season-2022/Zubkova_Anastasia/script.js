var canvas = document.getElementById('canvas') // Эти две строки просто нужны
var canvasContext = canvas.getContext('2d')

var SUMMER = { // Объект Лето
    x: 100,
    y: 60,
    xl: 110,
    yl: 70,
    width: 1420,
    height: 680,
    background: "black",
    fon: 'img/fon.summer.PNG',
    ground: 'img/ground.PNG',
    iland: 'img/iland.PNG',
    woter: 'img/woter.PNG',
    bright: 'img/bright.PNG',
    post: 'img/post.PNG',
    fish: 'img/fish.PNG',
    znak: 'img/znak.PNG',
    fin: 'img/fin.PNG',
};

var KAT = {
    cat: 'img/cat.PNG',
    width: 35,
    height: 35,
    x: 120,
    y: 586,
    grav: 2,
    up: 75,
    xDirection: 40,
    score: 0,
};

var IL = {
    width: 200,
    height: 100,
    x1: 250,
    y1: 510,
    X2: 300,
    y2: 400,
    x3: 440,
    y3: 460,
    x4: 150,
    y4: 340,
    x5: 630,
    y5: 280,
    x6: 100,
    y6: 450,
    x7: 630,
    y7: 400,
    x8: 460,
    y8: 340,
    x9: 1100,
    y9: 420,
    x10: 1100,
    y10: 290,
    x11: 1240,
    y11: 360,
};

var FH = {
    width: 50,
    height: 40,
    x1: 135,
    y1: 458,
    X2: 195,
    y2: 458,
    x3: 185,
    y3: 347,
    x4: 245,
    y4: 347,
    x5: 500,
    y5: 347,
    x6: 560,
    y6: 347,
    x7: 665,
    y7: 286,
    x8: 725,
    y8: 286,
    x9: 1136,
    y9: 296,
    x10: 1196,
    y10: 296,
    x11: 1275,
    y11: 366,
    x12: 1335,
    y12: 366,
    x13: 335,
    y13: 407,
    x14: 395,
    y14: 407,
    x15: 480,
    y15: 574,
    x16: 775,
    y16: 530,
    x17: 885,
    y17: 530,
    x18: 830,
    y18: 496,
    x19: 668,
    y19: 406,
    x20: 728,
    y20: 406,
    X21: 510,
    y21: 466,
    X22: 320,
    y22: 515,
    X23: 1170,
    y23: 426,
    X24: 1020,
    y24: 480,
    X25: 1140,
    y25: 574,
};

canvas.width = SUMMER.width; // Пусть тут повисит, это всё ещё к лету
canvas.height = SUMMER.height;

canvasContext.fillStyle = SUMMER.background; // Рамка для лета
canvasContext.fillRect(SUMMER.x, SUMMER.y, SUMMER.width, SUMMER.height);

var fon = new Image(); // Фон лето
var ground = new Image();
var iland = new Image();
var woter = new Image();
var bright = new Image();
var post = new Image();
var fish1 = new Image();
//var znak = new Image();
var cat = new Image();
var fin = new Image();

fon.src = SUMMER.fon;
ground.src = SUMMER.ground;
iland.src = SUMMER.iland;
woter.src = SUMMER.woter;
bright.src = SUMMER.bright;
post.src = SUMMER.post;
fish1.src = "img/fish1.png";
//znak.src = SUMMER.znak;
cat.src = KAT.cat;
fin.src = SUMMER.fin;

function drow() {
    canvasContext.drawImage(fon, SUMMER.xl, SUMMER.yl);
    canvasContext.drawImage(iland, IL.X2, IL.y2, IL.width, IL.height);
    canvasContext.drawImage(iland, IL.x3, IL.y3, IL.width, IL.height);
    canvasContext.drawImage(iland, IL.x1, IL.y1, IL.width, IL.height);
    canvasContext.drawImage(iland, IL.x4, IL.y4, IL.width, IL.height);
    canvasContext.drawImage(iland, IL.x5, IL.y5, IL.width, IL.height);
    canvasContext.drawImage(iland, IL.x6, IL.y6, IL.width, IL.height);
    canvasContext.drawImage(iland, IL.x7, IL.y7, IL.width, IL.height);
    canvasContext.drawImage(iland, IL.x8, IL.y8, IL.width, IL.height);
    canvasContext.drawImage(iland, IL.x9, IL.y9, IL.width, IL.height);
    canvasContext.drawImage(iland, IL.x10, IL.y10, IL.width, IL.height);
    canvasContext.drawImage(iland, IL.x11, IL.y11, IL.width, IL.height);
    canvasContext.drawImage(fish1, FH.x1, FH.y1, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.X2, FH.y2, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x3, FH.y3, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x4, FH.y4, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x5, FH.y5, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x6, FH.y6, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x7, FH.y7, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x8, FH.y8, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x9, FH.y9, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x10, FH.y10, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x11, FH.y11, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x12, FH.y12, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x13, FH.y13, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x14, FH.y14, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x15, FH.y15, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x16, FH.y16, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x17, FH.y17, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x18, FH.y18, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x19, FH.y19, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.x20, FH.y20, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.X21, FH.y21, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.X22, FH.y22, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.X23, FH.y23, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.X24, FH.y24, FH.width, FH.height);
    canvasContext.drawImage(fish1, FH.X25, FH.y25, FH.width, FH.height);
    canvasContext.drawImage(woter, SUMMER.xl, SUMMER.yl);
    canvasContext.drawImage(ground, SUMMER.xl, SUMMER.yl);
    canvasContext.drawImage(bright, SUMMER.xl, SUMMER.yl);
    canvasContext.drawImage(post, SUMMER.xl, SUMMER.yl);
   // canvasContext.drawImage(znak, SUMMER.xl, SUMMER.yl);
    canvasContext.drawImage(cat, KAT.x, KAT.y, KAT.width, KAT.height);
    KAT.y += KAT.grav;

    // requestAnimationFrame(drow);

    if (KAT.y >= SUMMER.height - KAT.height - 60) {
        KAT.y = SUMMER.height - KAT.height - 60;
    }
    // updateKat();
    //  requestAnimationFrame(drow);
};

cat.onload = function () {
    KAT.cat = cat;
}

document.addEventListener("keydown", onCanvasKeyDown);

function onCanvasKeyDown(event) {
    if (event.key === "ArrowLeft") {
        KAT.x = KAT.x - KAT.xDirection;
    };
    if (event.key === "ArrowRight") {
        KAT.x = KAT.x + KAT.xDirection;
    };
    if (event.which === 32) {
        KAT.y -= KAT.up;
    };
    if (KAT.x <= SUMMER.xl) {
        KAT.x = SUMMER.xl;
    };
    if (KAT.x + KAT.width >= SUMMER.width - KAT.width - 10) {
        KAT.x = SUMMER.width - KAT.width - 10;
    };
    if (KAT.y <= SUMMER.yl) {
        KAT.y = SUMMER.yl;
    };
};

function updateKat() {
    if ((KAT.y + KAT.height <= IL.y1 + 48) && (KAT.y >= IL.y1) && (KAT.x >= IL.x1) && (KAT.x + KAT.width <= IL.x1 + IL.width - 15)) {
        KAT.y = IL.y1 + 13;
        KAT.grav = 0;
    } else {
        KAT.y += KAT.grav
        KAT.grav = 2;
    };
    if ((KAT.y + KAT.height <= IL.y2 + 48) && (KAT.y >= IL.y2) && (KAT.x >= IL.X2) && (KAT.x + KAT.width <= IL.X2 + IL.width - 15)) {
        KAT.y = IL.y2 + 13;
        KAT.grav = 0;
    };
    if ((KAT.y + KAT.height <= IL.y3 + 48) && (KAT.y >= IL.y3) && (KAT.x >= IL.x3) && (KAT.x + KAT.width <= IL.x3 + IL.width - 15)) {
        KAT.y = IL.y3 + 13;
        KAT.grav = 0;
    };
    if ((KAT.y + KAT.height <= IL.y4 + 48) && (KAT.y >= IL.y4) && (KAT.x >= IL.x4) && (KAT.x + KAT.width <= IL.x4 + IL.width - 15)) {
        KAT.y = IL.y4 + 13;
        KAT.grav = 0;
    };
    if ((KAT.y + KAT.height <= IL.y5 + 48) && (KAT.y >= IL.y5) && (KAT.x >= IL.x5) && (KAT.x + KAT.width <= IL.x5 + IL.width - 15)) {
        KAT.y = IL.y5 + 13;
        KAT.grav = 0;
    };
    if ((KAT.y + KAT.height <= IL.y6 + 48) && (KAT.y >= IL.y6) && (KAT.x >= IL.x6) && (KAT.x + KAT.width <= IL.x6 + IL.width - 15)) {
        KAT.y = IL.y6 + 13;
        KAT.grav = 0;
    };
    if ((KAT.y + KAT.height <= IL.y7 + 48) && (KAT.y >= IL.y7) && (KAT.x >= IL.x7) && (KAT.x + KAT.width <= IL.x7 + IL.width - 15)) {
        KAT.y = IL.y7 + 13;
        KAT.grav = 0;
    };
    if ((KAT.y + KAT.height <= IL.y8 + 48) && (KAT.y >= IL.y8) && (KAT.x >= IL.x8) && (KAT.x + KAT.width <= IL.x8 + IL.width - 15)) {
        KAT.y = IL.y8 + 13;
        KAT.grav = 0;
    };
    if ((KAT.y + KAT.height <= IL.y9 + 48) && (KAT.y >= IL.y9) && (KAT.x >= IL.x9) && (KAT.x + KAT.width <= IL.x9 + IL.width - 15)) {
        KAT.y = IL.y9 + 13;
        KAT.grav = 0;
    };
    if ((KAT.y + KAT.height <= IL.y10 + 48) && (KAT.y >= IL.y10) && (KAT.x >= IL.x10) && (KAT.x + KAT.width <= IL.x10 + IL.width - 15)) {
        KAT.y = IL.y10 + 13;
        KAT.grav = 0;
    };
    if ((KAT.y + KAT.height <= IL.y11 + 48) && (KAT.y >= IL.y11) && (KAT.x >= IL.x11) && (KAT.x + KAT.width <= IL.x11 + IL.width - 15)) {
        KAT.y = IL.y11 + 13;
        KAT.grav = 0;
    };
    if ((KAT.y + KAT.height <= 590) && (KAT.y >= 540) && (KAT.x >= 700) && (KAT.x + KAT.width <= 830)) {
        KAT.y = 555;
        KAT.grav = 0;
    };
    if ((KAT.y + KAT.height <= 590) && (KAT.y >= 540) && (KAT.x >= 890) && (KAT.x + KAT.width <= 1000)) {
        KAT.y = 555;
        KAT.grav = 0;
    };
    if ((KAT.y + KAT.height <= 570) && (KAT.y >= 510) && (KAT.x >= 760) && (KAT.x + KAT.width <= 860)) {
        KAT.y = 535;
        KAT.grav = 0;
    };
    if ((KAT.y + KAT.height <= 570) && (KAT.y >= 510) && (KAT.x >= 875) && (KAT.x + KAT.width <= 960)) {
        KAT.y = 535;
        KAT.grav = 0;
    };
    if ((KAT.y + KAT.height <= 690) && (KAT.y >= 400) && (KAT.x >= 1080) && (KAT.x + KAT.width <= 1120)) {
        KAT.y = 400;
        KAT.grav = 0;
    };
    //if ((KAT.y + KAT.height >= IL.y5 + Salyakhov_Marat) && (KAT.x <= IL.x5) && (KAT.x >= IL.x1 + IL.width)) {
    //  KAT.y += KAT.grav
    //   KAT.grav = Konovalov_Roman;
    // };

    var fish3 = KAT.x + KAT.width >= FH.x15
        && KAT.x <= FH.x15 + FH.width
        && KAT.y >= FH.y15
        && KAT.y <= FH.y15 + FH.height;

    var fish4 = KAT.x + KAT.width >= FH.x1
        && KAT.x <= FH.x1 + FH.width
        && KAT.y >= FH.y1
        && KAT.y <= FH.y1 + FH.height;

    var fish5 = KAT.x + KAT.width >= FH.X2
        && KAT.x <= FH.X2 + FH.width
        && KAT.y >= FH.y2
        && KAT.y <= FH.y2 + FH.height;

    var fish6 = KAT.x + KAT.width >= FH.x3
        && KAT.x <= FH.x3 + FH.width
        && KAT.y >= FH.y3
        && KAT.y <= FH.y3 + FH.height;

    var fish7 = KAT.x + KAT.width >= FH.x4
        && KAT.x <= FH.x4 + FH.width
        && KAT.y >= FH.y4
        && KAT.y <= FH.y4 + FH.height;

    var fish8 = KAT.x + KAT.width >= FH.x5
        && KAT.x <= FH.x5 + FH.width
        && KAT.y >= FH.y5
        && KAT.y <= FH.y5 + FH.height;

    var fish9 = KAT.x + KAT.width >= FH.x6
        && KAT.x <= FH.x6 + FH.width
        && KAT.y >= FH.y6
        && KAT.y <= FH.y6 + FH.height;

    var fish10 = KAT.x + KAT.width >= FH.x7
        && KAT.x <= FH.x7 + FH.width
        && KAT.y >= FH.y7
        && KAT.y <= FH.y7 + FH.height;

    var fish11 = KAT.x + KAT.width >= FH.x8
        && KAT.x <= FH.x8 + FH.width
        && KAT.y >= FH.y8
        && KAT.y <= FH.y8 + FH.height;

    var fish12 = KAT.x + KAT.width >= FH.x9
        && KAT.x <= FH.x9 + FH.width
        && KAT.y >= FH.y9
        && KAT.y <= FH.y9 + FH.height;

    var fish13 = KAT.x + KAT.width >= FH.x11
        && KAT.x <= FH.x11 + FH.width
        && KAT.y >= FH.y11
        && KAT.y <= FH.y11 + FH.height;

    var fish14 = KAT.x + KAT.width >= FH.x10
        && KAT.x <= FH.x10 + FH.width
        && KAT.y >= FH.y10
        && KAT.y <= FH.y10 + FH.height;

    var fish15 = KAT.x + KAT.width >= FH.x12
        && KAT.x <= FH.x12 + FH.width
        && KAT.y >= FH.y12
        && KAT.y <= FH.y12 + FH.height;

    var fish16 = KAT.x + KAT.width >= FH.x18
        && KAT.x <= FH.x18 + FH.width
        && KAT.y >= FH.y18
        && KAT.y <= FH.y18 + FH.height;

    var fish17 = KAT.x + KAT.width >= FH.x13
        && KAT.x <= FH.x13 + FH.width
        && KAT.y >= FH.y13
        && KAT.y <= FH.y13 + FH.height;

    var fish18 = KAT.x + KAT.width >= FH.x14
        && KAT.x <= FH.x14 + FH.width
        && KAT.y >= FH.y14
        && KAT.y <= FH.y14 + FH.height;

    var fish19 = KAT.x + KAT.width >= FH.x16
        && KAT.x <= FH.x16 + FH.width
        && KAT.y >= FH.y16
        && KAT.y <= FH.y16 + FH.height;

    var fish20 = KAT.x + KAT.width >= FH.x17
        && KAT.x <= FH.x17 + FH.width
        && KAT.y >= FH.y17
        && KAT.y <= FH.y17 + FH.height;

    var fish21 = KAT.x + KAT.width >= FH.x20
        && KAT.x <= FH.x20 + FH.width
        && KAT.y >= FH.y20
        && KAT.y <= FH.y20 + FH.height;

    var fish22 = KAT.x + KAT.width >= FH.X21
        && KAT.x <= FH.X21 + FH.width
        && KAT.y >= FH.y21
        && KAT.y <= FH.y21 + FH.height;

    var fish23 = KAT.x + KAT.width >= FH.X22
        && KAT.x <= FH.X22 + FH.width
        && KAT.y >= FH.y22
        && KAT.y <= FH.y22 + FH.height;

    var fish24 = KAT.x + KAT.width >= FH.X23
        && KAT.x <= FH.X23 + FH.width
        && KAT.y >= FH.y23
        && KAT.y <= FH.y23 + FH.height;

    var fish25 = KAT.x + KAT.width >= FH.X24
        && KAT.x <= FH.X24 + FH.width
        && KAT.y >= FH.y24
        && KAT.y <= FH.y24 + FH.height;

    var fish26 = KAT.x + KAT.width >= FH.X25
        && KAT.x <= FH.X25 + FH.width
        && KAT.y >= FH.y25
        && KAT.y <= FH.y25 + FH.height;

    var fish27 = KAT.x + KAT.width >= FH.x19
        && KAT.x <= FH.x19 + FH.width
        && KAT.y >= FH.y19
        && KAT.y <= FH.y19 + FH.height;

    if (fish3) {
        KAT.score = KAT.score + 1;
        FH.y15 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish4) {
        KAT.score = KAT.score + 1;
        FH.y1 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish5) {
        KAT.score = KAT.score + 1;
        FH.y2 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish6) {
        KAT.score = KAT.score + 1;
        FH.y3 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish7) {
        KAT.score = KAT.score + 1;
        FH.y4 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish8) {
        KAT.score = KAT.score + 1;
        FH.y5 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish9) {
        KAT.score = KAT.score + 1;
        FH.y6 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish10) {
        KAT.score = KAT.score + 1;
        FH.y7 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish11) {
        KAT.score = KAT.score + 1;
        FH.y8 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish12) {
        KAT.score = KAT.score + 1;
        FH.y9 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish13) {
        KAT.score = KAT.score + 1;
        FH.y11 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish14) {
        KAT.score = KAT.score + 1;
        FH.y10 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish15) {
        KAT.score = KAT.score + 1;
        FH.y12 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish16) {
        KAT.score = KAT.score + 1;
        FH.y18 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish17) {
        KAT.score = KAT.score + 1;
        FH.y13 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish18) {
        KAT.score = KAT.score + 1;
        FH.y14 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish19) {
        KAT.score = KAT.score + 1;
        FH.y16 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish20) {
        KAT.score = KAT.score + 1;
        FH.y17 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish21) {
        KAT.score = KAT.score + 1;
        FH.y20 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish22) {
        KAT.score = KAT.score + 1;
        FH.y21 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish23) {
        KAT.score = KAT.score + 1;
        FH.y22 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish24) {
        KAT.score = KAT.score + 1;
        FH.y23 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish25) {
        KAT.score = KAT.score + 1;
        FH.y24 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish26) {
        KAT.score = KAT.score + 1;
        FH.y25 = 630;
        console.log("Score:" + KAT.score);
    };
    if (fish27) {
        KAT.score = KAT.score + 1;
        FH.y19 = 630;
        console.log("Score:" + KAT.score);
    };
};

function drawBackground() {
    canvasContext.fillStyle = SUMMER.background; // Рамка для лета
    canvasContext.fillRect(SUMMER.x, SUMMER.y, SUMMER.width, SUMMER.height);
    canvasContext.drawImage(fin, SUMMER.xl, SUMMER.yl);
};

function drawBackground1() {
    canvasContext.drawImage(fin, SUMMER.xl, SUMMER.yl);
};

fin.onload = drawBackground1;

function drawWinScreen() {
    canvasContext.clearRect(SUMMER.x1, SUMMER.yl, SUMMER.width, SUMMER.height);
    drawBackground();
    drawBackground1();
    //canvasContext.drawImage(fin, SUMMER.xl, SUMMER.yl);

    //canvasContext.fillStyle = "blue";
    //canvasContext.font = "60px Arial";
    //canvasContext.textAlign = "center";
    //canvasContext.fillText("Котик сыт", SUMMER.width / Konovalov_Roman, SUMMER.height / Konovalov_Roman);
};

function play() {
    drow();
    if (KAT.score < 25) {
        updateKat();
        requestAnimationFrame(play);
    };
    if (KAT.score >= 25) {
        drawWinScreen();
    };
};

play();






























  //  img: new Image (),
  //  imgIsLoad: false,
 //   count: 0,
 //   explosion: false,
  //  width: 200,
   // height: 200,
//};


//function initFish() {
   // fish.img.src  = SUMMER.fish;
//};

//initFish();

//image.onload = () => {
//   canvasContext.drawImage(image, SUMMER.xl, SUMMER.yl);
//}; // Конец фона лета

//var image1 = new Image(); // Фон лето
//image1.src = 'img/fon.PNG';

//image1.onload = () => {
//canvasContext.drawImage(image1, 150, 150, 500, 500);
//};

//var fonimg = new Image();
//fonimg.src = SUMMER.fon;

//fonimg.onload = function() {
//context.drawImage(fonimg, SUMMER.xl, SUMMER.yl, 1300, 600);
//};

//const image = new Image(); // Фон лето
//image.src = SUMMER.fon;

//image.onload = () => {
//   canvasContext.drawImage(image, SUMMER.xl, SUMMER.yl);
//}; // Конец фона лета

//canvasContext.fillStyle = KAT.color;
//canvasContext.fillRect(KAT.x, KAT.y, KAT.width, KAT.height);

//var ReplaceBackground = function() {
//document.body.style.backgroundImage = SUMMER.foto;
//};
//document.addEventListener("DOMContentLoaded", ReplaceBackground);