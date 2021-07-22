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
    }

    saveTheSprite (name, xPostion, yPosition) {     // Saves the current sprite so we don't have to recut it from the spritesheet every time we want to use it 
        const sprite = document.createElement("canvas");


        spriteContext = sprite.getContext("2d");
        
        spriteContext.drawImage(
            this.image,
            x * this.spriteWidth,
            x * this.spriteHeight,
            spriteWidth,
            spriteHeight,
            0,
            0,
            spriteWidth,
            spriteHeight
        );
    }
}