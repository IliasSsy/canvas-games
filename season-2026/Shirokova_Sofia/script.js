
var Victory = false
var Defeat = false

//холст
canvas = document.getElementById('canvas')
img = document.getElementById('source')
ctx = canvas.getContext('2d')

function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

resizeCanvas()
window.addEventListener('resize', resizeCanvas)

imgOnload = function () {
    img = document.getElementById('source')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}

imgOnload()

//поле для игры
var config = {
    width: 600,
    height: 600,
    fillColor: 'rgb(235, 250, 140)',
    borderColor: 'black',
    borderWidth: 5,
}

const x = (canvas.width - config.width) / 2
const y = (canvas.height - config.height) / 2

function board() {
    ctx.fillStyle = config.fillColor
    ctx.fillRect(x, y, config.width, config.height)

    ctx.strokeStyle = config.borderColor
    ctx.lineWidth = config.borderWidth
    ctx.strokeRect(x, y, config.width, config.height)

}

//объект сыр
var Cheese = {
    x: getRandomInt(x + 10, x + 545),
    y: getRandomInt(y + 30, y + 550),
    width: 50,
    height: 50,
    img: new Image(),
    time: 0,
}

Cheese.img.src = './Сыр мой.png'

function NewCheese() {
    ctx.drawImage(Cheese.img, Cheese.x, Cheese.y, Cheese.width, Cheese.height)
}

function TimeforCheese() {
    ctx.fillStyle = "black"
    ctx.beginPath()
    ctx.arc(Cheese.x + Cheese.height / 2, Cheese.y - 15, 10, 0, (Cheese.time / 75) * Math.PI)
    ctx.fill()
}

