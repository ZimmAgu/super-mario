"use strict";
// Class Imports
import KeyboardEvent from "./Classes/keyboardEvents.js";
import LayeredImages from "./Classes/layerTheImages.js"
import Timer from "./Classes/timer.js";


//Javascript File imports
import createMario from "./createMario.js";
import { loadLevel } from "./loadFunctions.js";
import { createCollisionLayer } from "./drawTheLayers.js";

const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");

const layer = new LayeredImages();
const keyboard = new KeyboardEvent();



Promise.all([   // Will make the Spritesheet and world textures load at the same time instead of one after another
    loadLevel('1-1'),
    createMario()
]).then(([level, mario]) => {   // The image parameter is what is returned from the loadBackgroundSprites() function. The level parameter is what is returned from the loadLevel() function

    level.objects.add(mario)
    
    console.log();
    level.layer.imageLayers.push(createCollisionLayer(level))
    
    const SPACEBAR = 32;
    keyboard.addKeyMap(SPACEBAR, keystate => {
        console.log(keystate)
        if (keystate) {
            mario.jump.startJump();
        } else {
            mario.jump.cancelJump();
        }
    });


    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons == 1) {
                mario.velocity.setVector(0, 0);
                mario.position.setVector(event.offsetX, event.offsetY);
            }
        })
    })

    keyboard.keyboardEventListener(window)


    const marioTimer = new Timer(1/60);

    marioTimer.updateMario = (refreshRate) => {
        level.brickCollider.testColl(mario)
        level.layer.drawTheLayer(context);
        mario.updateTrait(refreshRate);
    }

    marioTimer.startTimer();
})