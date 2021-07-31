"use strict";
/*
    This file is responsible for loading all of the things 
    that require functionality to be processed
*/
import SpriteSheet from "./Classes/spritesheetClass.js";

import { drawBackground } from "./drawTheLayers.js";
import Level from "./Classes/Level.js";
import { drawSpriteLayer } from "./drawTheLayers.js";



function loadJSON (url) {
    return fetch(url)
            .then(response  => response.json())
}


function loadSpriteSheet (spriteSetName) {
    return loadJSON(`/SpriteSets/${spriteSetName}.json`)
            .then(spriteSheetInfo => Promise.all ([
                spriteSheetInfo,
                loadImage(spriteSheetInfo.imageURL)
            ]))
            .then(([spriteSheetInfo, image]) => {
                console.log(spriteSheetInfo.sprites)
                console.log(image)

                const backGroundSprite = new SpriteSheet(
                                            image, 
                                            spriteSheetInfo.spriteWidth, 
                                            spriteSheetInfo.spriteHeight
                                        );

                spriteSheetInfo.sprites.forEach(sprite => {
                    backGroundSprite.saveTheSprite(
                        sprite.name,
                        sprite.xPosition,
                        sprite.yPosition,
                        sprite.onScreenWidth,
                        sprite.onScreenHeight
                    );
                });

                return backGroundSprite
            })
}





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
    return loadJSON(`/GameLevels/${levelName}.json`)
                .then(levelSpecification => Promise.all([
        levelSpecification,
        loadSpriteSheet(levelSpecification.spriteSetName)    
    ]))
    .then(([levelSpecifications, backgroundSprites]) => {
        const currentLevel = new Level();

        loadTheBricks(currentLevel, levelSpecifications.backgrounds)

        const backgroundLayer = drawBackground(currentLevel, backgroundSprites);
        currentLevel.layer.imageLayers.push(backgroundLayer);    // Adds the background image to the array of layers
    
        const marioDrawing = drawSpriteLayer(currentLevel.objects); // Draws mario to the screen
        currentLevel.layer.imageLayers.push(marioDrawing);  // Adds mario to the array of layers

        return currentLevel;
    })
}








function loadTheBricks (level, backgrounds) {
    backgrounds.forEach(background => {
        background.dimensions.forEach( ([colStart, colLength, rowStart, rowLength]) => {              // The array stuffed in the parameter is where the dimensions from the levels JSON files will be stored
            const colEnd = colStart + colLength;
            const rowEnd = rowStart + rowLength;
            for (let screenColumns = colStart; screenColumns < colEnd; screenColumns++) {       // This for loop represents how wide the sprite will be drawn on the canvase
                for (let screenRows = rowStart; screenRows < rowEnd; screenRows++) {            // This loop represents how tall the sprite will be drawn on the canvas
                    level.bricks.setMatrix(screenColumns, screenRows, {
                        name: background.name,
                        type: background.type
                    })
                }
            } 
        })
    })
}


export {loadImage, loadLevel};