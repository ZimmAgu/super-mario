"use strict";
class KeyboardEvent {
    constructor () {
        this.keyStates = new Map();     // Current state of a given key
        this.keyMap = new Map();        // Callback functions for key code
    }

    addKeyMap (code, callback) {
        this.keyMap.set(code, callback);
    }

    handleKeyboardEvent (event) {
        const {code} = event;        // The event listener is passed in the parameter and this assigns only the key code to the code variable
        
        const PRESSED = 1;
        const RELEASED = 0;

        if (!this.keyMap.has(code)) return;   // If the key hasn't been mapped yet then nothing needs to be done

        event.preventDefault();  // If the key is mapped, then it is prevented from doing its original functionality. This way we can stop the keydown event from firing when the user holds a key down.

        const stateOfKey = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(code) === stateOfKey) return;

        this.keyStates.set(code, stateOfKey);

        this.keyMap.get(code)(stateOfKey);
    }

    keyboardEventListener (window) {
        ['keyup', 'keydown'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleKeyboardEvent(event);
                
            })
        })
    }
}


export default KeyboardEvent;
