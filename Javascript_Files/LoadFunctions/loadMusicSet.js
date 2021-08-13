"use strict";

// Class Function Imports
import MusicPlayer from "../Classes/MusicPlayer.js";

// Load Function Imports
import loadJSON from "./loadJSON.js"

function loadMusicSet (musicSetName) {
    return loadJSON(`/Music/${musicSetName}.json`)
    .then(musicSetInfo => {
        const musicPlayer = new MusicPlayer();
        
        for (const [name, track] of Object.entries(musicSetInfo)) {
            musicPlayer.addTrack(name, track.url);
        }

        return musicPlayer;
    })
}

export default loadMusicSet;