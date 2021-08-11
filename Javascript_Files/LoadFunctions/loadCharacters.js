"use strict";

// Character Imports
import loadMario from "../Characters/mario.js";
import loadGoomba from "../Characters/goomba.js";
import loadKoopa from "../Characters/koopa.js";



function loadCharacters (audioContext) {
    const characterSpawner = {}

    function addCharacter (name) {
        return character => characterSpawner[name] = character
    }

    return Promise.all([
        loadMario(audioContext).then(addCharacter('mario')),
        loadGoomba(audioContext).then(addCharacter('goomba')),
        loadKoopa(audioContext).then(addCharacter('koopa'))
    ])
    .then(() => characterSpawner)
}

export default loadCharacters;