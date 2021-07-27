"use strict";

function drawBackground (gameLevel, allSprites) {    // Combines the background images together into one single background
    const backgroundLayer = document.createElement("canvas");  // A new canvas is specifically for the background so I have more control over the size of the background instead of just locking it in the html file 
    backgroundLayer.width = 800;
    backgroundLayer.height = 416;
    const backgroundLayerContext = backgroundLayer.getContext('2d')
    
    gameLevel.bricks.grid.forEach((column, screenColumns) => {
        column.forEach((brick, screenRows) => {
            const SPRITE_RATIO = 2
            const onScreenColumnSize = screenColumns * SPRITE_RATIO;
            const onScreenRowSize   = screenRows * SPRITE_RATIO;
            allSprites.drawTexture(brick.name, backgroundLayerContext, onScreenColumnSize, onScreenRowSize);
        })
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