"use strict";
/*
    This file is responsible for loading all of the things 
    that require functionality to be processed
*/
import SpriteSheet from "./Classes/spritesheetClass.js";

import { drawBackground } from "./drawTheLayers.js";
import Level from "./Classes/Level.js";
import { drawSpriteLayer } from "./drawTheLayers.js";
import { createAnimation } from "./animations.js"



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
                const sprites = new SpriteSheet(
                                            image, 
                                            spriteSheetInfo.spriteWidth, 
                                            spriteSheetInfo.spriteHeight
                                        );

                if (spriteSheetInfo.blocks) { // Blocks located in overworld.json
                    spriteSheetInfo.blocks.forEach(sprite => {
                        sprites.saveTheSprite(
                                    sprite.name,
                                    sprite.xPosition,
                                    sprite.yPosition,
                                    sprite.onScreenWidth,
                                    sprite.onScreenHeight
                                );
                    });
                }

                if (spriteSheetInfo.marioFrames) { // marioFrams located in mario.json
                    spriteSheetInfo.marioFrames.forEach(frame => {
                        sprites.saveTheSprite(
                                    frame.name,
                                    frame.xPosition,
                                    frame.yPosition,
                                    frame.onScreenWidth,
                                    frame.onScreenHeight
                                );  
                    });
                }


                if (spriteSheetInfo.animations) { // animations located in overworld.json
                    spriteSheetInfo.animations.forEach(anim => {
                        const animation = createAnimation(anim.frames, anim.frameLength)
                        sprites.defineAnimation(anim.name, animation)
                    });
                }


                if (spriteSheetInfo.patterns) { // patterns located in overworld.json

                    spriteSheetInfo.patterns.verticalPipe.forEach(piece => { // The vertical pipe pattern
                        sprites.saveTheSprite(
                            piece.name,
                            piece.xPosition,
                            piece.yPosition,
                            piece.onScreenWidth,
                            piece.onScreenHeight
                        );
                    });
                }


                return sprites
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

        loadTheBlocks(currentLevel, levelSpecifications.backgrounds, levelSpecifications.patterns)

        const backgroundLayer = drawBackground(currentLevel, backgroundSprites);
        currentLevel.layer.imageLayers.push(backgroundLayer);    // Adds the background image to the array of layers
    
        const marioDrawing = drawSpriteLayer(currentLevel.objects); // Draws mario to the screen
        currentLevel.layer.imageLayers.push(marioDrawing);  // Adds mario to the array of layers

        return currentLevel;
    })
}








function loadTheBlocks (level, backgrounds, patterns, offsetX = 0, offsetY = 0) {
    backgrounds.forEach(background => {
        background.dimensions.forEach( ([colStart, colLength, rowStart, rowLength]) => {              // The array stuffed in the parameter is where the dimensions from the levels JSON files will be stored
            applyDimensions(level, background, patterns, colStart, colLength, rowStart, rowLength, offsetX, offsetY);
        })
    })
}




function applyDimensions (marioLevel, backgroundBlock, patterns, xStart, xLength, yStart, yLength, offsetX, offsetY) {    // Made specifically for the loadTheBlocks function
    const xEnd = xStart + xLength;
    const yEnd = yStart + yLength;

    for (let screenColumns = xStart; screenColumns < xEnd; screenColumns++) {       // This for loop represents how wide the sprite will be drawn on the canvas
        for (let screenRows = yStart; screenRows < yEnd; screenRows++) {            // This loop represents how tall the sprite will be drawn on the canvas
            const derivedX = screenColumns + offsetX;
            const derivedY = screenRows + offsetY;
            
            if (backgroundBlock.pattern) {
                const patternBackgrounds = patterns[backgroundBlock.pattern].pieces
                loadTheBlocks(marioLevel, patternBackgrounds, patterns, derivedX, derivedY);
            } else {
                marioLevel.blocks.setMatrix(derivedX, derivedY, {
                    name: backgroundBlock.name,
                    type: backgroundBlock.type
                }) 
            }
            
            
        }
    } 
}

export { loadJSON, loadImage, loadLevel, loadSpriteSheet};