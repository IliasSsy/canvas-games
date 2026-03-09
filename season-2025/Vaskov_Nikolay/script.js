var GAME = {
    width: 400,
    height: 620,
    background: "Linen",
    gravity: 0.3,
    camMoveLine: 270,
    score: 0,
    scoreCoef: 0.2,
    state: 'menu',
}

var ACCESSORIES = {
    // spring
    springProbality: 5,
    springBoost: 25,
    springHeight: 16,
    springWidth: 30,
    springColor: 'gray',
    // rocket
    rocketProbality: 0.5,
    rocketBoost: 25,
    rocketBoostTime: 2,
    rocketHeight: 40,
    rocketWidth: 24,
    rocketColor: 'red',
    // hat
    hatProbality: 0.5,
    hatBoost: 15,
    hatBoostTime: 2,
    hatHeight: 24,
    hatWidth: 40,
    hatColor: 'yellow',
}

var PLATFORMS = {
    blueProbality: 7,
    blueSpeed: 3,
    brownProbality: 14,
}

var DOODLE = {}
var PLATFORM = {}
var KEY = {}
var platforms = []
var scores = []

var canvas = document.getElementById('canvas');
document.body.appendChild(canvas)
canvas.width = GAME.width
canvas.height = GAME.height
var canvasContext = canvas.getContext("2d")
canvasContext.imageSmoothingEnabled = true
canvasContext.imageSmoothingQuality = 'high'

var doodleImg_right = new Image()
doodleImg_right.src = "./images/doodle_right.png"
var doodleImg_left = new Image()
doodleImg_left.src = "./images/doodle_left.png"
var doodleHatImg_right = new Image()
doodleHatImg_right.src = "./images/doodle_hat_right.png"
var doodleHatImg_left = new Image()
doodleHatImg_left.src = "./images/doodle_hat_left.png"
var doodleRocketImg_right = new Image()
doodleRocketImg_right.src = "./images/doodle_rocket_right.png"
var doodleRocketImg_left = new Image()
doodleRocketImg_left.src = "./images/doodle_rocket_left.png"


var bgImg = new Image()
bgImg.src = "./images/bg.png"
var platformGreenImg = new Image()
platformGreenImg.src = "./images/platform.png"
var platformBlueImg = new Image()
platformBlueImg.src = "./images/platform_blue.png"
var platformBrownImg = new Image()
platformBrownImg.src = "./images/platform_brown.png"
var springImg = new Image()
springImg.src = "./images/spring.png"
var rocketImg = new Image()
rocketImg.src = "./images/rocket.png"
var hatImg = new Image()
hatImg.src = "./images/hat.png"

function initDefaultVars() {
    DOODLE = {
        width: 42,
        height: 60,
        x: GAME.width / 2 - 42,
        y: GAME.height - 47,
        ySpeed: -20,
        xSpeed: 5,
        jumpBoost: 13.5,
        tmpAnimFlag: false,
        state: 'normal',
        timer: 0,
        direction: 'left',
    }

    PLATFORM = {
        color: "green",
        width: 80,
        height: 23,
        x: 120,
        y: 500,
        yStep: 60,
        xSpeed: 0,
        accessoryType: false,
        accessoryLocation: 0,
        type: 'default', // fake, moving
        isBroken: false,
        isAccessoryUsed: false,
    }

    KEY = {
        left: false,
        right: false,
    }

    platforms = []
    platforms.push(PLATFORM)
    GAME.score = 0
    GAME.state = 'menu'
}

// --------------DRAW-----------------------

function drawBackground() {
    canvasContext.drawImage(bgImg, 0, 0, GAME.width * 1.2, GAME.height * 1.2)
    // canvasContext.fillStyle = GAME.background
    // canvasContext.fillRect(0, 0, GAME.width, GAME.height)
}

