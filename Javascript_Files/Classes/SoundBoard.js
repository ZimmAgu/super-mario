"use strict";


class SoundBoard {
    constructor (audioContext) {
        this.audioContext = audioContext;
        this.audioBuffers = new Map();
    }

    addAudio (name, buffer) {
        this.audioBuffers.set(name, buffer);
    }

    playAudio (name) {
        const source = this.audioContext.createBufferSource();
        source.connect(this.audioContext.destination);
        source.buffer = this.audioBuffers.get(name);
        source.start(0);
    }
}

export default SoundBoard;
