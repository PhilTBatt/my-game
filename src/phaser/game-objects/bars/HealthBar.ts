import FirstBattle from "../../scenes/FirstBattle"
import Character from "../characters/DefaultCharacter"
import FireTooltip from "../tooltips/FireTooltip"
import FrostTooltip from "../tooltips/FrostTooltip"
import PoisonTooltip from "../tooltips/PoisonTooltip"
import ShockTooltip from "../tooltips/ShockTooltip"

export default class HealthBar extends Phaser.GameObjects.Container {
    maxHealth: number
    currentHealth: number
    healthBar: Phaser.GameObjects.Graphics
    healthText: Phaser.GameObjects.Text
    burnIcon: FireTooltip | undefined
    burnAmount:  Phaser.GameObjects.Text | undefined
    frostIcon: FrostTooltip | undefined
    frostAmount:  Phaser.GameObjects.Text | undefined
    poisonIcon: PoisonTooltip | undefined
    poisonAmount:  Phaser.GameObjects.Text | undefined
    shockIcon: ShockTooltip | undefined
    shockAmount:  Phaser.GameObjects.Text | undefined

    constructor(scene: FirstBattle, maxHealth: number, currentHealth: number) {
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

    updateHealth(scene: FirstBattle, character: Character, newHealth: number) {
        this.currentHealth = newHealth
        this.healthText.setText(`${this.currentHealth} / ${this.maxHealth}`)

        const healthPercentage = this.currentHealth / this.maxHealth
        this.healthBar.clear()
        this.healthBar.fillStyle(0x37FF00)

        if (healthPercentage * 250 < 20) {
            this.healthBar.fillRoundedRect(141.67, 45, 250 * healthPercentage, 35, 0)
        } else {
            this.healthBar.fillRoundedRect(141.67, 45, 250 * healthPercentage, 35, 20)
        }
        
        this.healthBar.lineStyle(5, 0x000000)
        this.healthBar.strokeRoundedRect(141.67, 45, 250, 35, 20)

        this.burnIcon?.destroy()
        this.frostIcon?.destroy()
        this.poisonIcon?.destroy()
        this.shockIcon?.destroy()

        this.updateStatusIcons(scene, character)
    }

    updateStatusIcons(scene: FirstBattle, character: Character) {
        this.burnIcon?.destroy()
        this.frostIcon?.destroy()
        this.poisonIcon?.destroy()
        this.shockIcon?.destroy()
        this.burnAmount?.destroy()
        this.frostAmount?.destroy()
        this.poisonAmount?.destroy()
        this.shockAmount?.destroy()
    
        let iconY = 105

        if ('coinAmount' in character) {
            if (character.burn > 0) {
                this.burnIcon = new FireTooltip(scene, 135, iconY, 160, iconY - 40)
                this.burnAmount = scene.add.text(85, iconY, `${character.burn}`, {fontSize: '25px', color: '#000', fontFamily: 'Arial', align: 'center'})
                this.burnAmount.setOrigin(0.5)
                iconY += 60
            }
            if (character.frost > 0) {
                this.frostIcon = new FrostTooltip(scene, 135, iconY, 160, iconY - 40)
                this.frostAmount = scene.add.text(85, iconY, `${character.frost}`, {fontSize: '35px', color: '#000', fontFamily: 'Arial', align: 'center'})
                this.frostAmount.setOrigin(0.5)
                iconY += 60
            }
            if (character.poison > 0) {
                this.poisonIcon = new PoisonTooltip(scene, 135, iconY, 175, iconY - 40)
                this.poisonAmount = scene.add.text(85, iconY, `${character.poison}`, {fontSize: '35px', color: '#000', fontFamily: 'Arial', align: 'center'})
                this.poisonAmount.setOrigin(0.5)
                iconY += 60
            }
            if (character.shock > 0) {
                this.shockIcon = new ShockTooltip(scene, 135, iconY, 160, iconY - 40)
                this.shockAmount = scene.add.text(85, iconY, `${character.shock}`, {fontSize: '35px', color: '#000', fontFamily: 'Arial', align: 'center'})
                this.shockAmount.setOrigin(0.5)
                iconY += 60
            }
        } else {
            if (character.burn > 0) {
                this.burnIcon = new FireTooltip(scene, 895, iconY, 850, 34 + iconY)
                this.burnAmount = scene.add.text(940, iconY, `${character.burn}`, {fontSize: '35px', color: '#000', fontFamily: 'Arial', align: 'center'})
                this.burnAmount.setOrigin(0.5)
                iconY += 60
            }
            if (character.frost > 0) {
                this.frostIcon = new FrostTooltip(scene, 895, iconY, 850, 34 + iconY)
                this.frostAmount = scene.add.text(940, iconY, `${character.frost}`, {fontSize: '35px', color: '#000', fontFamily: 'Arial', align: 'center'})
                this.frostAmount.setOrigin(0.5)
                iconY += 60
            }
            if (character.poison > 0) {
                this.poisonIcon = new PoisonTooltip(scene, 895, iconY, 850, 34 + iconY)
                this.poisonAmount = scene.add.text(940, iconY, `${character.poison}`, {fontSize: '35px', color: '#000', fontFamily: 'Arial', align: 'center'})
                this.poisonAmount.setOrigin(0.5)
                iconY += 60
            }
            if (character.shock > 0) {
                this.shockIcon = new ShockTooltip(scene, 895, iconY, 850, 34 + iconY)
                this.shockAmount = scene.add.text(940, iconY, `${character.shock}`, {fontSize: '35px', color: '#000', fontFamily: 'Arial', align: 'center'})
                this.shockAmount.setOrigin(0.5)
                iconY += 60
            }
        }
        
    }
}
