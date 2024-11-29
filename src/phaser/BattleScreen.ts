import Phaser from "phaser";

class BattleScreen extends Phaser.Scene {

    preload() {
    }

    create() {
        this.add.rectangle(500, 300, 1000, 600, 0x00ffff)
    }

    update() {
    }
}

export default BattleScreen