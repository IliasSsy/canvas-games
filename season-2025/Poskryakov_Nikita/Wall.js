class Wall{
    x = null;
    y = null;
    type = "wall";

    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    renderingWall(){
        canvasContext.fillStyle = 'rgb(116, 116, 116)';
        canvasContext.fillRect(this.x * TERRAIN.ratio, this.y * TERRAIN.ratio, TERRAIN.ratio, TERRAIN.ratio);
    }
}