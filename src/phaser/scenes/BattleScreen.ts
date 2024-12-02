import Phaser from "phaser";
import DefaultButtonPanel from "../game-objects/button-panels/DefaultButtonPanel";
import Player from "../game-objects/characters/Player";
import Enemy from "../game-objects/characters/DefaultEnemy";
import AttackButtonPanel from "../game-objects/button-panels/AttackPanel";
import DefendButtonPanel from "../game-objects/button-panels/DefendPanel";
import ItemButtonPanel from "../game-objects/button-panels/ItemPanel";
import StatsButtonPanel from "../game-objects/button-panels/StatsPanel";
import Button from "../game-objects/buttons/Button";

class BattleScreen extends Phaser.Scene {
    buttonPanel: DefaultButtonPanel | undefined = undefined
    attackButtonPanel: AttackButtonPanel | undefined = undefined
    defendButtonPanel: DefendButtonPanel | undefined = undefined
    itemButtonPanel: ItemButtonPanel | undefined = undefined
    statsButtonPanel: StatsButtonPanel | undefined = undefined
    player: Player | undefined = undefined
    enemy: Enemy | undefined = undefined
    turnCount: number = 1
    turnCountText: Phaser.GameObjects.Text | undefined = undefined
    
    constructor() {
        super('BattleScreen')
    }
    
    preload() {
        this.load.image('damage-icon', '../../public/assets/icons/damage-icon.png')
        this.load.image('stamina-icon', '../../public/assets/icons/damage-icon.png')
        this.load.image('block-icon', '../../public/assets/icons/block-icon.png')
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

        const endTurnButton = new Button(this, 935, 295, 110, 45, "End Turn", 0xFCA400, 0x000000, 5, '20px', () => this.time.delayedCall(300, () => this.endTurn()))

        const resetButton = new Button(this, 49, 30, 80, 45, "Reset", 0xF80000, 0x000000, 5, '15px', () => this.scene.start('IntroScreen'))

        this.turnCountText = this.add.text(500, 15, 'Turn: 1', {fontSize: '20px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.turnCountText.setOrigin(0.5)
    }

    update() {
    }

    endTurn() {
        this.enemy?.useTurn()
        this.time.delayedCall(500, () => {
            this.player!.block(-this.player!.blockAmount)
            this.player?.changeStamina(-this.player?.currentStamina + this.player?.maxStamina)
            this.turnCount++
            this.turnCountText!.setText(`Turn: ${this.turnCount}`)
        })
    }
}

export default BattleScreen