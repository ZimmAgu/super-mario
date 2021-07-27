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



function drawBackground (gameLevel, allSprites) {    // Combines the background images together into one single background
    const backgroundLayer = document.createElement("canvas");  // A new canvas is specifically for the background so I have more control over the size of the background instead of just locking it in the html file 
    backgroundLayer.width = 800;
    backgroundLayer.height = 400;
    const backgroundLayerContext = backgroundLayer.getContext('2d')
    
    gameLevel.backgrounds.forEach(levelBackground => {
        drawBackgroundImages(levelBackground, backgroundLayerContext, allSprites)
    })

    return (regularContext) => {
        regularContext.drawImage(backgroundLayer, 0, 0)
    }
}


function drawSpriteLayer (objects) {
    return (context) => {
        objects.forEach(object => {
            object.drawObject(context);  
        })
    }
}



export { drawBackground, drawSpriteLayer }