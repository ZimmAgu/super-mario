"use strict";

// Class Imports 
import FontOrganizer from "../Classes/FontOrganizer.js";

// Load Function Imports
import loadSpriteSet from "./loadSpriteSet.js";

function loadFont () {
    return loadSpriteSet('font') 
            .then(fonts => {
        return new FontOrganizer(fonts);
    })
}

export default loadFont;