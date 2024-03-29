"use strict";

class FontOrganizer {
    constructor (sprites) {
        this.sprites = sprites;
        this.size = 16
    }

    printWord (text, context, x, y) {
        [...text].forEach((character, position) => {

            const LOCATION = position * this.size;

            this.sprites.drawTheSprite(
                                        character, 
                                        context, 
                                        x + LOCATION, 
                                        y
                                    );
        })
    }
}

export default FontOrganizer;