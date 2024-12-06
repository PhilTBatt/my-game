import Phaser from "phaser";
import DefaultButtonPanel from "../game-objects/button-panels/DefaultButtonPanel";
import Player from "../game-objects/characters/Player";
import Enemy from "../game-objects/characters/DefaultEnemy";
import AttackButtonPanel from "../game-objects/button-panels/AttackPanel";
import DefendButtonPanel from "../game-objects/button-panels/DefendPanel";
import SkillButtonPanel from "../game-objects/button-panels/SkillButtonPanel";
import StatsButtonPanel from "../game-objects/button-panels/StatsPanel";
import Button from "../game-objects/buttons/Button";
import SavingIcon from "../game-objects/animations/SavingIcon";
import AttackAnimation from "../game-objects/animations/AttackAnimation";
import BlockAnimation from "../game-objects/animations/BlockAnimation";
import FirstRewardBox from "../game-objects/misc/FirstRewardBox";
import NextDestinationBox from "../game-objects/misc/FirstNextDestinationBox";
import SkillAnimation from "../game-objects/animations/SkillAnimation";
import TurnCount from "../game-objects/misc/TurnCountBox";
import CoinCount from "../game-objects/misc/CoinCount";
import PlayerState from "../tyes.ts"

class FirstBattle extends Phaser.Scene {
    key: string | undefined = undefined
    buttonPanel: DefaultButtonPanel | undefined
    attackButtonPanel: AttackButtonPanel | undefined
    defendButtonPanel: DefendButtonPanel | undefined
    skillButtonPanel: SkillButtonPanel | undefined
    statsButtonPanel: StatsButtonPanel | undefined
    player: Player | undefined
    enemy: Enemy | undefined
    endTurnButton: Button | undefined 
    resetButton: Button | undefined
    turnCount: number = 1
    turnCountBox: TurnCount  | undefined
    savingIcon: SavingIcon | undefined
    attackAnimation: AttackAnimation | undefined
    blockAnimation: BlockAnimation | undefined
    elementAnimation: SkillAnimation | undefined 
    enemyAttackAnimation: AttackAnimation | undefined
    enemyBlockAnimation: BlockAnimation | undefined
    enemyElementAnimation: SkillAnimation | undefined
    coinIcon: CoinCount | undefined
    rewardBox: FirstRewardBox  | undefined
    nextDestinationBox: NextDestinationBox  | undefined
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
        this.load.image('shock-icon', '../../public/assets/icons/shock-icon.png')
        this.load.image('save-icon', '../../public/assets/icons/floppy.png')
        this.load.image('loading-icon', '../../public/assets/icons/loading-icon.png')
        this.load.image('coin-icon', '../../public/assets/icons/coin-icon.png')
    }

    create() {
        this.add.rectangle(500, 300, 1000, 600, 0x00ffff)
        this.add.rectangle(500, 375, 1000, 300, 0x40CF55)
        this.add.rectangle(500, 462.5, 1000, 275, 0x929292)

        this.player = new Player(this, 75, 6)
        
        if (this.key === 'FirstBattle') this.enemy = new Enemy(this, 50)
        
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
        this.player?.endTurn()
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

        this.savingIcon?.startSaveAnimation()

        const playerState: PlayerState = {
            maxHealth: this.player?.maxHealth,
            currentHealth: this.player?.currentHealth,
            sprite: this.player?.sprite,
            maxStamina: this.player?.maxStamina,
            attacks: this.player?.attacks,
            defends: this.player?.defends,
            skills: this.player?.skills,
            coinAmount: this.player?.coinAmount
        }

        const gameState = {key: this.key, playerState}
        console.log(gameState, gameState.playerState)
        localStorage.setItem('gameState', JSON.stringify(gameState))
    }

    loadGameState() {
        const savedState = localStorage.getItem('gameState')

        if (savedState) {
            const gameState = JSON.parse(savedState)
            console.log(gameState, gameState.playerState)
            this.player.maxHealth = gameState.playerState.maxHealth,
            this.player.currentHealth = gameState.playerState.currentHealth,
            this.player.sprite = gameState.playerState.sprite,
            this.player.maxStamina = gameState.playerState.maxStamina,
            this.player.attacks = gameState.playerState.attacks,
            this.player.defends = gameState.playerState.defends,
            this.player.skills = gameState.playerState.skills,
            this.player.coinAmount = gameState.playerState.coinAmount

            this.player.heal(0)
            this.player.changeStamina(0)
            this.coinIcon.animateCoinGain(this.player, gameState.playerState.coinAmount)
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

        this.skillButtonPanel?.skill1?.elementIcon.setVisible(false)
        this.skillButtonPanel?.skill2?.elementIcon.setVisible(false)
        this.skillButtonPanel?.skill3?.elementIcon.setVisible(false)

        this.defendButtonPanel?.defend1?.blockIcon.setVisible(false)
        this.defendButtonPanel?.defend2?.blockIcon.setVisible(false)
        this.defendButtonPanel?.defend3?.blockIcon.setVisible(false)

        this.attackButtonPanel?.attack1?.damageIcon.setVisible(false)
        this.attackButtonPanel?.attack2?.damageIcon.setVisible(false)
        this.attackButtonPanel?.attack3?.damageIcon.setVisible(false)
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