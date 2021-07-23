"use strict";
function drawBackgroundImages (background, spriteContext, currentSprite) {                  // Draws the current sprite across the specified distance in the canvas in the background
    const SPRITE_RATIO = 2
    
    background.dimensions.forEach( ([colStart, colEnd, rowStart, rowEnd]) => {              // The array stuffed in the parameter is where the dimensions from the levels JSON files will be stored
        for (let screenColumns = colStart; screenColumns < colEnd; screenColumns++) {       // This for loop represents how wide the sprite will be drawn on the canvase
            for (let screenRows = rowStart; screenRows < rowEnd; screenRows++) {            // This loop represents how tall the sprite will be drawn on the canvas
                const onScreenColumnSize = screenColumns * SPRITE_RATIO;
                const onScreenRowSize   = screenRows * SPRITE_RATIO;
                currentSprite.drawTexture(background.name, spriteContext, onScreenColumnSize, onScreenRowSize)
            }
        } 
    })
}



function drawBackground (gameLevel, spriteContext, allSprites) {    // Combines the background images together into one single background
    gameLevel.backgrounds.forEach(levelBackground => {
        drawBackgroundImages(levelBackground, spriteContext, allSprites)
    })
}



export default drawBackground;