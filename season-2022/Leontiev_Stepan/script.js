var canvas = document.getElementById('canvas');
var canvasWidth = 1000;
var canvasHeight = 800;
var k = 0;
var p = 2;
var f = 0;
var s = 1;
var st = 'up';
var a = 1;
var b = 1;
var c = 1;
var chels = 1;
var chel = true;
var aud = new Audio();
var bards = 1;
var bard = true;
var sell = true;
var sells = 1;
var g = 1;
var mag = true;
var mags = 1;
var m = 1;
var z = 1;
var chels = true;
var au = new Audio(); // Создаём новый элемент Audio

var canvasContext = canvas.getContext('2d');

// var GAME = {
//     width: 1920,
//     height: 1080,
//     background: '#F5F0E1',
// }

game = {
    pressUp: false,
    pressDown: false,
    pressLeft: false,
    pressRight: false,
    pressEnter: false,
    pressExit: false,
    pressM: false,
    pressI: false,
    pressE: false,
}
var MENU = {
    img1: new Image(),
    img1IsLoad: false,
    img2: new Image(),
    img2IsLoad: false,
    img3: new Image(),
    img3IsLoad: false,
    img4: new Image(),
    img4IsLoad: false,



    count: 0,
    explosion: false,
    size: 0,
    x: 0,
    y: 0,
    width: 1200,
    height: 600,
}



var FIELD = {
    img: new Image(),
    imgIsLoad: false,
    imgCloud: new Image(),
    imgCloudIsLoad: false,
    imgForest: new Image(),
    imgForestIsLoad: false,
    imgStone: new Image(),
    imgStoneIsLoad: false,
    imgHome: new Image(),
    imgHomeIsLoad: false,
    imgHome1: new Image(),
    imgHome1IsLoad: false,
    imgHome2: new Image(),
    imgHome2IsLoad: false,

    count: 0,
    explosion: false,
    size: 0,
    x: 0,
    y: 0,
    width: 1200,
    height: 600,
}
var MARKET = {
    imgMarket: new Image(),
    imgMarketIsLoad: false,
    imgMarket2: new Image(),
    imgMarket2IsLoad: false,
    x: -75,
    y: 190,
    x1: 155,
    y1: 190,
    width: 300,
    height: 100,
    width1: 230,
    height1: 80,

}
var SELLER = {
    img: new Image(),
    imgIsLoad: false,
    x: 50,
    y: 200,
    width: 80,
    height: 110,



}

var MAG = {
    img: new Image(),
    imgIsLoad: false,

    count: 0,
    explosion: false,
    size: 0,
    x: 820,
    y: 180,
    width: 200,
    height: 270,
}
var EMGYR = {
    img: new Image(),
    imgIsLoad: false,

    count: 0,
    explosion: false,
    size: 0,
    x: 0,
    y: 200,
    width: 200,
    height: 400,
}
var CHEL = {
    img: new Image(),
    imgIsLoad: false,

    count: 0,
    explosion: false,
    size: 0,
    x: 220,
    y: 440,
    width: 100,
    height: 160,

}
var BARD = {
    img: new Image(),
    imgIsLoad: false,

    count: 0,
    explosion: false,
    size: 0,
    x: 1000,
    y: 340,
    width: 100,
    height: 160,

}


var INVENTORY = {
    img: new Image(),
    imgIsLoad: false,

    count: 0,
    explosion: false,
    size: 0,
    x: 0,
    y: 0,
    width: FIELD.width,
    height: FIELD.height,

}

var NAD = {
    img: new Image(),
    imgIsLoad: false,
    img2: new Image(),
    img2IsLoad: false,
    count: 0,
    explosion: false,
    size: 0,
    x: 600,
    y: 100,
    width: 250,
    height: 100,
}
var TABLE = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    explosion: false,
    size: 0,
    x: 700,
    y: 300,
    width: 450,
    height: 400,
}


