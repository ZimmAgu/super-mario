"use strict";

class Timer {
    constructor (refreshRate = 1/60) {
        let accumulatedTime = 0;
        let previousTime = 0;

        this.updateMarioTimer = (currentTime) => {
            accumulatedTime += (currentTime - previousTime) / 1000; // Adds up the elapsed time (in seconds) over time

            while (accumulatedTime > refreshRate) {
                this.updateMario(refreshRate);
                accumulatedTime -= refreshRate; // This ensures the marios position is updated at the same rate regardless of the frame rate of the user's computer
            }

            previousTime = currentTime;
            this.requestAnimation();
        }
    }

    requestAnimation () {
        requestAnimationFrame(this.updateMarioTimer);
    }

    startTimer () {
        this.requestAnimation();
    }
}


export default Timer;
