"use strict";
import Trait from "./Traits.js";

class Move extends Trait {
    constructor () {
        super('move');

        this.movementDirection = 0; // How long the jump lasts
        this.acceleration = 400;    // How fast mario speeds up
        this.decceleration = 300;   // How fast mario slows down
        this.drag = 1/9000;         // The "wind resistance" that prevents mario from having infinite speed. This if the denominator as the max speed that mario can go  

        this.distance = 0;
        this.heading = 1;
    }

    updateTrait (object, elapsedTime) { // Holds all of the functionality of a jump
        const absoluteObjectVelocity = Math.abs(object.velocity.x);

        const slowdownRate = Math.min(
                                        absoluteObjectVelocity, 
                                        this.decceleration * elapsedTime
                                    );

        if (this.movementDirection) {                                                       // If the character is moving, then the distance variable is incremented up regardless of what direction the character is moving in
            object.velocity.x += this.acceleration * this.movementDirection * elapsedTime;  // The acceleration speed gets added on to the velocity over time
            this.heading = this.movementDirection;
        } else if (object.velocity.x !== 0) {
            object.velocity.x += object.velocity.x > 0 ? -slowdownRate : slowdownRate;      // If you you going to the right, then the slowdown rate is - to subtract velocity. If you are going to the left, then the slowdown rate is + to subtract velocity 
        } else {    
            this.distance = 0;                                                              // If the character is not moving, the distance gets reset to 0
        }

        this.distance += absoluteObjectVelocity * elapsedTime;
        const dragFactor = this.drag * object.velocity.x * absoluteObjectVelocity
        object.velocity.x -= dragFactor; // This drag factor adds wind resistance to prevent mario from going infinitely fast
        
    }
}

export default Move;
