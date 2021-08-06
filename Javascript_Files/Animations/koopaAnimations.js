"use strict";
import { createAnimation } from "../createAnimation.js";


function routeKoopaFrame (object) {
    if (object.velocity.x > 0){
        return "koopa right 1"    
    } else {
        return "koopa left 1"
    }
        
}

export { routeKoopaFrame }