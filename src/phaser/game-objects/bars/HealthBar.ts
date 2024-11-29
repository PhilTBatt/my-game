export default class HealthBar extends Phaser.GameObjects.Container {
    maxHealth: number
    currentHealth: number
    healthBar: Phaser.GameObjects.Graphics
    healthText: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y: number, maxHealth: number, currentHealth: number) {
        super(scene, x, y)
        this.maxHealth = maxHealth
        this.currentHealth = currentHealth

        this.healthBar = scene.add.graphics()
        this.healthBar.fillStyle(0x37FF00)
        this.healthBar.fillRoundedRect(175, 115, 200, 25, 20)
        this.healthBar.lineStyle(5, 0x000000)
        this.healthBar.strokeRoundedRect(175, 115, 200, 25, 20)

        this.healthText = scene.add.text(275, 128, `${this.currentHealth} / ${this.maxHealth}`, {fontSize: '25px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.healthText.setOrigin(0.5)

        this.add(this.healthBar)
        this.add(this.healthText)
        scene.add.existing(this)
    }

    updateHealth(newHealth: number) {
        this.currentHealth = newHealth
        this.healthText.setText(`${this.currentHealth} / ${this.maxHealth}`)

        const healthPercentage = this.currentHealth / this.maxHealth;
        this.healthBar.clear()
        this.healthBar.fillStyle(0x40CF55)
        this.healthBar.fillRoundedRect(-100, -25, 200 * healthPercentage, 100, 20)
        this.healthBar.lineStyle(10, 0x000000)
        this.healthBar.strokeRoundedRect(-100, -25, 200, 100, 20)
    }
}