var MAP = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    explosion: false,
    size: 0,
    x: 0,
    y: 0,
    width: FIELD.width,
    height: FIELD.height,
}
var MONEY = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    explosion: false,
    size: 0,
    x: 1000,
    y: 100,
    width: 80,
    height: 80,
    value: 1000,
}

var PERS = {
    img: new Image(),
    imgIsLoad: false,
    imgr: new Image(),
    imgrIsLoad: false,
    count: 0,
    explosion: false,
    size: 0,
    x: FIELD.width / 2,
    y: FIELD.height / 2,
    width: 140,
    height: 140,
    nwidth: 140,
    nheight: 140,
    s: 5,

}
var HOMESCENE = {
    img: new Image(),
    imgIsLoad: false,

    count: 0,
    explosion: false,
    size: 0,
    x: 0,
    y: 0,
    width: 1200,
    height: 600,
    s: 3,


}

var CAST = {
    img: new Image(),
    imgIsLoad: false,
    count: 0,
    explosion: false,
    size: 0,
    x: 550,
    y: 100,
    width: 400,
    height: 200,

}

canvas.width = 1500;
canvas.height = 600;


function initEventsListeners() {
    window.addEventListener("keydown", onCanvasKeyDown);


}
window.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        game.pressUp = true;
    }
    if (event.key === 'a') {
        game.pressLeft = true;
    }
    if (event.key === 's') {
        game.pressDown = true;
    }
    if (event.key === 'd') {
        game.pressRight = true;
    }
    if (event.key === 'm') {
        game.pressM = true;
        k += 1;
    }
    if (event.key === 'i') {
        game.pressI = true;
        f += 1;
    }

    console.log(event);
});

window.addEventListener('keyup', (event) => {
    if (event.key === 'w') {
        game.pressUp = false;
    }
    if (event.key === 'a') {
        game.pressLeft = false;
    }
    if (event.key === 's') {
        game.pressDown = false;
    }
    if (event.key === 'd') {
        game.pressRight = false;
    }
    // if (event.key === 'Enter') {
    //     game.pressEnter = false;
    // }
    // if (event.key === 'Escape') {
    //     game.pressExit = false;
    // }


    console.log(event);
});

function updateFrame() {

    if (game.pressDown) {
        PERS.y += PERS.s;

    };
    if (game.pressUp) {

        PERS.y -= PERS.s;

    };
    if (game.pressLeft) {
        PERS.x -= PERS.s;

    };
    if (game.pressRight) {
        PERS.x += PERS.s;

    };
    if (game.pressLeft === false) {
        PERS.imgIsLoad = true;
    }

    clampPersPosition();
}

function clampPersPosition() {
    if (PERS.x + PERS.width / 1.4 >= FIELD.width) {
        PERS.x = FIELD.width - PERS.width / 1.4;
    }
    if (PERS.x <= 0) {
        PERS.x = 0
    }
    if (PERS.y + PERS.height / 2 <= FIELD.height / 2.7) {
        PERS.y = FIELD.height / 2.7 - PERS.height / 2;
    }
    if (PERS.y + PERS.height >= FIELD.height) {
        PERS.y = FIELD.height - PERS.height
    }

}



function drawFrame() {
    if ((game.pressEnter === false) || (game.pressExit === true)) {
        PERS.width = PERS.nwidth
        PERS.height = PERS.nheight
        drawPole();
        drawField();
        drawCastle();
        drawBard();
        drawChel();
        drawInstruction()
        drawSeller();
        drawPers();
        contactWithObject();


    } else {
        if ((PERS.x + PERS.height >= MAG.x) && (PERS.x - PERS.width <= MAG.x + MAG.width)) {
            mag = true;
            if (mags === 1) {
                eMag();
            }
            mags += 1;
            console.log('eee')
        } else {
            if (mags != 1) {
                m += 1
            }
            if (m > 2) {
                m = 1
            }
            mags = 1
            mag = false;


        }
        drawHome();
        drawMag();
        drawTable();
        drawEmgyr();

        // aud.pause();
        drawPers();
        if (PERS.y + PERS.height <= 520) {
            PERS.y = 520 - PERS.height;
        }

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                game.pressEscape = true;
                game.pressEnter = false;
                PERS.x = CAST.x
                PERS.y = CAST.y


            }
        });
    }



    if (game.pressRight) {
        drawPers();
    }
    if (game.pressLeft) {
        drawPersr();
        PERS.imgIsLoad = false;
    }
    if ((game.pressM === true) && (k % 2 === 1)) {

        drawMap();
    }
    if ((game.pressI === true) && (f % 2 === 1)) {

        drawInventory();
        drawMoney();


    }



}

