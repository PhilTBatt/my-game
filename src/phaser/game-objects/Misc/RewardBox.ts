import FirstBattle from "../../scenes/FirstBattle"
import Button from "../buttons/Button"

export default class RewardBox extends Phaser.GameObjects.Container {
    rewardBox: Phaser.GameObjects.Graphics
    title: Phaser.GameObjects.Text | undefined = undefined
    reward1: Button | undefined = undefined
    reward2: Button | undefined = undefined

    constructor(scene: FirstBattle) {
        super(scene, 0, 0)

        this.rewardBox = scene.add.graphics()
        this.rewardBox.fillStyle(0xBD7B00)
        this.rewardBox.fillRoundedRect(200, 75, 600, 330)
        this.rewardBox.lineStyle(10, 0x000000)
        this.rewardBox.strokeRoundedRect(200, 75, 600, 330)

        scene.add.existing(this.rewardBox)

        this.title = scene.add.text(500, 125, 'Rewards', {fontSize: '40px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.title.setOrigin(0.5)
        scene.add.existing(this.title)

        this.reward1 = new Button(scene, 350, 270, 250, 160, "Reward 1", 0xFCA400, 0x000000, 10, '40px', () => {
            scene.time.delayedCall(500, () => {
                this.setVisible(false)
                scene.showNextDestinations
                
            })
        })
        scene.add.existing(this.reward1)

        this.reward2 = new Button(scene, 650, 270, 250, 160, "Reward 2", 0xFCA400, 0x000000, 10, '40px', () => {
            scene.time.delayedCall(500, () => {
                this.setVisible(false)
                scene.showNextDestinations
                
            })
        })
        scene.add.existing(this.reward2)
    }
}
