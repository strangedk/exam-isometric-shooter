import * as PIXI from 'pixi.js';
import BombType from "../../model/BombType";

class CannonShoot extends PIXI.Container {
  constructor() {
    super();

    this.bomb = null;
  }

  shoot({bombType, power}) {
    this.removeChildren();
    // Here is object pool/Fabric required.
    // I've just skip it consciously in this case, but I know about that.
    if (this.bomb)
      delete this.bomb;
    this.bomb = this.createBomb(bombType);
    this.addChild(this.bomb);

    this.implShoot(power);
  }

  implShoot(power) {
    const startX = 0;
    const startY = 0;
    // Adjust the power and half, to keep the bounds before and behind the cannon
    const endX = 600 / 100 * (power + power/3);
    const endY = -150 / 100 * (power + power/3);

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
      return endY + height - Math.pow(adjustedProgress, 2) * height;
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
      }
    }

    timeIntervalID = setInterval(() => animate(), 10);
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
