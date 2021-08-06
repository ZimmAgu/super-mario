"use strict";

// Character Imports
import loadMario from "../Characters/mario.js";
import loadGoomba from "../Characters/goomba.js";
import loadKoopa from "../Characters/koopa.js";



function loadCharacters () {
    return Promise.all([
        loadMario(),
        loadGoomba(),
        loadKoopa()
    ])
}

export default loadCharacters;