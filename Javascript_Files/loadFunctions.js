"use strict";
/*
    This file is responsible for loading all of the things 
    that require functionality to be processed
*/
import { drawBackground } from "./drawTheLayers.js";
import Level from "./Classes/Level.js";
import { drawSpriteLayer } from "./drawTheLayers.js";
import { loadBackgroundSprites } from "./loadSprites.js"


function loadImage (spritesheetURL) { // Will be used to load the spritesheets so they can then be drawn to the screen
    return new Promise(resolve => {

        const image = document.createElement("img");

        image.addEventListener('load', () => { // When the new image element has been created, the promise is resolved with the new image element
            resolve(image)
        })

        image.src = spritesheetURL;
        image.crossOrigin = true;
    })
} 





function loadLevel (levelName) {    // Loads the current levels from the requested JSON file in the GameLevels folder. The level is determined the parameter
    return Promise.all([
        fetch(`/GameLevels/${levelName}.json`)
            .then(response  => response.json()),
        
        loadBackgroundSprites()     
    ])
    .then(([levelSpecifications, backgroundSprites]) => {
        const currentLevel = new Level();

        const backgroundLayer = drawBackground(levelSpecifications, backgroundSprites);
        currentLevel.layer.imageLayers.push(backgroundLayer);    // Adds the background image to the array of layers
    
        const marioDrawing = drawSpriteLayer(currentLevel.objects); // Draws mario to the screen
        currentLevel.layer.imageLayers.push(marioDrawing);  // Adds mario to the array of layers

        return currentLevel;
    })
}


export {loadImage, loadLevel};