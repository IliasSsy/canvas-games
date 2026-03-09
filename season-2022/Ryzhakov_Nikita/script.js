var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d");

canvas.width = GAME.width
canvas.height = GAME.height

let bombs = [];
let packets = [];
let lives = [];
let stars = [];
var oldTouchX = 0;

function drawFrame() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    document.getElementById("title").innerHTML = "SCORE:" + GAME.score
    drawBackground();
    drawStars();
    drawAmmunation();
    loadShip(SHIP);
    loadPackets(packets);
    loadBombs(bombs);
    loadLives();
    drawAll();
}

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

function drawStars() {
    for (var i = stars.length; i < 50; i++) {
        stars.push(new Star())
    }
    for (let star of stars) {
        canvasContext.fillStyle = STAR.color;
        canvasContext.beginPath();
        canvasContext.arc(star.x, star.y, STAR.R, 0, 2 * Math.PI);
        canvasContext.fill();
    }
}

function loadShip(ship) {
    ship.img.src = ship.image
    ship.img.onload = () => { ship.load = true }
}

function loadPackets(packets) {
    for (let packet of packets) {
        packet.img.src = PACKET.image
        packet.img.onload = () => { packet.load = true }
    }
}

function loadBombs(bombs) {
    for (let bomb of bombs) {
        bomb.img.src = BOMB.image
        bomb.img.onload = () => { bomb.load = true }
    }
}

function loadLives() {
    for (let live of lives) {
        live.img.src = SETLIVE.image
        live.img.onload = () => { live.load = true }
    }
}

function drawAmmunation() {
    var startX = AMMUNATION.x
    for (var i = 0; i < GAME.ammunation; i++) {
        canvasContext.fillStyle = AMMUNATION.color;
        canvasContext.beginPath();
        startX += 2;
        canvasContext.arc(startX, AMMUNATION.y, AMMUNATION.R, 0, 2 * Math.PI);
        canvasContext.fill();
    }
}

function drawAll() {
    if (SHIP.load) canvasContext.drawImage(SHIP.img, SHIP.x, SHIP.y, SHIP.sizeX, SHIP.sizeY) 
    for (let packet of packets) {if (packet.load) canvasContext.drawImage(packet.img, packet.x, packet.y, PACKET.sizeX, PACKET.sizeY)}
    for (let bomb of bombs) {if (bomb.load) canvasContext.drawImage(bomb.img, bomb.x, bomb.y, BOMB.sizeX, BOMB.sizeY)}
    for (let live of lives) {if (live.load) canvasContext.drawImage(live.img, live.x, SETLIVE.y, SETLIVE.sizeX, SETLIVE.sizeY)}
}

function updateShip(ship) {
    ship.x += ship.directionX
}

function checkShip(game, ship) {
    if ((ship.x + ship.sizeX >= game.width) || (ship.x <= 0)) ship.directionX = -ship.directionX
    if (ship.x + ship.sizeX >= game.width) ship.x = game.width - ship.sizeX
    if (ship.x <= 0) ship.x = 5
}

function updatePackets() {
    for (let packet of packets) {packet.y -= PACKET.directionY}
}

function checkPackets() {
    for (var i = 0; i <= packets.length - 1; i++) {
        var packet = packets[i];
        if (0 > packet.y) packets.splice(i, 1);
        for (var x = 0; x <= bombs.length - 1; x++) {
            var bomb = bombs[x]
            if ((packet.y <= bomb.y + BOMB.sizeY) && (packet.y >= bomb.y) && (packet.x >= bomb.x) && (packet.x <= bomb.x + BOMB.sizeX)) {
                bombs.splice(x, 1);
                packets.splice(i, 1)
            }
        }
    }
}

function checkBomb(ship, game) {
    for (var i = bombs.length; i < GAME.countBomb; i++) bombs.push(new Bomb());
    for (var i = 0; i <= bombs.length - 1; i++) {
        var bomb = bombs[i];
        if (bomb.y >= GAME.height) bombs.splice(i, 1);
        if ((bomb.x >= ship.x - BOMB.sizeX) && (bomb.x <= ship.x + ship.sizeX) && (bomb.y <= ship.y + ship.sizeY) && (bomb.y >= ship.y - ship.sizeY / 2 + BOMB.sizeY / 2)) {
            bombs.splice(i, 1);
            if (!game.cheatLives) game.lives--;
        }
    }
}

