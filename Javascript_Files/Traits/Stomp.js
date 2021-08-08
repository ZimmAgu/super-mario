"use strict";
import Trait from "./Traits.js";

class Stomp extends Trait {
    constructor () {
        super('stomp');
        this.bounce = false;
        this.bounceSpeed = 500;
    }

    bounceUpward () {
        this.bounce = true;
    }

    updateTrait (object) {
        if (this.bounce) {
            object.velocity.y = -this.bounceSpeed; // If the bounce method is called the object will fly upward at bounceSpeed
            this.bounce = false
        }
    }
}

export default Stomp;