function play() {
    updateFrame();
    drawFrame();
    requestAnimationFrame(play);
}
// ВСЕ ФОТОЧКИ
function initAll() {
    PERS.img.src = "img/pers.png";
    PERS.img.onload = () => {
        PERS.imgIsLoad = true;
    }
    PERS.imgr.src = "img/pers.r.png";
    PERS.imgr.onload = () => {
        PERS.imgrIsLoad = true;
    }
    MAG.img.src = "img/mag.png";
    MAG.img.onload = () => {
        MAG.imgIsLoad = true;
    }
    FIELD.img.src = "img/gamefield.png";
    FIELD.img.onload = () => {
        FIELD.imgIsLoad = true;
    }
    NAD.img.src = "img/n1.png";
    NAD.img.onload = () => {
        NAD.imgIsLoad = true;
    }
    NAD.img2.src = "img/n2.png";
    NAD.img2.onload = () => {
        NAD.img2IsLoad = true;
    }
    CAST.img.src = "img/pudge_vs_creeps.png";
    CAST.img.onload = () => {
        CAST.imgIsLoad = true;
    }
    FIELD.imgCloud.src = "img/cloud.png";
    FIELD.imgCloud.onload = () => {
        FIELD.imgCloudIsLoad = true;
    }
    FIELD.imgForest.src = "img/forest.png";
    FIELD.imgForest.onload = () => {
        FIELD.imgForestIsLoad = true;
    }
    FIELD.imgStone.src = "img/stone.png";
    FIELD.imgStone.onload = () => {
        FIELD.imgStoneIsLoad = true;
    }
    FIELD.imgHome.src = "img/home3.png";
    FIELD.imgHome.onload = () => {
        FIELD.imgHomeIsLoad = true;
    }
    FIELD.imgHome1.src = "img/home3.png";
    FIELD.imgHome1.onload = () => {
        FIELD.imgHome1IsLoad = true;
    }
    MARKET.imgMarket.src = "img/market.png";
    MARKET.imgMarket.onload = () => {
        MARKET.imgMarketIsLoad = true;
    }
    MARKET.imgMarket2.src = "img/market2.png";
    MARKET.imgMarket2.onload = () => {
        MARKET.imgMarket2IsLoad = true;
    }
    FIELD.imgHome2.src = "img/home2.png";
    FIELD.imgHome2.onload = () => {
        FIELD.imgHome2IsLoad = true;
    }
    HOMESCENE.img.src = "img/ved.png";
    HOMESCENE.img.onload = () => {
        HOMESCENE.imgIsLoad = true;
    }
    MAP.img.src = "img/map.jpg";
    MAP.img.onload = () => {
        MAP.imgIsLoad = true;
    }
    INVENTORY.img.src = "img/inventory.png";
    INVENTORY.img.onload = () => {
        INVENTORY.imgIsLoad = true;
    }
    TABLE.img.src = "img/table.png";
    TABLE.img.onload = () => {
        TABLE.imgIsLoad = true;
    }
    EMGYR.img.src = "img/emgyr.png";
    EMGYR.img.onload = () => {
        EMGYR.imgIsLoad = true;
    }
    BARD.img.src = "img/bard.png";
    BARD.img.onload = () => {
        BARD.imgIsLoad = true;
    }
    CHEL.img.src = "img/chel.png";
    CHEL.img.onload = () => {
        CHEL.imgIsLoad = true;
    }
    MONEY.img.src = "img/money.png";
    MONEY.img.onload = () => {
        MONEY.imgIsLoad = true;
    }
    MENU.img1.src = "img/menu1.jpg";
    MENU.img1.onload = () => {
        MENU.img1IsLoad = true;
    }
    MENU.img2.src = "img/menu2.jpg";
    MENU.img2.onload = () => {
        MENU.img2IsLoad = true;
    }
    MENU.img3.src = "img/menu3.jpg";
    MENU.img3.onload = () => {
        MENU.img3IsLoad = true;
    }
    MENU.img4.src = "img/next.jpg";
    MENU.img4.onload = () => {
        MENU.img4IsLoad = true;
    }
    SELLER.img.src = "img/seller.png";
    SELLER.img.onload = () => {
        SELLER.imgIsLoad = true;
    }





}

