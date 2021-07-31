import Vector from "./Vector.js"

class Camera {
    constructor () {
        this.position = new Vector(0, 0);
        this.size = new Vector(256, 400);
    }
}

export default Camera;