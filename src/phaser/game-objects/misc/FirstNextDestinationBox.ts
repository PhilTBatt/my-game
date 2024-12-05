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
        this.nextDestinationBox.fillRoundedRect(200, 75, 600, 330)
        this.nextDestinationBox.lineStyle(10, 0x000000)
        this.nextDestinationBox.strokeRoundedRect(200, 75, 600, 330)

        scene.add.existing(this.nextDestinationBox)

        this.title = scene.add.text(500, 125, 'Next Destination', {fontSize: '40px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.title.setOrigin(0.5)
        scene.add.existing(this.title)

        this.nextDestination1 = new Button(scene, 350, 270, 250, 160, "Home", '#000000', 0xFCA400, 0x000000, 10, '40px', () => this.changeDestination(scene, 'IntroScreen'))
        scene.add.existing(this.nextDestination1)

        this.nextDestination2 = new Button(scene, 650, 270, 250, 160, "Battle", '#000000', 0xFCA400, 0x000000, 10, '40px', () => this.changeDestination(scene, 'WorldOneBattle'))
        scene.add.existing(this.nextDestination2)
    }

    changeDestination (scene: Phaser.Scene, destination: string) {
        scene.time.delayedCall(500, () => {
            scene.scene.start(destination)
        })
    }
}
