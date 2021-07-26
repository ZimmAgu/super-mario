"use strict";
class keyboardEvent {
    constructor () {
        this.keyStates = new Map();     // Current state of a given key
        this.keyMap = new Map();        // Callback functions for key code
    }

    addKeyMap (keyCode, callback) {
        this.keyMap.set(keyCode, callback);
    }

    handleKeyboardEvent (event) {
        const {keyCode} = event;        // The event listener is passed in the parameter and this assigns only the key code to the keyCode variable
        
        const PRESSED = 1;
        const RELEASED = 0;

        if (!this.keyMap.has(keyCode)) return;   // If the key hasn't been mapped yet then nothing needs to be done

        event.preventDefault();  // If the key is mapped, then it is prevented from doing its original functionality. This way we can stop the keydown event from firing when the user holds a key down.

        const stateOfKey = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(keyCode) === stateOfKey) return;

        this.keyStates.set(keyCode, stateOfKey);

        this.keyMap.get(keyCode)(stateOfKey);
    }

    keyboardEventListener (window) {
        ['keyup', 'keydown'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleKeyboardEvent(event);
                
            })
        })
    }
}


export default keyboardEvent;