export default class StaminaBar extends Phaser.GameObjects.Container {
    maxStamina: number
    currentstamina: number
    staminaBar: Phaser.GameObjects.Graphics
    staminaText: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y: number, maxstamina: number, currentstamina: number) {
        super(scene, x, y)
        this.maxStamina = maxstamina
        this.currentstamina = currentstamina

        this.staminaBar = scene.add.graphics()
        this.staminaBar.fillStyle(0xFFD11B)
        this.staminaBar.fillRoundedRect(195, 155, 165, 18, 18)
        this.staminaBar.lineStyle(5, 0x000000)
        this.staminaBar.strokeRoundedRect(195, 155, 165, 18, 15)

        this.staminaText = scene.add.text(275, 165, `${this.currentstamina} / ${this.maxStamina}`, {fontSize: '15px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.staminaText.setOrigin(0.5)

        this.add(this.staminaBar)
        this.add(this.staminaText)
        scene.add.existing(this)
    }

    updatestamina(newstamina: number) {
        this.currentstamina = newstamina
        this.staminaText.setText(`${this.currentstamina} / ${this.maxStamina}`)

        const staminaPercentage = this.currentstamina / this.maxStamina;
        this.staminaBar.clear()
        this.staminaBar.fillStyle(0x40CF55)
        this.staminaBar.fillRoundedRect(-100, -25, 200 * staminaPercentage, 100, 20)
        this.staminaBar.lineStyle(10, 0x000000)
        this.staminaBar.strokeRoundedRect(-100, -25, 200, 100, 20)
    }
}
