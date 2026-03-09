var GAME = {
    width: 1200,
    height: 800,
    background: "black"
}

var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d")
var canvasWidth = GAME.width;
var canvasHeight = GAME.height;
canvas.width = canvasWidth
canvas.height = canvasHeight


var rDerection = 0
var Result = 0
var R = 0
var B = 0
var G = 0
var R2 = 0
var B2 = 0
var G2 = 0
var R3 = 0
var B3 = 0
var G3 = 0
var R4 = 0
var B4 = 0
var G4 = 0
var R5 = 0
var B5 = 0
var G5 = 0
var count = 0
var level = 1
var life = 3
var Block1 = 0
var Block2 = 0
var Block3 = 0
var Block4 = 0
var Block5 = 0
var Block6 = 0
var Block7 = 0
var Block8 = 0
var Block9 = 0
var Block10 = 0
var Block11 = 0
var Block12 = 0
var Block13 = 0
var Block14 = 0
var Block15 = 0
var Block16 = 0
var Block17 = 0
var Block18 = 0
var Block19 = 0
var Block20 = 0
var Block21 = 0
var Block22 = 0
var Block23 = 0
var Block24 = 0
var Block25 = 0
var Block26 = 0
var Block27 = 0
var Block28 = 0
var SP1 = 0
var SP2 = 0
var SP3 = 0
var SP4 = 0
var SP5 = 0
var SP6 = 0
var SP7 = 0
var SP8 = 0
var SP9 = 0
var RACKET = {
    color: "rgb(" + R3 + "," + G3 + "," + B3 + ")",
    x: 325,
    y: 750,
    width: 150,
    height: 15,
    xDerection: 60,
}
var BALL = {
    x: 600,
    y: 400,
    radius: 10,
    xDerection: 5,
    yDerection: 10,
}
var BLOCK = {
    width: 100,
    height: 33
}

function getRandomLevel2(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    Result = Math.floor(Math.random() * (max - min)) + min
}

function getRandomRGB(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    R = Math.floor(Math.random() * (max - min)) + min
    G = Math.floor(Math.random() * (max - min)) + min
    B = Math.floor(Math.random() * (max - min)) + min
}

function getRandomRGB2(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    R2 = Math.floor(Math.random() * (max - min)) + min
    G2 = Math.floor(Math.random() * (max - min)) + min
    B2 = Math.floor(Math.random() * (max - min)) + min
}

function getRandomRGB3(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    R3 = Math.floor(Math.random() * (max - min)) + min
    G3 = Math.floor(Math.random() * (max - min)) + min
    B3 = Math.floor(Math.random() * (max - min)) + min
}

function getRandomRGB4(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    R4 = Math.floor(Math.random() * (max - min)) + min
    G4 = Math.floor(Math.random() * (max - min)) + min
    B4 = Math.floor(Math.random() * (max - min)) + min
}

function getRandomRGB5(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    R5 = Math.floor(Math.random() * (max - min)) + min
    G5 = Math.floor(Math.random() * (max - min)) + min
    B5 = Math.floor(Math.random() * (max - min)) + min
}

