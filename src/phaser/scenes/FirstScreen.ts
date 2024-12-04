import Phaser from "phaser";
import Button from "../game-objects/buttons/Button";

class FirstScreen extends Phaser.Scene {
    constructor() {
        super('IntroScreen')
    }

    preload() {
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

        const playButton = new Button(this, 500, 240, 300, 150, "Play!", 0xFCA400, 0x000000, 10, '70px', () => this.scene.start('FirstBattle'))
    }

    update() {
    }

    loadGameState() {
        const savedState = localStorage.getItem('gameState')
        if (savedState) {
            const gameState = JSON.parse(savedState)
            this.scene.start(`${gameState.key}`)
        }
    }
}

export default FirstScreen