import FirstBattle from "../../scenes/FirstBattle"
import Player from "../characters/Player"

export default class CoinCount extends Phaser.GameObjects.Container {
    coinBox: Phaser.GameObjects.Graphics
    coinIcon: Phaser.GameObjects.Image
    coinCount: Phaser.GameObjects.Text | undefined = undefined

    constructor(scene: FirstBattle) {
        super(scene, 0, 0)

        this.coinBox = scene.add.graphics()
        this.coinBox.lineStyle(4, 0x000000)
        this.coinBox.strokeRoundedRect(7, 50, 70, 40, 5)

        this.coinCount = scene.add.text(24, 70, '0', {fontSize: '35px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.coinCount.setOrigin(0.5)

        this.coinIcon = scene.add.image(this.coinCount.width * 2 + 15, 70, 'coin-icon').setScale(0.06).setOrigin(0.5)

        scene.add.existing(this)
    }

    animateCoinGain(player: Player, coinAmount: number) {
        player!.coinAmount += coinAmount/5
        
        this.coinBox?.setScale(1.06)
        this.coinIcon?.setScale(0.0636)
        this.coinCount?.setScale(1.06)
        this.coinCount!.setText(`${player.coinAmount}`)

        this.coinIcon.setPosition(this.coinCount!.width * 2 + 15, 70)
        this.coinBox.clear()
        this.coinBox.lineStyle(4, 0x000000)
        this.coinBox.strokeRoundedRect(this.coinCount!.width - 32, 50, 70, 40, 5)

        this.scene.time.delayedCall(275, () => {
            player!.coinAmount += coinAmount/5

            this.coinBox?.setScale(1.12)
            this.coinIcon?.setScale(0.0672)
            this.coinCount?.setScale(1.12)
            this.coinCount!.setText(`${player.coinAmount}`)

            this.coinIcon.setPosition(this.coinCount!.width * 2 + 15, 70)
            this.coinBox.clear()
            this.coinBox.lineStyle(4, 0x000000)
            this.coinBox.strokeRoundedRect(this.coinCount!.width - 32, 50, 70, 40, 5)
        })

        this.scene.time.delayedCall(550, () => {
            player!.coinAmount += coinAmount/5

            this.coinBox?.setScale(1.18)
            this.coinIcon?.setScale(0.0708)
            this.coinCount?.setScale(1.18)
            this.coinCount!.setText(`${player.coinAmount}`)

            this.coinIcon.setPosition(this.coinCount!.width * 2 + 15, 70)
            this.coinBox.clear()
            this.coinBox.lineStyle(4, 0x000000)
            this.coinBox.strokeRoundedRect(this.coinCount!.width - 32, 50, 70, 40, 5)
        })

        this.scene.time.delayedCall(825, () => {
            player!.coinAmount += coinAmount/5

            this.coinBox?.setScale(1.12)
            this.coinIcon?.setScale(0.0672)
            this.coinCount?.setScale(1.12)
            this.coinCount!.setText(`${player.coinAmount}`)

            this.coinIcon.setPosition(this.coinCount!.width * 2 + 15, 70)
            this.coinBox.clear()
            this.coinBox.lineStyle(4, 0x000000)
            this.coinBox.strokeRoundedRect(this.coinCount!.width - 32, 50, 70, 40, 5)
        })

        this.scene.time.delayedCall(1200, () => {
            player!.coinAmount += coinAmount/5

            this.coinBox?.setScale(1.06)
            this.coinIcon?.setScale(0.0636)
            this.coinCount?.setScale(1.06)
            this.coinCount!.setText(`${player.coinAmount}`)

            this.coinIcon.setPosition(this.coinCount!.width * 2 + 15, 70)
            this.coinBox.clear()
            this.coinBox.lineStyle(4, 0x000000)
            this.coinBox.strokeRoundedRect(this.coinCount!.width - 32 , 50, 70, 40, 5)
        })

        this.scene.time.delayedCall(1475, () => {
            this.coinBox?.setScale(1)
            this.coinIcon?.setScale(0.06)
            this.coinCount?.setScale(1)
            this.coinCount!.setText(`${player.coinAmount}`)

            this.coinIcon.setPosition(this.coinCount!.width * 2 + 15, 70)
            this.coinBox.clear()
            this.coinBox.lineStyle(4, 0x000000)
            this.coinBox.strokeRoundedRect(this.coinCount!.width - 32, 50, 70, 40, 5)
        })

    }
}
