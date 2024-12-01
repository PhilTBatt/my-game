export default class HealthBar extends Phaser.GameObjects.Container {
    maxHealth: number
    currentHealth: number
    healthBar: Phaser.GameObjects.Graphics
    healthText: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, maxHealth: number, currentHealth: number) {
        super(scene, 0, 0)
        this.maxHealth = maxHealth
        this.currentHealth = currentHealth

        this.healthBar = scene.add.graphics()
        this.healthBar.fillStyle(0x37FF00)
        this.healthBar.fillRoundedRect(141.67, 45, 250, 35, 20)
        this.healthBar.lineStyle(5, 0x000000)
        this.healthBar.strokeRoundedRect(141.67, 45, 250, 35, 20)

        this.healthText = scene.add.text(266.67, 63, `${this.currentHealth} / ${this.maxHealth}`, {fontSize: '33px', color: '#000', fontFamily: 'Arial', align: 'center'})
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
