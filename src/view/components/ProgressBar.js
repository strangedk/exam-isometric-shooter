import * as PIXI from 'pixi.js';

class ProgressBar extends PIXI.Container {
  constructor(options) {
    super();

    this.options = options;

    // Drawing the background
    this.bg = new PIXI.Graphics();
    this.bg.beginFill(options.background);
    this.bg.lineStyle(2, options.border);
    this.bg.drawRect(0, 0, options.width, options.height);
    this.bg.endFill();
    this.addChild(this.bg);

    // Preparing the progress bar filling
    this.bar = new PIXI.Graphics();
    this.addChild(this.bar);

    this.progress = options.progress;
  }

  clear() {
    this.bar.clear();
  }

  drawProgress(value) {
    const {fill, width, height} = this.options;

    this.clear();
    this.bar.beginFill(fill);
    this.bar.drawRect(1, 1, (width / 100 * value) - 2, height - 2);
  }

  set progress(value) {

    this._progress = value;

    if (value > 0) {
      this.drawProgress(value);
      this.alpha = 1;
    } else {
      this.alpha = 0;
      this.bar.clear();
    }
  }

  get progress() {
    return this._progress;
  }
}

export default ProgressBar;
