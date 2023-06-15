import Signals from "../events/Signals";
import BombDamageByType from "./BombDamageType";
import CannonType from "../view/cannon/CannonType";

class ViewModel {
  constructor() {

    this.interval = 12;
    this.power = 0;

    // Mock data. This one stored in the frontend model
    this.hit = {
      from: 40,
      to: 60,
    }

    // Mock data for the starting health props for the Cannons.
    this.healthHero = 100;
    this.healthEnemy = 100;

    Signals.shootStart.add(this.onShootStart, this);
    Signals.bombLaunched.add(this.onBombLaunched, this);
  }

  // region #Signals
  /**
   * When user is starting to aiming to the bomb,
   * the shooting progress is started
   * @param bombType
   */
  onShootStart(bombType) {
    console.log('shoot start');
    this.timer = setInterval(() => {
      this.tickProgress();
    }, this.interval);
  }

  /**
   * Stopping the shooting progress counter
   * Hits enemy in the case when the mock bounds are fits
   * @see this.hit
   * @param bombType
   */
  onBombLaunched(bombType) {
    console.log('bomb launched');
    clearInterval(this.timer); // Stop counting shooting progress

    // Shooting without bounds checking
    this.shoot(bombType, this.power);

    const timeout = setTimeout(() => {
      // Check the bounds here. Sure, in the real game
      // it is actually would be sent by server and a lot of other params.
      if (
        this.power > this.hit.from &&
        this.power < this.hit.to
      ) {
        this.hitEnemy(bombType);
      }

      this.power = 0;

      Signals.bombExploded.dispatch(bombType);

      clearTimeout(timeout); // Stop after bomb exploded
    }, 500);
    // ^ This timeout is also just for an example.
    // Actually, we need to change it depends on the explosion type
  }
  // endregion #Signals

  // region #Shooting progress
  shoot(bombType, power) {
    Signals.shoot.dispatch({bombType, power});
  }

  /**
   * Dispatches shooting progress increasing
   */
  tickProgress() {
    if (this.power < 100) {
      ++this.power;
      console.log(`countProgress ${this.power}`);
      Signals.shootProgress.dispatch(this.power);
    }
  }

  /**
   * Dispatches health update after hero damage
   * sent shooting progress, which can be used to make really different damage
   * @param bombType type of the bomb, which was dropped
   */
  hitEnemy(bombType) {
    const damage = BombDamageByType(bombType);
    // Don't allow to make the health negative
    if (this.healthEnemy - damage <= 0) {
      this.healthEnemy = 0;
    } else {
      this.healthEnemy -= damage;
    }

    Signals.updateHealth.dispatch({
      cannonType: CannonType.ENEMY,
      bombType: bombType,
      progress: this.power,
      health: this.healthEnemy,
    });
  }
  // endregion #Shooting progress

  reset() {
    this.healthHero = 100;
    this.healthEnemy = 100;
  }
}

export default ViewModel;
