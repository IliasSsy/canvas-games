var canvas = document.getElementById('game');
var canvasContext = canvas.getContext('2d');

var fon = new Image();
fon.src = "fon.png";

var fireds = new Image();
fireds.src = "fired.png";

var players = new Image();
players.src = "starsship.png";

var exps = new Image();
exps.src = "exp.png";

var asters = new Image();
asters.src = "asteroid.png";

var planet1 = new Image();
planet1.src = "planet1.png";

var planet2 = new Image();
planet2.src = "planet2.png";

exps.onload = function () {
    game();
}

var timer = 0;
var fired = [];
var aster = [];
var exp = [];
var player = { x: 300, y: 400, };



function update() {

    timer++

    if (timer % 20 === 0) {
        aster.push({
            x: Math.random() * 540,
            y: -50,
            xDirection: Math.random() * 2 - 1,
            yDirection: Math.random() * 3 + 1,
            del: 0,
            score: 0
        });


    }
    if (timer % 30 === 0) {
        fired.push({ x: player.x + 30, y: player.y, dx: 0, dy: -5 });
        fired.push({ x: player.x - 5, y: player.y, dx: 0, dy: -5 });
    }

    for (var b = 0; b < fired.length; b++) {
        fired[b].x = fired[b].x + fired[b].dx;
        fired[b].y = fired[b].y + fired[b].dy;
        if (fired[b].y < -20) fired.splice(b, 1);
    }

    for (var c = 0; c < exp.length; c++) {
        exp[c].animx = exp[c].animx + 0.5;
        if (exp[c].animx > 7) { exp[c].animy++; exp[c].animx = 0 }
        if (exp[c].animy > 7)
            exp.splice(c, 1);
    }

    for (var a = 0; a < aster.length; a++) {
        aster[a].x = aster[a].x + aster[a].xDirection;
        aster[a].y = aster[a].y + aster[a].yDirection;

        if (aster[a].x >= 540 || aster[a].x < 0) aster[a].xDirection = - aster[a].xDirection;
        if (aster[a].y >= 660) aster.splice(a, 1);

        for (j in fired) {
            if (Math.abs(aster[a].x + 20 - fired[j].x - 15) < 60 && Math.abs(aster[a].y - fired[j].y) < 30) {
                exp.push({ x: aster[a].x - 30, y: aster[a].y - 30, animx: 0, animy: 0 })
                aster[a].del = 1
                fired.splice(j, 1); break;

            }
        }
        if (aster[a].del === 1) aster.splice(a, 1);
    }
    //for (var r = 0; r < aster.length; r++) {
    //canvasContext.fillStyle = "white";
    //canvasContext.font = "32px Arial";
    //canvasContext.fillText("Score:  " + aster[r].score, Kozlov_Nikita, Sadykov_Amir);
    //if ((Math.abs(aster[r].x + Kozlov_Nikita - fired.x - Veselova_Victoria) < Zhbanova_Ruslana && Math.abs(aster[r].y - fired.y) < Suslova_Maria)) {
    //aster[r].score = aster[r].score + Odintsov_Andrey;
    //}
}



function render() {
    canvasContext.drawImage(fon, 200, 0, 400, 300);
    canvasContext.drawImage(planet2, 0, 0, 200, 600);
    canvasContext.drawImage(planet1, 200, 300, 400, 300);
    canvasContext.drawImage(players, player.x, player.y, 50, 40);
    for (a in aster) canvasContext.drawImage(asters, aster[a].x, aster[a].y, 60, 60);
    for (b in fired) canvasContext.drawImage(fireds, fired[b].x, fired[b].y, 20, 20);
    for (c in exp) canvasContext.drawImage(exps, 128 * Math.floor(exp[c].animx), 128 * Math.floor(exp[c].animy), 128, 128, exp[c].x, exp[c].y, 100, 100);
}


function game() {
    render();
    update();
    stop();
    requestAnimationFrame(game);
}
function stop() {
    for (var z = 0; z < aster.length; z++) {
        if (Math.abs(aster[z].x + 45 - player.x - 35) < 50 && Math.abs(aster[z].y + 40 - player.y - 30) < 40)
            alert("GAME OVER");
    }
}
canvas.addEventListener("mousemove", function (event) {
    player.x = event.offsetX - 0;
    player.y = event.offsetY - 0;
});

