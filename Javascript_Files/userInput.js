
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
        onScreenObject.move.movementDirection = keystate
    });
    keyboard.addKeyMap('KeyA', keystate => { // Move left
        onScreenObject.move.movementDirection = -keystate
    });

    return keyboard;
}

export {userInput};