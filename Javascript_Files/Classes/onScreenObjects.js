"use strict";
import Vector from "./Vector.js";

class OnScreenObject {
    constructor () {
        this.position = new Vector(0, 0);   // The current positions of marion
        this.velocity = new Vector(0, 0);   // How fast mario is moving in the x & y direction

        this.traits = []; // Each on screen object will have an array where all of their traits are stored                
    }

    updateVector (position, velocity, gravity, elsapedTime) { // Position determines where mario is, velocity determines how fast mario gets there
        position.x += (velocity.x * elsapedTime);
        position.y += (velocity.y * elsapedTime);
        velocity.y += (gravity * elsapedTime);
    }


    addTrait (currentTrait) {
        this.traits.push(currentTrait);
        this[currentTrait.traitName] = currentTrait;
    }


    updateTrait (elapsedTime) {
        this.traits.forEach(trait => {
            trait.updateTrait(this, elapsedTime)    // Each trait class will have a function named update trait
        })
    }

}

export default OnScreenObject;