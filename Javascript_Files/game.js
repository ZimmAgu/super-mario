import drawBackground from "./drawBackground.js";
import {loadImage, loadLevel} from "./loadFunctions.js";
import spriteSheet from "./spritesheetClass.js";



const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");



loadImage("/Spritesheet_Images/world.png")
    .then(image => {
        const worldSprite = new spriteSheet(image, 16, 16);

        worldSprite.saveTheSprite('ground', 0, 0);
        worldSprite.saveTheSprite('sky', 3, 23)

        loadLevel ('1-1')
            .then(level => {
                console.log(level)
                level.backgrounds.forEach(levelBackground => {
                    drawBackground(levelBackground, context, worldSprite)
                })
            })
    })
    .catch((error) => {
        console.log('Image could not be loaded because of this error ', error)
    })