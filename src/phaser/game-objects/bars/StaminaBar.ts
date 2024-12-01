export default class StaminaBar extends Phaser.GameObjects.Container {
    maxStamina: number
    currentstamina: number
    staminaBar: Phaser.GameObjects.Graphics
    staminaText: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, maxstamina: number, currentstamina: number) {
        super(scene, 0, 0)
        this.maxStamina = maxstamina
        this.currentstamina = currentstamina

        this.staminaBar = scene.add.graphics()
        this.staminaBar.fillStyle(0xFFD11B)
        this.staminaBar.fillRoundedRect(179.17, 95, 175, 25, 15)
        this.staminaBar.lineStyle(4, 0x000000)
        this.staminaBar.strokeRoundedRect(179.17, 95, 175, 25, 20)

        this.staminaText = scene.add.text(266.67, 108, `${this.currentstamina} / ${this.maxStamina}`, {fontSize: '24px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.staminaText.setOrigin(0.5)

        this.add(this.staminaBar)
        this.add(this.staminaText)
        scene.add.existing(this)
    }

    updateStamina(newstamina: number) {
        this.currentstamina = newstamina
        this.staminaText.setText(`${this.currentstamina} / ${this.maxStamina}`)

        const staminaPercentage = this.currentstamina / this.maxStamina;
        this.staminaBar.clear()
        this.staminaBar.fillStyle(0xFFD11B)
        this.staminaBar.lineStyle(4, 0x000000)
        this.staminaBar.strokeRoundedRect(179.17, 95, 175, 25, 15)

        if (staminaPercentage * 250 < 20) {
            this.staminaBar.fillRoundedRect(141.67, 45, 250 * staminaPercentage, 25, 0)
        } else {
            this.staminaBar.fillRoundedRect(141.67, 45, 250 * staminaPercentage, 25, 15)
        }
    }
}