function drawDoodle() {
    // canvasContext.strokeStyle = "red"
    // canvasContext.lineWidth = 2
    // canvasContext.strokeRect(DOODLE.x, DOODLE.y, DOODLE.width, DOODLE.height)
    if (DOODLE.direction === 'right'){
        if (DOODLE.state === 'hatting') {
            canvasContext.drawImage(doodleHatImg_right, DOODLE.x - 2, DOODLE.y - 10, DOODLE.width + 20, DOODLE.height + 10)
        }
        else if (DOODLE.state === 'rocketting') {
            canvasContext.drawImage(doodleRocketImg_right, DOODLE.x - 17, DOODLE.y, DOODLE.width + 34, DOODLE.height + 4)
        }
        else {
            canvasContext.drawImage(doodleImg_right, DOODLE.x - 2, DOODLE.y, DOODLE.width + 20, DOODLE.height)
        }
    }
    else {
        if (DOODLE.state === 'hatting') {
            canvasContext.drawImage(doodleHatImg_left, DOODLE.x - 20 , DOODLE.y - 10, DOODLE.width + 20, DOODLE.height + 10)
        }
        else if (DOODLE.state === 'rocketting') {
            canvasContext.drawImage(doodleRocketImg_left, DOODLE.x - 20 , DOODLE.y, DOODLE.width + 35, DOODLE.height + 4)
        }
        else {
            canvasContext.drawImage(doodleImg_left, DOODLE.x - 20 , DOODLE.y, DOODLE.width + 20, DOODLE.height)
        }
    }
    // canvasContext.fillStyle = DOODLE.color
    // canvasContext.fillRect(DOODLE.x, DOODLE.y, DOODLE.width, DOODLE.height)
}

function drawPlatforms() {
    for (const pltfrm of platforms) {
        if (pltfrm.type === 'green') {
            canvasContext.drawImage(platformGreenImg, pltfrm.x, pltfrm.y, pltfrm.width, pltfrm.height)
        }
        else if (pltfrm.type === 'blue') {
            canvasContext.drawImage(platformBlueImg, pltfrm.x, pltfrm.y, pltfrm.width, pltfrm.height)
        }
        else if (pltfrm.type === 'brown') {
            canvasContext.drawImage(platformBrownImg, pltfrm.x, pltfrm.y, pltfrm.width, pltfrm.height)
        }
        // canvasContext.fillStyle = pltfrm.color
        // canvasContext.fillRect(pltfrm.x, pltfrm.y, pltfrm.width, pltfrm.height)
        if (pltfrm.accessoryType === 'spring') {
            if (pltfrm.isAccessoryUsed === false) {
                canvasContext.drawImage(springImg, pltfrm.x + pltfrm.accLocation, pltfrm.y - pltfrm.accessoryHeight + 10, pltfrm.accessoryWidth, pltfrm.accessoryHeight)
            }
            else {
                canvasContext.drawImage(springImg, pltfrm.x + pltfrm.accLocation, pltfrm.y - pltfrm.accessoryHeight - 25, pltfrm.accessoryWidth, pltfrm.accessoryHeight + 17)
            }
            // canvasContext.fillStyle = ACCESSORIES.springColor
            // canvasContext.fillRect(pltfrm.x + pltfrm.accLocation, pltfrm.y - pltfrm.accessoryHeight, pltfrm.accessoryWidth, pltfrm.accessoryHeight)
        }
        if (pltfrm.accessoryType === 'rocket') {
            if (pltfrm.isAccessoryUsed === false) {
                canvasContext.drawImage(rocketImg, pltfrm.x + pltfrm.accLocation, pltfrm.y - pltfrm.accessoryHeight, pltfrm.accessoryWidth, pltfrm.accessoryHeight)
                // canvasContext.fillStyle = ACCESSORIES.rocketColor
                // canvasContext.fillRect(pltfrm.x + pltfrm.accLocation, pltfrm.y - pltfrm.accessoryHeight, pltfrm.accessoryWidth, pltfrm.accessoryHeight)
            }
        }
        if (pltfrm.accessoryType === 'hat') {
            if (pltfrm.isAccessoryUsed === false) {
                canvasContext.drawImage(hatImg, pltfrm.x + pltfrm.accLocation, pltfrm.y - pltfrm.accessoryHeight, pltfrm.accessoryWidth, pltfrm.accessoryHeight)
                // canvasContext.fillStyle = ACCESSORIES.hatColor
                // canvasContext.fillRect(pltfrm.x + pltfrm.accLocation, pltfrm.y - pltfrm.accessoryHeight, pltfrm.accessoryWidth, pltfrm.accessoryHeight)
            }
        }
    }

}

function drawGameOver() {
    if (GAME.state === 'gameover') {
        var buttonWidth = 160
        var buttonHeight = 60
        var buttonX = GAME.width / 2 - buttonWidth / 2
        var buttonY = GAME.height / 2 
        canvasContext.font = "bold 40px arial"
        canvasContext.fillStyle = 'Black'
        canvasContext.textAlign = "center"
        canvasContext.fillText('game over', GAME.width / 2, GAME.height / 4)   
        canvasContext.font = "20px arial"
        canvasContext.fillText('your score: ' + scores[scores.length - 1], GAME.width / 2, GAME.height / 4 + 70) 
        canvasContext.fillText('your high score: ' + Math.max.apply(null, scores), GAME.width / 2, GAME.height / 4 + 100)

        canvasContext.fillStyle = "LightGreen"
        canvasContext.fillRect(buttonX, buttonY, buttonWidth, buttonHeight)

        canvasContext.strokeStyle = "#2E8B57"
        canvasContext.lineWidth = 4
        canvasContext.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight)

        canvasContext.fillStyle = "White"
        canvasContext.font = "bold 30px Arial"
        canvasContext.fillText("restart", GAME.width / 2, buttonY + 40)
    }
}

