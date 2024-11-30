import Phaser from "phaser";
import DefaultButtonPanel from "../button-panels/DefaultButtonPanel";
import Player from "../characters/Player";
import Enemy from "../characters/DefaultEnemy";

class BattleScreen extends Phaser.Scene {
    buttonPanel: DefaultButtonPanel | undefined = undefined
    player: Player | undefined = undefined
    enemy: Enemy | undefined = undefined
    
    constructor() {
        super('BattleScreen')
    }

    preload() {
    }

    create() {
        this.add.rectangle(500, 300, 1000, 600, 0x00ffff)
        this.add.rectangle(500, 375, 1000, 350, 0x40CF55)
        this.add.rectangle(500, 450, 1000, 300, 0x929292)

        this.buttonPanel = new DefaultButtonPanel(this)
        this.add.existing(this.buttonPanel)

        this.player = new Player(this, "Player", 100, 5)
        this.add.existing(this.player)

        this.enemy = new Enemy(this, "Enemy", 50)
        this.add.existing(this.enemy)
    }

    update() {
        if (this.buttonPanel?.showAttacks) {
            // const attackPanel = new AttackPanel(this)
            this.buttonPanel.visible = false
            // this.add.existing(attackPanel)
            return
        }
    }
}

export default BattleScreen