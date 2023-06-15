import * as PIXI from "pixi.js";
import Tile from "./Tile";
import {makeSpriteIsometric} from "../../utils/CoordUtils";

const params = {
  WIDTH: 7,
  HEIGHT: 7,
  IMG_WIDTH: 100,
  IMG_HEIGHT: 100,
}

class Field extends PIXI.Sprite {
  constructor() {
    super();

    this.items = null;

    this
      .drawBackground()
      .drawTiles()
  }

  drawBackground() {
    const {WIDTH, HEIGHT, IMG_WIDTH, IMG_HEIGHT,} = params;

    const bg = new PIXI.Graphics();
    bg.beginFill(0x333333);
    bg.drawRect(0,0, (WIDTH-2) * IMG_WIDTH, (HEIGHT-2) * IMG_HEIGHT);
    bg.endFill();

    makeSpriteIsometric(bg, 0, 50);

    this.addChild(bg);

    return this;
  }

  drawTiles() {
    const {WIDTH, HEIGHT, IMG_WIDTH, IMG_HEIGHT,} = params;

    const quantity = WIDTH * HEIGHT;
    const filled = new Array(quantity).fill(1);

    this.items = filled.map((value, index) => {
        const posX = index % WIDTH;
        const posY = Math.floor(index / HEIGHT);

        const tile = new Tile(posX, posY);

        // Using here at first the usual Decart-4 coordinates
        tile.x = posX * IMG_WIDTH;
        tile.y = posY * IMG_HEIGHT;

        // Convert them to the isometric here and changing angle (not rotation).
        makeSpriteIsometric(tile);
        this.addChild(tile);

        return tile;
      }
    );
    return this;
  }
}

export default Field;