function drawMainMenu() {
    var buttonWidth = 160
    var buttonHeight = 60
    var buttonX = GAME.width / 2 - buttonWidth / 2
    var buttonY = GAME.height / 2 + 60

    drawBackground()
    canvasContext.font = "bold 50px Arial"
    canvasContext.fillStyle = "Black"
    canvasContext.textAlign = "center"
    canvasContext.fillText("Doodle Jump", GAME.width / 2, GAME.height / 3 - 30)
    canvasContext.drawImage(doodleImg_right, GAME.width / 2 - 30, GAME.height / 2 - 70, 80, 80)
    canvasContext.fillStyle = "LightGreen"
    canvasContext.fillRect(buttonX, buttonY, buttonWidth, buttonHeight)

    canvasContext.strokeStyle = "#2E8B57"
    canvasContext.lineWidth = 4
    canvasContext.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight)

    canvasContext.fillStyle = "White"
    canvasContext.font = "bold 30px Arial"
    canvasContext.fillText("PLAY", GAME.width / 2, buttonY + 40)
}

function drawScore() {
    // canvasContext.fillStyle = 'rgba(115, 141, 164, 0.5)'
    // canvasContext.fillRect(0, 0, GAME.width, 50)
    canvasContext.fillStyle = 'Black'
    canvasContext.font = "30px arial"
    canvasContext.fillText(Math.trunc(GAME.score), 50, 37)
}

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height)
    drawBackground()
    drawPlatforms()
    drawDoodle()
    drawScore()
    drawGameOver()
}

// ----------------------------------------

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function generatePlatform(minGap, maxGap) {
    var lastPlat = platforms[platforms.length - 1]
    var tmp_platform = {...PLATFORM}
    var tmp_platforms = []

    // TYPE 
    // default platform
    if (GAME.score > 500 && getRandomInt(0, 100) <= PLATFORMS.blueProbality) {
        tmp_platform.type = 'blue'
        tmp_platform.color = 'DodgerBlue'
        if (getRandomInt(0, 1) === 0) {
            tmp_platform.xSpeed = PLATFORMS.blueSpeed * getRandomInt(0.5, 1.5)
        }
        else {
            tmp_platform.xSpeed = -PLATFORMS.blueSpeed * getRandomInt(0.5, 1.5)
        }
        tmp_platform.isAdditional = false
    }
    else {
        tmp_platform.type = 'green'
        tmp_platform.xSpeed = 0
        if (tmp_platform.type != 'blue' && (getRandomInt(0, 100) <= PLATFORMS.brownProbality)) {
            tmp_platform.isAdditional = true
            var tmp2_platform = {...PLATFORM}
            tmp2_platform.type = 'brown'
            tmp2_platform.color = 'SaddleBrown'
        }
    }
    // // additional platform
    // 
    

    // ACCESSORIES
    if (getRandomInt(0, 100) <= ACCESSORIES.springProbality) {
        tmp_platform.accessoryType = 'spring'
        tmp_platform.accessoryHeight = ACCESSORIES.springHeight
        tmp_platform.accessoryWidth = ACCESSORIES.springWidth
    }
    else if (getRandomInt(0, 100) <= ACCESSORIES.rocketProbality) {
        tmp_platform.accessoryType = 'rocket'
        tmp_platform.accessoryHeight = ACCESSORIES.rocketHeight
        tmp_platform.accessoryWidth = ACCESSORIES.rocketWidth
    }
    else if (getRandomInt(0, 100) <= ACCESSORIES.hatProbality) {
        tmp_platform.accessoryType = 'hat'
        tmp_platform.accessoryHeight = ACCESSORIES.hatHeight
        tmp_platform.accessoryWidth = ACCESSORIES.hatWidth
    }
    else {
        tmp_platform.accessoryType = 'none'
        tmp_platform.accessoryHeight = 0
        tmp_platform.accessoryWidth = 0
    }
    tmp_platform.accLocation = getRandomInt(5, tmp_platform.width - 25)
    
    // LOCATION
    if (lastPlat.accessoryType === 'spring' && GAME.score > 1000) {
        maxGap *= 2
    }
    tmp_platform.x = getRandomInt(50, GAME.width - 50)
    tmp_platform.y = platforms[platforms.length - 1].y - getRandomInt(minGap, maxGap)

    if (tmp_platform.isAdditional === true) {
        tmp2_platform.y = tmp_platform.y + getRandomInt(-20, 20)
        if (tmp_platform.x > GAME.width - tmp_platform.x - tmp_platform.width) {
            tmp2_platform.x = getRandomInt(50, GAME.width - tmp_platform.x - 50)
        }
        else {
            tmp2_platform.x = getRandomInt(tmp_platform.x + tmp_platform.width + 50, GAME.width - 50, )
        }
        platforms.push(tmp_platform)
        platforms.push(tmp2_platform)
    }
    else {
        platforms.push(tmp_platform) 
    }
    
}

