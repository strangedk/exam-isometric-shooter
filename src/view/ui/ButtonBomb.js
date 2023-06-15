import * as PIXI from 'pixi.js';
import BombType from "../../model/BombType";
import Signals from "../../events/Signals";

class ButtonBomb extends PIXI.Sprite {
  constructor(type) {
    super();

    this.type = type;
    this.texture = PIXI.Texture.from(this.url);

    this.on('pointerdown', this.onPointerDown.bind(this));
    this.on('pointerup', this.onPointerUp.bind(this));
    this.on('pointerout', this.onPointerOut.bind(this));
    this.on('pointerover', this.onPointerOver.bind(this));

    Signals.shootStart.add(this.onShootStart, this);
    Signals.bombLaunched.add(this.onShootStart, this);
    Signals.bombExploded.add(this.onExplode, this);

    this.active = false;

    this.eventMode = 'dynamic';
    this.cursor = 'pointer';
  }

  get url() {
    switch (this.type) {
      case BombType.BOMB_SMALL:
        return 'assets/buttons/button_bomb_small.png';
      case BombType.BOMB_MIDDLE:
        return 'assets/buttons/button_bomb_middle.png';
      case BombType.BOMB_LARGE:
        return 'assets/buttons/button_bomb_large.png';
    }
  }

  onPointerDown(event) {
    this.active = true;
    Signals.shootStart.dispatch(this.type);
  }

  onPointerUp(event) {
    this.active = false;
    Signals.bombLaunched.dispatch(this.type);
  }

  onPointerOver(event) {
    this.tint = 0xcccddd;
  }

  onPointerOut(event) {
    if (this.active) {
      Signals.bombLaunched.dispatch(this.type);
    }
    this.tint = 0xffffff;
  }

  reset() {
    Signals.shootReset.dispatch();
  }

  onShootStart(type) {
    if (type !== this.type) {
      this.alpha = 0.3;
      this.eventMode = 'none';
    }
  }

  onExplode() {
    this.alpha = 1;
    this.eventMode = 'dynamic';
  }
}

export default ButtonBomb;
