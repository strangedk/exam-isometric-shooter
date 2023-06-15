import * as signals from "signals";

const add = () => new signals.Signal()

export default {
  gameStart : add(),
  gameOver : add(),

  shootStart: add(), // Start the targeting and power/range choosing
  shootProgress: add(), // Progress of a shoot preparing
  shootReset: add(), // Avoid the shooting if user out cursor still pressed

  bombLaunched: add(), // Launching the bomb with an options
  shoot: add(), // Shooting tween
  bombExploded: add(), // Bomb is exploded. On the target or beside

  updateHealth: add(),
};
