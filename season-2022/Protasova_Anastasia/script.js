var GAME = {
    width: 1100,
    height: 700,
}

var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");
canvas.width = GAME.width;
canvas.height = GAME.height;

var BACKGROUND = new Image()
BACKGROUND.src = "./img/background2.jpg"

var ARROW1 = new Image()
ARROW1.src = "./img/arrow.png"
ARROW1.X = 0
ARROW1.Y = 350
ARROW1.height = 75
ARROW1.width = 235

var ARROW2 = new Image()
ARROW2.src = "./img/arrow.png"
ARROW2.X = 0
ARROW2.Y = 150
ARROW2.height = 75
ARROW2.width = 235

var ARROW3 = new Image()
ARROW3.src = "./img/arrow.png"
ARROW3.X = 0
ARROW3.Y = 600
ARROW3.height = 75
ARROW3.width = 235

var ARROW4 = new Image()
ARROW4.src = "./img/arrow.png"
ARROW4.X = 0
ARROW4.Y = 350
ARROW4.height = 75
ARROW4.width = 235

var ARROW5 = new Image()
ARROW5.src = "./img/arrow.png"
ARROW5.X = 0
ARROW5.Y = 120
ARROW5.height = 75
ARROW5.width = 235

var ARROW6 = new Image()
ARROW6.src = "./img/arrow.png"
ARROW6.X = 0
ARROW6.Y = 220
ARROW6.height = 75
ARROW6.width = 235

var ARROW7 = new Image()
ARROW7.src = "./img/arrow.png"
ARROW7.X = 0
ARROW7.Y = 580
ARROW7.height = 75
ARROW7.width = 235

var ARROW8 = new Image()
ARROW8.src = "./img/arrow.png"
ARROW8.X = 0
ARROW8.Y = 120
ARROW8.height = 75
ARROW8.width = 235

var ARROW9 = new Image()
ARROW9.src = "./img/arrow.png"
ARROW9.X = 0
ARROW9.Y = 600
ARROW9.height = 75
ARROW9.width = 235

var ARROW10 = new Image()
ARROW10.src = "./img/arrow.png"
ARROW10.X = 0
ARROW10.Y = 340
ARROW10.height = 75
ARROW10.width = 235

var ARROW11 = new Image()
ARROW11.src = "./img/arrow.png"
ARROW11.X = 0
ARROW11.Y = 450
ARROW11.height = 75
ARROW11.width = 235

var ARROW11 = new Image()
ARROW11.src = "./img/arrow.png"
ARROW11.X = 0
ARROW11.Y = 550
ARROW11.height = 75
ARROW11.width = 235

var ARROW12 = new Image()
ARROW12.src = "./img/arrow.png"
ARROW12.X = 0
ARROW12.Y = 120
ARROW12.height = 75
ARROW12.width = 235

var ARROW13 = new Image()
ARROW13.src = "./img/arrow.png"
ARROW13.X = 0
ARROW13.Y = 500
ARROW13.height = 75
ARROW13.width = 235

var ARROW14 = new Image()
ARROW14.src = "./img/arrow.png"
ARROW14.X = 0
ARROW14.Y = 450
ARROW14.height = 75
ARROW14.width = 235

var ARROW15 = new Image()
ARROW15.src = "./img/arrow.png"
ARROW15.X = 0
ARROW15.Y = 320
ARROW15.height = 75
ARROW15.width = 235

var ARROW16 = new Image()
ARROW16.src = "./img/arrow.png"
ARROW16.X = 0
ARROW16.Y = 520
ARROW16.height = 75
ARROW16.width = 235

var ARROW17 = new Image()
ARROW17.src = "./img/arrow.png"
ARROW17.X = 0
ARROW17.Y = 220
ARROW17.height = 75
ARROW17.width = 235

var ARROW18 = new Image()
ARROW18.src = "./img/arrow.png"
ARROW18.X = 0
ARROW18.Y = 350
ARROW18.height = 75
ARROW18.width = 235

var ARROW19 = new Image()
ARROW19.src = "./img/arrow.png"
ARROW19.X = 0
ARROW19.Y = 480
ARROW19.height = 75
ARROW19.width = 235

