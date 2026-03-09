const fish = document.getElementById("fish");
const stone = document.getElementById("stone");
document.addEventListener("keydown", function (event) {
    jump();
})
function jump() {
    if (fish.classList != "jump") {
        fish.classList.add("jump")
    }

    setTimeout(function () {
        fish.classList.remove("jump")
    }, 300)
}
let isAlive = setInterval(function () {
    let fishTop = parseInt(window.getComputedStyle(fish).getPropertyValue("top"));
    let stoneLeft = parseInt(window.getComputedStyle(stone).getPropertyValue("left"));
    if (stoneLeft < 50 && stoneLeft > 0 && fishTop >= 140) {
        alert("GAME OVER")

    }
}, 10)


jump();

var sea = new Image();
sea.src = "Image/sea.png";