function updateBall() {
    BALL.y += BALL.yDerection
    BALL.x += BALL.xDerection
    if ((BALL.y - BALL.radius <= 0)) {
        BALL.yDerection = -BALL.yDerection
        getRandomRGB2(0, 255)
        RACKET.color = "rgb(" + R2 + "," + G2 + "," + B2 + ")"
    }
    if ((BALL.x + BALL.radius >= GAME.width) || (BALL.x - BALL.radius <= 0)) {
        BALL.xDerection = -BALL.xDerection
        getRandomRGB2(0, 255)
        getRandomRGB3(0, 255)
        RACKET.color = "rgb(" + R3 + "," + G3 + "," + B3 + ")"
    }

    var racketTop = BALL.y + BALL.radius > RACKET.y
    var racketLeft = BALL.x + BALL.radius > RACKET.x
    var racketRight = BALL.x - BALL.radius < RACKET.x + RACKET.width
    var racketDown = BALL.y - BALL.radius < RACKET.y + RACKET.height
    if (racketTop && racketLeft && racketRight && racketDown) {
        BALL.yDerection = -BALL.yDerection - 0.2
        if (BALL.x + BALL.radius > RACKET.x + 75) {
            BALL.xDerection = -BALL.xDerection + 0.2
        } else {
            BALL.xDerection = BALL.xDerection + 0.2
        }
        getRandomRGB3(0, 255)
        RACKET.color = "rgb(" + R3 + "," + G3 + "," + B3 + ")"
        getRandomRGB4(0, 255)
        getRandomRGB5(0, 255)

    }
    if (BALL.y + BALL.radius >= GAME.height) {
        if (life > 0) {
            life -= 1
            BALL.x = RACKET.x
            BALL.y = 400
            BALL.xDerection = 8
            BALL.yDerection = 10
        } else {
            alert("Вы проиграли! Ваш счёт: " + count)
        }
    }
    if (level === 1) {
        if (Block1 === 0) {
            var Block1Top = BALL.y + BALL.radius > 50
            var Block1Left = BALL.x + BALL.radius > 250
            var Block1Right = BALL.x - BALL.radius < 350
            var Block1Down = BALL.y - BALL.radius < 83
            if (Block1Top && Block1Left && Block1Right && Block1Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 300) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(250, 50, BLOCK.width, BLOCK.height);
                Block1 = 1
                count += 10
            }
        }
        if (Block2 === 0) {
            var Block2Top = BALL.y + BALL.radius > 50
            var Block2Left = BALL.x + BALL.radius > 350
            var Block2Right = BALL.x - BALL.radius < 450
            var Block2Down = BALL.y - BALL.radius < 83
            if (Block2Top && Block2Left && Block2Right && Block2Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 400) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(350, 50, BLOCK.width, BLOCK.height);
                Block2 = 1
                count += 10
            }
        }

        if (Block3 === 0) {
            var Block3Top = BALL.y + BALL.radius > 50
            var Block3Left = BALL.x + BALL.radius > 450
            var Block3Right = BALL.x - BALL.radius < 550
            var Block3Down = BALL.y - BALL.radius < 83
            if (Block3Top && Block3Left && Block3Right && Block3Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 500) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(450, 50, BLOCK.width, BLOCK.height);
                Block3 = 1
                count += 10
            }
        }

        if (Block4 === 0) {
            var Block4Top = BALL.y + BALL.radius > 50
            var Block4Left = BALL.x + BALL.radius > 550
            var Block4Right = BALL.x - BALL.radius < 650
            var Block4Down = BALL.y - BALL.radius < 83
            if (Block4Top && Block4Left && Block4Right && Block4Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 600) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(550, 50, BLOCK.width, BLOCK.height);
                Block4 = 1
                count += 10
            }
        }

        if (Block5 === 0) {
            var Block5Top = BALL.y + BALL.radius > 50
            var Block5Left = BALL.x + BALL.radius > 650
            var Block5Right = BALL.x - BALL.radius < 750
            var Block5Down = BALL.y - BALL.radius < 83
            if (Block5Top && Block5Left && Block5Right && Block5Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 700) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(650, 50, BLOCK.width, BLOCK.height);
                Block5 = 1
                count += 10
            }
        }

        if (Block6 === 0) {
            var Block6Top = BALL.y + BALL.radius > 50
            var Block6Left = BALL.x + BALL.radius > 750
            var Block6Right = BALL.x - BALL.radius < 850
            var Block6Down = BALL.y - BALL.radius < 83
            if (Block6Top && Block6Left && Block6Right && Block6Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 800) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(750, 50, BLOCK.width, BLOCK.height);
                Block6 = 1
                count += 10
            }
        }

        if (Block7 === 0) {
            var Block7Top = BALL.y + BALL.radius > 50
            var Block7Left = BALL.x + BALL.radius > 850
            var Block7Right = BALL.x - BALL.radius < 950
            var Block7Down = BALL.y - BALL.radius < 83
            if (Block7Top && Block7Left && Block7Right && Block7Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 900) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(850, 50, BLOCK.width, BLOCK.height);
                Block7 = 1
                count += 10
            }
        }

        if (Block8 === 0) {
            var Block8Top = BALL.y + BALL.radius > 90
            var Block8Left = BALL.x + BALL.radius > 300
            var Block8Right = BALL.x - BALL.radius < 400
            var Block8Down = BALL.y - BALL.radius < 123
            if (Block8Top && Block8Left && Block8Right && Block8Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 350) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(300, 90, BLOCK.width, BLOCK.height);
                Block8 = 1
                count += 10
            }
        }

        if (Block9 === 0) {
            var Block9Top = BALL.y + BALL.radius > 90
            var Block9Left = BALL.x + BALL.radius > 400
            var Block9Right = BALL.x - BALL.radius < 500
            var Block9Down = BALL.y - BALL.radius < 123
            if (Block9Top && Block9Left && Block9Right && Block9Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 450) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(400, 90, BLOCK.width, BLOCK.height);
                Block9 = 1
                count += 10
            }
        }

        if (Block10 === 0) {
            var Block10Top = BALL.y + BALL.radius > 90
            var Block10Left = BALL.x + BALL.radius > 500
            var Block10Right = BALL.x - BALL.radius < 600
            var Block10Down = BALL.y - BALL.radius < 123
            if (Block10Top && Block10Left && Block10Right && Block10Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 550) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(500, 90, BLOCK.width, BLOCK.height);
                Block10 = 1
                count += 10
            }
        }

        if (Block11 === 0) {
            var Block11Top = BALL.y + BALL.radius > 90
            var Block11Left = BALL.x + BALL.radius > 600
            var Block11Right = BALL.x - BALL.radius < 700
            var Block11Down = BALL.y - BALL.radius < 123
            if (Block11Top && Block11Left && Block11Right && Block11Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 650) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(600, 90, BLOCK.width, BLOCK.height);
                Block11 = 1
                count += 10
            }
        }

        if (Block12 === 0) {
            var Block12Top = BALL.y + BALL.radius > 90
            var Block12Left = BALL.x + BALL.radius > 700
            var Block12Right = BALL.x - BALL.radius < 800
            var Block12Down = BALL.y - BALL.radius < 123
            if (Block12Top && Block12Left && Block12Right && Block12Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 750) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(700, 90, BLOCK.width, BLOCK.height);
                Block12 = 1
                count += 10
            }
        }

        if (Block13 === 0) {
            var Block13Top = BALL.y + BALL.radius > 90
            var Block13Left = BALL.x + BALL.radius > 800
            var Block13Right = BALL.x - BALL.radius < 900
            var Block13Down = BALL.y - BALL.radius < 123
            if (Block13Top && Block13Left && Block13Right && Block13Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 850) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(800, 90, BLOCK.width, BLOCK.height);
                Block13 = 1
                count += 10
            }
        }

        if (Block14 === 0) {
            var Block14Top = BALL.y + BALL.radius > 130
            var Block14Left = BALL.x + BALL.radius > 350
            var Block14Right = BALL.x - BALL.radius < 450
            var Block14Down = BALL.y - BALL.radius < 163
            if (Block14Top && Block14Left && Block14Right && Block14Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 400) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(350, 130, BLOCK.width, BLOCK.height);
                Block14 = 1
                count += 10
            }
        }

        if (Block15 === 0) {
            var Block15Top = BALL.y + BALL.radius > 130
            var Block15Left = BALL.x + BALL.radius > 450
            var Block15Right = BALL.x - BALL.radius < 550
            var Block15Down = BALL.y - BALL.radius < 163
            if (Block15Top && Block15Left && Block15Right && Block15Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 500) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(450, 130, BLOCK.width, BLOCK.height);
                Block15 = 1
                count += 10
            }
        }

        if (Block16 === 0) {
            var Block16Top = BALL.y + BALL.radius > 130
            var Block16Left = BALL.x + BALL.radius > 550
            var Block16Right = BALL.x - BALL.radius < 650
            var Block16Down = BALL.y - BALL.radius < 163
            if (Block16Top && Block16Left && Block16Right && Block16Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 600) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(550, 130, BLOCK.width, BLOCK.height);
                Block16 = 1
                count += 10
            }
        }

        if (Block17 === 0) {
            var Block17Top = BALL.y + BALL.radius > 130
            var Block17Left = BALL.x + BALL.radius > 650
            var Block17Right = BALL.x - BALL.radius < 750
            var Block17Down = BALL.y - BALL.radius < 163
            if (Block17Top && Block17Left && Block17Right && Block17Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 700) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(650, 130, BLOCK.width, BLOCK.height);
                Block17 = 1
                count += 10
            }
        }

        if (Block18 === 0) {
            var Block18Top = BALL.y + BALL.radius > 130
            var Block18Left = BALL.x + BALL.radius > 750
            var Block18Right = BALL.x - BALL.radius < 850
            var Block18Down = BALL.y - BALL.radius < 163
            if (Block18Top && Block18Left && Block18Right && Block18Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 800) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(750, 130, BLOCK.width, BLOCK.height);
                Block18 = 1
                count += 10
            }
        }

        if (Block19 === 0) {
            var Block19Top = BALL.y + BALL.radius > 170
            var Block19Left = BALL.x + BALL.radius > 400
            var Block19Right = BALL.x - BALL.radius < 500
            var Block19Down = BALL.y - BALL.radius < 203
            if (Block19Top && Block19Left && Block19Right && Block19Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 450) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(400, 170, BLOCK.width, BLOCK.height);
                Block19 = 1
                count += 10
            }
        }

        if (Block20 === 0) {
            var Block20Top = BALL.y + BALL.radius > 170
            var Block20Left = BALL.x + BALL.radius > 500
            var Block20Right = BALL.x - BALL.radius < 600
            var Block20Down = BALL.y - BALL.radius < 203
            if (Block20Top && Block20Left && Block20Right && Block20Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 550) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(500, 170, BLOCK.width, BLOCK.height);
                Block20 = 1
                count += 10
            }
        }

        if (Block21 === 0) {
            var Block21Top = BALL.y + BALL.radius > 170
            var Block21Left = BALL.x + BALL.radius > 600
            var Block21Right = BALL.x - BALL.radius < 700
            var Block21Down = BALL.y - BALL.radius < 203
            if (Block21Top && Block21Left && Block21Right && Block21Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 650) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(600, 170, BLOCK.width, BLOCK.height);
                Block21 = 1
                count += 10
            }
        }

        if (Block22 === 0) {
            var Block22Top = BALL.y + BALL.radius > 170
            var Block22Left = BALL.x + BALL.radius > 700
            var Block22Right = BALL.x - BALL.radius < 800
            var Block22Down = BALL.y - BALL.radius < 203
            if (Block22Top && Block22Left && Block22Right && Block22Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 750) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(700, 170, BLOCK.width, BLOCK.height);
                Block22 = 1
                count += 10
            }
        }

        if (Block23 === 0) {
            var Block23Top = BALL.y + BALL.radius > 210
            var Block23Left = BALL.x + BALL.radius > 450
            var Block23Right = BALL.x - BALL.radius < 550
            var Block23Down = BALL.y - BALL.radius < 243
            if (Block23Top && Block23Left && Block23Right && Block23Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 500) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(450, 210, BLOCK.width, BLOCK.height);
                Block23 = 1
                count += 10
            }
        }

        if (Block24 === 0) {
            var Block24Top = BALL.y + BALL.radius > 210
            var Block24Left = BALL.x + BALL.radius > 550
            var Block24Right = BALL.x - BALL.radius < 650
            var Block24Down = BALL.y - BALL.radius < 243
            if (Block24Top && Block24Left && Block24Right && Block24Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 600) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(550, 210, BLOCK.width, BLOCK.height);
                Block24 = 1
                count += 10
            }
        }

        if (Block25 === 0) {
            var Block25Top = BALL.y + BALL.radius > 210
            var Block25Left = BALL.x + BALL.radius > 650
            var Block25Right = BALL.x - BALL.radius < 750
            var Block25Down = BALL.y - BALL.radius < 243
            if (Block25Top && Block25Left && Block25Right && Block25Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 700) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(650, 210, BLOCK.width, BLOCK.height);
                Block25 = 1
                count += 10
            }
        }

        if (Block26 === 0) {
            var Block26Top = BALL.y + BALL.radius > 250
            var Block26Left = BALL.x + BALL.radius > 500
            var Block26Right = BALL.x - BALL.radius < 600
            var Block26Down = BALL.y - BALL.radius < 283
            if (Block26Top && Block26Left && Block26Right && Block26Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 550) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(500, 250, BLOCK.width, BLOCK.height);
                Block26 = 1
                count += 10
            }
        }

        if (Block27 === 0) {
            var Block27Top = BALL.y + BALL.radius > 250
            var Block27Left = BALL.x + BALL.radius > 600
            var Block27Right = BALL.x - BALL.radius < 700
            var Block27Down = BALL.y - BALL.radius < 283
            if (Block27Top && Block27Left && Block27Right && Block27Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 650) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(600, 250, BLOCK.width, BLOCK.height);
                Block27 = 1
                count += 10
            }
        }

        if (Block28 === 0) {
            var Block28Top = BALL.y + BALL.radius > 290
            var Block28Left = BALL.x + BALL.radius > 550
            var Block28Right = BALL.x - BALL.radius < 650
            var Block28Down = BALL.y - BALL.radius < 323
            if (Block28Top && Block28Left && Block28Right && Block28Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 600) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(550, 290, BLOCK.width, BLOCK.height);
                Block28 = 1
                count += 10
            }
        }
    }

    if (level === 2) {
        if (Block1 === 0) {
            var Block1Top = BALL.y + BALL.radius > 50
            var Block1Left = BALL.x + BALL.radius > 250
            var Block1Right = BALL.x - BALL.radius < 350
            var Block1Down = BALL.y - BALL.radius < 83
            if (Block1Top && Block1Left && Block1Right && Block1Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 300) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(250, 50, BLOCK.width, BLOCK.height);
                Block1 = 1
                count += 10
            }
        }
        if (Block2 === 0) {
            var Block2Top = BALL.y + BALL.radius > 50
            var Block2Left = BALL.x + BALL.radius > 350
            var Block2Right = BALL.x - BALL.radius < 450
            var Block2Down = BALL.y - BALL.radius < 83
            if (Block2Top && Block2Left && Block2Right && Block2Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 400) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(350, 50, BLOCK.width, BLOCK.height);
                Block2 = 1
                count += 10
            }
        }

        if (Block3 === 0) {
            var Block3Top = BALL.y + BALL.radius > 50
            var Block3Left = BALL.x + BALL.radius > 450
            var Block3Right = BALL.x - BALL.radius < 550
            var Block3Down = BALL.y - BALL.radius < 83
            if (Block3Top && Block3Left && Block3Right && Block3Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 500) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(450, 50, BLOCK.width, BLOCK.height);
                Block3 = 1
                count += 10
            }
        }

        if (Block4 === 0) {
            var Block4Top = BALL.y + BALL.radius > 50
            var Block4Left = BALL.x + BALL.radius > 550
            var Block4Right = BALL.x - BALL.radius < 650
            var Block4Down = BALL.y - BALL.radius < 83
            if (Block4Top && Block4Left && Block4Right && Block4Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 600) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(550, 50, BLOCK.width, BLOCK.height);
                Block4 = 1
                count += 10
            }
        }

        if (Block5 === 0) {
            var Block5Top = BALL.y + BALL.radius > 50
            var Block5Left = BALL.x + BALL.radius > 650
            var Block5Right = BALL.x - BALL.radius < 750
            var Block5Down = BALL.y - BALL.radius < 83
            if (Block5Top && Block5Left && Block5Right && Block5Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 700) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(650, 50, BLOCK.width, BLOCK.height);
                Block5 = 1
                count += 10
            }
        }

        if (Block6 === 0) {
            var Block6Top = BALL.y + BALL.radius > 50
            var Block6Left = BALL.x + BALL.radius > 750
            var Block6Right = BALL.x - BALL.radius < 850
            var Block6Down = BALL.y - BALL.radius < 83
            if (Block6Top && Block6Left && Block6Right && Block6Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 800) {
                    BALL.xDerection = -BALL.xDerection
                }
                SP1 += 1
                if (SP1 === 2) {
                    canvasContext.clearRect(750, 50, BLOCK.width, BLOCK.height);
                    Block6 = 1
                    count += 10
                    getRandomLevel2(0, 3)
                    if (Result === 0) {
                        canvasContext.clearRect(850, 50, BLOCK.width, BLOCK.height);
                        Block7 = 1
                        count += 10
                        canvasContext.clearRect(650, 50, BLOCK.width, BLOCK.height);
                        Block5 = 1
                        count += 10
                    } else if (Result === 1) {
                        canvasContext.clearRect(850, 50, BLOCK.width, BLOCK.height);
                        Block7 = 1
                        count += 10
                        canvasContext.clearRect(650, 50, BLOCK.width, BLOCK.height);
                        Block5 = 1
                        count += 10
                        canvasContext.clearRect(700, 90, BLOCK.width, BLOCK.height);
                        Block12 = 1
                        count += 10
                        canvasContext.clearRect(800, 90, BLOCK.width, BLOCK.height);
                        Block13 = 1
                        count += 10
                    } else if (Result === 2) {
                        if (life === 0) {
                            alert("Вы проиграли! Ваш счёт: " + count)
                        } else {
                            life -= 1
                        }
                    } else if (Result === 3) {
                        canvasContext.fillStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
                        canvasContext.fillRect(750, 48.5, BLOCK.width, BLOCK.height + 3);
                        Block6 = 0
                        SP1 = 0
                        getRandomLevel2(0, 3)
                    }

                }
            }
        }

        if (Block7 === 0) {
            var Block7Top = BALL.y + BALL.radius > 50
            var Block7Left = BALL.x + BALL.radius > 850
            var Block7Right = BALL.x - BALL.radius < 950
            var Block7Down = BALL.y - BALL.radius < 83
            if (Block7Top && Block7Left && Block7Right && Block7Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 900) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(850, 50, BLOCK.width, BLOCK.height);
                Block7 = 1
                count += 10
            }
        }

        if (Block8 === 0) {
            var Block8Top = BALL.y + BALL.radius > 90
            var Block8Left = BALL.x + BALL.radius > 300
            var Block8Right = BALL.x - BALL.radius < 400
            var Block8Down = BALL.y - BALL.radius < 123
            if (Block8Top && Block8Left && Block8Right && Block8Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 350) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(300, 90, BLOCK.width, BLOCK.height);
                Block8 = 1
                count += 10
            }
        }

        if (Block9 === 0) {
            var Block9Top = BALL.y + BALL.radius > 90
            var Block9Left = BALL.x + BALL.radius > 400
            var Block9Right = BALL.x - BALL.radius < 500
            var Block9Down = BALL.y - BALL.radius < 123
            if (Block9Top && Block9Left && Block9Right && Block9Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 450) {
                    BALL.xDerection = -BALL.xDerection
                }
                SP2 += 1
                if (SP2 === 2) {
                    canvasContext.clearRect(400, 90, BLOCK.width, BLOCK.height);
                    Block9 = 1
                    count += 10
                    getRandomLevel2(0, 3)
                    if (Result === 0) {
                        canvasContext.clearRect(300, 90, BLOCK.width, BLOCK.height);
                        Block8 = 1
                        count += 10
                        canvasContext.clearRect(500, 90, BLOCK.width, BLOCK.height);
                        Block10 = 1
                        count += 10
                    } else if (Result === 1) {
                        canvasContext.clearRect(300, 90, BLOCK.width, BLOCK.height);
                        Block8 = 1
                        count += 10
                        canvasContext.clearRect(500, 90, BLOCK.width, BLOCK.height);
                        Block10 = 1
                        count += 10
                        canvasContext.clearRect(350, 50, BLOCK.width, BLOCK.height);
                        Block2 = 1
                        count += 10
                        canvasContext.clearRect(450, 50, BLOCK.width, BLOCK.height);
                        Block3 = 1
                        count += 10
                        canvasContext.clearRect(350, 130, BLOCK.width, BLOCK.height);
                        Block14 = 1
                        count += 10
                        canvasContext.clearRect(450, 130, BLOCK.width, BLOCK.height);
                        Block15 = 1
                        count += 10
                    } else if (Result === 2) {
                        if (life === 0) {
                            alert("Вы проиграли! Ваш счёт: " + count)
                        } else {
                            life -= 1
                        }
                    } else if (Result === 3) {
                        canvasContext.fillStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
                        canvasContext.fillRect(400, 88.5, BLOCK.width, BLOCK.height + 3);
                        Block9 = 0
                        SP2 = 0
                        getRandomLevel2(0, 3)
                    }
                }
            }
        }

        if (Block10 === 0) {
            var Block10Top = BALL.y + BALL.radius > 90
            var Block10Left = BALL.x + BALL.radius > 500
            var Block10Right = BALL.x - BALL.radius < 600
            var Block10Down = BALL.y - BALL.radius < 123
            if (Block10Top && Block10Left && Block10Right && Block10Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 550) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(500, 90, BLOCK.width, BLOCK.height);
                Block10 = 1
                count += 10
            }
        }

        if (Block11 === 0) {
            var Block11Top = BALL.y + BALL.radius > 90
            var Block11Left = BALL.x + BALL.radius > 600
            var Block11Right = BALL.x - BALL.radius < 700
            var Block11Down = BALL.y - BALL.radius < 123
            if (Block11Top && Block11Left && Block11Right && Block11Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 650) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(600, 90, BLOCK.width, BLOCK.height);
                Block11 = 1
                count += 10
            }
        }

        if (Block12 === 0) {
            var Block12Top = BALL.y + BALL.radius > 90
            var Block12Left = BALL.x + BALL.radius > 700
            var Block12Right = BALL.x - BALL.radius < 800
            var Block12Down = BALL.y - BALL.radius < 123
            if (Block12Top && Block12Left && Block12Right && Block12Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 750) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(700, 90, BLOCK.width, BLOCK.height);
                Block12 = 1
                count += 10
            }
        }

        if (Block13 === 0) {
            var Block13Top = BALL.y + BALL.radius > 90
            var Block13Left = BALL.x + BALL.radius > 800
            var Block13Right = BALL.x - BALL.radius < 900
            var Block13Down = BALL.y - BALL.radius < 123
            if (Block13Top && Block13Left && Block13Right && Block13Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 850) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(800, 90, BLOCK.width, BLOCK.height);
                Block13 = 1
                count += 10
            }
        }

        if (Block14 === 0) {
            var Block14Top = BALL.y + BALL.radius > 130
            var Block14Left = BALL.x + BALL.radius > 350
            var Block14Right = BALL.x - BALL.radius < 450
            var Block14Down = BALL.y - BALL.radius < 163
            if (Block14Top && Block14Left && Block14Right && Block14Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 400) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(350, 130, BLOCK.width, BLOCK.height);
                Block14 = 1
                count += 10
            }
        }

        if (Block15 === 0) {
            var Block15Top = BALL.y + BALL.radius > 130
            var Block15Left = BALL.x + BALL.radius > 450
            var Block15Right = BALL.x - BALL.radius < 550
            var Block15Down = BALL.y - BALL.radius < 163
            if (Block15Top && Block15Left && Block15Right && Block15Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 500) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(450, 130, BLOCK.width, BLOCK.height);
                Block15 = 1
                count += 10
            }
        }

        if (Block16 === 0) {
            var Block16Top = BALL.y + BALL.radius > 130
            var Block16Left = BALL.x + BALL.radius > 550
            var Block16Right = BALL.x - BALL.radius < 650
            var Block16Down = BALL.y - BALL.radius < 163
            if (Block16Top && Block16Left && Block16Right && Block16Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 600) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(550, 130, BLOCK.width, BLOCK.height);
                Block16 = 1
                count += 10
            }
        }

        if (Block17 === 0) {
            var Block17Top = BALL.y + BALL.radius > 130
            var Block17Left = BALL.x + BALL.radius > 650
            var Block17Right = BALL.x - BALL.radius < 750
            var Block17Down = BALL.y - BALL.radius < 163
            if (Block17Top && Block17Left && Block17Right && Block17Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 700) {
                    BALL.xDerection = -BALL.xDerection
                }
                SP3 += 1
                if (SP3 === 2) {
                    canvasContext.clearRect(650, 130, BLOCK.width, BLOCK.height);
                    Block17 = 1
                    count += 10
                    getRandomLevel2(0, 3)
                    if (Result === 0) {
                        canvasContext.clearRect(550, 130, BLOCK.width, BLOCK.height);
                        Block16 = 1
                        count += 10
                        canvasContext.clearRect(750, 130, BLOCK.width, BLOCK.height);
                        Block18 = 1
                        count += 10
                    } else if (Result === 1) {
                        canvasContext.clearRect(550, 130, BLOCK.width, BLOCK.height);
                        Block16 = 1
                        count += 10
                        canvasContext.clearRect(750, 130, BLOCK.width, BLOCK.height);
                        Block18 = 1
                        count += 10
                        canvasContext.clearRect(600, 90, BLOCK.width, BLOCK.height);
                        Block11 = 1
                        count += 10
                        canvasContext.clearRect(700, 90, BLOCK.width, BLOCK.height);
                        Block12 = 1
                        count += 10
                        canvasContext.clearRect(600, 170, BLOCK.width, BLOCK.height);
                        Block21 = 1
                        count += 10
                        canvasContext.clearRect(700, 170, BLOCK.width, BLOCK.height);
                        Block22 = 1
                        count += 10
                    } else if (Result === 2) {
                        if (life === 0) {
                            alert("Вы проиграли! Ваш счёт: " + count)
                        } else {
                            life -= 1
                        }
                    } else if (Result === 3) {
                        canvasContext.fillStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
                        canvasContext.fillRect(650, 128.5, BLOCK.width, BLOCK.height + 3);
                        Block17 = 0
                        SP3 = 0
                        getRandomLevel2(0, 3)
                    }
                }
            }
        }

        if (Block18 === 0) {
            var Block18Top = BALL.y + BALL.radius > 130
            var Block18Left = BALL.x + BALL.radius > 750
            var Block18Right = BALL.x - BALL.radius < 850
            var Block18Down = BALL.y - BALL.radius < 163
            if (Block18Top && Block18Left && Block18Right && Block18Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 800) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(750, 130, BLOCK.width, BLOCK.height);
                Block18 = 1
                count += 10
            }
        }

        if (Block19 === 0) {
            var Block19Top = BALL.y + BALL.radius > 170
            var Block19Left = BALL.x + BALL.radius > 400
            var Block19Right = BALL.x - BALL.radius < 500
            var Block19Down = BALL.y - BALL.radius < 203
            if (Block19Top && Block19Left && Block19Right && Block19Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 450) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(400, 170, BLOCK.width, BLOCK.height);
                Block19 = 1
                count += 10
            }
        }

        if (Block20 === 0) {
            var Block20Top = BALL.y + BALL.radius > 170
            var Block20Left = BALL.x + BALL.radius > 500
            var Block20Right = BALL.x - BALL.radius < 600
            var Block20Down = BALL.y - BALL.radius < 203
            if (Block20Top && Block20Left && Block20Right && Block20Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 550) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(500, 170, BLOCK.width, BLOCK.height);
                Block20 = 1
                count += 10
            }
        }

        if (Block21 === 0) {
            var Block21Top = BALL.y + BALL.radius > 170
            var Block21Left = BALL.x + BALL.radius > 600
            var Block21Right = BALL.x - BALL.radius < 700
            var Block21Down = BALL.y - BALL.radius < 203
            if (Block21Top && Block21Left && Block21Right && Block21Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 650) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(600, 170, BLOCK.width, BLOCK.height);
                Block21 = 1
                count += 10
            }
        }

        if (Block22 === 0) {
            var Block22Top = BALL.y + BALL.radius > 170
            var Block22Left = BALL.x + BALL.radius > 700
            var Block22Right = BALL.x - BALL.radius < 800
            var Block22Down = BALL.y - BALL.radius < 203
            if (Block22Top && Block22Left && Block22Right && Block22Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 750) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(700, 170, BLOCK.width, BLOCK.height);
                Block22 = 1
                count += 10
            }
        }

        if (Block23 === 0) {
            var Block23Top = BALL.y + BALL.radius > 210
            var Block23Left = BALL.x + BALL.radius > 450
            var Block23Right = BALL.x - BALL.radius < 550
            var Block23Down = BALL.y - BALL.radius < 243
            if (Block23Top && Block23Left && Block23Right && Block23Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 500) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(450, 210, BLOCK.width, BLOCK.height);
                Block23 = 1
                count += 10
            }
        }

        if (Block24 === 0) {
            var Block24Top = BALL.y + BALL.radius > 210
            var Block24Left = BALL.x + BALL.radius > 550
            var Block24Right = BALL.x - BALL.radius < 650
            var Block24Down = BALL.y - BALL.radius < 243
            if (Block24Top && Block24Left && Block24Right && Block24Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 600) {
                    BALL.xDerection = -BALL.xDerection
                }
                SP4 += 1
                if (SP4 === 2) {
                    canvasContext.clearRect(550, 210, BLOCK.width, BLOCK.height);
                    Block24 = 1
                    count += 10
                    getRandomLevel2(0, 3)
                    if (Result === 0) {
                        canvasContext.clearRect(450, 210, BLOCK.width, BLOCK.height);
                        Block23 = 1
                        count += 10
                        canvasContext.clearRect(650, 210, BLOCK.width, BLOCK.height);
                        Block25 = 1
                        count += 10
                    } else if (Result === 1) {
                        canvasContext.clearRect(450, 210, BLOCK.width, BLOCK.height);
                        Block23 = 1
                        count += 10
                        canvasContext.clearRect(650, 210, BLOCK.width, BLOCK.height);
                        Block25 = 1
                        count += 10
                        canvasContext.clearRect(500, 170, BLOCK.width, BLOCK.height);
                        Block20 = 1
                        count += 10
                        canvasContext.clearRect(600, 170, BLOCK.width, BLOCK.height);
                        Block21 = 1
                        count += 10
                        canvasContext.clearRect(500, 250, BLOCK.width, BLOCK.height);
                        Block26 = 1
                        count += 10
                        canvasContext.clearRect(600, 250, BLOCK.width, BLOCK.height);
                        Block27 = 1
                        count += 10
                    } else if (Result === 2) {
                        if (life === 0) {
                            alert("Вы проиграли! Ваш счёт: " + count)
                        } else {
                            life -= 1
                        }
                    } else if (Result === 3) {
                        canvasContext.fillStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
                        canvasContext.fillRect(550, 208.5, BLOCK.width, BLOCK.height + 3);
                        Block24 = 0
                        SP4 = 0
                        getRandomLevel2(0, 3)
                    }
                }
            }
        }

        if (Block25 === 0) {
            var Block25Top = BALL.y + BALL.radius > 210
            var Block25Left = BALL.x + BALL.radius > 650
            var Block25Right = BALL.x - BALL.radius < 750
            var Block25Down = BALL.y - BALL.radius < 243
            if (Block25Top && Block25Left && Block25Right && Block25Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 700) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(650, 210, BLOCK.width, BLOCK.height);
                Block25 = 1
                count += 10
            }
        }

        if (Block26 === 0) {
            var Block26Top = BALL.y + BALL.radius > 250
            var Block26Left = BALL.x + BALL.radius > 500
            var Block26Right = BALL.x - BALL.radius < 600
            var Block26Down = BALL.y - BALL.radius < 283
            if (Block26Top && Block26Left && Block26Right && Block26Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 550) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(500, 250, BLOCK.width, BLOCK.height);
                Block26 = 1
                count += 10
            }
        }

        if (Block27 === 0) {
            var Block27Top = BALL.y + BALL.radius > 250
            var Block27Left = BALL.x + BALL.radius > 600
            var Block27Right = BALL.x - BALL.radius < 700
            var Block27Down = BALL.y - BALL.radius < 283
            if (Block27Top && Block27Left && Block27Right && Block27Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 650) {
                    BALL.xDerection = -BALL.xDerection
                }
                canvasContext.clearRect(600, 250, BLOCK.width, BLOCK.height);
                Block27 = 1
                count += 10
            }
        }

        if (Block28 === 0) {
            var Block28Top = BALL.y + BALL.radius > 290
            var Block28Left = BALL.x + BALL.radius > 550
            var Block28Right = BALL.x - BALL.radius < 650
            var Block28Down = BALL.y - BALL.radius < 323
            if (Block28Top && Block28Left && Block28Right && Block28Down) {
                BALL.yDerection = -BALL.yDerection
                if (BALL.x + BALL.radius > 600) {
                    BALL.xDerection = -BALL.xDerection
                }
                SP5 += 1
                if (SP5 === 2) {
                    canvasContext.clearRect(550, 290, BLOCK.width, BLOCK.height);
                    Block28 = 1
                    count += 10
                    getRandomLevel2(0, 3)
                    if (Result === 1) {
                        canvasContext.clearRect(500, 250, BLOCK.width, BLOCK.height);
                        Block26 = 1
                        count += 10
                        canvasContext.clearRect(600, 250, BLOCK.width, BLOCK.height);
                        Block27 = 1
                        count += 10
                    } else if (Result === 2) {
                        if (life === 0) {
                            alert("Вы проиграли! Ваш счёт: " + count)
                        } else {
                            life -= 1
                        }
                    } else if (Result === 3) {
                        canvasContext.fillStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
                        canvasContext.fillRect(550, 288.5, BLOCK.width, BLOCK.height + 3);
                        Block28 = 0
                        SP5 = 0
                        getRandomLevel2(0, 3)
                    }
                }
            }
        }
    }

}

