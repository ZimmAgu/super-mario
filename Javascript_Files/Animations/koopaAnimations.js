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

const koopaWakingUp = createAnimation(
    [
        "koopa hiding left 1",
        "koopa hiding left 2"
    ],
    0.2
)

function routeKoopaFrame (object) {
    if (object.behavior.state == 'hiding') {
        if (object.behavior.hideTime > 3) {
            return koopaWakingUp(object.behavior.hideTime);
        }

        return 'koopa hiding left 2'
    }

    if (object.behavior.state == 'panic') {
        return 'koopa hiding left 2'
    }

    if (object.velocity.x > 0){
        return koopaWalkingRight(object.lifetime)    
    } else {
        return koopaWalkingLeft(object.lifetime)  
    }
        
}

export { routeKoopaFrame }