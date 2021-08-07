"use strict";

class CharacterCollisions {
    constructor (objects) {
        this.objects = objects;
    } 

    checkForCharacter (character) {
        this.objects.forEach(otherCharacter => {
            if (character === otherCharacter) { // This is to avoid characters deteting a hit on themselves
                return;
            }

            if (character.hitbox.overlaps(otherCharacter.hitbox)) { // If the hitboxes of two character overlap, then the character collision function of both characters are ran
                console.log('hello')
                character.collides(otherCharacter);
                otherCharacter.collides(character)
            }
        })
    }

}

export default CharacterCollisions;