function updateLevel() {
    if (count === 280) {
        BALL.xDerection = 10
        BALL.yDerection = 13
        level = 2
        life += 1
        Block1 = 0
        Block2 = 0
        Block3 = 0
        Block4 = 0
        Block5 = 0
        Block6 = 0
        Block7 = 0
        Block8 = 0
        Block9 = 0
        Block10 = 0
        Block11 = 0
        Block12 = 0
        Block13 = 0
        Block14 = 0
        Block15 = 0
        Block16 = 0
        Block17 = 0
        Block18 = 0
        Block19 = 0
        Block20 = 0
        Block21 = 0
        Block22 = 0
        Block23 = 0
        Block24 = 0
        Block25 = 0
        Block26 = 0
        Block27 = 0
        Block28 = 0
    }
    if (count === 560) {
        level = 3
        life += 1
        Block1 = 0
        Block2 = 0
        Block3 = 0
        Block4 = 0
        Block5 = 0
        Block6 = 0
        Block7 = 0
        Block8 = 0
        Block9 = 0
        Block10 = 0
        Block11 = 0
        Block12 = 0
        Block13 = 0
        Block14 = 0
        Block15 = 0
        Block16 = 0
        Block17 = 0
        Block18 = 0
        Block19 = 0
        Block20 = 0
        Block21 = 0
        Block22 = 0
        Block23 = 0
        Block24 = 0
        Block25 = 0
        Block26 = 0
        Block27 = 0
        Block28 = 0
    }
}

