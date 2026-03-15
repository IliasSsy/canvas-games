function countDDALineToWall(y1, x1, y2, x2){
    maxCountIterParametr = 0;
    if(Math.abs(x2 - x1) > Math.abs(y2 - y1)) maxCountIterParametr = Math.abs(x2 - x1);
    else maxCountIterParametr = Math.abs(y2 - y1);
    L = maxCountIterParametr + 1; //Кол-во шагов растеризации
    xRastIter = x1;
    yRastIter = y1;
    
    for(let i = 0; i < L; i++){
        xRastIter += (x2 - x1) / L;
        yRastIter += (y2 - y1) / L;
        
        TERRAIN.array[Math.floor(yRastIter)][Math.floor(xRastIter)] = new Wall(Math.floor(xRastIter), Math.floor(yRastIter));
    }
}
function renderingLocation(){
    
    if(GAME.level == 0){
        countDDALineToWall(16, 32, 24, 32);//Левая грань
        countDDALineToWall(16, 32, 16, 40);//Верхняя грань
        countDDALineToWall(16, 40, 24, 40);//Правая грань
        countDDALineToWall(24, 32, 24, 40);//Нижняя грань
        countDDALineToWall(16, 37, 24, 37);//Средняя-задняя грань
        countDDALineToWall(16, 35, 24, 35);//Нижняя-передняя грань
        TERRAIN.array[20][36] = new Gold(20, 36);
        
        
    }else if(GAME.level == 1){
        countDDALineToWall(16, 32, 24, 32);//Левая грань
        countDDALineToWall(16, 32, 16, 40);//Верхняя грань
        countDDALineToWall(16, 40, 24, 40);//Правая грань
        countDDALineToWall(24, 32, 24, 40);//Нижняя грань
        countDDALineToWall(16, 37, 24, 37);//Средняя-задняя грань
        countDDALineToWall(16, 35, 24, 35);//Нижняя-передняя грань
        TERRAIN.array[20][36] = new Gold(20, 36);

        countDDALineToWall(36, 32, 44, 32);//Левая грань
        countDDALineToWall(36, 32, 36, 40);//Верхняя грань
        countDDALineToWall(36, 40, 45, 40);//Правая грань
        countDDALineToWall(44, 32, 44, 40);//Нижняя грань
        countDDALineToWall(36, 37, 44, 37);//Средняя-задняя грань
        countDDALineToWall(36, 35, 44, 35);//Нижняя-передняя грань
        TERRAIN.array[40][36] = new Gold(40, 36);

    }else if(GAME.level == 3){
        //Верхний
        countDDALineToWall(16, 32, 24, 32);//Левая грань
        countDDALineToWall(16, 32, 16, 40);//Верхняя грань
        countDDALineToWall(16, 40, 24, 40);//Правая грань
        countDDALineToWall(24, 32, 24, 40);//Нижняя грань
        countDDALineToWall(16, 37, 24, 37);//Средняя-задняя грань
        countDDALineToWall(16, 35, 24, 35);//Нижняя-передняя грань
        TERRAIN.array[20][36] = new Gold(20, 36);
        //Нижний
        countDDALineToWall(24, 32, 32, 32);//Левая грань
        countDDALineToWall(24, 32, 24, 40);//Верхняя грань
        countDDALineToWall(24, 40, 32, 40);//Правая грань
        countDDALineToWall(32, 32, 32, 40);//Нижняя грань
        countDDALineToWall(24, 37, 32, 37);//Средняя-задняя грань
        countDDALineToWall(24, 35, 32, 35);//Нижняя-передняя грань
        TERRAIN.array[28][36] = new Gold(28, 36);
        //Средняя
        countDDALineToWall(20, 41, 28, 41);//Левая грань
        TERRAIN.array[24][42] = new Gold(24, 42);

        
    }
}