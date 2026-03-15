var GAME = {
    level: 0,
}
var TERRAIN = {
    rows: 48,
    columns: 48,
    ratio: 10,
    array: null,
    xErrRate: null,
    yErrRate: null,
    xCanvasEnd: null,
    yCanvasEnd: null,
}

var HOME = {
    countFlower: 5,
    countLifeFlower: 0,
    countLifeStone: 0,
    countGold: 0,
}
function terrainArrayInit() { // Инициализация двум. массива террейна
    HOME.countFlower = 5;
    TERRAIN.array = new Array(TERRAIN.rows);
    for (let i = 0; i < TERRAIN.rows; i++) {
        TERRAIN.array[i] = new Array(TERRAIN.columns).fill(0);
    }
    terrainRendering();
}
function onCanvasMouseDown() { //Ивент нажатия клавиши
    addEventListener("mousedown", (event) => { });
    onmousedown = (event) => {
        if (HOME.countFlower > 0) {//Условие поменять!
            xGlobalPlayerClick = event.clientX; //координаты нажатия
            yGlobalPlayerClick = event.clientY;
            //Переписать ограничение.
            
            if (xGlobalPlayerClick > TERRAIN.xCanvasEnd || yGlobalPlayerClick > TERRAIN.yCanvasEnd || xGlobalPlayerClick < TERRAIN.xErrRate || xGlobalPlayerClick < TERRAIN.yErrRate) {
                return;
            }else{
                setFlowerOnField(event);
            }
            
            
        }
    };

}
function setFlowerOnField(event){
    let y = Math.floor((event.clientY - TERRAIN.yErrRate) / TERRAIN.ratio);
    let x = Math.floor((event.clientX - TERRAIN.xErrRate) / TERRAIN.ratio);
    
    for (let yHeshDir = 0; yHeshDir < 6; yHeshDir++){
        for(let xHeshDir = 0; xHeshDir < 6; xHeshDir++){
            if(TERRAIN.array[y + yHeshDir][x + xHeshDir] != 0) return;// Проверка на пустоту рядом
            if(y + yHeshDir >= TERRAIN.columns - 1 || x + xHeshDir >= TERRAIN.rows - 1) return; //Проверка на выход за Canvas
        }
    }
    TERRAIN.array[y][x] = new Flower(x, y, Date.now());
}
function heshMapRendering(yTerrain, xTerrain, heshMapNumber){
    
    for(let yHeshMap = 0; yHeshMap < 6; yHeshMap++){
        for(let xHeshMap = 0; xHeshMap < 6; xHeshMap++){
            var cellHeshMap = heshMapArray[heshMapNumber][yHeshMap][xHeshMap];
            TERRAIN.array[yTerrain + yHeshMap + 1][xTerrain + xHeshMap + 1] = cellHeshMap;
        }
    }
} 
function terrainRendering() { // Отрисовка террейна 
    canvasContext.clearRect(0, 0, TERRAIN.rows * 10, TERRAIN.columns * 10)
    HOME.countLifeFlower = 0;
    HOME.countLifeStone = 0;
    for (let y = 0; y < TERRAIN.rows; y++) {
        let counterY = y + 1;
        for (let x = 0; x < TERRAIN.columns; x++) {
            //canvasContext.fillStyle = 'rgb(82, 122, 6)';
            //canvasContext.fillRect(x * TERRAIN.ratio, y * TERRAIN.ratio, TERRAIN.ratio, TERRAIN.ratio);
            let counterX = x + 1
            if(TERRAIN.array[y][x] == 0) { //Пустая клетка
                if (counterY % 2 == 0) {
                    if (counterX % 2 == 0) {
                        canvasContext.fillStyle = 'rgba(95, 92, 60, 0.75)';
                        canvasContext.fillRect(x * TERRAIN.ratio, y * TERRAIN.ratio, TERRAIN.ratio, TERRAIN.ratio);
                    } else {
                        canvasContext.fillStyle = 'rgba(95, 92, 60, 0.81)';
                        canvasContext.fillRect(x * TERRAIN.ratio, y * TERRAIN.ratio, TERRAIN.ratio, TERRAIN.ratio);
                    }

                } else {
                    if (counterX % 2 == 0) {
                        canvasContext.fillStyle = 'rgba(95, 92, 60, 0.77)';
                        canvasContext.fillRect(x * TERRAIN.ratio, y * TERRAIN.ratio, TERRAIN.ratio, TERRAIN.ratio);
                    } else {
                        canvasContext.fillStyle = 'rgba(95, 92, 60, 0.78)';
                        canvasContext.fillRect(x * TERRAIN.ratio, y * TERRAIN.ratio, TERRAIN.ratio, TERRAIN.ratio);
                    }
                }
            }else if(typeof(TERRAIN.array[y][x]) == typeof("")){
                canvasContext.fillStyle = TERRAIN.array[y][x];
                canvasContext.fillRect(x * TERRAIN.ratio, y * TERRAIN.ratio, TERRAIN.ratio, TERRAIN.ratio);
            }else if(TERRAIN.array[y][x].type == "flower"){ //Катапульта
                HOME.countLifeFlower++;
                canvasContext.fillStyle = 'rgb(122, 29, 6)';
                canvasContext.fillRect(x * TERRAIN.ratio, y * TERRAIN.ratio, TERRAIN.ratio, TERRAIN.ratio);
                TERRAIN.array[y][x].renderingHeshMap();
            }else if(TERRAIN.array[y][x].type == "stone"){ //Камень
                TERRAIN.array[y][x].renderingStone();
                HOME.countLifeStone++;
            }else if(TERRAIN.array[y][x].type == "wall"){
                TERRAIN.array[y][x].renderingWall();
            }else if(TERRAIN.array[y][x].type == "gold"){
                TERRAIN.array[y][x].renderingGold();
            }


        }
    }
}
function main() {
    if(GAME.level > 3){
        alert("вы победили ;)");
        GAME.level = 0;
        
        terrainArrayInit();
        renderingLocation();

    }
    
    if(HOME.countFlower  == 0 && HOME.countLifeFlower == 0 && HOME.countLifeStone == 0){
        alert("вы проиграли :(");

        GAME.level = 0;
        terrainArrayInit();
        renderingLocation();
    }
    if(HOME.countGold == 0){
        GAME.level += 1;
        
        terrainArrayInit();
        renderingLocation();
    }
    terrainRendering();
    onCanvasMouseDown();
    requestAnimationFrame(main);


}
var canvas = document.getElementById('canvas');

canvas.width = TERRAIN.rows * TERRAIN.ratio;
canvas.height = TERRAIN.columns * TERRAIN.ratio;
var canvasContext = canvas.getContext("2d");



TERRAIN.xErrRate = canvas.getBoundingClientRect().x;//Погрешность при смещении canvas
TERRAIN.yErrRate = canvas.getBoundingClientRect().y;
TERRAIN.xCanvasEnd = TERRAIN.columns * TERRAIN.ratio + TERRAIN.xErrRate;//Крайняя точка Canvas на глобальной системе координат
TERRAIN.yCanvasEnd = TERRAIN.rows * TERRAIN.ratio + TERRAIN.yErrRate;


terrainArrayInit();//Создание поля
renderingLocation();
main();