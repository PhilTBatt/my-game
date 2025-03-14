import FirstBattle from "../../scenes/FirstBattle"
import { Action } from "../../types"
import Button from "../buttons/Button"
import SkillButton from "../buttons/SkillButton"

export default class FirstRewardBox extends Phaser.GameObjects.Container {
    rewardBox: Phaser.GameObjects.Graphics
    title: Phaser.GameObjects.Text | undefined
    reward1: SkillButton | undefined
    reward2: SkillButton | undefined
    reward1InteractiveBox: Button
    reward2InteractiveBox: Button

    constructor(scene: FirstBattle) {
        super(scene, 0, 0)
        
        this.rewardBox = scene.add.graphics()
        this.rewardBox.fillStyle(0xFCA400)
        this.rewardBox.fillRoundedRect(200, 95, 600, 385)
        this.rewardBox.lineStyle(10, 0x000000)
        this.rewardBox.strokeRoundedRect(200, 95, 600, 385)
        scene.add.existing(this.rewardBox)
        
        const textOutline = scene.add.graphics().setDepth(100)
        textOutline.lineStyle(5, 0x000000)
        textOutline.strokeRoundedRect(330, 110, 340, 60)
        scene.add.existing(textOutline)

        this.title = scene.add.text(500, 140, 'Choose a reward!', {fontSize: '40px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.title.setOrigin(0.5)
        scene.add.existing(this.title)
        
        const rewardItem1 = {action: 'Shock', name: 'Shock', value: 1, stamina: 2}
        this.reward1 = new SkillButton(scene, 500, 250, rewardItem1)
        this.reward1.setDepth(101)
        this.reward1.elementIcon.setDepth(103).setVisible(true).setPosition(-500, -136)
        this.reward1.staminaIcon.setDepth(103).setVisible(true).setPosition(-500, -136)
        this.reward1.background.setDepth(101)
        this.reward1.disableInteractive()
        
        const rewardItem2 = {action: 'Frost', name: 'Frost', value: 3, stamina: 5}
        this.reward2 = new SkillButton(scene, 500, 390, rewardItem2)
        this.reward2.elementIcon.setDepth(103).setVisible(true).setPosition(-500, -136)
        this.reward2.staminaIcon.setDepth(103).setVisible(true).setPosition(-500, -136)
        this.reward2.disableInteractive()

        scene.add.existing(this)
        
        this.reward1InteractiveBox = new Button(scene, 500, 250, 440, 103, '', '#000000', 0xE6E6E6, 0xE6E6E6, 10, '50px', () => {
            this.getReward(scene, rewardItem1)
            scene.time.delayedCall(750, () => {
                this.reward1?.elementIcon.setVisible(false)
                this.reward1?.staminaIcon.setVisible(false)
                this.reward2?.elementIcon.setVisible(false)
                this.reward2?.staminaIcon.setVisible(false)
            })
        })
        this.reward1InteractiveBox.setAlpha(0.0001).setDepth(102)
        
        this.reward2InteractiveBox = new Button(scene, 500, 390, 440, 103, '', '#000000', 0xE6E6E6, 0xE6E6E6, 10, '50px', () => {
            this.getReward(scene, rewardItem2)
            scene.time.delayedCall(750, () => {
                this.reward1?.elementIcon.setVisible(false)
                this.reward1?.staminaIcon.setVisible(false)
                this.reward2?.elementIcon.setVisible(false)
                this.reward2?.staminaIcon.setVisible(false)
            })
            
        })
        this.reward2InteractiveBox.setAlpha(0.0001).setDepth(102)

        this.reward1InteractiveBox.on('pointerover', () => {
            this.reward1?.setScale(1.1)
            this.reward1?.elementIcon.setScale(1.1).setPosition(-600, -175)
            this.reward1?.staminaIcon.setScale(1.1).setPosition(-600, -175)
        })
            
        this.reward1InteractiveBox.on('pointerout', () => {
            this.reward1?.setScale(1)
            this.reward1?.elementIcon.setScale(1).setPosition(-500, -136)
            this.reward1?.staminaIcon.setScale(1).setPosition(-500, -136)
        })

        this.reward2InteractiveBox.on('pointerover', () => {
            this.reward2?.setScale(1.1)
            this.reward2?.elementIcon.setScale(1.1).setPosition(-600, -189)
            this.reward2?.staminaIcon.setScale(1.1).setPosition(-600, -189)
            
        })
            
        this.reward2InteractiveBox.on('pointerout', () => {
            this.reward2?.setScale(1)
            this.reward2?.elementIcon.setScale(1).setPosition(-500, -136)
            this.reward2?.staminaIcon.setScale(1).setPosition(-500, -136)
        })
    }

    getReward(scene: FirstBattle, reward: Action) {
        scene.time.delayedCall(500, () => {
            this.reward1InteractiveBox.setInteractive(false)
            this.reward2InteractiveBox.setInteractive(false)
            this.reward1InteractiveBox.setAlpha(0.5)
            this.reward2InteractiveBox.setAlpha(0.5)

            scene.player?.skills?.push(reward)

            scene.time.delayedCall(250, () => {
                this.setVisible(false)
                this.rewardBox.setVisible(false)
                this.title?.setVisible(false)
                this.reward1?.setVisible(false)
                this.reward2?.setVisible(false)
                this.reward1InteractiveBox.setVisible(false)
                this.reward2InteractiveBox.setVisible(false)

                scene.showNextDestinations()
            })
        })
    }
}