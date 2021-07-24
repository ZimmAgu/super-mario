"use strict";
import layeredImages from "./Classes/layerTheImages.js"
import drawBackground from "./drawBackground.js";
import { loadLevel } from "./loadFunctions.js";
import { drawSpriteLayer, loadBackgroundSprites, loadMarioSprite} from "./loadSprites.js"

const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");


Promise.all([   // Will make the Spritesheet and world textures load at the same time instead of one after another
    loadBackgroundSprites(),
    loadLevel('1-1'),
    loadMarioSprite()
]).then(([backgroundSprites, level, marioSprite]) => {   // The image parameter is what is returned from the loadBackgroundSprites() function. The level parameter is what is returned from the loadLevel() function
    const layer = new layeredImages();

    const backgroundLayer = drawBackground(level, context, backgroundSprites);
    layer.imageLayers.push(backgroundLayer);

    const positionOfMario = {
        x: 64,
        y: 0
    }
    
    function updateMario () {
        layer.drawTheLayer(context);
        drawSpriteLayer(marioSprite, 'Normal Idle Mario', context, positionOfMario.x, positionOfMario.y)
        positionOfMario.x +=2;
        positionOfMario.y +=2;
        requestAnimationFrame(updateMario);
    }

    updateMario()
    
})