function CheeseTime() {
    if (Cheese.time >= 150) {

        Cheese.x = getRandomInt(x + 10, x + 545)
        Cheese.y = getRandomInt(y + 30, y + 550)

        Cheese.time = 0
    } else {
        Cheese.time += 1
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

//обЪект мышь
Mouse = {
    x: x + 260,
    y: y + 450,
    width: 80,
    height: 140,
    xBox1: 0,
    xBox2: 80,
    yBox1: 0,
    yBox2: 80,
    img: new Image(),
    xSpeed: 10,
    ySpeed: 10,
    move: 1,
}

img = document.getElementById('source31')

function NewMouse() {
    Mouse.img.src = './Сыч' + Mouse.move + '.png'
    ctx.drawImage(Mouse.img, Mouse.x, Mouse.y, Mouse.width, Mouse.height)
}

function Mouse1() {
    Mouse.width = 80
    Mouse.height = 140
    Mouse.xBox1 = 0
    Mouse.xBox2 = 80
    Mouse.yBox1 = 0
    Mouse.yBox2 = 80
}

function Mouse2() {
    Mouse.width = 140
    Mouse.height = 80
    Mouse.xBox1 = 40
    Mouse.xBox2 = 120
    Mouse.yBox1 = 0
    Mouse.yBox2 = 80
}

function Mouse3() {
    Mouse.width = 80
    Mouse.height = 140
    Mouse.xBox1 = 0
    Mouse.xBox2 = 80
    Mouse.yBox1 = 40
    Mouse.yBox2 = 120
}

function Mouse4() {
    Mouse.width = 140
    Mouse.height = 80
    Mouse.xBox1 = 0
    Mouse.xBox2 = 80
    Mouse.yBox1 = 0
    Mouse.yBox2 = 80
}

//прослушивание событий
function initEventsListeners() {
    window.addEventListener("mousemove", onCanvasMouseMove)
    window.addEventListener("keydown", onCanvasKeyDown)
}

//конец обработки событий
function removeEventsListeners() {
    window.removeEventListener("mousemove", onCanvasMouseMove);
    window.removeEventListener("keydown", onCanvasKeyDown);
}

//обработка движеий
function clampRacketPosition() {
    if (Mouse.x < x) {
        Mouse.x = x
    }
    if (Mouse.y < y) {
        Mouse.y = y
    }
    if (Mouse.x + Mouse.width > x + config.width) {
        Mouse.x = x + config.width - Mouse.width
    }
    if (Mouse.y + Mouse.height > y + config.height) {
        Mouse.y = y + config.height - Mouse.height
    }

}

let lastX = 0, lastY = 0

function onCanvasMouseMove(event) {
}

function onCanvasKeyDown(event) {
    if ((event.key === "ArrowLeft") || (event.key === "a")) {
        Mouse.x -= Mouse.xSpeed
        Mouse.move = 4
        img = document.getElementById('source34')
        Mouse4()
    }
    if ((event.key === "ArrowRight") || (event.key === "d")) {
        Mouse.x += Mouse.xSpeed
        Mouse.move = 2
        img = document.getElementById('source32')
        Mouse2()
    }
    if ((event.key === "ArrowUp") || (event.key === "w")) {
        Mouse.y -= Mouse.ySpeed
        Mouse.move = 1
        img = document.getElementById('source31')
        Mouse1()
    }
    if ((event.key === "ArrowDown") || (event.key === "s")) {
        Mouse.y += Mouse.ySpeed
        Mouse.move = 3
        img = document.getElementById('source33')
        Mouse3()
    }
    clampRacketPosition()
}

//счет сыра
let score = 0

function testScore() {
    if ((Mouse.x + Mouse.xBox1 <= Cheese.x + Cheese.width / 2) && (Mouse.x + Mouse.xBox2 >= Cheese.x + Cheese.width / 2) && (Mouse.y + Mouse.yBox1 <= Cheese.y + Cheese.height / 2) && (Mouse.y + Mouse.yBox2 >= Cheese.y + Cheese.height / 2)) {
        return true
    } else {
        return false
    }

}

function newScore() {

    var dxNew = Mouse.x - Cheese.x
    var dyNew = Mouse.y - Cheese.y

    if (testScore()) {

        score += 1
        Cheese.time = 150
        return true
    }
}

function drawCanvastext() {
    ctx.font = "42px serif"
    ctx.fillStyle = "black"
    ctx.fillText("Score: " + score, x, y - 10)

}

function drawCanvastime() {
    ctx.font = "42px serif"
    ctx.fillStyle = "black"
    ctx.fillText("Time: " + FuckingTime(), x + config.width - 200, y - 10)

}

function FuckingTime() {
    var nMinute = Math.floor(nTime / 60)
    var nSecond = nTime - nMinute * 60
    if (nMinute < 10) {
        if (nSecond < 10) {
            return "0" + nMinute + ":0" + nSecond
        } else {
            return "0" + nMinute + ":" + nSecond
        }
    } else {
        if (nSecond < 10) {
            return nMinute + ":0" + nSecond
        } else {
            return nMinute + ":" + nSecond
        }
    }

}

function startVictory() {
    let alpha = 0
    const fadeSpeed = 0.02

    img = document.getElementById('source42')

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = alpha

        ctx.font = "116px serif"
        ctx.fillStyle = "white"
        ctx.fillText("You won!", x * 1.1, y + config.height * 0.5)

        ctx.font = "50px serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.fillText("Good job", x * 1.3, y + config.height * 0.6)

        // Увеличиваем прозрачность
        alpha += fadeSpeed

        if (alpha < 1) {
            requestAnimationFrame(animate)
        }
    }

    // Запускаем анимацию
    animate()
}

function startDefeat() {
    const img = document.getElementById('source4')
    let alpha = 0
    let textAlpha = 0
    const fadeStep = 0.02
    const textFadeStep = 0.03

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Рисуем изображение с нарастающей прозрачностью
        ctx.globalAlpha = alpha
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        alpha += fadeStep

        // Если изображение уже полностью видно, начинаем выводить текст
        if (alpha >= 1) {
            // Уменьшаем шаг для текста, чтобы он появлялся медленнее
            textAlpha += textFadeStep

            ctx.globalAlpha = Math.min(textAlpha, 1)

            ctx.font = "116px serif"
            ctx.fillStyle = "rgba(122, 23, 23)"
            ctx.fillText("You dead.", x * 1.1, y + config.height * 0.5)

            // Завершаем анимацию, когда текст полностью виден
            if (textAlpha >= 1) {
                return
            }
        }

        requestAnimationFrame(animate)
    }

    // Запускаем анимацию
    animate()
}

let nTime = 0
let step = 0

function GameTime() {
    imgOnload()
    drawCanvastime()
    if (step === 60) {
        step = 0
        nTime += 1
        if (nTime === 30) {
            Defeat = true
        }
    } else {
        step += 1
    }
}

function play() {
    GameTime()

    if (newScore()) {
        imgOnload()
    }
    if (score >= 10) {
        Victory = true
    }

    board()

    CheeseTime()
    NewCheese()
    TimeforCheese()

    NewMouse()

    drawCanvastext()

    if ((!Victory) && (!Defeat)) {
        requestAnimationFrame(play)
    } else {
        removeEventsListeners()
        if (Victory) {
            startVictory()
        } else {
            startDefeat()
        }
    }

}

initEventsListeners()
play()