function updateBomb() {
    for (let bomb of bombs) bomb.y += BOMB.directionY
}

function checkLives() {
    for (var i = lives.length; i < GAME.lives; i++) {
        var downLive = lives[lives.length - 1]
        if (downLive) lives.push(new Live(downLive.x + 5 + SETLIVE.sizeX))
        if (!downLive) lives.push(new Live(10))
    }
    if (GAME.lives < lives.length + 1) lives.splice(GAME.lives, lives.length - GAME.lives)
}

function checkStars() {
    for (var i = 0; i < stars.length - 1; i++) {
        var star = stars[i]
        if (star.y >= GAME.height) stars.splice(i, 1)
    }
}

function updateStars() {
    for (let star of stars) star.y += STAR.directionY
}

function gameOver() {
    GAME.lives = 5;
    bombs.length = 0;
    packets.length = 0;
    GAME.ammunation = 30;
    GAME.score = 0;
    GAME.pause = true;
}

function play() {
    if (!GAME.pause) {
        drawFrame()
        updateShip(SHIP)
        checkShip(GAME, SHIP)
        checkBomb(SHIP, GAME)
        updateBomb()
        updatePackets()
        checkPackets()
        checkLives()
        updateStars()
        checkStars()
        if (GAME.lives == 0) {
            drawFrame()
            gameOver()
        }
    } else {
        document.getElementById("title").innerHTML = "PAUSE"
    }
    requestAnimationFrame(play);
}

function moveMouse(event) {
    SHIP.x = event.clientX
    SHIP.directionX = 0
    if (event.clientX >= GAME.width - SHIP.sizeX) SHIP.x = GAME.width - SHIP.sizeX
}

function checkKeyboard(event) {
    if ((event.code == "Escape") || (event.code == "Enter")) GAME.pause = !GAME.pause
    if (event.code == 'ArrowLeft') SHIP.directionX = -5
    if (event.code == 'ArrowRight') SHIP.directionX = 5
    if ((event.code == 'ArrowUp') && (GAME.ammunation > 0)) {
        if (!GAME.cheatAmmunation) GAME.ammunation--;
        packets.push(new Packet());
    }
    if ((event.altKey) && (event.ctrlKey)) {
        if (event.code == 'KeyL') GAME.cheatLives = !GAME.cheatLives
        if (event.code == 'KeyA') GAME.cheatAmmunation = !GAME.cheatAmmunation
        if (event.code == 'KeyS') GAME.score = prompt("Enter score:")
        if (event.code == 'KeyB') bombs.length = 0
    }
}

function checkMouse(event) {
    if (event.button == 1) GAME.pause = !GAME.pause;
    if ((event.button == 0) && (GAME.ammunation > 0)) {
        if (!GAME.cheatAmmunationammunation) GAME.ammunation--;
        packets.push(new Packet())
    }
}

function checkTouch(event) {
    if (GAME.ammunation > 0) {
        packets.push(new Packet());
        GAME.ammunation--;
    }
}

function moveTouch(event) {
    if (event.changedTouches[0].clientX > oldTouchX) SHIP.directionX = 5
    if (event.changedTouches[0].clientX < oldTouchX) SHIP.directionX = -5
    oldTouchX = event.changedTouches[0].clientX
}

function initListenerSingle() {
    if (GAME.phone) {
        document.addEventListener("touchmove", moveTouch, { passive: false });
        document.addEventListener("touchstart", checkTouch);
    } else {
        canvas.addEventListener('mousemove', moveMouse);
        document.addEventListener('keydown', checkKeyboard);
        document.addEventListener("mousedown", checkMouse);
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

setInterval(() => GAME.score++, 5000)
setInterval(() => GAME.ammunation = 30, 15000)
initListenerSingle();
play()