
// Draws the background of the current level on the screen
function drawBackground (background, spriteContext, currentSprite) {
    background.dimensions.forEach( ([colStart, colEnd, rowStart, rowEnd]) => { // The array stuffed in the parameter is where the dimensions from the levels JSON files will be stored
        for (let screenColumns = colStart; screenColumns < colEnd; screenColumns++) {          // This for loop represents the width of the canvas
            for (let screenRows = rowStart; screenRows < rowEnd; screenRows++) {
                currentSprite.drawTexture(background.name, spriteContext, screenColumns, screenRows)
            }
        } 
    })

    // console.log('Background from drawing thingy: ', background.dimensions)
}



export default drawBackground;