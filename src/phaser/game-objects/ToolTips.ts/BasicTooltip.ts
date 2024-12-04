import Phaser from "phaser";

export default class Tooltip extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Graphics
    title: Phaser.GameObjects.Text
    text: Phaser.GameObjects.Text
    icon: Phaser.GameObjects.Image | undefined = undefined

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, titleText: string, tooltipText: string, iconName: string) {
        super(scene, x, y)
        
        this.background = scene.add.graphics()
        this.background.fillStyle(0x333333, 0.9)
        this.background.lineStyle(2, 0xFFFFFF, 1)
        this.background.fillRoundedRect(0, 0, width, height, 10)
        this.background.strokeRoundedRect(0, 0, width, height, 10)
        
        this.title = scene.add.text(10, 5, titleText, {fontSize: "20px", color: "#FFFFFF", fontFamily: "Arial",  wordWrap: {width: width - 20}})

        this.icon = scene.add.image(this.title.width + 30, 15, iconName).setScale(0.08).setOrigin(0.5)

        this.text = scene.add.text(width / 2 - 10, height / 2, tooltipText, {fontSize: "15px", color: "#FFFFFF", fontFamily: "Arial",  wordWrap: {width: width - 20}});
        this.text.setOrigin(0.5)

        this.add([this.background, this.title, this.icon, this.text])
    
        scene.add.existing(this)
    }
}