function youwin() {
    if (level === 3) {
        level = 1
        BALL.xDerection = 8
        BALL.yDerection = 8
        alert("Вы выиграли")
    }
}


function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height)
    drawBackgrownd()
    drawBall()
    drawRacket()
    drawBlock()
    drawBlock2()
}

function drawBlock() {
    if (level === 1) {
        if (Block1 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(250, 50, BLOCK.width, BLOCK.height);
        }

        if (Block2 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(350, 50, BLOCK.width, BLOCK.height);
        }

        if (Block3 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(450, 50, BLOCK.width, BLOCK.height);
        }

        if (Block4 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(550, 50, BLOCK.width, BLOCK.height);
        }

        if (Block5 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(650, 50, BLOCK.width, BLOCK.height);
        }

        if (Block6 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(750, 50, BLOCK.width, BLOCK.height);
        }

        if (Block7 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(850, 50, BLOCK.width, BLOCK.height);
        }

        if (Block8 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(300, 90, BLOCK.width, BLOCK.height);
        }

        if (Block9 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(400, 90, BLOCK.width, BLOCK.height);
        }

        if (Block10 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(500, 90, BLOCK.width, BLOCK.height);
        }

        if (Block11 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(600, 90, BLOCK.width, BLOCK.height);
        }

        if (Block12 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(700, 90, BLOCK.width, BLOCK.height);
        }

        if (Block13 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(800, 90, BLOCK.width, BLOCK.height);
        }

        if (Block14 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(350, 130, BLOCK.width, BLOCK.height);
        }

        if (Block15 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(450, 130, BLOCK.width, BLOCK.height);
        }

        if (Block16 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(550, 130, BLOCK.width, BLOCK.height);
        }

        if (Block17 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(650, 130, BLOCK.width, BLOCK.height);
        }

        if (Block18 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(750, 130, BLOCK.width, BLOCK.height);
        }

        if (Block19 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(400, 170, BLOCK.width, BLOCK.height);
        }

        if (Block20 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(500, 170, BLOCK.width, BLOCK.height);
        }

        if (Block21 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(600, 170, BLOCK.width, BLOCK.height);
        }

        if (Block22 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(700, 170, BLOCK.width, BLOCK.height);
        }

        if (Block23 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(450, 210, BLOCK.width, BLOCK.height);
        }

        if (Block24 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(550, 210, BLOCK.width, BLOCK.height);
        }

        if (Block25 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(650, 210, BLOCK.width, BLOCK.height);
        }

        if (Block26 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(500, 250, BLOCK.width, BLOCK.height);
        }

        if (Block27 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(600, 250, BLOCK.width, BLOCK.height);
        }

        if (Block28 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(550, 290, BLOCK.width, BLOCK.height);
        }
    }
}

