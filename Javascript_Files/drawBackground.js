
function drawBackgroundImages (background, spriteContext, currentSprite) { // Draws the current sprite across the specified distance in the canvas in the background
    background.dimensions.forEach( ([colStart, colEnd, rowStart, rowEnd]) => { // The array stuffed in the parameter is where the dimensions from the levels JSON files will be stored
        for (let screenColumns = colStart; screenColumns < colEnd; screenColumns++) {          // This for loop represents the width of the canvas
            for (let screenRows = rowStart; screenRows < rowEnd; screenRows++) {
                currentSprite.drawTexture(background.name, spriteContext, screenColumns, screenRows)
            }
        } 
    })

    // console.log('Background from drawing thingy: ', background.dimensions)
}

function drawBackground (gameLevel, spriteContext, allSprites) {    // Combines the background images together into one single background
    gameLevel.backgrounds.forEach(levelBackground => {
        drawBackgroundImages(levelBackground, spriteContext, allSprites)
    })
}



export default drawBackground;