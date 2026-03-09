let tiles = new Map()

async function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    }
    img.onerror = reject
    img.src = url;
  });
}

async function load(definitions) {
  const textures = definitions.textures;
  console.log(textures)
  for (const texture of textures) {
    console.log(texture)
    const img = await loadImage("tex/" + texture.name + ".png")
    for (const tile of texture.images)
      tiles.set(tile.n, {img, tile})
  }
}

function drawSprite(x, y, w, h, rot, spriteName) {
  let sprite = tiles.get(spriteName)
  if (!sprite) {
    // console.log('Failed to render tile named ' + spriteName)
    return;
  }
  canvasContext.save();
  canvasContext.translate(x + w / 2, y + h / 2);
  canvasContext.rotate(rot);
  canvasContext.drawImage(sprite.img, sprite.tile.x, sprite.tile.y, sprite.tile.w, sprite.tile.h,
    -w / 2, -h / 2, w, h);
  canvasContext.restore();
}
