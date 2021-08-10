"use strict";

// Class Imports
import BlockResolver from "../Classes/BlockResolver.js";

function drawBackground (gameLevel, blocks, allSprites) {    // Combines the background images together into one single background
    const backgroundLayer = document.createElement("canvas");  // A new canvas is specifically for the background so I have more control over the size of the background instead of just locking it in the html file 
    backgroundLayer.width = 550;
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


export default drawBackground;