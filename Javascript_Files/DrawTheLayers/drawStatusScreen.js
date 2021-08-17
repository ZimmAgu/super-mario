"use strict";

import {findPlayers} from "../playerSpawn.js"

function getCurrentPlayer (level) {
    for (const object of findPlayers(level)) {
        return object;
    }
}

function createStatusScreen (font, level) {

    const currentPlayer = getCurrentPlayer(level)
    const lives = currentPlayer.player.lives.toString();

    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = 64;
    spriteBuffer.height = 64;
    const spriteBufferContext = spriteBuffer.getContext('2d');

    return function drawStatusScreen (context) {
        font.printWord("WORLD", context, font.size * 11, font.size * 9);
        font.printWord(level.name, context, font.size * 17, font.size * 9);

        font.printWord("x", context, font.size * 15, font.size * 12);
        font.printWord(lives, context, font.size * 18, font.size * 12);

    
        spriteBufferContext.clearRect(  
                                        0, 
                                        0,
                                        spriteBuffer.width, 
                                        spriteBuffer.height
                                    );

        currentPlayer.drawObject(spriteBufferContext);
        context.drawImage(spriteBuffer, font.size * 11, font.size * 11);
    }
    
}

export default createStatusScreen;