
import KeyboardEvent from "./Classes/keyboardEvents.js";

function userInput (onScreenObject) {
    const keyboard = new KeyboardEvent();

    const SPACEBAR = 32;
    keyboard.addKeyMap('Space', keystate => { // Jump
        if (keystate) {
            onScreenObject.jump.startJump();
        } else {
            onScreenObject.jump.cancelJump();
        }
    });
    keyboard.addKeyMap('KeyD', keystate => { // Move Right
        onScreenObject.move.movementDirection += keystate ? 1 : -1; // These ternary operaters ensure that the keystate is always either 1 or -1. This avoids a glitch in which mario comes to a stop when auser tries to go in the opposite direction
    });
    keyboard.addKeyMap('KeyA', keystate => { // Move left
        onScreenObject.move.movementDirection += keystate ? -1 : 1;
    });
    keyboard.addKeyMap('KeyO', keystate => { 
        onScreenObject.turbo(keystate);
    });

    return keyboard;
}

export {userInput};