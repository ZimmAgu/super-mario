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
            this.image,
            xPostion * this.spriteWidth,
            yPosition * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight
        );

        this.world.set(spriteName, sprite); // Once the sprite to be saved is drawn, it is saved to a Map object
    }


    drawTheSprite (spriteName, spriteContext, xPostion, yPosition) { // This will actually draw the sprite to the screen when called
        const sprite = this.world.get(spriteName);
        spriteContext.drawImage(sprite, xPostion, yPosition);
    }


    drawTexture (spriteName, spriteContext, widthMultiple, heightMultiple) {
        this.drawTheSprite(spriteName, spriteContext, widthMultiple * this.spriteWidth, heightMultiple * this.spriteHeight);
    }
}


export default spriteSheet;