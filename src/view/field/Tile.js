import * as PIXI from "pixi.js";

const TINTS = [
  0x00dd00,
  0x00ee00,
  0x00ff00,
  0xdddddd,
  0xeeeeee,
  0xffffff
];

const randomTint = () => {
  const type = Math.floor(Math.random() * TINTS.length);
  const tint = TINTS[type];

  return {type, tint};
}

class Tile extends PIXI.Sprite {
  constructor(posX, posY) {
    super();

    this.posX = posX;
    this.posY = posY;
    const {tint, type} = randomTint();
    this.tint = tint;
    this.type = type;

    this.texture = PIXI.Texture.from('assets/field/grass.png');
  }
}

export default Tile;
