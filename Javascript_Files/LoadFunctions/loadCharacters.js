"use strict";

// Character Imports
import loadMario from "../Characters/mario.js";
import loadGoomba from "../Characters/goomba.js";
import loadKoopa from "../Characters/koopa.js";



function loadCharacters () {
    const characterSpawner = {}

    return Promise.all([
        loadMario().then(character => characterSpawner['mario'] = character),
        loadGoomba().then(character => characterSpawner['goomba'] = character),
        loadKoopa().then(character => characterSpawner['koopa'] = character)
    ])
    .then(() => characterSpawner)
}

export default loadCharacters;