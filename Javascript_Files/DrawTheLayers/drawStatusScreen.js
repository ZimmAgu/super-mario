"use strict";


function drawStatusScreen (font, context, levelName, player) {

    const lives = player.lives.toString();

    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = 64;
    spriteBuffer.height = 64;
    const spriteBufferContext = spriteBuffer.getContext('2d');

    font.printWord("WORLD", context, font.size * 11, font.size * 9);
    font.printWord(levelName, context, font.size * 17, font.size * 9);

    font.printWord("x", context, font.size * 15, font.size * 12);
    font.printWord(lives, context, font.size * 18, font.size * 12);

   
    spriteBufferContext.clearRect(  
                                    0, 
                                    0,
                                    spriteBuffer.width, 
                                    spriteBuffer.height
                                );
    
    player.drawObject(spriteBufferContext);
    context.drawImage(spriteBuffer, font.size * 11, font.size * 11);
}

export default drawStatusScreen;