import Trait from "./Traits.js";

class CurrentPlayer extends Trait {

    constructor () {
        super('player');
        this.name = "UNNAMED";
        this.coins = 0;
        this.lives = 3;
        this.score = 0; 
    }
    
}

export default CurrentPlayer;