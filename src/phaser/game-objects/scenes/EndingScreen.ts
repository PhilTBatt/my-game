import Phaser from "phaser";

class EndingScreen extends Phaser.Scene {

    preload() {
    }

    create() {
        const background = this.add.graphics()
        background.fillStyle(0x00ffff)
        background.fillRect(0, 0, 1000, 600)
        background.lineStyle(20, 0x000000)
        background.strokeRoundedRect(0, 0, 1000, 600)

        const introMessageBox = this.add.graphics()
        introMessageBox.fillStyle(0xBD7B00)
        introMessageBox.fillRoundedRect(200, 100, 600, 400)
        introMessageBox.lineStyle(10, 0x000000)
        introMessageBox.strokeRoundedRect(200, 100, 600, 400)

        this.add.text(500, 425, "You win/lose! Thanks for playing.", {
            fontSize: '30px',
            color: '#000',
            fontFamily: 'Arial',
            align: 'center',
            wordWrap: {width: 550}
        }).setOrigin(0.5, 0.5)

        const playButton = this.add.graphics()
        playButton.fillStyle(0xFCA400)
        playButton.fillRoundedRect(-150, -75, 300, 150, 60)
        playButton.lineStyle(10, 0x000000)
        playButton.strokeRoundedRect(-150, -75, 300, 150, 60)
        playButton.setPosition(500, 240)

        const playButtonArea = this.add.rectangle(500, 240, 300, 150, 0x000000, 0).setOrigin(0.5, 0.5)
        playButtonArea.setInteractive({ useHandCursor: true })

        const playButtonText = this.add.text(500, 240, "Restart!", {
            fontSize: '70px',
            color: '#000',
            fontFamily: 'Arial',
            align: 'center',
        }).setOrigin(0.5, 0.5)

        playButtonArea.on('pointerup', () => this.scene.start('BattleScreen'))
        playButtonArea.on('pointerover', () => {
            playButton.setScale(1.1)
            playButtonText.setScale(1.25)
            playButtonArea.setScale(1.05)
        })
        playButtonArea.on('pointerout', () => {
            playButton.setScale(1)
            playButtonText.setScale(1)
            playButtonArea.setScale(1)
        })
    }

    update() {
    }
}

export default EndingScreen