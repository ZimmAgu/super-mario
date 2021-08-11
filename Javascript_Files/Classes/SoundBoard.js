"use strict";


class SoundBoard {
    constructor (context) {
        this.context = context;
        this.audioBuffers = new Map();
    }

    addAudio (name, buffer) {
        this.audioBuffers.set(name, buffer);
    }

    playAudio (name) {
        const source = this.context.createBufferSource();
        source.connect(this.context.destination);
        source.buffer = this.audioBuffers.get(name);
        source.start(0);
    }
}

export default SoundBoard;
