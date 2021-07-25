"use strict";
// Class Imports
import layeredImages from "./Classes/layerTheImages.js"
import onScreenObject from "./Classes/onScreenObjects.js";

//Javascript File imports
import createMario from "./createMario.js";
import drawBackground from "./drawBackground.js";
import { loadLevel } from "./loadFunctions.js";
import { drawSpriteLayer, loadBackgroundSprites, loadMarioSprite} from "./loadSprites.js"

const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");


Promise.all([   // Will make the Spritesheet and world textures load at the same time instead of one after another
    loadBackgroundSprites(),
    loadLevel('1-1'),
    createMario()
]).then(([backgroundSprites, level, mario]) => {   // The image parameter is what is returned from the loadBackgroundSprites() function. The level parameter is what is returned from the loadLevel() function
    const layer = new layeredImages();

    const backgroundLayer = drawBackground(level, context, backgroundSprites);
    // layer.imageLayers.push(backgroundLayer);    // Adds the background image to the array of layers



    const marioDrawing = mario.drawMario(context); // Draws mario to the screen
    layer.imageLayers.push(marioDrawing);  // Adds mario to the array of layers
    
    let refreshRate = 1/60;
    let accumulatedTime = 0;
    let previousTime = 0;


    function updateMario (currentTime) {
        accumulatedTime += (currentTime - previousTime) / 1000; // Adds up the elapsed time (in seconds) over time

        while (accumulatedTime > refreshRate) {
            console.log('Mario position: ', mario.position);
            console.log('Refresh Rate: ', refreshRate);
            layer.drawTheLayer(context);
            mario.vectorUpdate(refreshRate); // Updates marios position & velocity

            accumulatedTime -= refreshRate; // This ensures the marios position is updated at the same rate regardless of the frame rate of the user's computer
        }
        
        // requestAnimationFrame(updateMario);
        setTimeout(updateMario, 1000/60, performance.now());

        previousTime = currentTime;
    }

    updateMario(0);
    
})