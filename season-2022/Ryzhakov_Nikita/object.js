const devices = new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini', "i");
if (devices.test(navigator.userAgent)) {
    height = window.innerHeight - 500,
    width = window.innerWidth - 500,
    phone = true;
} else {
    height = 600,
    width = 400,
    phone = false
}

var GAME = {
    width: width,
    height: height,
    background: "#252850",
    score: 0,
    pause: false,
    level: 1,
    lives: 5,
    countBomb: 6,
    ammunation: 30,
    phone: phone,
    cheatLives: false,
    cheatAmmunation: false,
}

var SHIP = {
    image: `./images/ship/ship_${GAME.level}.png`,
    img: new Image(),
    load: false,
    sizeX: 80,
    sizeY: 120,
    x: GAME.width / 2,
    y: GAME.height - 120 - 20,
    directionX: 5,
}

var BOMB = {
    image: "./images/bomb.png",
    directionY: 3,
    sizeX: 40,
    sizeY: 40,
}

var PACKET = {
    image: `./images/packets/packet_${GAME.level}.png`,
    sizeX: 15,
    sizeY: 40,
    directionY: 5,
}

var SETLIVE = {
    image: "./images/live.png",
    sizeX: 20,
    sizeY: 20,
    y: 10,
}

var STAR = {
    R: 1.5,
    color: 'white',
    directionY: 2.5,
}

var AMMUNATION = {
    R: 2,
    color: "yellow",
    x: GAME.width - 75,
    y: 10
}

function Bomb() {
    this.x = Math.floor(Math.random() * (GAME.width - 150)) + 50,
    this.img = new Image(),
    this.load = false,
    this.y = -50
}

function Packet() {
    this.img = new Image(),
    this.x = SHIP.x + SHIP.sizeX / 2 - PACKET.sizeX / 2,
    this.y = SHIP.y - PACKET.sizeY / 2,
    this.load = false
}

function Live(x) {
    this.img = new Image(),
    this.x = x,
    this.load = false
}

function Star() {
    this.x = Math.floor(Math.random() * (GAME.width - 0)) + 50,
    this.y = Math.floor(Math.random() * (-GAME.height - 150)) + 50
}