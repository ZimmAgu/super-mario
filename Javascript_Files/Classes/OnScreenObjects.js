"use strict";

// Class Imports
import Hitbox from "./Hitbox.js";
import Vector from "./Vector.js";


class OnScreenObject {
    constructor () {
        this.position = new Vector(0, 0);   // The current positions of marion
        this.velocity = new Vector(0, 0);   // How fast mario is moving in the x & y direction
        this.size = new Vector();

        this.hitbox = new Hitbox(this.position, this.size);
        this.canCollide = true;

        this.lifetime = 0;
        this.traits = []; // Each on screen object will have an array where all of their traits are stored                
    }

    collides (otherCharacter) {
        this.traits.forEach(trait => {
            trait.collides(this, otherCharacter)    // Each trait class will have a function named update trait
        })
    }

    obstruct (side) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side)    // Each trait class will have a function named update trait
        })
    }

    addTrait (currentTrait) {
        this.traits.push(currentTrait);
        this[currentTrait.traitName] = currentTrait;
    }


    updateTrait (elapsedTime, level, soundBoard) {
        this.traits.forEach(trait => {
            trait.updateTrait(this, elapsedTime, level, soundBoard)    // Each trait class will have a function named update trait
        })
    }

    drawObject () {
        
    }

    finalize () {
        this.traits.forEach(trait => {
            trait.finalize();    // some trait classed will have a function named update finalize
        })
    }

}

export default OnScreenObject;
