"use strict";

class MusicPlayer {
    constructor () {
        this.tracks = new Map();
    }

    addTrack (name, url) {
        const audio = new Audio();
        audio.loop = true;
        audio.src = url;
        this.tracks.set(name, audio);
    }
}

export default MusicPlayer;