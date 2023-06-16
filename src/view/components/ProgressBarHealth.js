import ProgressBar from "./ProgressBar";

class ProgressBarHealth extends ProgressBar {
  constructor(options) {
    super(options);

    // NOP
    // It is available to the future changes and the custom behaviour
  }

  set progress(value) {
    // For the debugging health bar here
    super.progress = value;
  }
}

export default ProgressBarHealth;
