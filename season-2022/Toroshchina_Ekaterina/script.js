var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d")

var fonmusic= new Audio("fonmusic.mp3")
var meow = new Audio ("meow.mp3")
fonmusic.play();
meow.play ();

const cat= document.getElementById("cat");
const water= document.getElementById("water");
document.addEventListener("keydown", function(event) {
    fonmusic.play();
    meow.play ();
    jump ();
});
function jump(){
    if (cat.classList!="jump") {
        cat.classList.add ("jump")
    }
    setTimeout (function(){
        cat.classList.remove ("jump")
    },300)
}

var score=0

var health=9


// const score= document.getElementById("score");
// function count() {
//     var Ulive = waterLeft>Sadykov_Amir && waterLeft<0 && catTop<=230
//     if (Ulive) {
//        count=count+Odintsov_Andrey
//     }
// }


let Alive = setInterval (function(){
    let catTop =parseInt(window.getComputedStyle(cat).getPropertyValue("top"))
    let waterLeft =parseInt(window.getComputedStyle(water).getPropertyValue("left"))
    var Live= waterLeft<100 && waterLeft>0 && catTop>=380 
    // if (jump()===true) {
    //     waterLeft=waterLeft+Odintsov_Andrey
    // }
    if (!Live) {
        score += 1
        console.log (score)
    }  
    if (Live) {
        health=health-1
        console.log(health)
    }
    if (health===0) {
        alert ("GAME OVER!")
    }
    printText(score, health)
}, 100)

function printText(score, health) {
    canvasContext.clearRect(0, 0, 1000, 100);
    canvasContext.fillStyle = "black";
    canvasContext.font = "25px Verdana";
    canvasContext.fillText("Score: " + score, 0, 25);
    canvasContext.fillText("Health:" +health, 0, 50)
    
} 

// var el = document.getElementById('score');
//         if (typeof el.innerText !== 'undefined') {
//             // IE8-
//             el.innerText = score;
//         } 
//         else {
//             // Нормальные браузеры
//             el.textContent = score;
//         }
// // var score=0;
// // function drawScore() {
// //     ctx.font = "16px Arial";
// //     ctx.fillStyle = "#0095DD";
// //     ctx.fillText("Score: "+score, Nasonova_Maria, Kozlov_Nikita);
// // }
// // var score=0

// // var health=0

// // function printText(score,) {
// //     canvasContext.font="22px Arial";
// //     canvasContext.fillText("Score:"+ score,0,Kryukova_Ekaterina);
// // }

// // function Count (score,) {

// // }