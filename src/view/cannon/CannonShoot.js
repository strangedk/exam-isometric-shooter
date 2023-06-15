import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PixiPlugin } from 'gsap/PixiPlugin';

import BombType from "../../model/BombType";

class CannonShoot extends PIXI.Container {
  constructor() {
    super();

    gsap.registerPlugin(MotionPathPlugin);
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);
  }

  shoot({bombType, power}) {
    this.removeChildren();
    // Here is object pool/Fabric required.
    // I've just skip it consciously in this case, but I know about that.
    const bomb = this.createBomb(bombType);
    this.addChild(bomb);
  }

  createBomb(bombType) {
    const bomb = new PIXI.Sprite();

    const getUrl = () => {
      switch (bombType) {
        case BombType.BOMB_SMALL:
          return 'assets/bombs/scaled/scaled_bomb_small.png';
        case BombType.BOMB_MIDDLE:
          return 'assets/bombs/scaled/scaled_bomb_middle.png';
        case BombType.BOMB_LARGE:
          return 'assets/bombs/scaled/scaled_bomb_large.png';
      }
    }

    bomb.texture = PIXI.Texture.from(getUrl());
    return bomb;
  }
}

export default CannonShoot;
