"use strict";


function drawSpriteLayer (onScreenSprites, width = 96, height = 96) {
    const spriteLayer = document.createElement("canvas");  // Creates a layer specifically for the sprite so now sprite can be larger than our specified width/height
    spriteLayer.width = width;
    spriteLayer.height = height;
    const spriteContext = spriteLayer.getContext('2d')

    return (context, camera) => {
        onScreenSprites.forEach(object => {
            spriteContext.clearRect(0, 0, width, height);

            object.drawObject(spriteContext);  

            context.drawImage(
                            spriteLayer, 
                            object.position.x - camera.position.x,
                            object.position.y - camera.position.y
                        );
        })
    }
}

export default drawSpriteLayer;