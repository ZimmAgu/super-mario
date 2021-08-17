import Scene from './Scene.js';

class IntroScene extends Scene {
    constructor() {
        super();
        this.levelStartCountdown = 4;
    }

    updateLevel (gameContext) {
        this.levelStartCountdown -= gameContext.refreshRate;

        if (this.levelStartCountdown <= 0) {
            this.events.emit(Scene.EVENT_COMPLETE);
        }
    }
}

export default IntroScene