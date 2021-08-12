"use strict";
// Class Imports
import OnScreenObject from "../Classes/onScreenObjects.js";

// Javascript File Imports 
import loadSpriteSet from "../LoadFunctions/loadSpriteSet.js"
import { routeKoopaFrame } from "../Animations/koopaAnimations.js"

// Trait Imports
import AbleToDie from "../Traits/AbleToDie.js";
import KoopaBehavior from "../Traits/KoopaBehavior.js";
import PendelumWalk from "../Traits/PendelumWalk.js";
import Solid from "../Traits/Solid.js";



function loadKoopa () {
    return loadSpriteSet('koopa')
            .then(koopaSprite => {
        return createKoopa(koopaSprite);
    })
}


function createKoopa (sprite) {
    const koopa = new OnScreenObject;

    koopa.size.setVector(40, 53.2);

    koopa.addTrait(new Solid());
    koopa.addTrait(new AbleToDie());
    koopa.addTrait(new PendelumWalk());
    koopa.addTrait(new KoopaBehavior());

    routeKoopaFrame(koopa);

    koopa.drawObject = (context) => { // Draws the mario animations to the screen
        sprite.drawTheSprite(routeKoopaFrame(koopa), context, 0, 0);
    }

    return koopa
}


export default loadKoopa;