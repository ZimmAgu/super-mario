"use strict";
import Matrix from "./Classes/Matrix.js";

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
    const brickResolver = level.brickCollider.bricks;
    const brickSize = brickResolver.brickSize;

    const resolvedBricks = new Matrix();
    const getByIndexOriginal = brickResolver.getByIndex;

    brickResolver.getByIndex = (column, row) => {
        resolvedBricks.setMatrix(column, row, true);
        return getByIndexOriginal.call(brickResolver, column, row);
    }

    
   
    return (context, camera) => {   // Draws the outline of the hitbox
        context.strokeStyle = 'blue';

        resolvedBricks.forEach((value, x, y) => {
            context.beginPath();
            context.rect(
                x * brickSize - camera.position.x, 
                y * brickSize - camera.position.y, 
                brickSize, 
                brickSize);
            context.stroke();
        });
        resolvedBricks.clear();

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