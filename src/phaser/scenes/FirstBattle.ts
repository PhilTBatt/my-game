import Phaser from "phaser";
import DefaultButtonPanel from "../game-objects/button-panels/DefaultButtonPanel";
import Player from "../game-objects/characters/Player";
import Enemy from "../game-objects/characters/DefaultEnemy";
import AttackButtonPanel from "../game-objects/button-panels/AttackPanel";
import DefendButtonPanel from "../game-objects/button-panels/DefendPanel";
import ItemButtonPanel from "../game-objects/button-panels/ItemPanel";
import StatsButtonPanel from "../game-objects/button-panels/StatsPanel";
import Button from "../game-objects/buttons/Button";
import SavingIcon from "../game-objects/animations/SavingIcon";
import AttackAnimation from "../game-objects/animations/AttackAnimation";
import BlockAnimation from "../game-objects/animations/BlockAnimation";

class FirstBattle extends Phaser.Scene {
    key: string | undefined = undefined
    buttonPanel: DefaultButtonPanel | undefined = undefined
    attackButtonPanel: AttackButtonPanel | undefined = undefined
    defendButtonPanel: DefendButtonPanel | undefined = undefined
    itemButtonPanel: ItemButtonPanel | undefined = undefined
    statsButtonPanel: StatsButtonPanel | undefined = undefined
    player: Player | undefined = undefined
    enemy: Enemy | undefined = undefined
    endTurnButton: Button | undefined = undefined
    resetButton: Button | undefined = undefined
    turnCount: number = 1
    turnCountText: Phaser.GameObjects.Text | undefined = undefined
    savingIcon: SavingIcon | undefined = undefined
    attackAnimation: AttackAnimation | undefined = undefined
    blockAnimation: BlockAnimation | undefined = undefined
    
    constructor(key: string = 'FirstBattle') {
        super(key)
        this.key = key
    }
    
    preload() {
        this.load.image('damage-icon', '../../public/assets/icons/damage-icon.png')
        this.load.image('stamina-icon', '../../public/assets/icons/damage-icon.png')
        this.load.image('block-icon', '../../public/assets/icons/block-icon.png')
        this.load.image('save-icon', '../../public/assets/icons/save-icon.png')
        this.load.image('loading-icon', '../../public/assets/icons/loading-icon.png')
    }

    create() {
        this.add.rectangle(500, 300, 1000, 600, 0x00ffff)
        this.add.rectangle(500, 375, 1000, 300, 0x40CF55)
        this.add.rectangle(500, 462.5, 1000, 275, 0x929292)

        this.player = new Player(this, 100, 6)
        if (this.key === 'FirstBattle') {
            this.enemy = new Enemy(this, 40)
        }

        this.buttonPanel = new DefaultButtonPanel(this)

        this.attackButtonPanel = new AttackButtonPanel(this)
        this.defendButtonPanel = new DefendButtonPanel(this)
        this.itemButtonPanel = new ItemButtonPanel(this)
        this.statsButtonPanel = new StatsButtonPanel(this)

        this.endTurnButton = new Button(this, 935, 295, 110, 45, "End Turn", 0xFCA400, 0x000000, 5, '20px', () => this.time.delayedCall(300, () => this.endTurn()))

        this.resetButton = new Button(this, 49, 30, 80, 45, "Reset", 0xF80000, 0x000000, 5, '15px', () => this.scene.start('IntroScreen'))

        this.turnCountText = this.add.text(500, 15, 'Turn: 1', {fontSize: '20px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.turnCountText.setOrigin(0.5)

        this.savingIcon = new SavingIcon(this)

        this.attackAnimation = new AttackAnimation(this)
        this.blockAnimation = new BlockAnimation(this)
    }

    update() {
        if (this.enemy && this.enemy.currentHealth <= 0) {
            const overlay = this.add.rectangle(500, 300, 1000, 600, 0x929292, 0.015).setDepth(99)
            this.savingIcon?.loadingIcon.setDepth(100)
            this.savingIcon?.saveIcon.setDepth(100)
            
            this.disableButtonPanel()
            this.endTurnButton?.disableInteractive()
            this.resetButton?.disableInteractive()
            this.saveGameState()

            this.time.delayedCall(1000, () => this.savingIcon?.startSaveAnimation())
            this.savingIcon?.startSaveAnimation()
            this.time.delayedCall(5000, () => {}) // this.scene.start('FirstScreen')
        }
    }

    endTurn() {
        this.enemy?.useTurn()
        this.resetButtonPanel()
        this.endTurnButton?.disableInteractive()
        this.resetButton?.disableInteractive()
        this.time.delayedCall(500, () => {
            this.player!.block(-this.player!.blockAmount)
            this.player?.changeStamina(-this.player?.currentStamina + this.player?.maxStamina)
            this.turnCount++
            this.turnCountText!.setText(`Turn: ${this.turnCount}`)
            this.endTurnButton?.setInteractive()
            this.resetButton?.setInteractive()
        }) 
    }

    saveGameState() {
        const gameState = this.player

        localStorage.setItem('gameState', JSON.stringify(gameState))
    }

    loadGameState() {
        const savedState = localStorage.getItem('gameState')
        if (savedState) {
            const gameState = JSON.parse(savedState)

            this.player = gameState
        }
    }

    disableButtonPanel() {
        this.buttonPanel?.disableInteractive()
        this.attackButtonPanel?.disableInteractive()
        this.defendButtonPanel?.disableInteractive()
        this.itemButtonPanel?.disableInteractive()
        this.statsButtonPanel?.disableInteractive()
    }

    resetButtonPanel() {
        this.buttonPanel?.setVisible(true)
        this.attackButtonPanel?.setVisible(false)
        this.defendButtonPanel?.setVisible(false)
        this.itemButtonPanel?.setVisible(false)
        this.statsButtonPanel?.setVisible(false)
    }
}

export default FirstBattle