function deletePlatformsUnderScreeen(isBottom) {
    if (isBottom === true) {
        platforms = platforms.filter(p => p.y < GAME.height)
    }
    else {
        platforms = platforms.filter(p => p.y > 0)
    }
    
}

function updatePlatforms() {
    var lastPlatform = platforms[platforms.length - 1]
    for (const pltfrm of platforms) {
        if (pltfrm.type === 'blue') {
            pltfrm.x += pltfrm.xSpeed
        }
        if (pltfrm.x + pltfrm.width > GAME.width) {
            pltfrm.xSpeed = -pltfrm.xSpeed
            pltfrm.x = GAME.width - pltfrm.width
        }
        else if (pltfrm.x < 0) {
            pltfrm.xSpeed = -pltfrm.xSpeed
            pltfrm.x = 0
        }
        if (pltfrm.isBroken === true) {
            pltfrm.y += pltfrm.ySpeed
            pltfrm.ySpeed += 1
        }
    }
    while (lastPlatform.y > -50) {
        var minGap = 35
        var maxGap = 90
        if (GAME.score >= 1000) {
            var minGap = 60
            var maxGap = 120
        }
        if (GAME.score >= 1500) { // 3000
            var minGap = 90
            var maxGap = 170
        }
        if (GAME.score >= 2000) { // 5000
            var minGap = 100
            var maxGap = 215
            PLATFORMS.brownProbality = 20
            PLATFORMS.blueProbality = 10
            PLATFORMS.blueSpeed = 4
        }
        if (GAME.score >= 2000) { // 5000
            PLATFORMS.brownProbality = 30
            PLATFORMS.blueProbality = 20
            PLATFORMS.blueSpeed = 5
        }
        generatePlatform(minGap, maxGap)
        lastPlatform = platforms[platforms.length - 1]
    }
    deletePlatformsUnderScreeen(true)
}

function moveDown(){
    var offset = DOODLE.y - GAME.camMoveLine
    GAME.score -= offset * GAME.scoreCoef
    for (const pltfrm of platforms) {
        pltfrm.y -= offset
    }
    DOODLE.y = GAME.camMoveLine
}

function fallAnimation() {
    for (const pltfrm of platforms) {
        pltfrm.y -= DOODLE.ySpeed
    }
    deletePlatformsUnderScreeen(false)
    if (DOODLE.y >= GAME.height / 1.5 && DOODLE.tmpAnimFlag === false) {
        DOODLE.ySpeed += GAME.gravity / 4
    }
    else if (DOODLE.y <= GAME.height) {
        DOODLE.tmpAnimFlag = true
        DOODLE.ySpeed -= GAME.gravity
    }
    DOODLE.y -= DOODLE.ySpeed / 2
}

function flyingDoodle() {
    if (DOODLE.timer <= ACCESSORIES.rocketBoostTime * 60) {
        DOODLE.timer += 1
        if (DOODLE.state === 'rocketting') {
            DOODLE.ySpeed = -ACCESSORIES.rocketBoost
        }
        if (DOODLE.state === 'hatting') {
            DOODLE.ySpeed = -ACCESSORIES.hatBoost
        }
    }
    else {
        DOODLE.timer = 0
        DOODLE.state = 'normal'
    }
}

