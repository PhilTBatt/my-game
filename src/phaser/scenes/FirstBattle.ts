import Phaser from "phaser";
import DefaultButtonPanel from "../game-objects/button-panels/DefaultButtonPanel";
import Player from "../game-objects/characters/Player";
import Enemy from "../game-objects/characters/DefaultEnemy";
import AttackButtonPanel from "../game-objects/button-panels/AttackPanel";
import DefendButtonPanel from "../game-objects/button-panels/DefendPanel";
import SkillButtonPanel from "../game-objects/button-panels/SkillPanel";
import StatsButtonPanel from "../game-objects/button-panels/StatsPanel";
import Button from "../game-objects/buttons/Button";
import SavingIcon from "../game-objects/animations/SavingIcon";
import AttackAnimation from "../game-objects/animations/AttackAnimation";
import BlockAnimation from "../game-objects/animations/BlockAnimation";
import FirstRewardBox from "../game-objects/Misc/FirstRewardBox";
import NextDestinationBox from "../game-objects/Misc/FirstNextDestinationBox";
import SkillAnimation from "../game-objects/animations/SkillAnimation";
import TurnCount from "../game-objects/Misc/TurnCountBox";
import CoinCount from "../game-objects/Misc/CoinCount";

class FirstBattle extends Phaser.Scene {
    key: string | undefined = undefined
    buttonPanel: DefaultButtonPanel | undefined = undefined
    attackButtonPanel: AttackButtonPanel | undefined = undefined
    defendButtonPanel: DefendButtonPanel | undefined = undefined
    skillButtonPanel: SkillButtonPanel | undefined = undefined
    statsButtonPanel: StatsButtonPanel | undefined = undefined
    player: Player | undefined = undefined
    enemy: Enemy | undefined = undefined
    endTurnButton: Button | undefined = undefined
    resetButton: Button | undefined = undefined
    turnCount: number = 1
    turnCountBox: TurnCount  | undefined = undefined
    savingIcon: SavingIcon | undefined = undefined
    attackAnimation: AttackAnimation | undefined = undefined
    blockAnimation: BlockAnimation | undefined = undefined
    elementAnimation: SkillAnimation | undefined = undefined
    enemyAttackAnimation: AttackAnimation | undefined = undefined
    enemyBlockAnimation: BlockAnimation | undefined = undefined
    enemyElementAnimation: SkillAnimation | undefined = undefined
    coinIcon: CoinCount | undefined = undefined
    rewardBox: FirstRewardBox  | undefined = undefined
    nextDestinationBox: NextDestinationBox  | undefined = undefined
    hasBattleEnded: boolean = false
    
    constructor(key: string = 'FirstBattle') {
        super(key)
        this.key = key
    }
    
    preload() {
        this.load.image('damage-icon', '../../public/assets/icons/damage-icon.png')
        this.load.image('stamina-icon', '../../public/assets/icons/stamina-icon.png')
        this.load.image('block-icon', '../../public/assets/icons/block-icon.png')
        this.load.image('fire-icon', '../../public/assets/icons/fire-icon.png')
        this.load.image('frost-icon', '../../public/assets/icons/frost-icon.png')
        this.load.image('poison-icon', '../../public/assets/icons/poison-icon.png')
        this.load.image('electric-icon', '../../public/assets/icons/electric-icon.png')
        this.load.image('save-icon', '../../public/assets/icons/save-icon.png')
        this.load.image('loading-icon', '../../public/assets/icons/loading-icon.png')
        this.load.image('coin-icon', '../../public/assets/icons/coin-icon.png')
    }

