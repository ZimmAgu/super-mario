"use strict";
import { loadMarioSprite } from "./loadSprites.js"
import onScreenObject from "./Classes/onScreenObjects.js";
import { drawSpriteLayer } from "./loadSprites.js"


function createMario () {
    return loadMarioSprite()
        .then(marioSprite => {
            const mario = new onScreenObject(); 

            const GRAVITY = 30;

            mario.position.setVector(64, 295);   // Sets the position of mario
            const positionOfMario = mario.position;

            mario.velocity.setVector(400, -600); // Sets the velocity that mario moves at
            const velocityOfMario = mario.velocity;

            // console.log(positionOfMario);
            mario.vectorUpdate = (elapsedTime) => {
                mario.updateVector(positionOfMario, velocityOfMario, GRAVITY, elapsedTime);
            } //Stores the vector update function in a function that is more easy to read

            mario.drawMario = (context) => {
                return drawSpriteLayer(marioSprite, 'Normal Idle Mario', context, positionOfMario);
            }

            return mario;
        })
}

export default createMario;