function drawBlock2() {
    if (level === 2) {
        if (Block1 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(250, 50, BLOCK.width, BLOCK.height);
        }

        if (Block2 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(350, 50, BLOCK.width, BLOCK.height);
        }

        if (Block3 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(450, 50, BLOCK.width, BLOCK.height);
        }

        if (Block4 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(550, 50, BLOCK.width, BLOCK.height);
        }

        if (Block5 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(650, 50, BLOCK.width, BLOCK.height);
        }

        if (Block6 === 0) {
            canvasContext.fillStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.fillRect(750, 48.5, BLOCK.width, BLOCK.height + 3);
        }

        if (Block7 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(850, 50, BLOCK.width, BLOCK.height);
        }

        if (Block8 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(300, 90, BLOCK.width, BLOCK.height);
        }

        if (Block9 === 0) {
            canvasContext.fillStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.fillRect(400, 88.5, BLOCK.width, BLOCK.height + 3);
        }

        if (Block10 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(500, 90, BLOCK.width, BLOCK.height);
        }

        if (Block11 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(600, 90, BLOCK.width, BLOCK.height);
        }

        if (Block12 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(700, 90, BLOCK.width, BLOCK.height);
        }

        if (Block13 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(800, 90, BLOCK.width, BLOCK.height);
        }

        if (Block14 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(350, 130, BLOCK.width, BLOCK.height);
        }

        if (Block15 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(450, 130, BLOCK.width, BLOCK.height);
        }

        if (Block16 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(550, 130, BLOCK.width, BLOCK.height);
        }

        if (Block17 === 0) {
            canvasContext.fillStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.fillRect(650, 128.5, BLOCK.width, BLOCK.height + 3);
        }

        if (Block18 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(750, 130, BLOCK.width, BLOCK.height);
        }

        if (Block19 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(400, 170, BLOCK.width, BLOCK.height);
        }

        if (Block20 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(500, 170, BLOCK.width, BLOCK.height);
        }

        if (Block21 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(600, 170, BLOCK.width, BLOCK.height);
        }

        if (Block22 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(700, 170, BLOCK.width, BLOCK.height);
        }

        if (Block23 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(450, 210, BLOCK.width, BLOCK.height);
        }

        if (Block24 === 0) {
            canvasContext.fillStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.fillRect(550, 208.5, BLOCK.width, BLOCK.height + 3);
        }

        if (Block25 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(650, 210, BLOCK.width, BLOCK.height);
        }

        if (Block26 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(500, 250, BLOCK.width, BLOCK.height);
        }

        if (Block27 === 0) {
            canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.lineWidth = 3
            canvasContext.strokeRect(600, 250, BLOCK.width, BLOCK.height);
        }

        if (Block28 === 0) {
            canvasContext.fillStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
            canvasContext.fillRect(550, 288.5, BLOCK.width, BLOCK.height + 3);
        }
    }
}