    create() {
        this.add.rectangle(500, 300, 1000, 600, 0x00ffff)
        this.add.rectangle(500, 375, 1000, 300, 0x40CF55)
        this.add.rectangle(500, 462.5, 1000, 275, 0x929292)

        this.player = new Player(this, 75, 6)
        
        if (this.key === 'FirstBattle') {
            this.enemy = new Enemy(this, 40)
        }
        
        this.buttonPanel = new DefaultButtonPanel(this)
        
        this.attackButtonPanel = new AttackButtonPanel(this)
        this.defendButtonPanel = new DefendButtonPanel(this)
        this.skillButtonPanel = new SkillButtonPanel(this)
        this.statsButtonPanel = new StatsButtonPanel(this)
        
        this.endTurnButton = new Button(this, 930, 292, 110, 45, "End Turn", '#000000', 0xFCA400, 0x000000, 5, '20px', () => this.time.delayedCall(300, () => this.endTurn()))
        
        this.resetButton = new Button(this, 42, 21, 70, 30, "Home", '#000000', 0xF80000, 0x000000, 5, '15px', () => this.scene.start('IntroScreen'))
        
        this.savingIcon = new SavingIcon(this)

        this.turnCountBox = new TurnCount(this)

        this.coinIcon = new CoinCount(this)

        this.attackAnimation = new AttackAnimation(this, this.player)
        this.blockAnimation = new BlockAnimation(this, this.player)
        this.elementAnimation = new SkillAnimation(this, this.player)

        if (this.enemy) {
            this.enemyAttackAnimation = new AttackAnimation(this, this.enemy)
            this.enemyBlockAnimation = new BlockAnimation(this, this.enemy)
            this.enemyElementAnimation = new SkillAnimation(this, this.enemy)
        }
    }

    update() {
        if (this.enemy && this.enemy.currentHealth <= 0 && !this.hasBattleEnded) {
            this.hasBattleEnded = true
            const overlay = this.add.rectangle(500, 462.5, 1000, 275, 0x929292, 0.015)
            overlay.setDepth(99)
            
            this.disableButtonPanel()
            this.endTurnButton?.disableInteractive()
            this.resetButton?.disableInteractive()
            if (this.player) this.coinIcon?.animateCoinGain(this.player, 12)

            this.time.delayedCall(2000, () => {
                this.showRewards()
            })
        }
    }

    endTurn() {
        this.resetButtonPanel()
        this.disableButtonPanel()
        this.endTurnButton?.disableInteractive()
        this.resetButton?.disableInteractive()
        this.enemy?.useTurn()
        this.turnCount++
        this.turnCountBox?.animateNewTurn(this)

        const overlay = this.add.rectangle(500, 462.5, 1000, 275, 0x929292, 0.4).setDepth(99)
        
        this.time.delayedCall(1500, () => {
            this.player!.block(-this.player!.blockAmount)
            this.player?.changeStamina(-this.player?.currentStamina + this.player?.maxStamina)

            overlay.destroy()

            this.endTurnButton?.setInteractive()
            this.resetButton?.setInteractive()
            this.enableButtonPanel()
        }) 
    }

    saveGameState() {
        this.savingIcon?.loadingIcon.setDepth(100)
        this.savingIcon?.saveIcon.setDepth(100)

        this.time.delayedCall(1000, () => this.savingIcon?.startSaveAnimation())

        const gameState = {key: this.key, player: this.player}
        localStorage.setItem('gameState', JSON.stringify(gameState))
    }

    loadGameState() {
        const savedState = localStorage.getItem('gameState')
        if (savedState) {
            const gameState = JSON.parse(savedState)
            this.player = gameState.player
        }
    }

    disableButtonPanel() {
        const panels = [this.buttonPanel, this.attackButtonPanel, this.defendButtonPanel, this.skillButtonPanel, this.statsButtonPanel]

        panels.forEach(panel => {
            panel?.disableInteractive()
            panel?.disableButtons()
        })
    }

    enableButtonPanel() {
        const panels = [this.buttonPanel, this.attackButtonPanel, this.defendButtonPanel, this.skillButtonPanel, this.statsButtonPanel]

        panels.forEach(panel => {
            panel?.setInteractive()
            panel?.enableButtons()
        })
    }


    resetButtonPanel() {
        this.buttonPanel?.setVisible(true)
        this.attackButtonPanel?.setVisible(false)
        this.defendButtonPanel?.setVisible(false)
        this.skillButtonPanel?.setVisible(false)
        this.statsButtonPanel?.setVisible(false)
    }

    showRewards() {
        this.rewardBox = new FirstRewardBox(this)
        this.rewardBox?.rewardBox?.setDepth(100)
        this.rewardBox?.title?.setDepth(100)
        this.rewardBox?.reward1?.setDepth(100)
        this.rewardBox?.reward2?.setDepth(100)
    }

    showNextDestinations() {
        this.nextDestinationBox = new NextDestinationBox(this)
        this.nextDestinationBox?.nextDestinationBox?.setDepth(101)
        this.nextDestinationBox?.title?.setDepth(101)
        this.nextDestinationBox?.nextDestination1?.setDepth(101)
        this.nextDestinationBox?.nextDestination2?.setDepth(101)
    }
}

export default FirstBattle