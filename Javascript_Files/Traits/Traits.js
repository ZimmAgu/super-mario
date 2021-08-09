"use strict";
class Trait {
    constructor (traitName) {
        this.traitName = traitName;

        this.tasks = []
    }

    queue (newTask) {
        this.tasks.push(newTask);   // This will be a list of tasks that we want al to complete at once
    }

    finalize () {
        this.tasks.forEach(task => task());
        this.tasks.length = 0;
    }

    collides (character, otherCharacter) {

    }

    obstruct () {
        
    }

    updateTrait () {

    }
}

export default Trait;