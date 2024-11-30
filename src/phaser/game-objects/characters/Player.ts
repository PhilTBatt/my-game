import StaminaBar from "../bars/StaminaBar"
import Character from "./DefaultCharacter"

export default class Player extends Character {
    maxStamina: number
    currentStamina: number
    sprite: Phaser.GameObjects.Graphics
    staminBar: StaminaBar

    constructor(scene: Phaser.Scene, name: string, maxHealth: number, maxStamina: number) {
        super(scene, name, maxHealth)
        this.maxStamina = maxStamina
        this.currentStamina = maxStamina

        this.sprite = scene.add.graphics()
        this.sprite.fillStyle(0x6F00FF, 1)
        this.sprite.fillCircle(275, 185, 50)
        this.sprite.lineStyle(5, 0x000000)
        this.sprite.strokeCircle(275, 185, 50)
        scene.add.existing(this.sprite)

        this.staminBar = new StaminaBar(scene, 0, -75, maxStamina, this.currentStamina)
        scene.add.existing(this.staminBar)
    }

    changeStamina(amount: number) {
        this.currentStamina = Phaser.Math.Clamp(this.currentStamina + amount, 0, this.maxStamina)
    }
}
