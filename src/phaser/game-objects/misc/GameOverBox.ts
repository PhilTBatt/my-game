import FirstBattle from "../../scenes/FirstBattle"
import Button from "../buttons/Button"

export default class GameOverBox extends Phaser.GameObjects.Container {
    homeScreenBox: Phaser.GameObjects.Graphics
    title: Phaser.GameObjects.Text | undefined
    homeScreenButton: Button | undefined

    constructor(scene: FirstBattle) {
        super(scene, 0, 0)

        this.homeScreenBox = scene.add.graphics()
        this.homeScreenBox.fillStyle(0xBD7B00)
        this.homeScreenBox.fillRoundedRect(200, 75, 600, 330)
        this.homeScreenBox.lineStyle(10, 0x000000)
        this.homeScreenBox.strokeRoundedRect(200, 75, 600, 330)

        scene.add.existing(this.homeScreenBox)

        this.title = scene.add.text(500, 125, 'Game Over', {fontSize: '40px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.title.setOrigin(0.5)
        scene.add.existing(this.title)

        this.homeScreenButton = new Button(scene, 500, 270, 250, 160, "Home", '#000000', 0xFCA400, 0x000000, 10, '40px', () => this.changeDestination(scene, 'IntroScreen'))
        scene.add.existing(this.homeScreenButton)
    }

    changeDestination (scene: FirstBattle, destination: string) {
        scene.time.delayedCall(500, () => {
            localStorage.removeItem("gameState")
            scene.scene.start(destination)
        })
    }
}
