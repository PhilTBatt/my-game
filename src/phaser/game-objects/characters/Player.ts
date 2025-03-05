import { Action, PlayerState } from "../../types"
import StaminaBar from "../bars/StaminaBar"
import FirstBattle from "../../scenes/FirstBattle"
import Character from "./DefaultCharacter"

export default class Player extends Character {
    sprite: Phaser.GameObjects.Image | undefined
    maxStamina: number
    currentStamina: number
    staminaBar: StaminaBar
    attacks: [Action, Action?, Action?] = [{name: 'Strike', action: 'Attack', value: 5, stamina: 2}]
    defends: [Action, Action?, Action?] = [{name: 'Block', action: 'Block', value: 4, stamina: 2}]
    skills: [Action?, Action?, Action?] | undefined = [{name: 'Burn', action: 'Burn', value: 2, stamina: 4}]
    coinAmount: number = 0
    eventCount = 0

    constructor(scene: FirstBattle, maxHealth: number, maxStamina: number, currentHealth: number = maxHealth) {
        super(scene, maxHealth)
        this.maxStamina = maxStamina
        this.currentStamina = maxStamina
        this.currentHealth = currentHealth

        this.sprite  = scene.add.image(266.67, 200, 'player-icon').setScale(0.45).setOrigin(0.5)
        scene.add.existing(this.sprite)

        this.staminaBar = new StaminaBar(scene, maxStamina, this.currentStamina)
        scene.add.existing(this.staminaBar)

        scene.add.existing(this)
    }

    changeStamina(amount: number) {
        this.currentStamina = Phaser.Math.Clamp(this.currentStamina + amount, 0, this.maxStamina)
        this.staminaBar.updateStamina(this.currentStamina)
    }

    static fromState(scene: FirstBattle, state: PlayerState) {
        const player = new Player(scene, state.maxHealth, state.maxStamina, state.currentHealth)
        player.currentHealth = state.currentHealth
        player.attacks = state.attacks
        player.defends = state.defends
        player.skills = state.skills
        player.coinAmount = state.coinAmount
        player.eventCount = state.eventCount
    
        return player
    }

    serialise(): PlayerState {
        return {
            maxHealth: this.maxHealth,
            currentHealth: this.currentHealth,
            maxStamina: this.maxStamina,
            attacks: this.attacks,
            defends: this.defends,
            skills: this.skills,
            coinAmount: this.coinAmount,
            eventCount: this.eventCount
        }
    }
}
