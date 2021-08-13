"use strict";

// Load Function Imports
import loadJSON from "./loadJSON.js"

function loadMusicSet (musicSetName) {
    return loadJSON(`/Music/${musicSetName}.json`)
    .then(musicSetInfo => {
        console.log(musicSetInfo);
    })
}

export default loadMusicSet;