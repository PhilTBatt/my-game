import { Action } from "../../types"
import StaminaBar from "../bars/StaminaBar"
import BattleScreen from "../../scenes/BattleScreen"
import Character from "./DefaultCharacter"

export default class Player extends Character {
    maxStamina: number
    currentStamina: number
    sprite: Phaser.GameObjects.Graphics
    staminaBar: StaminaBar
    attacks: [Action, Action?, Action?]
    defends: [Action, Action?, Action?]

    constructor(scene: BattleScreen, maxHealth: number, maxStamina: number) {
        super(scene, maxHealth)
        this.maxStamina = maxStamina
        this.currentStamina = maxStamina

        this.sprite = scene.add.graphics()
        this.sprite.fillStyle(0x6F00FF, 1)
        this.sprite.fillCircle(266.67, 200, 60)
        this.sprite.lineStyle(5, 0x000000)
        this.sprite.strokeCircle(266.67, 200, 60)
        scene.add.existing(this.sprite)

        this.staminaBar = new StaminaBar(scene, maxStamina, this.currentStamina)
        scene.add.existing(this.staminaBar)

        this.attacks = [{name: 'Strike', action: 'Attack', value: 8, stamina: 3}]

        this.defends = [{name: 'Block', action: 'Block', value: 5, stamina: 2}]

        scene.add.existing(this)
    }

    changeStamina(amount: number) {
        console.log('Player block called')
        this.currentStamina = Phaser.Math.Clamp(this.currentStamina + amount, 0, this.maxStamina)
        this.staminaBar.updateStamina(this.currentStamina)
    }
}
