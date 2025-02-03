import FirstBattle from "../../scenes/FirstBattle"
import Player from "../characters/Player"

export default class CoinCount extends Phaser.GameObjects.Container {
    coinIcon: Phaser.GameObjects.Image
    coinCount: Phaser.GameObjects.Text | undefined

    constructor(scene: FirstBattle, amount: number) {
        super(scene, 0, 0)

        this.coinCount = scene.add.text(24, 70, `${amount}`, {fontSize: '35px', color: '#000', fontFamily: 'Arial', align: 'center'})
        this.coinCount.setOrigin(0.5)

        this.coinIcon = scene.add.image(this.coinCount.width * 0.65 + 45, 70, 'coin-icon').setScale(0.06).setOrigin(0.5)

        scene.add.existing(this)
    }

    animateCoinGain(player: Player, coinAmount: number) {
        this.scene.tweens.add({targets: this.coinIcon, scale: 0.08, duration: 350, repeat: 4, ease: 'Linear'})

        this.scene.time.delayedCall(350, () => this.updateCoinAmount(player, coinAmount))
        this.scene.time.delayedCall(700, () => this.updateCoinAmount(player, coinAmount))
        this.scene.time.delayedCall(1050, () => this.updateCoinAmount(player, coinAmount))
        this.scene.time.delayedCall(1400, () => this.updateCoinAmount(player, coinAmount))
    }

    private updateCoinAmount(player: Player, coinAmount: number) {
        player!.coinAmount += coinAmount/4
        this.coinCount!.setText(`${player.coinAmount}`)
        this.coinIcon.setPosition(this.coinCount!.width * 0.65 + 45, 70)
    }
}
