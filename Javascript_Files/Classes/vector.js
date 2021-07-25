"use strict";

class vector {  // This class is resposible for controlling the position & speed of mario
    constructor (xPosition, yPosition) {
        this.setVector(xPosition, yPosition)
    }

    setVector (xPosition, yPosition) {  // This set function is here so you dont have to define the x & y position of position & velocity seperately
        this.x = xPosition;
        this.y = yPosition;
    }
}

export default vector