function updateDoodle() {
    DOODLE.ySpeed += GAME.gravity
    DOODLE.y += DOODLE.ySpeed
    
    if (DOODLE.state === 'rocketting' || DOODLE.state === 'hatting') {
        flyingDoodle()
    }
    if (DOODLE.y < GAME.camMoveLine) {
        moveDown()
    }
    if (DOODLE.x + DOODLE.width / 2 > GAME.width) {
        DOODLE.x = -DOODLE.width / 2
    }
    if (DOODLE.x + DOODLE.width / 2 < 0) {
        DOODLE.x = GAME.width - DOODLE.width / 2
    }
    if (KEY.right === true) {
        DOODLE.x += DOODLE.xSpeed
        DOODLE.direction = 'right'
    }
    if (KEY.left === true) {
        DOODLE.x -= DOODLE.xSpeed
        DOODLE.direction = 'left'
    }
    if (DOODLE.y >= GAME.height) {
        GAME.state = 'gameover'
        scores.push(Math.trunc(GAME.score))
    }
    CollisionDoodlePlatform()
}

function CollisionDoodlePlatform() {
    for (const pltfrm of platforms) {
        if ((DOODLE.y + DOODLE.height >= pltfrm.y) 
            && (DOODLE.y + DOODLE.height <= pltfrm.y + pltfrm.height) 
            && (DOODLE.ySpeed > 0) 
            && (DOODLE.x > pltfrm.x - DOODLE.width) 
            && (DOODLE.x < pltfrm.x + pltfrm.width)
            && (pltfrm.type != 'brown')) {
                DOODLE.y = pltfrm.y - DOODLE.height
                DOODLE.ySpeed = -DOODLE.jumpBoost
                break
        }
        if ((DOODLE.y + DOODLE.height >= pltfrm.y) 
            && (DOODLE.y + DOODLE.height <= pltfrm.y + pltfrm.height) 
            && (DOODLE.ySpeed > 0) 
            && (DOODLE.x > pltfrm.x - DOODLE.width) 
            && (DOODLE.x < pltfrm.x + pltfrm.width)
            && (pltfrm.type === 'brown')) {
                pltfrm.ySpeed = DOODLE.ySpeed / 2
                pltfrm.isBroken = true
            }
        if (pltfrm.accessoryType != 'none'
            && (DOODLE.y + DOODLE.height >= pltfrm.y - pltfrm.accessoryHeight) 
            && (DOODLE.y + DOODLE.height <= pltfrm.y + pltfrm.height) 
            && (DOODLE.ySpeed > 0) 
            && (DOODLE.x > pltfrm.x + pltfrm.accLocation - DOODLE.width) 
            && (DOODLE.x < pltfrm.x + pltfrm.accLocation + pltfrm.accessoryWidth)) {
                pltfrm.isAccessoryUsed = true
                if (pltfrm.accessoryType === 'spring') {
                    DOODLE.y = pltfrm.y - pltfrm.accessoryHeight - DOODLE.height
                    DOODLE.ySpeed = -ACCESSORIES.springBoost
                }
                else if (pltfrm.accessoryType === 'rocket') {
                    DOODLE.y = pltfrm.y - ACCESSORIES.rocketHeight - DOODLE.height
                    DOODLE.state = 'rocketting'    
                }
                else if (pltfrm.accessoryType === 'hat') {
                    DOODLE.y = pltfrm.y - pltfrm.accessoryHeight - DOODLE.height
                    DOODLE.state = 'hatting'
                }
        }
    }
}

function onCanvasKeyPressed(event) {
    // console.log(event)
    isPressed = event.type === "keydown"
    if (event.key === "ArrowRight" || event.key === "d") {
        KEY.right = isPressed
    }
    if (event.key === "ArrowLeft" || event.key === "a") {
        KEY.left = isPressed
    }
}

function onCanvasMouseDown(event) {
    if (GAME.state === 'gameover') {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        if (GAME.width / 2 - 80 <= x 
            && x <= GAME.width / 2 + 80 
            && GAME.height / 2 <= y
            && y <= GAME.height / 2 + 60) {
                initDefaultVars()
                GAME.state = 'playing'
            }
    }
    if (GAME.state === 'menu') {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        if (GAME.width / 2 - 80 <= x 
            && x <= GAME.width / 2 + 80 
            && GAME.height / 2 + 60 <= y
            && y <= GAME.height / 2 + 120) {
                initDefaultVars()
                GAME.state = 'playing'
            }
    }
}

function initEventsListeners() {
    window.addEventListener("keydown", onCanvasKeyPressed);
    window.addEventListener("keyup", onCanvasKeyPressed);
    window.addEventListener("mousedown", onCanvasMouseDown);
}

// ----------------------------------------

function play() {
    if (GAME.state === 'menu') {
        drawMainMenu()
    }
    if (GAME.state === 'playing') {
        updateDoodle()
        updatePlatforms()
        drawFrame()
    }
    if (GAME.state === 'gameover') {
        fallAnimation()
        drawFrame()
    }
    requestAnimationFrame(play)
}

initDefaultVars()
play()
initEventsListeners()