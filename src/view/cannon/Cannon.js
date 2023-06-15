import * as PIXI from "pixi.js";
import CannonType from "./CannonType";
import ProgressBarHealth from "../components/ProgressBarHealth";
import Signals from "../../events/Signals";
import CannonShoot from "./CannonShoot";

class Cannon extends PIXI.Sprite {
  /**
   * Creates a cannon depends on the type
   * @param cannonType @see CannonType enum
   */
  constructor(cannonType) {
    super();
    this.type = cannonType;
    this.health = null;
    this.texture = PIXI.Texture.from(this.url);

    this
      .addHealthProgress(0,-20)
      .addBomb(140,-30);

    Signals.updateHealth.add(this.updateHealth, this);
    Signals.shoot.add(this.shoot, this);
  }

  updateHealth({cannonType, health}) {
    if (cannonType === this.type) {
      this.health.progress = health;
    }
  }

  shoot({bombType, power}) {
    this.bomb.shoot({bombType, power});
  }

  addBomb(x,y) {
    this.bomb = new CannonShoot();
    this.bomb.position.set(x,y);
    this.addChild(this.bomb);
  }

  addHealthProgress(x, y) {
    const options = {
      background: 0xffffff,
      border: 0x000000,
      fill: this.type === CannonType.HERO ? 0x5f5fff : 0xff0000,
      width: 180,
      height: 8,
      progress: 100,
    };

    this.health = new ProgressBarHealth(options);
    this.health.type = this.type;
    this.health.position.set(x, y);
    this.addChild(this.health);

    return this;
  }

  get url() {
    switch (this.type) {
      case CannonType.HERO:
        return 'assets/cannon/scaled/cannon_left_bottom.png';
      case CannonType.ENEMY:
        return 'assets/cannon/scaled/cannon_right_top.png';
    }
  }
}

export default Cannon;
