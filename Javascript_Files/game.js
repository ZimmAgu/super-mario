import drawBackground from "./drawBackground.js";
import {loadImage, loadLevel, loadBackgroundSprites} from "./loadFunctions.js";



const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");


Promise.all([   // Will make the Spritesheet and world textures load at the same time instead of one after another
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([image, level]) => {   // The image parameter is what is returned from the loadBackgroundSprites() function. The level parameter is what is returned from the loadLevel() function
    drawBackground(level, context, image)
})