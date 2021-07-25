"use strict";
// Class Imports
import layeredImages from "./Classes/layerTheImages.js"
import vector from "./Classes/vector.js";

//Javascript File imports
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
    layer.imageLayers.push(backgroundLayer);    // Adds the background image to the array of layers


    const GRAVITY = 0.05;
    
    const positionOfMario = new vector(64, 200);
    console.log(positionOfMario)

    const velocityOfMario = new vector(2, -2);


    const mario = drawSpriteLayer(marioSprite, 'Normal Idle Mario', context, positionOfMario)
    layer.imageLayers.push(mario);  // Adds mario to the array of layers
    
    function updateMario () {
        layer.drawTheLayer(context);
        positionOfMario.x += velocityOfMario.x;
        positionOfMario.y += velocityOfMario.y;
        velocityOfMario.y += GRAVITY;
        requestAnimationFrame(updateMario);
    }

    updateMario()
    
})