function drawBall() {
    canvasContext.strokeStyle = "rgb(" + R + "," + G + "," + B + ")";
    canvasContext.lineWidth = 3
    canvasContext.beginPath();
    canvasContext.arc(BALL.x, BALL.y, BALL.radius, 0, 2 * Math.PI);
    canvasContext.stroke();
}

function drawRacket() {
    canvasContext.strokeStyle = RACKET.color;
    canvasContext.lineWidth = 3
    canvasContext.strokeRect(RACKET.x, RACKET.y, RACKET.width, RACKET.height);
}

function drawBackgrownd() {
    canvasContext.strokeStyle = "rgb(" + R2 + "," + G2 + "," + B2 + ")";
    canvasContext.lineWidth = 8;
    canvasContext.strokeRect(0, 0, GAME.width, GAME.height);
}

function drawSkore() {
    canvasContext.fillStyle = "rgb(" + R4 + "," + G4 + "," + B4 + ")"
    canvasContext.font = "32px Arial"
    canvasContext.fillText("Score is:" + count, 49, 110)
}

function drawLevel() {
    canvasContext.fillStyle = "rgb(" + R4 + "," + G5 + "," + B5 + ")"
    canvasContext.font = "32px Arial"
    canvasContext.fillText("Level is:" + level, 50, 70)
}

