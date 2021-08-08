"use strict";

// Trait Imports
import Trait from "./Traits.js";

class AbleToDie extends Trait {
    constructor () {
        super('ableToDie')
        this.isDead = false;
    }

    dies () {
        this.isDead = true;
    }
}

export default AbleToDie;