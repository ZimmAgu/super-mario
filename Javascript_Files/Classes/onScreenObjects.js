"use strict";
import vector from "./vector.js";

class onScreenObject {
    constructor () {
        this.position = new vector(0, 0);   // The current positions of marion
        this.velocity = new vector(0, 0);   // How fast mario is moving in the x & y direction
    }

    updateVector (position, velocity, gravity, elsapedTime) { // Position determines where mario is, velocity determines how fast mario gets there
        position.x += (velocity.x * elsapedTime);
        position.y += (velocity.y * elsapedTime);
        velocity.y += (gravity * elsapedTime);
    }
}

export default onScreenObject;