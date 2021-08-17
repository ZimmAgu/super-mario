import EventEmitter from "./EventEmitter.js";
import LayeredImages from "../Classes/LayerTheImages.js";

class Scene {
    static EVENT_COMPLETE = Symbol('scene complete');

    constructor () {
        this.events = new EventEmitter();
        this.layeredImages = new LayeredImages()
    }

    drawLevel (gameContext) {
        this.layeredImages.drawTheLayers(gameContext.context);
    }

    updateLevel (gameContext) {
        
    }

}

export default Scene;