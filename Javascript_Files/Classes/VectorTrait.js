"use strict";

import Trait from "./Traits.js";

class vectorUpdate extends Trait {
    constructor () {
        super('vectorUpdate');
    }

    updateTrait (object, elsapedTime) { // Position determines where mario is, velocity determines how fast mario gets there
        let gravity = 200;
        object.position.x += (object.velocity.x * elsapedTime);
        object.position.y += (object.velocity.y * elsapedTime);
        object.velocity.y += (gravity * elsapedTime);
    }
}

export default vectorUpdate;