import Phaser from "phaser";
import DefaultButtonPanel from "../button-panels/DefaultButtonPanel";
import Player from "../characters/Player";
import Enemy from "../characters/DefaultEnemy";
import AttackButtonPanel from "../button-panels/AttackPanel";

class BattleScreen extends Phaser.Scene {
    buttonPanel: DefaultButtonPanel | undefined = undefined
    attackButtonPanel: AttackButtonPanel | undefined = undefined
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

        this.player = new Player(this, "Player", 100, 6)
        this.add.existing(this.player)

        this.enemy = new Enemy(this, "Enemy", 50)
        this.add.existing(this.enemy)
        
        this.buttonPanel = new DefaultButtonPanel(this)

        this.attackButtonPanel = new AttackButtonPanel(this)
    }

    update() {
    }

}

export default BattleScreen