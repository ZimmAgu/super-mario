import loadImage from "./loadFunctions.js";
import spriteSheet from "./spritesheetClass.js";



const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");



loadImage("/Spritesheet_Images/world.png")
    .then(image => {
        const worldSprite = new spriteSheet(image, 16, 16);
        worldSprite.saveTheSprite('ground', 0, 0);
        worldSprite.drawTheSprite('ground', context, 50, 50);
    })
    .catch((error) => {
        console.log('Image could not be loaded because of this error ', error)
    })