// ПРОРИСОВКА ВСЕГО, ЧТО ЕСТЬ
function drawField() {

    if (FIELD.imgIsLoad) {


        canvasContext.drawImage(FIELD.img, FIELD.x, FIELD.y, FIELD.width, FIELD.height)
        // canvasContext.fillStyle = 'blue';
        // canvasContext.fillRect(0, 0, FIELD.width, FIELD.height / Konovalov_Roman.Pastukhova_Arina)
    }

    if (FIELD.imgCloudIsLoad) {
        canvasContext.drawImage(FIELD.imgCloud, FIELD.x, FIELD.y, FIELD.width, 200)
    }
    if (FIELD.imgForestIsLoad) {
        canvasContext.drawImage(FIELD.imgForest, FIELD.x, FIELD.y + 110, FIELD.width, 100)
    }
    if (MARKET.imgMarket2IsLoad) {
        canvasContext.drawImage(MARKET.imgMarket2, MARKET.x1, MARKET.y1, MARKET.width1, MARKET.height1)
    }
    if (MARKET.imgMarketIsLoad) {
        canvasContext.drawImage(MARKET.imgMarket, MARKET.x, MARKET.y, MARKET.width, MARKET.height)

    }



    if (FIELD.imgHome2IsLoad) {
        canvasContext.drawImage(FIELD.imgHome2, 360, 120, 250, 200)
    }

    if (FIELD.imgStoneIsLoad) {
        canvasContext.drawImage(FIELD.imgStone, 300, 520, 200, 100)
    }
    if (FIELD.imgHomeIsLoad) {
        canvasContext.drawImage(FIELD.imgHome, 889, 84, 320, 200)
    }
    // if (FIELD.imgHome1IsLoad) {
    //     canvasContext.drawImage(FIELD.imgHome1, 600, 400, 500, 200)
    // }

}




function drawInstruction() {
    var sc = canvas.getContext("2d");
    sc.font = "20px Comic Sans MS";
    sc.fillStyle = "white";
    sc.textAlign = "left";
    sc.fillText('[i] - открыть инвентарь', 0, FIELD.height / 1.1);
    sc.fillText('[m] - открыть карту', 0, FIELD.height / 1.1 - 25);
    sc.fillText('[enter] - войти в дом', 0, FIELD.height / 1.1 - 50);
    sc.fillText('[escape] - выход из дома', 0, FIELD.height / 1.1 - 75);
    sc.fillText('[e] - контактировать с героем', 0, FIELD.height / 1.1 - 100);
}

function drawPers() {
    if (PERS.imgIsLoad) {
        canvasContext.drawImage(PERS.img, PERS.x, PERS.y, PERS.width, PERS.height)
    }


}

function drawPersr() {
    if (PERS.imgrIsLoad) {
        canvasContext.drawImage(PERS.imgr, PERS.x, PERS.y, PERS.width, PERS.height);
    }


}

function drawMag() {
    if (MAG.imgIsLoad) {
        canvasContext.drawImage(MAG.img, MAG.x, MAG.y, MAG.width, MAG.height)
    }
}

function drawMoney() {
    if (MONEY.imgIsLoad) {
        var sc = canvas.getContext("2d");
        sc.font = "20px Comic Sans MS";
        sc.fillStyle = "white";

        sc.fillText(MONEY.value, MONEY.x - 50, MONEY.y);
        canvasContext.drawImage(MONEY.img, MONEY.x, MONEY.y - 50, MONEY.width, MONEY.height)
    }
}

