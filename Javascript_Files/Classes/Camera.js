"use strict";
import Vector from "./Vector.js"

class Camera {
    constructor () {
        this.position = new Vector(0, 0);
        this.size = new Vector(672, 416);
    }
}

export default Camera;