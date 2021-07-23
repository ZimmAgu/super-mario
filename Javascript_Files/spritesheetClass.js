"use strict";
/*
    This class is created so I don't need to redefine 
    an image, height, width, and draw function every
    time I want to draw a new image
*/
class spriteSheet  {
    constructor (image, spriteWidth, spriteHeight) {  // Defines which animation we want to extract from the sprite sheet  
        this.image = image;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.world = new Map();
    }

    saveTheSprite (spriteName, xPostion, yPosition) {     // Saves the current sprite so we don't have to recut it from the spritesheet every time we want to use it 
       
        const sprite = document.createElement("canvas"); // This new canvas is created so the image doesn't actually show up on screen when it is saved

        const spriteContext = sprite.getContext("2d");
        
        spriteContext.drawImage(
            this.image,             // Loads the current spritesheet image passed into the constructor

            xPostion,               // Where the image will be clipped horizontally from the entire sprite sheet
            yPosition,              // Where the image will be clipped vertically from the entire sprite sheet

            this.spriteWidth,       // Width of the clippled image is defined in the constructor
            this.spriteHeight,      // Height of the clipped image is defined in the constructor

            0,                      // The draw functions will determine where the sprite is placed on the canvas
            0,                  

            this.spriteWidth,       // How wide the sprite looks on screen
            this.spriteHeight       // How tall the sprite looks on screen
        );

        this.world.set(spriteName, sprite); // Once the sprite to be saved is drawn, it is saved to a Map object
    }


    drawTheSprite (spriteName, spriteContext, xPostion, yPosition) { // This will actually draw the singular sprite to the screen when called
        const sprite = this.world.get(spriteName);
        spriteContext.drawImage(sprite, xPostion, yPosition);       // The x position and y position parameters specify where on the screen the sprite is drawn
    }


    drawTexture (spriteName, spriteContext, widthMultiple, heightMultiple) {    // Draws the to the screen then multiplies it by a specified width and height so it can appear at one giant texture
        this.drawTheSprite(spriteName, spriteContext, widthMultiple * this.spriteWidth, heightMultiple * this.spriteHeight);
    }
}


export default spriteSheet;