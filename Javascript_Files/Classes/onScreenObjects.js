"use strict";
import Vector from "./Vector.js";

class OnScreenObject {
    constructor () {
        this.position = new Vector(0, 0);   // The current positions of marion
        this.velocity = new Vector(0, 0);   // How fast mario is moving in the x & y direction
    }

    updateVector (position, velocity, gravity, elsapedTime) { // Position determines where mario is, velocity determines how fast mario gets there
        position.x += (velocity.x * elsapedTime);
        position.y += (velocity.y * elsapedTime);
        velocity.y += (gravity * elsapedTime);
    }
}

export default OnScreenObject;