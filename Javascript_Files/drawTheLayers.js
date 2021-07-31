"use strict";
import Matrix from "./Classes/Matrix.js";

function drawBackground (gameLevel, allSprites) {    // Combines the background images together into one single background
    const backgroundLayer = document.createElement("canvas");  // A new canvas is specifically for the background so I have more control over the size of the background instead of just locking it in the html file 
    backgroundLayer.width = 800;
    backgroundLayer.height = 416;
    const backgroundLayerContext = backgroundLayer.getContext('2d')
    
    gameLevel.blocks.grid.forEach((column, screenColumns) => {
        column.forEach((block, screenRows) => {
            const SPRITE_RATIO = 2
            const onScreenColumnSize = screenColumns * SPRITE_RATIO;
            const onScreenRowSize   = screenRows * SPRITE_RATIO;
            allSprites.drawTexture(block.name, backgroundLayerContext, onScreenColumnSize, onScreenRowSize);
        })
    })

  

    return (regularContext, camera) => {
        regularContext.drawImage(backgroundLayer, -camera.position.x, -camera.position.y);
    }
}


function drawSpriteLayer (onScreenSprites, width = 96, height = 96) {
    const spriteLayer = document.createElement("canvas");  // Creates a layer specifically for the sprite so now sprite can be larger than our specified width/height
    spriteLayer.width = width;
    spriteLayer.height = height;
    const spriteContext = spriteLayer.getContext('2d')

    return (context, camera) => {
        onScreenSprites.forEach(object => {
            spriteContext.clearRect(0, 0, width, height);

            object.drawObject(spriteContext);  

            context.drawImage(
                            spriteLayer, 
                            object.position.x - camera.position.x,
                            object.position.y - camera.position.y
                        );
        })
    }
}


function createCollisionLayer (level) {
    const blockResolver = level.blockCollider.blocks;
    const blockSize = blockResolver.blockSize;

    const resolvedBlocks = new Matrix();
    const getByIndexOriginal = blockResolver.getByIndex;

    blockResolver.getByIndex = (column, row) => {
        resolvedBlocks.setMatrix(column, row, true);
        return getByIndexOriginal.call(blockResolver, column, row);
    }

    
   
    return (context, camera) => {   // Draws the outline of the hitbox
        context.strokeStyle = 'blue';

        resolvedBlocks.forEach((value, x, y) => {
            context.beginPath();
            context.rect(
                x * blockSize - camera.position.x, 
                y * blockSize - camera.position.y, 
                blockSize, 
                blockSize);
            context.stroke();
        });
        resolvedBlocks.clear();

        level.objects.forEach(onScreenObject => {
            context.strokeStyle = 'green';
            context.beginPath();
            context.rect(onScreenObject.position.x - camera.position.x, 
                        onScreenObject.position.y - camera.position.y, 
                        onScreenObject.size.x,
                        onScreenObject.size.y);
            context.stroke();
        })
    };

}


export { createCollisionLayer, drawBackground, drawSpriteLayer }