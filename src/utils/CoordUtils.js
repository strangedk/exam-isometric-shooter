import * as PIXI from 'pixi.js';

const isoMatrix = new PIXI.Matrix();
isoMatrix.a = 0.5;    // Horizontal scale
isoMatrix.b = 0.5;    // Horizontal offset
isoMatrix.c = -0.5;   // Vertical scale
isoMatrix.d = 0.5;    // Vertical offset

/**
 * Convert cartesian (decard-4) coordinates to isometric coordinates
 * @param cartX
 * @param cartY
 * @returns {{x: number, y: number}}
 */
const cartesianToIsometric = (cartX, cartY) => {
  const x = isoMatrix.a * cartX + isoMatrix.c * cartY;
  const y = isoMatrix.b * cartX + isoMatrix.d * cartY;
  return { x, y };
}

/**
 * Makes transformation of sprite from arguments,
 * applying the matrix from cartesian (decard-4) coordinates to isometric
 * additionally applying the rotation and offset by demand
 * @param sprite
 * @param offsetX
 * @param offsetY
 */
const makeSpriteIsometric = (sprite, offsetX= 0, offsetY = 0) => {
  const { x,y } = cartesianToIsometric(sprite.x, sprite.y);
  sprite.x = x;
  sprite.y = y;
  sprite.transform.worldTransform.copyFrom(isoMatrix);
  sprite.angle = 45;

  sprite.x += offsetX;
  sprite.y += offsetY;
}

export { makeSpriteIsometric, cartesianToIsometric };
