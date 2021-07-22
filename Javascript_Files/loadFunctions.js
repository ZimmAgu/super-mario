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

export default loadImage;