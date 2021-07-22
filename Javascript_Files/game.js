import loadImage from "./loadFunctions.js";

const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");


context.fillRect(0, 0, 800, 400)

loadImage("/Spritesheet_Images/world.png")
    .then(image => {
        context.drawImage(image, 0, 0)
    })
    .catch(() => {
        console.log('image could not be loaded')
    })