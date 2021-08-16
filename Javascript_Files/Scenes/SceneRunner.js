import Scene from './Scene.js';

class SceneRunner {
    constructor() {
        this.sceneIndex = -1;
        this.scenes = [];
    }

    addScene(scene) {
        // scene.events.listen(Scene.EVENT_COMPLETE, () => {
        //     this.runNext();
        // });
        this.scenes.push(scene);
    }

    runNext() {
        // const currentScene = this.scenes[this.sceneIndex];
        // if (currentScene) {
        //     currentScene.pause();
        // }
        this.sceneIndex++;
    }

    updateScene (gameContext) {
        const currentScene = this.scenes[this.sceneIndex];
        if (currentScene) {
            currentScene.updateLevel(gameContext);
            currentScene.drawLevel(gameContext);
        }
    }
}

export default SceneRunner;
