

class BrickCollider {
    constructor (bricks) {
        this.bricks = bricks
    }

    testColl (onScreenObject) {
        console.log('Test function from collision', onScreenObject)
    }
}


export {BrickCollider};