function drawLife() {
    canvasContext.fillStyle = "rgb(" + 255 + "," + 0 + "," + 0 + ")"
    canvasContext.font = "32px Arial"
    canvasContext.fillText("Lifes:" + life, 50, 150)
}


function initEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove)
    window.addEventListener("keydown", onCanvasKeyDown)
}

function onCanvasMouseMove(event) {
    RACKET.x = event.clientX
    getRandomRGB3(0, 255)
    RACKET.color = "rgb(" + R3 + "," + G3 + "," + B3 + ")"
    if (RACKET.x < 0) {
        RACKET.x = 0
    }
    if (RACKET.x + RACKET.width > GAME.width) {
        RACKET.x = GAME.width - RACKET.width
    }
}

function onCanvasKeyDown(event) {
    console.log(event.key)
    if (event.key === "a" || event.key === "ArrowLeft") {
        RACKET.x = RACKET.x - RACKET.xDerection
    }
    if (event.key === "d" || event.key === "ArrowRight") {
        RACKET.x = RACKET.x + RACKET.xDerection
    }
    if (RACKET.x < 0) {
        RACKET.x = 0
    }
    if (RACKET.x + RACKET.width > GAME.width) {
        RACKET.x = GAME.width - RACKET.width
    }
}

function play() {
    drawFrame();
    drawSkore()
    drawLife()
    updateLevel()
    drawLevel()
    youwin()
    updateBall();
    requestAnimationFrame(play)
    getRandomRGB(0, 255)
}

initEventsListeners()
play()