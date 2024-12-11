import Phaser from "phaser";
import Button from "../game-objects/buttons/Button";
import Player from "../game-objects/characters/Player";

class FirstScreen extends Phaser.Scene {
    playButton: Button | undefined = undefined
    loadButton: Button | undefined = undefined

    constructor() {
        super('IntroScreen')
    }

    preload() {
        this.load.image('save-icon', '../../public/assets/icons/save-icon.png')
    }

    create() {
        const background = this.add.graphics()
        background.fillStyle(0x00ffff)
        background.fillRoundedRect(0, 0, 1000, 600, 50)
        background.lineStyle(20, 0x000000)
        background.strokeRoundedRect(0, 0, 1000, 600, 50)

        const introMessageBox = this.add.graphics()
        introMessageBox.fillStyle(0xE7C078)
        introMessageBox.fillRoundedRect(200, 100, 600, 400)
        introMessageBox.lineStyle(10, 0x000000)
        introMessageBox.strokeRoundedRect(200, 100, 600, 400)

        this.add.text(500, 425, "Welcome to my game! It’s a simple turn based game made using Vite, React, Typescript and Phaser.", {
            fontSize: '30px',
            color: '#000',
            fontFamily: 'Arial',
            align: 'center',
            wordWrap: {width: 550}
        }).setOrigin(0.5, 0.5)

        this.playButton = new Button(this, 500, 240, 300, 150, "Play!", '#000000', 0xFCA400, 0x000000, 10, '70px', () => this.scene.start('FirstBattle'))
        this.add.existing(this.playButton)

        this.loadButton = new Button(this, 500, 547, 200, 56, "Load Game", '#FFFFFF', 0x686868, 0x000000, 6, '30px', () => this.loadGameState())
        this.add.existing(this.loadButton)

        const saveIcon1 = this.add.image(360, 547, 'save-icon').setScale(0.05).setOrigin(0.5)
        this.add.existing(saveIcon1)

        const saveIcon2 = this.add.image(640, 547, 'save-icon').setScale(0.05).setOrigin(0.5)
        this.add.existing(saveIcon2)
    }

    update() {
    }

    loadGameState() {
        const savedState = localStorage.getItem('gameState')
        if (!savedState) {
            return
        } else {
            const gameState = JSON.parse(savedState)
            const sceneInstance = this.scene.get(gameState.key)
            const player = Player.fromState(sceneInstance, gameState.playerState)

            this.scene.start(gameState.key, {player})
        }
    }
}

export default FirstScreen