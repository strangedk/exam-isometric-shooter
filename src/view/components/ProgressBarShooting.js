import ProgressBar from "./ProgressBar";
import Signals from "../../events/Signals";

class ProgressBarShooting extends ProgressBar {
  constructor(options) {
    super(options);

    Signals.shootProgress.add(value => this.progress = value);
    Signals.bombLaunched.add(() => this.progress = 0);
  }
}

export default ProgressBarShooting;