var ARROW20 = new Image()
ARROW20.src = "./img/arrow.png"
ARROW20.X = 0
ARROW20.Y = 500
ARROW20.height = 75
ARROW20.width = 235

var HEART1 = new Image();
HEART1.src = "./img/heart.png";
HEART1.X = 0
HEART1.Y = 0
HEART1.width = 50
HEART1.height = 50

var HEART2 = new Image();
HEART2.src = "./img/heart.png";
HEART2.X = 50
HEART2.Y = 0
HEART2.width = 50
HEART2.height = 50

var HEART3 = new Image();
HEART3.src = "./img/heart.png";
HEART3.X = 100
HEART3.Y = 0
HEART3.width = 50
HEART3.height = 50

var HEART4 = new Image();
HEART4.src = "./img/heart.png";
HEART4.X = 150
HEART4.Y = 0
HEART4.width = 50
HEART4.height = 50

var HEART5 = new Image();
HEART5.src = "./img/heart.png";
HEART5.X = 200
HEART5.Y = 0
HEART5.width = 50
HEART5.height = 50

var HeartScore = 0;

var TARGET = new Image();
TARGET.src = "./img/target.png";
TARGET.X = 920
TARGET.Y = 100
TARGET.width = 150
TARGET.height = 150
TARGET.score = 0

function drawArrow1() {
    canvasContext.drawImage(ARROW1, ARROW1.X, ARROW1.Y, ARROW1.width, ARROW1.height)
    ARROW1.X += 20
    if (ARROW1.Y >= TARGET.Y
        && ARROW1.Y + ARROW1.height <= TARGET.Y + TARGET.height
        && ARROW1.X + ARROW1.width === TARGET.X + TARGET.width / 2) {
        ARROW1.X = 2000;
        ARROW1.Y = 120;
        TARGET.score = TARGET.score + 1;
    }
}

