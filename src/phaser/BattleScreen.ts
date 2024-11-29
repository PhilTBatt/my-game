import Phaser from "phaser";
import DefaultButtonPanel from "./game-objects/button-panels/DefaultButtonPanel";

class BattleScreen extends Phaser.Scene {
    buttonPanel: DefaultButtonPanel | undefined = undefined
    
    constructor() {
        super('BattleScreen')
    }

    preload() {
    }

    create() {
        this.add.rectangle(500, 300, 1000, 600, 0x00ffff)
        this.add.rectangle(500, 375, 1000, 450, 0x40CF55)
        this.add.rectangle(500, 450, 1000, 300, 0x929292)
    }

    update() {
    }
}

export default BattleScreen