"use strict";
// Class Imports
import layeredImages from "./Classes/layerTheImages.js"
import onScreenObject from "./Classes/onScreenObjects.js";

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

    const marioPhysics = new onScreenObject(); 
    marioPhysics.position.setVector(64, 295);   // Sets the position of mario
    const positionOfMario = marioPhysics.position;

    marioPhysics.velocity.setVector(2, -5); // Sets the velocity that mario moves at
    const velocityOfMario = marioPhysics.velocity;

    



    const marioDrawing = drawSpriteLayer(marioSprite, 'Normal Idle Mario', context, positionOfMario)
    layer.imageLayers.push(marioDrawing);  // Adds mario to the array of layers
    
    function updateMario () {
        layer.drawTheLayer(context);
        positionOfMario.x += velocityOfMario.x;
        positionOfMario.y += velocityOfMario.y;
        velocityOfMario.y += GRAVITY;
        requestAnimationFrame(updateMario);
    }

    updateMario()
    
})