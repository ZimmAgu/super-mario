"use strict";

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


export default loadTheBlocks;