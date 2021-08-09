"use strict";
import BlockResolver from "./Classes/BlockResolver.js";
import Matrix from "./Classes/Matrix.js";


function drawBackground (gameLevel, blocks, allSprites) {    // Combines the background images together into one single background
    const backgroundLayer = document.createElement("canvas");  // A new canvas is specifically for the background so I have more control over the size of the background instead of just locking it in the html file 
    backgroundLayer.width = 480;
    backgroundLayer.height = 416;
    const backgroundLayerContext = backgroundLayer.getContext('2d');


    const blockResolver = new BlockResolver(blocks);
    
   
    function updateDrawing (startOfDrawing, endOfDrawing) {
        const SPRITE_RATIO = 2

        backgroundLayerContext.clearRect(
                                                0, 
                                                0,
                                                backgroundLayer.width,
                                                backgroundLayer.height
                                            )

        for (let screenColumns = startOfDrawing; screenColumns < endOfDrawing; screenColumns++) {
            
            
            const columnGrid = blocks.grid[screenColumns];

            if (columnGrid) {
                columnGrid.forEach((block, screenRows) => {

                    const onScreenColumnSize = screenColumns * SPRITE_RATIO;
                    const onScreenRowSize   = screenRows * SPRITE_RATIO;
                    const start = startOfDrawing * SPRITE_RATIO

                    if (allSprites.animation.has(block.name)) {
                        allSprites.drawAnimation(
                                        block.name, 
                                        backgroundLayerContext, 
                                        onScreenColumnSize - start , 
                                        onScreenRowSize, 
                                        gameLevel.totalTime
                                    );
                    } else {
                        allSprites.drawTexture(block.name, backgroundLayerContext, onScreenColumnSize - start , onScreenRowSize);
                    }

                });
            }
        }
    }

    return function drawBackgroundLayer (regularContext, camera) {    // Draws the background layer
        const drawWidth = blockResolver.toIndex(camera.size.x);
        const drawFrom = blockResolver.toIndex(camera.position.x);
        const drawTo = drawFrom + drawWidth;

        updateDrawing(drawFrom, drawTo);


        regularContext.drawImage(backgroundLayer, -camera.position.x %32, -camera.position.y);
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
    const blockResolver = level.blockCollisions.blocks;
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
            // context.beginPath();
            // context.rect(
            //     x * blockSize - camera.position.x, 
            //     y * blockSize - camera.position.y, 
            //     blockSize, 
            //     blockSize);
            // context.stroke();
        });
        resolvedBlocks.clear();

        level.objects.forEach(onScreenObject => {
            // context.strokeStyle = 'green';
            // context.beginPath();

            // context.rect(
            //             onScreenObject.position.x - camera.position.x, 
            //             onScreenObject.position.y - camera.position.y, 
            //             onScreenObject.size.x,
            //             onScreenObject.size.y
            //         );

            // context.stroke();
        })
    };
}




function createCameraLayer (cameraToDraw) {
    return (context, fromCamera) => {
        // context.strokeStyle = 'purple';
        //     context.beginPath();


        //     context.rect(
        //                 cameraToDraw.position.x - fromCamera.position.x, 
        //                 cameraToDraw.position.y - fromCamera.position.y, 
        //                 cameraToDraw.size.x,
        //                 cameraToDraw.size.y
        //             );
            
        //     context.stroke();
    }
}


export { createCameraLayer, createCollisionLayer, drawBackground, drawSpriteLayer }