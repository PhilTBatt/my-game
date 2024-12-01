import Phaser from "phaser";
import DefaultButtonPanel from "../button-panels/DefaultButtonPanel";
import Player from "../characters/Player";
import Enemy from "../characters/DefaultEnemy";
import AttackButtonPanel from "../button-panels/AttackPanel";
import DefendButtonPanel from "../button-panels/DefendPanel";
import ItemButtonPanel from "../button-panels/ItemPanel";
import StatsButtonPanel from "../button-panels/StatsPanel";
import Button from "../buttons/Button";

class BattleScreen extends Phaser.Scene {
    buttonPanel: DefaultButtonPanel | undefined = undefined
    attackButtonPanel: AttackButtonPanel | undefined = undefined
    defendButtonPanel: DefendButtonPanel | undefined = undefined
    itemButtonPanel: ItemButtonPanel | undefined = undefined
    statsButtonPanel: StatsButtonPanel | undefined = undefined
    player: Player | undefined = undefined
    enemy: Enemy | undefined = undefined
    turnCount: number = 1
    turnCountText: text
    
    constructor() {
        super('BattleScreen')
    }
    
    preload() {
    }

    create() {
        this.add.rectangle(500, 300, 1000, 600, 0x00ffff)
        this.add.rectangle(500, 375, 1000, 300, 0x40CF55)
        this.add.rectangle(500, 462.5, 1000, 275, 0x929292)

        this.player = new Player(this, 100, 6)
        this.enemy = new Enemy(this, 50)

        this.buttonPanel = new DefaultButtonPanel(this)

        this.attackButtonPanel = new AttackButtonPanel(this)
        this.defendButtonPanel = new DefendButtonPanel(this)
        this.itemButtonPanel = new ItemButtonPanel(this)
        this.statsButtonPanel = new StatsButtonPanel(this)

        const endTurnButton = new Button(this, 925, 290, 110, 45, "End Turn", 0xFCA400, 0x000000, '20px', () => this.time.delayedCall(300, () => this.endTurn()))

        const resetButton = new Button(this, 45, 30, 80, 45, "Reset", 0xF80000, 0x000000, '15px', () => this.scene.start('IntroScreen'))

        this.turnCountText = this.add.text(500, 10, 'Turn: 1', {fontSize: '20px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.turnCountText.setOrigin(0.5)
    }

    update() {
    }

    endTurn() {
        this.enemy?.useTurn()
        this.player?.changeStamina(-this.player?.currentStamina + this.player?.maxStamina)
        this.time.delayedCall(500, () => {
            this.turnCount++
            this.turnCountText.setText(`Turn: ${this.turnCount}`)
        })
    }

}

export default BattleScreen