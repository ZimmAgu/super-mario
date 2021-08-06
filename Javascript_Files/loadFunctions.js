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
import Matrix from "./Classes/Matrix.js";




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

                if (spriteSheetInfo.frames) { // frames located in mario.json, goomba.json, koopa.json
                    spriteSheetInfo.frames.forEach(frame => {
                        console.log(frame)
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


                    spriteSheetInfo.patterns.regularCloud.forEach(piece => {
                        sprites.saveTheSprite(
                            piece.name,
                            piece.xPosition,
                            piece.yPosition,
                            piece.onScreenWidth,
                            piece.onScreenHeight
                        );
                    })
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

        const mergedBlocks = levelSpecifications.layers.reduce((mergedBlocks, layespecifications) => {
            return mergedBlocks.concat(layespecifications.blocks)
        }, [])
        
        const collisionGrid = createCollisionGrid(mergedBlocks, levelSpecifications.patterns);
        currentLevel.setCollisionGrid(collisionGrid);


       
        levelSpecifications.layers.forEach(layer => {
            const backgroundGrid = createBackgroundGrid(layer.blocks, levelSpecifications.patterns);
            const backgroundLayer = drawBackground(currentLevel, backgroundGrid, backgroundSprites);
            currentLevel.layer.imageLayers.push(backgroundLayer);    // Adds the background image to the array of layers
        })
        
    
        const marioDrawing = drawSpriteLayer(currentLevel.objects); // Draws mario to the screen
        currentLevel.layer.imageLayers.push(marioDrawing);  // Adds mario to the array of layers

        return currentLevel;
    })
}




function createCollisionGrid (blocks, patterns) {
    const grid = new Matrix();
    

    for (const {block, x, y} of loadTheBlocks(blocks, patterns)) {
        grid.setMatrix(x, y, {
            type: block.type
        })
    }

    return grid;
}


function createBackgroundGrid (blocks, patterns) {
    const grid = new Matrix();
    

    for (const {block, x, y} of loadTheBlocks(blocks, patterns)) {
        grid.setMatrix(x, y, {
            name: block.name
        })
    }

    return grid;
}







function loadTheBlocks (blocks, patterns, ) {
    const expandedBlocks = [];

    function loopOverBlocks (blocks, offsetX, offsetY) {
        for (const block of blocks) { 
            for (const {screenColumns, screenRows} of itemDimensions(block.dimensions)) { 
                const derivedX = screenColumns + offsetX;
                const derivedY = screenRows + offsetY;
                
                if (block.pattern) {
                    const patternBlocks = patterns[block.pattern].pieces
                    loopOverBlocks(patternBlocks, derivedX, derivedY);
                } else {
                    expandedBlocks.push({
                        block,
                        x: derivedX,
                        y: derivedY
                    })
                }
            }  
        }
    }
      
    loopOverBlocks(blocks, 0, 0);

    return expandedBlocks;
}



function* loopOverCoordinates (xStart, xLength, yStart, yLength) {

    const xEnd = xStart + xLength;
    const yEnd = yStart + yLength;

    for (let screenColumns = xStart; screenColumns < xEnd; screenColumns++) {       // This for loop represents how wide the sprite will be drawn on the canvas
        for (let screenRows = yStart; screenRows < yEnd; screenRows++) {            // This loop represents how tall the sprite will be drawn on the canvas
            yield{screenColumns, screenRows} // Pushing these coordinates to an array will allow me to replace the double for loops in the applydimensions function
        }
    }

}

function screenCoordinates (dimensions) {
    const  [colStart, colLength, rowStart, rowLength] = dimensions;
    return loopOverCoordinates(colStart, colLength, rowStart, rowLength)
}


function* itemDimensions (dimensions) {
    for (const range of dimensions) {
        for (const item of screenCoordinates(range)) {
            yield item;
        }
    }
}


export { loadJSON, loadImage, loadLevel, loadSpriteSheet};