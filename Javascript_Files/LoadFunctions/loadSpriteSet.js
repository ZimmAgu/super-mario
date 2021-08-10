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

                if (spriteSheetInfo.blocks) { // Blocks located in overworld.json
                    spriteSheetInfo.blocks.forEach(sprite => {
                        sprites.saveTheSprite(
                                    sprite.name,
                                    sprite.xPosition,
                                    sprite.yPosition,
                                    sprite.onScreenWidth,
                                    sprite.onScreenHeight
                                );
                    });
                }

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


                if (spriteSheetInfo.animations) { // animations located in overworld.json
                    spriteSheetInfo.animations.forEach(anim => {
                        const animation = createAnimation(anim.frames, anim.frameLength)
                        sprites.defineAnimation(anim.name, animation)
                    });
                }


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




                return sprites
            })
}

export default loadSpriteSet;