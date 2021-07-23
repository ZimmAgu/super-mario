import loadImage from "./loadFunctions.js";
import spriteSheet from "./spritesheetClass.js";



const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");



loadImage("/Spritesheet_Images/world.png")
    .then(image => {
        const worldSprite = new spriteSheet(image, 16, 16);

        worldSprite.saveTheSprite('ground', 0, 0);
        worldSprite.saveTheSprite('sky', 3, 23)
        

        for (let screenColumns = 0; screenColumns < 50; screenColumns++) {          // This for loop represents the width of the canvas
            for (let screenRows = 0; screenRows < 25; screenRows++) {               //This for loop represents the height of the canvas
                worldSprite.drawTexture('sky', context, screenColumns, screenRows)
            }
        }


        for (let screenColumns = 0; screenColumns < 50; screenColumns++) {          // This for loop represents the width of the canvas
            for (let screenRows = 23; screenRows < 25; screenRows++) {               //This for loop represents the height of the canvas
                worldSprite.drawTexture('ground', context, screenColumns, screenRows)
            }
        }
        
    })
    .catch((error) => {
        console.log('Image could not be loaded because of this error ', error)
    })