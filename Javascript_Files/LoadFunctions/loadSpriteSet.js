"use strict";

// Animation Imports
import { createAnimation } from "../Animations/createAnimation.js"

// Class Imports
import SpriteSheet from "../Classes/spritesheetClass.js";

// Load Function Imports
import loadJSON from "./loadJSON.js"
import loadImage from "./loadImage.js"

function loadSpriteSet (spriteSetName) {
    return loadJSON(`/SpriteSets/${spriteSetName}.json`)
            .then(spriteSheetInfo => Promise.all ([
                spriteSheetInfo,
                loadImage(spriteSheetInfo.imageURL)
            ]))
            .then(([spriteSheetInfo, image]) => {
                const sprites = new SpriteSheet(
                                            image, 
                                            spriteSheetInfo.spriteWidth, 
                                            spriteSheetInfo.spriteHeight
                                        );

                loadOverWorldBlocks(spriteSheetInfo, sprites);
                loadOverworldBlockAnimations(spriteSheetInfo, sprites);
                loadCharacterAnimations(spriteSheetInfo, sprites);
                loadPatterns(spriteSheetInfo, sprites);
                loadFonts(spriteSheetInfo, sprites);

                return sprites
            })
}





function loadOverWorldBlocks (spriteSheetInfo, sprites) {
    if (spriteSheetInfo.blocks) { // Blocks located in overworld.json
        spriteSheetInfo.blocks.forEach(block => {
            sprites.saveTheSprite(
                        block.name,
                        block.xPosition,
                        block.yPosition,
                        block.onScreenWidth,
                        block.onScreenHeight
                    );
        });
    }
}






function loadOverworldBlockAnimations (spriteSheetInfo, sprites) {
    if (spriteSheetInfo.animations) { // animations located in overworld.json
        spriteSheetInfo.animations.forEach(anim => {
            const animation = createAnimation(anim.frames, anim.frameLength)
            sprites.defineAnimation(anim.name, animation)
        });
    }
}



function loadCharacterAnimations (spriteSheetInfo, sprites) {
    if (spriteSheetInfo.frames) { // frames located in mario.json, goomba.json, koopa.json
        spriteSheetInfo.frames.forEach(frame => {
            sprites.saveTheSprite(
                        frame.name,
                        frame.xPosition,
                        frame.yPosition,
                        frame.onScreenWidth,
                        frame.onScreenHeight
                    );  
        });
    }
}




function loadPatterns (spriteSheetInfo, sprites) {
    if (spriteSheetInfo.patterns) { // patterns located in overworld.json

        spriteSheetInfo.patterns.verticalPipe.forEach(piece => { // The vertical pipe pattern
            sprites.saveTheSprite(
                piece.name,
                piece.xPosition,
                piece.yPosition,
                piece.onScreenWidth,
                piece.onScreenHeight
            );
        });


        spriteSheetInfo.patterns.regularCloud.forEach(piece => {
            sprites.saveTheSprite(
                piece.name,
                piece.xPosition,
                piece.yPosition,
                piece.onScreenWidth,
                piece.onScreenHeight
            );
        })
    }
}


function loadFonts (spriteSheetInfo, sprites) {
    if (spriteSheetInfo.letters) {
        spriteSheetInfo.letters.forEach(letter => {
            sprites.saveTheSprite(
                letter.name,
                letter.xPosition,
                letter.yPosition,
                letter.onScreenWidth,
                letter.onScreenHeight
            );
        });
    }
}

export default loadSpriteSet;