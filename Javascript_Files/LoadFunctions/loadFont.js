"use strict";

import loadSpriteSet from "./loadSpriteSet.js";

function loadFont () {
    return loadSpriteSet('font') 
            .then(fonts => {
        return fonts
    })
}

export default loadFont;