function drawArrow2() {
    if (ARROW1.X > GAME.width) {
        canvasContext.drawImage(ARROW2, ARROW2.X, ARROW2.Y, ARROW2.width, ARROW2.height);
        ARROW2.X += 20
        if (ARROW2.Y >= TARGET.Y
            && ARROW2.Y + ARROW2.height <= TARGET.Y + TARGET.height
            && ARROW2.X + ARROW2.width === TARGET.X + TARGET.width / 2) {
            ARROW2.X = 2000;
            ARROW2.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow3() {
    if (ARROW2.X > GAME.width) {
        canvasContext.drawImage(ARROW3, ARROW3.X, ARROW3.Y, ARROW3.width, ARROW3.height);
        ARROW3.X += 20
        if (ARROW3.Y >= TARGET.Y
            && ARROW3.Y + ARROW3.height <= TARGET.Y + TARGET.height
            && ARROW3.X + ARROW3.width === TARGET.X + TARGET.width / 2) {
            ARROW3.X = 2000;
            ARROW3.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow4() {
    if (ARROW3.X > GAME.width) {
        canvasContext.drawImage(ARROW4, ARROW4.X, ARROW4.Y, ARROW4.width, ARROW4.height);
        ARROW4.X += 20
        if (ARROW4.Y >= TARGET.Y
            && ARROW4.Y + ARROW4.height <= TARGET.Y + TARGET.height
            && ARROW4.X + ARROW4.width === TARGET.X + TARGET.width / 2) {
            ARROW4.X = 2000;
            ARROW4.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow5() {
    if (ARROW4.X > GAME.width) {
        canvasContext.drawImage(ARROW5, ARROW5.X, ARROW5.Y, ARROW5.width, ARROW5.height);
        ARROW5.X += 20
        if (ARROW5.Y >= TARGET.Y
            && ARROW5.Y + ARROW5.height <= TARGET.Y + TARGET.height
            && ARROW5.X + ARROW5.width === TARGET.X + TARGET.width / 2) {
            ARROW5.X = 2000;
            ARROW5.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow6() {
    if (ARROW5.X > GAME.width) {
        canvasContext.drawImage(ARROW6, ARROW6.X, ARROW6.Y, ARROW6.width, ARROW6.height);
        ARROW6.X += 20
        if (ARROW6.Y >= TARGET.Y
            && ARROW6.Y + ARROW6.height <= TARGET.Y + TARGET.height
            && ARROW6.X + ARROW6.width === TARGET.X + TARGET.width / 2) {
            ARROW6.X = 2000;
            ARROW6.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow7() {
    if (ARROW6.X > GAME.width) {
        canvasContext.drawImage(ARROW7, ARROW7.X, ARROW7.Y, ARROW7.width, ARROW7.height);
        ARROW7.X += 20
        if (ARROW7.Y >= TARGET.Y
            && ARROW7.Y + ARROW7.height <= TARGET.Y + TARGET.height
            && ARROW7.X + ARROW7.width === TARGET.X + TARGET.width / 2) {
            ARROW7.X = 2000;
            ARROW7.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow8() {
    if (ARROW7.X > GAME.width) {
        canvasContext.drawImage(ARROW8, ARROW8.X, ARROW8.Y, ARROW8.width, ARROW8.height);
        ARROW8.X += 20
        if (ARROW8.Y >= TARGET.Y
            && ARROW8.Y + ARROW8.height <= TARGET.Y + TARGET.height
            && ARROW8.X + ARROW8.width === TARGET.X + TARGET.width / 2) {
            ARROW8.X = 2000;
            ARROW8.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow9() {
    if (ARROW8.X > GAME.width) {
        canvasContext.drawImage(ARROW9, ARROW9.X, ARROW9.Y, ARROW9.width, ARROW9.height);
        ARROW9.X += 20
        if (ARROW9.Y >= TARGET.Y
            && ARROW9.Y + ARROW9.height <= TARGET.Y + TARGET.height
            && ARROW9.X + ARROW9.width === TARGET.X + TARGET.width / 2) {
            ARROW9.X = 2000;
            ARROW9.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow10() {
    if (ARROW9.X > GAME.width) {
        canvasContext.drawImage(ARROW10, ARROW10.X, ARROW10.Y, ARROW10.width, ARROW10.height);
        ARROW10.X += 20
        if (ARROW10.Y >= TARGET.Y
            && ARROW10.Y + ARROW10.height <= TARGET.Y + TARGET.height
            && ARROW10.X + ARROW10.width === TARGET.X + TARGET.width / 2) {
            ARROW10.X = 2000;
            ARROW10.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow11() {
    if (ARROW10.X > GAME.width) {
        canvasContext.drawImage(ARROW11, ARROW11.X, ARROW11.Y, ARROW11.width, ARROW11.height);
        ARROW11.X += 20
        if (ARROW11.Y >= TARGET.Y
            && ARROW11.Y + ARROW11.height <= TARGET.Y + TARGET.height
            && ARROW11.X + ARROW11.width === TARGET.X + TARGET.width / 2) {
            ARROW11.X = 2000;
            ARROW11.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow12() {
    if (ARROW11.X > GAME.width) {
        canvasContext.drawImage(ARROW12, ARROW12.X, ARROW12.Y, ARROW12.width, ARROW12.height);
        ARROW12.X += 20
        if (ARROW12.Y >= TARGET.Y
            && ARROW12.Y + ARROW12.height <= TARGET.Y + TARGET.height
            && ARROW12.X + ARROW12.width === TARGET.X + TARGET.width / 2) {
            ARROW12.X = 2000;
            ARROW12.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow13() {
    if (ARROW12.X > GAME.width) {
        canvasContext.drawImage(ARROW13, ARROW13.X, ARROW13.Y, ARROW13.width, ARROW13.height);
        ARROW13.X += 20
        if (ARROW13.Y >= TARGET.Y
            && ARROW13.Y + ARROW13.height <= TARGET.Y + TARGET.height
            && ARROW13.X + ARROW13.width === TARGET.X + TARGET.width / 2) {
            ARROW13.X = 2000;
            ARROW13.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow14() {
    if (ARROW13.X > GAME.width) {
        canvasContext.drawImage(ARROW14, ARROW14.X, ARROW14.Y, ARROW14.width, ARROW14.height);
        ARROW14.X += 20
        if (ARROW14.Y >= TARGET.Y
            && ARROW14.Y + ARROW14.height <= TARGET.Y + TARGET.height
            && ARROW14.X + ARROW14.width === TARGET.X + TARGET.width / 2) {
            ARROW14.X = 2000;
            ARROW14.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow15() {
    if (ARROW14.X > GAME.width) {
        canvasContext.drawImage(ARROW15, ARROW15.X, ARROW15.Y, ARROW15.width, ARROW15.height);
        ARROW15.X += 20
        if (ARROW15.Y >= TARGET.Y
            && ARROW15.Y + ARROW15.height <= TARGET.Y + TARGET.height
            && ARROW15.X + ARROW15.width === TARGET.X + TARGET.width / 2) {
            ARROW15.X = 2000;
            ARROW15.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow16() {
    if (ARROW15.X > GAME.width) {
        canvasContext.drawImage(ARROW16, ARROW16.X, ARROW16.Y, ARROW16.width, ARROW16.height);
        ARROW16.X += 20
        if (ARROW16.Y >= TARGET.Y
            && ARROW16.Y + ARROW16.height <= TARGET.Y + TARGET.height
            && ARROW16.X + ARROW16.width === TARGET.X + TARGET.width / 2) {
            ARROW16.X = 2000;
            ARROW16.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow17() {
    if (ARROW16.X > GAME.width) {
        canvasContext.drawImage(ARROW17, ARROW17.X, ARROW17.Y, ARROW17.width, ARROW17.height);
        ARROW17.X += 20
        if (ARROW17.Y >= TARGET.Y
            && ARROW17.Y + ARROW17.height <= TARGET.Y + TARGET.height
            && ARROW17.X + ARROW17.width === TARGET.X + TARGET.width / 2) {
            ARROW17.X = 2000;
            ARROW17.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow18() {
    if (ARROW17.X > GAME.width) {
        canvasContext.drawImage(ARROW18, ARROW18.X, ARROW18.Y, ARROW18.width, ARROW18.height);
        ARROW18.X += 20
        if (ARROW18.Y >= TARGET.Y
            && ARROW18.Y + ARROW18.height <= TARGET.Y + TARGET.height
            && ARROW18.X + ARROW18.width === TARGET.X + TARGET.width / 2) {
            ARROW18.X = 2000;
            ARROW18.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow19() {
    if (ARROW18.X > GAME.width) {
        canvasContext.drawImage(ARROW19, ARROW19.X, ARROW19.Y, ARROW19.width, ARROW19.height);
        ARROW19.X += 20
        if (ARROW19.Y >= TARGET.Y
            && ARROW19.Y + ARROW19.height <= TARGET.Y + TARGET.height
            && ARROW19.X + ARROW19.width === TARGET.X + TARGET.width / 2) {
            ARROW19.X = 2000;
            ARROW19.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow20() {
    if (ARROW19.X > GAME.width) {
        canvasContext.drawImage(ARROW20, ARROW20.X, ARROW20.Y, ARROW20.width, ARROW20.height);
        ARROW20.X += 20
        if (ARROW20.Y >= TARGET.Y
            && ARROW20.Y + ARROW20.height <= TARGET.Y + TARGET.height
            && ARROW20.X + ARROW20.width === TARGET.X + TARGET.width / 2) {
            ARROW20.X = 2000;
            ARROW20.Y = 120;
            TARGET.score = TARGET.score + 1;
        }
    }
}

function drawArrow() {
    drawArrow1();
    drawArrow2();
    drawArrow3();
    drawArrow4();
    drawArrow5();
    drawArrow6();
    drawArrow7();
    drawArrow8();
    drawArrow9();
    drawArrow10();
    drawArrow11();
    drawArrow12();
    drawArrow13();
    drawArrow14();
    drawArrow15();
    drawArrow16();
    drawArrow17();
    drawArrow18();
    drawArrow19();
    drawArrow20();
}

function drawBackground() {
    canvasContext.fillStyle = "#F5F0E1";
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
    canvasContext.drawImage(BACKGROUND, 0, 0, GAME.width, GAME.height)
}

function drawHeart1() {
    canvasContext.drawImage(HEART1, HEART1.X, HEART1.Y, HEART1.width, HEART1.height);
}

function drawHeart2() {
    canvasContext.drawImage(HEART2, HEART2.X, HEART2.Y, HEART2.width, HEART2.height);
}

function drawHeart3() {
    canvasContext.drawImage(HEART3, HEART3.X, HEART3.Y, HEART3.width, HEART3.height);
}

function drawHeart4() {
    canvasContext.drawImage(HEART4, HEART4.X, HEART4.Y, HEART4.width, HEART4.height);
}

function drawHeart5() {
    canvasContext.drawImage(HEART5, HEART5.X, HEART5.Y, HEART5.width, HEART5.height);
}

function drawHeart() {
    drawHeart1();
    drawHeart2();
    drawHeart3();
    drawHeart4();
    drawHeart5();
}

function drawTarget() {
    canvasContext.drawImage(TARGET, TARGET.X, TARGET.Y, TARGET.width, TARGET.height);
}

function initEventListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove);
}

function onCanvasMouseMove(event) {
    TARGET.Y = event.clientY;
    if (TARGET.Y < 50) {
        TARGET.Y = 50;
    }
    if (TARGET.Y > GAME.height) {
        TARGET.Y = GAME.height - TARGET.height;
    }
}

function drawTargetScore() {
    canvasContext.font = "32px Arial";
    canvasContext.fillText("Score: " + TARGET.score, 950, 50);
}

function heartScore() {
    if (ARROW1.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW2.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW3.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW4.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW5.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW6.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW7.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW8.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW9.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW10.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW11.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW12.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW13.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW14.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW15.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW16.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW17.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW18.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW19.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
    if (ARROW20.X === GAME.width) {
        HeartScore = HeartScore + 1;
    }
}

function drawHeartScore() {
    if (HeartScore === 1) {
        HEART5.X = 2000;
    }
    if (HeartScore === 2) {
        HEART4.X = 2000;
    }
    if (HeartScore === 3) {
        HEART3.X = 2000;
    }
    if (HeartScore === 4) {
        HEART2.X = 2000;
    }
    if (HeartScore === 5) {
        HEART1.X = 2000;
    }
}

function gameOver() {
    if (HeartScore === 5) {
        TARGET.X = 2000;
        ARROW5.X = 2000;
        ARROW6.X = 2000;
        ARROW7.X = 2000;
        ARROW8.X = 2000;
        ARROW9.X = 2000;
        ARROW10.X = 2000;
        ARROW11.X = 2000;
        ARROW12.X = 2000;
        ARROW13.X = 2000;
        ARROW14.X = 2000;
        ARROW15.X = 2000;
        ARROW16.X = 2000;
        ARROW17.X = 2000;
        ARROW18.X = 2000;
        ARROW19.X = 2000;
        ARROW20.X = 2000;
        canvasContext.font = "100px Arial"
        canvasContext.fillStyle = "Red"
        canvasContext.fillText("YOU LOST", 280, 350)
    }
    if (ARROW20.X >= GAME.width
        && TARGET.score < 20
        && HeartScore < 5) {
        TARGET.X = 2000;
        HEART1.X = 2000;
        HEART2.X = 2000;
        HEART3.X = 2000;
        HEART4.X = 2000;
        canvasContext.font = "100px Arial"
        canvasContext.fillStyle = "Red"
        canvasContext.fillText("GAME OVER", 230, 350)
    }
}

function youWin() {
    if (TARGET.score === 20) {
        HEART1.X = 2000;
        HEART2.X = 2000;
        HEART3.X = 2000;
        HEART4.X = 2000;
        HEART5.X = 2000;
        TARGET.X = 2000;
        canvasContext.font = "100px Arial"
        canvasContext.fillStyle = "Red"
        canvasContext.fillText("YOU WIN", 310, 350)
    }
}

function play() {
    drawBackground();
    drawTargetScore();
    drawTarget();
    drawArrow();
    drawHeart();
    heartScore();
    drawHeartScore();
    gameOver();
    youWin();
    requestAnimationFrame(play)
}
initEventListeners();
play();
