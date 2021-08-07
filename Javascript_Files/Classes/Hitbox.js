"use strict";

class Hitbox {
    constructor (position, size) {
        this.position = position
        this.size = size
    }

    overlaps (box) {
        return this.bottom > box.top
            && this.top < box.bottom
            && this.left < box.right
            && this.right > box.left;
    }

    get bottom() {
        return this.position.y + this.size.y;
    }

    set bottom(y) {
        this.position.y = y - this.size.y;
    }

    get top() {
        return this.position.y;
    }

    set top(y) {
        this.position.y = y;
    }

    get left() {
        return this.position.x;
    }

    set left(x) {
        this.position.x = x;
    }

    get right() {
        return this.position.x + this.size.x;
    }

    set right(x) {
        this.position.x = x - this.size.x;
    }
}



export default Hitbox;