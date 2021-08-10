"use strict";

import loadSpriteSet from "./loadSpriteSet.js";

function loadFont () {
    return loadSpriteSet('font') 
            .then(fonts => {
        console.log(fonts);
    })
}

export default loadFont;