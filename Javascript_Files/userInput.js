"use strict";

// Class Imports
import InputRouter from "./Classes/InputRouter.js";
import KeyboardEvent from "./Classes/keyboardEvents.js";

function userInput (window) {
    const keyboard = new KeyboardEvent();
    const router = new InputRouter();

    keyboard.keyboardEventListener(window);

    keyboard.addKeyMap('Space', keystate => { // Jump
        if (keystate) {
            router.route(onScreenObject => onScreenObject.jump.startJump());
        } else {
            router.route(onScreenObject => onScreenObject.jump.cancelJump());
        }
    });



    keyboard.addKeyMap('ArrowUp', keystate => { // Jump
        if (keystate) {
            router.route(onScreenObject => onScreenObject.jump.startJump());
        } else {
            router.route(onScreenObject => onScreenObject.jump.cancelJump());
        }
    });
    keyboard.addKeyMap('ArrowRight', keystate => { // Move Right
        router.route(onScreenObject => onScreenObject.move.movementDirection += keystate ? 1 : -1); // These ternary operaters ensure that the keystate is always either 1 or -1. This avoids a glitch in which mario comes to a stop when auser tries to go in the opposite direction
    });
    keyboard.addKeyMap('ArrowLeft', keystate => { // Move left
        router.route(onScreenObject => onScreenObject.move.movementDirection += keystate ? -1 : 1);
    });
    keyboard.addKeyMap('KeyB', keystate => { 
        router.route(onScreenObject => onScreenObject.turbo(keystate))
    });





    keyboard.addKeyMap('KeyW', keystate => { // Jump
        if (keystate) {
            router.route(onScreenObject => onScreenObject.jump.startJump());
        } else {
            router.route(onScreenObject => onScreenObject.jump.cancelJump());
        }
    });
    
    keyboard.addKeyMap('KeyD', keystate => { // Move Right
        router.route(onScreenObject => onScreenObject.move.movementDirection += keystate ? 1 : -1); // These ternary operaters ensure that the keystate is always either 1 or -1. This avoids a glitch in which mario comes to a stop when auser tries to go in the opposite direction
    });
    keyboard.addKeyMap('KeyA', keystate => { // Move left
        router.route(onScreenObject => onScreenObject.move.movementDirection += keystate ? -1 : 1);
    });
    keyboard.addKeyMap('KeyO', keystate => { 
        router.route(onScreenObject => onScreenObject.turbo(keystate))
    });

    return router;
}

export {userInput};