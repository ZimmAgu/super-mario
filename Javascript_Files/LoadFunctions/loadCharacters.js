"use strict";

// Character Imports
import loadMario from "../Characters/mario.js";
import loadGoomba from "../Characters/goomba.js";
import loadKoopa from "../Characters/koopa.js";



function loadCharacters () {
    const characterSpawner = {}

    function addCharacter (name) {
        return character => characterSpawner[name] = character
    }

    return Promise.all([
        loadMario().then(addCharacter('mario')),
        loadGoomba().then(addCharacter('goomba')),
        loadKoopa().then(addCharacter('koopa'))
    ])
    .then(() => characterSpawner)
}

export default loadCharacters;