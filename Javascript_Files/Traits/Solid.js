"use strict";

// Trait Imports
import Trait from "./Traits.js";

class Solid extends Trait { 
    constructor () {
        super("solid")
    }

    obstruct (onScreenObject, side, match) {
        if (side === 'bottom') {    // When mario is touching the ground then he is given the ability to jump
            onScreenObject.hitbox.bottom = match.y1;
            onScreenObject.velocity.y = 0;
        }

        if (side === 'top') {
            onScreenObject.hitbox.top = match.y2;
            onScreenObject.velocity.y = 0;
        }

        if (side === 'left') {
            onScreenObject.hitbox.right = match.x1;
            onScreenObject.velocity.x = 0;
        }


        if (side === 'right') { 
            onScreenObject.hitbox.left = match.x2;
            onScreenObject.velocity.x = 0;
        }



        
    }
}

export default Solid;