function drawTable() {
    if (TABLE.imgIsLoad) {
        canvasContext.drawImage(TABLE.img, TABLE.x, TABLE.y, TABLE.width, TABLE.height)
    }


}

function drawPole() {
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
}

function drawCastle() {
    if (CAST.imgIsLoad) {
        canvasContext.drawImage(CAST.img, CAST.x, CAST.y, CAST.width, CAST.height)
    }
}

function drawMenu1() {
    if (MENU.img1IsLoad) {
        canvasContext.drawImage(MENU.img1, MENU.x, MENU.y, MENU.width, MENU.height)
    }
}

function drawMenu2() {
    if (MENU.img2IsLoad) {
        canvasContext.drawImage(MENU.img2, MENU.x, MENU.y, MENU.width, MENU.height)
    }
}

function drawMenu3() {
    if (MENU.img3IsLoad) {
        canvasContext.drawImage(MENU.img3, MENU.x, MENU.y, MENU.width, MENU.height)
    }
}

function drawMenu4() {
    if (MENU.img4IsLoad) {
        canvasContext.drawImage(MENU.img4, MENU.x, MENU.y, MENU.width, MENU.height)
        var sc = canvas.getContext("2d");
        sc.font = "20px Comic Sans MS";
        sc.fillStyle = "white";
        sc.textAlign = "left";
        sc.fillText('[enter] - продолжить', 0, FIELD.height / 1.1);

    }
}

function drawNad() {
    if (NAD.imgIsLoad) {
        canvasContext.drawImage(NAD.img, NAD.x, NAD.y, NAD.width, NAD.height)
    }
}

function drawEmgyr() {
    if (EMGYR.imgIsLoad) {
        canvasContext.drawImage(EMGYR.img, EMGYR.x, EMGYR.y, EMGYR.width, EMGYR.height);
    }
}

function drawHome() {
    if (HOMESCENE.imgIsLoad) {
        canvasContext.drawImage(HOMESCENE.img, HOMESCENE.x, HOMESCENE.y, HOMESCENE.width, HOMESCENE.height)
    }
}

function drawMap() {
    if (MAP.imgIsLoad) {
        canvasContext.drawImage(MAP.img, MAP.x, MAP.y, MAP.width, MAP.height)

    }
}

function drawInventory() {
    if (INVENTORY.imgIsLoad) {
        canvasContext.drawImage(INVENTORY.img, INVENTORY.x, INVENTORY.y, INVENTORY.width, INVENTORY.height)

    }
}

function drawChel() {
    if (CHEL.imgIsLoad) {
        canvasContext.drawImage(CHEL.img, CHEL.x, CHEL.y, CHEL.width, CHEL.height)

    }
}

function drawNad2() {
    if (NAD.img2IsLoad) {
        canvasContext.drawImage(NAD.img2, 50, 100, NAD.width, NAD.height + 50)

    }
}

function drawSeller() {
    if (SELLER.imgIsLoad) {
        canvasContext.drawImage(SELLER.img, SELLER.x, SELLER.y, SELLER.width, SELLER.height)

    }
}

function drawBard() {
    if (BARD.imgIsLoad) {
        canvasContext.drawImage(BARD.img, BARD.x, BARD.y, BARD.width, BARD.height)

    }
}

