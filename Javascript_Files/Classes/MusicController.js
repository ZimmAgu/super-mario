"use strict";

class MusicController {
    constructor () {
        this.player = null;
    }

    setPlayer (player) {
        this.player = player;
    }

    playMainTheme () {
        this.player.playTrack('main');
    }

    playDeathSong () {
        const audio = this.player.playTrack('marioDeath');

        audio.loop = false;
    }
}

export default MusicController;
