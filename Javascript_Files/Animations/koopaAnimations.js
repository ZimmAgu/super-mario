"use strict";
import { createAnimation } from "./createAnimation.js";


const koopaWalkingRight = createAnimation(
    [
        "koopa walking right 1",
        "koopa walking right 2"
    ],
    0.2
)

const koopaWalkingLeft = createAnimation(
    [
        "koopa walking left 1",
        "koopa walking left 2"
    ],
    0.2
)

function routeKoopaFrame (object) {
    if (object.ableToDie.isDead == true) {
        return 'koopa hiding left 2'
    }

    if (object.velocity.x > 0){
        return koopaWalkingRight(object.lifetime)    
    } else {
        return koopaWalkingLeft(object.lifetime)  
    }
        
}

export { routeKoopaFrame }