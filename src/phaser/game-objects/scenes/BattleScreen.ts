import Phaser from "phaser";
import DefaultButtonPanel from "../button-panels/DefaultButtonPanel";
import Player from "../characters/Player";

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

        this.buttonPanel = new DefaultButtonPanel(this)
        this.add.existing(this.buttonPanel)
    }

    update() {
        if (this.buttonPanel?.showAttacks) {
            // const attackPanel = new AttackPanel(this)
            this.buttonPanel.visible = false
            // this.add.existing(attackPanel)
            
        }
    }
}

export default BattleScreen