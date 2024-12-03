import FirstBattle from "../../scenes/FirstBattle"
import Button from "../buttons/Button"

export default class NextDestinationBox extends Phaser.GameObjects.Container {
    nextDestinationBox: Phaser.GameObjects.Graphics
    title: Phaser.GameObjects.Text | undefined = undefined
    nextDestination1: Button | undefined = undefined
    nextDestination2: Button | undefined = undefined

    constructor(scene: FirstBattle) {
        super(scene, 0, 0)

        this.nextDestinationBox = scene.add.graphics()
        this.nextDestinationBox.fillStyle(0xBD7B00)
        this.nextDestinationBox.fillRoundedRect(200, 100, 600, 400)
        this.nextDestinationBox.lineStyle(10, 0x000000)
        this.nextDestinationBox.strokeRoundedRect(200, 100, 600, 400)

        scene.add.existing(this.nextDestinationBox)

        this.title = scene.add.text(500, 150, 'Next Destination', {fontSize: '40px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.title.setOrigin(0.5)
        scene.add.existing(this.title)

        this.nextDestination1 = new Button(scene, 350, 350, 250, 150, "Reset", 0xFCA400, 0x000000, 10, '40px', () => {
            scene.time.delayedCall(500, () => {
                scene.scene.start('FirstScreen')
                
            })
        })
        scene.add.existing(this.nextDestination1)

        this.nextDestination2 = new Button(scene, 650, 350, 250, 150, "Battle", 0xFCA400, 0x000000, 10, '40px', () => {
            scene.time.delayedCall(500, () => {
                scene.scene.start('WorldOneBattle')
                
            })
        })
        scene.add.existing(this.nextDestination2)
    }
}
