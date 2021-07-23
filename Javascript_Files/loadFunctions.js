"use strict";
/*
    This file is responsible for loading all of the things 
    that require functionality to be processed
*/

function loadImage (spritesheetURL) { // Will be used to load the spritesheets so they can then be drawn to the screen
    return new Promise(resolve => {

        const image = document.createElement("img");

        image.addEventListener('load', () => { // When the new image element has been created, the promise is resolved with the new image element
            resolve(image)
        })

        image.src = spritesheetURL;
        image.crossOrigin = true;
    })
} 





function loadLevel (levelName) {    // Loads the current levels from the requested JSON file in the GameLevels folder. The level is determined the parameter
    return fetch(`/GameLevels/${levelName}.json`)       
                .then(response  => response.json())
}


export {loadImage, loadLevel};