function contactWithObject() {
    if ((PERS.x + PERS.width >= CAST.x) && (PERS.x - PERS.width <= CAST.x + CAST.width) && (PERS.y + PERS.height <= CAST.y + CAST.height) && (PERS.y >= CAST.y)) {
        drawNad();
        enter();
        p = 1;
    } else {
        p = 2;
    }
    if ((PERS.x >= 0) && (PERS.x <= 300) && (PERS.y <= MARKET.y + MARKET.height) && (PERS.y >= MARKET.y)) {
        drawNad2();
    }
    if ((PERS.x + PERS.width >= BARD.x) && (PERS.x - PERS.width <= BARD.x + BARD.width) && (PERS.y + PERS.height <= BARD.y + BARD.height) && (PERS.y >= BARD.y)) {
        bard = true;
        if (bards === 1) {
            eBard();
        }
        
        bards += 1;



    } else {
        if (bards != 1) {
            b += 1
        }
        if (b > 4) {
            b = 1
        }
        bards = 1
        bard = false;
        

    }
    if ((PERS.x + PERS.width >= CHEL.x) && (PERS.x - PERS.width <= CHEL.x + CHEL.width) && (PERS.y + PERS.height <= CHEL.y + CHEL.height) && (PERS.y >= CHEL.y)) {
        chel = true;
        if (chels === 1) {
            eChel();
        }
        chels += 1;

    } else {
        if (chels != 1) {
            c += 1
        }
        if (c > 2) {
            c = 1
        }
        chels = 1
        chel = false;


    }

    if ((PERS.x >= 0) && (PERS.x <= 100) && (PERS.y <= 200) && (PERS.y >= 50)) {
        sell = true;
        if (sells === 1) {
            eSell();
        }
        sells += 1;
    } else {
        if (sells != 1) {
            g += 1
        }
        if (g > 4) {
            g = 1
        }
        sells = 1
        sell = false;
    }
}

function enter() {
    window.addEventListener('keydown', (event) => {
        if ((event.key === 'Enter') && (p === 1)) {
            PERS.height = 360
            PERS.width = 360
            game.pressEnter = true;

        }
    });
}

function eMag() {
    if ((mags === 1) && (mag === true)) {
        window.addEventListener('keydown', (event) => {
            if ((event.key === 'e') && (mag === true)) {
                var audi = new Audio();

                var ss = 'mp3s/mag/' + m + '.mp3'
                audi.src = ss;
                console.log(m);
                audi.play();
                event.key = 0;
            }
        });
    }
}

function eBard() {

    if ((bards === 1) && (bard === true)) {
        window.addEventListener('keydown', (event) => {
            if ((event.key === 'e') && (bard === true)) {
                var audi = new Audio();

                var ss = 'mp3s/bard/' + b + '.mp3'
                audi.src = ss;
                console.log(ss);
                audi.play();
                event.key = 0;
            }
        });
    }
}

function eChel() {

    if ((chels === 1) && (chel === true)) {
        window.addEventListener('keydown', (event) => {
            if ((event.key === 'e') && (chel === true)) {
                var audi = new Audio(); // Создаём новый элемент Audio

                var ss = 'mp3s/chel/' + c + '.mp3'
                audi.src = ss;
                console.log(ss);
                audi.play();
                event.key = 0;
            }
        });
    }
}

function eSell() {

    if ((sells === 1) && (sell === true)) {
        window.addEventListener('keydown', (event) => {
            if ((event.key === 'e') && (sell === true)) {
                var audi = new Audio(); // Создаём новый элемент Audio

                var ss = 'mp3s/seller/' + g + '.mp3'
                audi.src = ss;
                console.log(ss);
                audi.play();
                event.key = 0;
            }
        });
    }
}

function audio() {
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'mp3s/game.mp3'; // Указываем путь к звуку "клика"
    audio.play();
} // Автоматически запускаем





function startgame() {
    

    if (a === 1) {
        


        if (s === 1) {
            drawMenu1();
            console.log(s);
        }
        



        if (s === 1) {
            window.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    a = 2;
                    event.key = 0;


                }
            });
            requestAnimationFrame(startgame);

        }



    }
    if (a === 2) {
        drawMenu4();
        if (z === 1) {
            au.src = 'mp3s/game.mp3';

            au.play()
            z = 2
        }
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                a = 3;


            }
        });
        requestAnimationFrame(startgame);
    }

    if (a === 3) {

        play();


        au.pause();

        // Создаём новый элемент Audio
        aud.src = 'mp3s/back.mp3'; // Указываем путь к звуку "клика"
        aud.play()
    }

}




initAll();

startgame();