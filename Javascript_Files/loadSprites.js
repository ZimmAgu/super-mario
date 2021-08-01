"use strict";

import SpriteSheet from "./Classes/spritesheetClass.js";
import { loadJSON, loadImage } from "./loadFunctions.js";


function loadMarioSprite () {
    return Promise.all([
        loadImage("/Spritesheet_Images/characters.png"),
        loadJSON(`/SpriteSets/mario.json`)
    ])
    .then(([image, marioInfo]) => {
        const marioSprite = new SpriteSheet(
                                    image,
                                    marioInfo.cutOutWidth,
                                    marioInfo.cutOutHeight
                                );
        
        marioInfo.frames.forEach(frame => {
            marioSprite.saveTheSprite(
                            frame.name,
                            frame.xPosition,
                            frame.yPosition,
                            frame.onScreenWidth,
                            frame.onScreenHeight
                        )  
        });

        return marioSprite;
    })
}


export { loadMarioSprite }