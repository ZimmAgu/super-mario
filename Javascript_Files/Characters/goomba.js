import { loadSpriteSheet } from "../loadFunctions.js";


function loadGoomba () {
    return loadSpriteSheet('goomba') 
            .then(goombaSprite => {
        return createGoomba(goombaSprite);
    })
}


function createGoomba(sprite) {
    console.log(sprite)
}


export default loadGoomba