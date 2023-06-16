import {Application} from 'pixi.js';
import Field from "./field/Field";
import Cannon from "./cannon/Cannon";
import CannonType from "./cannon/CannonType";
import ButtonBomb from "./ui/ButtonBomb";
import BombType from "../model/BombType";
import ProgressBar from "./components/ProgressBar";
import ViewModel from "../model/ViewModel";
import ProgressBarShooting from "./components/ProgressBarShooting";
import Signals from "../events/Signals";

const options = {
  width: 680,
  height: 460,
  antialias: true,
  transparent: true,
  background: 0xeeeeee,
};

class Game {
  constructor() {
    this.app = new Application(options);

    // To activate the PIXI.js debugger in the Chromium plugins
    // * also, you can use the Spectre.js to the deeper digging draw calls.
    window['globalThis'].__PIXI_APP__ = this.app;

    const {app} = this;
    document.body.appendChild(app.renderer.view);

    this.viewModel = new ViewModel();

    Signals.gameStart.add(this.onGameStart, this);
    Signals.gameOver.add(this.onGameOver, this);

    this.init();
    this.addUI();
  }

  init() {
    this
      .viewModel.reset();

    this
      .clear()
      .addMap()
      .addPlayers()
  }

  onGameStart() {
    this.init();
  }

  onGameOver() {

  }


  // region #UI manipulations
  clear() {
    const {app} = this;
    app.stage.removeChildren();
    return this;
  }

  addMap() {
    const {app} = this;

    const field = new Field();
    field.scale.set(1, 0.5);
    field.transform.position.set(340, 0);

    app.stage.addChild(field);

    return this;
  }

  addPlayers() {
    const {app} = this;

    const enemy = new Cannon(CannonType.ENEMY);
    enemy.position.set(450, 50)
    enemy.scale.set(0.4);

    const hero = new Cannon(CannonType.HERO);
    hero.position.set(130, 180)
    hero.scale.set(0.5);

    app.stage.addChild(enemy, hero);

    return this;
  }

  addUI() {
    this.addButton(BombType.BOMB_SMALL, 140, 340);
    this.addButton(BombType.BOMB_MIDDLE, 280, 340);
    this.addButton(BombType.BOMB_LARGE, 420, 340);

    this.addShootingProgress(140, 315);

    return this;
  }

  addButton(type, x, y) {
    const {app} = this;
    const button = new ButtonBomb(type);
    button.position.set(x, y);
    app.stage.addChild(button);
  }

  addShootingProgress(x, y) {
    const {app} = this;

    const options = {
      background: 0xffffff,
      border: 0x000000,
      fill: 0x009f3f,
      width: 400,
      height: 16,
      progress: 0,
    };

    const progress = new ProgressBarShooting(options);
    progress.position.set(x, y);
    app.stage.addChild(progress);
  }
  // endregion #UI
}


export default Game;
