import Character from "./DefaultCharacter"

export default class Player extends Character {
    maxStamina: number
    currentStamina: number
    sprite: Phaser.GameObjects.Graphics

    constructor(scene: Phaser.Scene, name: string, maxHealth: number, maxStamina: number) {
        super(scene, name, maxHealth)
        this.maxStamina = maxStamina
        this.currentStamina = maxStamina

        this.sprite = scene.add.graphics()
        this.sprite.fillStyle(0x6F00FF, 1)
        this.sprite.fillCircle(275, 150, 50)
        this.sprite.lineStyle(5, 0x000000)
        this.sprite.strokeCircle(275, 150, 50)
        scene.add.existing(this.sprite)
    }

    useStamina(amount: number) {
        this.currentStamina = Math.max(this.currentStamina - amount, 0)
    }

    regenerateStamina(amount: number) {
        this.currentStamina = Math.min(this.maxStamina, this.currentStamina + amount)
    }
}
