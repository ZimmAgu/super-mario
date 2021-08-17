
// Trait Imports
import Trait from "./Traits.js";

class Trigger extends Trait {
    constructor () {
        super ('trigger')

        this.touches = new Set();
        this.conditions = [];
    }

    collides (mario, triggerbox) {
        this.touches.add(triggerbox);
    }

    updateTrait (object, gameContext, level) {
        if (this.touches.size > 0) {
            for (const condition of this.conditions) {
                condition(object, this.touches, gameContext, level);
            }
            this.touches.clear();
        }
    }
}

export default Trigger;