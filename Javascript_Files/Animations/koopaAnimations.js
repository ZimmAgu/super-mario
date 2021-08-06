"use strict";
import { createAnimation } from "./createAnimation.js";


const koopaWalkingRight = createAnimation(
    [
        "koopa right 3",
        "koopa right 4"
    ],
    0.2
)

const koopaWalkingLeft = createAnimation(
    [
        "koopa left 3",
        "koopa left 4"
    ],
    0.2
)

function routeKoopaFrame (object) {
    if (object.velocity.x > 0){
        return koopaWalkingRight(object.lifetime)    
    } else {
        return koopaWalkingLeft(object.lifetime)  
    }
        
}

export { routeKoopaFrame }