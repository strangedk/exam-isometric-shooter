import * as PIXI from 'pixi.js';
import BombType from "../../model/BombType";
import {Spine} from "pixi-spine";

class CannonShoot extends PIXI.Container {
  constructor() {
    super();

    this.bomb = null;
  }

  shoot({bombType, power}) {
    if (this.bomb)
      this.removeChild(this.bomb);

    // Here is object pool/Fabric required.
    // I've just skip it consciously in this case, but I know about that.

    this.bomb = this.createBomb(bombType);
    this.addChild(this.bomb);

    this.implShoot(power);
  }

  implShoot(power) {
    const startX = 0;
    const startY = 0;
    // Adjust the power and half and offsets to keep the bounds before and behind the cannon
    // Anyway I think that hitTest is a more proper way, for instance,
    // - When the enemy cannon is can be moved by player/pc
    const offsetY = power < 50 ? power/2 : power+30;
    const endX = 600 / 100 * (power + power/2);
    const endY = -150 / 100 - offsetY;

    const curveHeight = -50; // Height in pixels depends on the power incoming
    const curveDuration = 50; // ms

    let timeIntervalID = null;
    let timeStart = 0;
    let timeCurrent = 0;
    let timeTick = 1;

    let progressCurrent = 0;
    let progressFinal = 1;

    const calculateCurve = (height, progress) => {
      // Convert the progress from 0..1 to -1..1
      // To make the curve (in decard 4) Y decreasing, and then increasing
      const adjustedProgress = progress * 2 - 1;
      return endY + height - (adjustedProgress ** 2) * height;
    }

    const animate = () => {
      if (!timeStart) {
        timeStart = timeCurrent;
      }
      timeCurrent += timeTick;

      const elapsedTime = timeCurrent - timeStart;
      progressCurrent = Math.min(elapsedTime / curveDuration, 1) * progressFinal; // 0..100

      // Linear movement
      const currentX = startX + (endX - startX) * progressCurrent;
      // Parabolic curve movement
      // calculateCurve makes it up and down then.
      // I've thinking about an alternative with a 3 gsap tween here:
      // The first one is linear by X with a duration 1
      // The second one is with easing decrease by Y, duration 0.5
      // The third one is with easing increase by Y, duration 0.5, delay 0.5
      const currentY = startY + calculateCurve(curveHeight, progressCurrent);

      this.bomb.position.set(currentX, currentY);

      if (progressCurrent >= progressFinal) {
        clearInterval(timeIntervalID);
        this.createExplosion();
      }
    }

    timeIntervalID = setInterval(() => animate(), 10);
  }

  explode() {
    // The animation is obviously should be a different depending by type of the bomb.
    // But I believe that you understand, why it's the same now
    // assets/animations/explosion/ExplosionAnim.json
    // animationName: ExplosionBattleJet
    this.bomb.visible = false;

    const offset = 50;
    this.spine.visible = true
    this.spine.position.set(this.bomb.x - offset, this.bomb.y - offset);
    this.spine.state.addListener({ complete: () => this.explodeFinished() });
    this.spine.state.setAnimation(0,'ExplosionBattleJet', false);
  }

  explodeFinished() {
    this.spine.visible = false;
    this.spine.state.clearTrack(0);
    this.spine.skeleton.setToSetupPose();
  }

  createExplosion() {
    if (!this.spine) {
      PIXI.Assets.loader
        .load('assets/animations/explosion/ExplosionAnim.json').then(data => {
          this.spine = new Spine(data.spineData);
          this.addChild(this.spine);
          this.spine.visible = false;
          this.explode();
        });
    } else {
      this.explode();
    }
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
