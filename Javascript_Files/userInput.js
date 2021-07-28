
import KeyboardEvent from "./Classes/keyboardEvents.js";

function userInput (onScreenObject) {
    const keyboard = new KeyboardEvent();

    const SPACEBAR = 32;
    keyboard.addKeyMap(SPACEBAR, keystate => { // Jump
        if (keystate) {
            onScreenObject.jump.startJump();
        } else {
            onScreenObject.jump.cancelJump();
        }
    });
    keyboard.addKeyMap(68, keystate => { // Move Right
        onScreenObject.move.movementDirection = keystate
    });
    keyboard.addKeyMap(65, keystate => { // Move left
        onScreenObject.move.movementDirection = -keystate
    });

    return keyboard;
}

export {userInput};