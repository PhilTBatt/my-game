import Phaser from "phaser";

export default class Tooltip extends Phaser.GameObjects.Container {
    borderShadow: Phaser.GameObjects.Graphics
    backgroundBorder: Phaser.GameObjects.Graphics
    background: Phaser.GameObjects.Graphics
    title: Phaser.GameObjects.Text
    text: Phaser.GameObjects.Text
    icon: Phaser.GameObjects.Image | undefined = undefined

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, titleText: string, tooltipText: string, iconName: string, colour: number) {
        super(scene, x, y)
        
        this.borderShadow = scene.add.graphics()
        this.borderShadow.lineStyle(8, 0x000000, 0.5)
        this.borderShadow.strokeRoundedRect(2, 2, width, height, 10)

        this.backgroundBorder = scene.add.graphics()
        this.backgroundBorder.lineStyle(7, 0x000000)
        this.backgroundBorder.strokeRoundedRect(0, 0, width, height, 10)

        this.background = scene.add.graphics()
        this.background.fillStyle(0x333333, 8)
        this.background.lineStyle(4, colour)
        this.background.fillRoundedRect(0, 0, width, height, 10)
        this.background.strokeRoundedRect(0, 0, width, height, 10)
        
        const titleBox = scene.add.graphics()
        titleBox.lineStyle(1, 0xFFFFFF, 0.5)
        titleBox.strokeRoundedRect(0, 0, width, 28, 10)
        
        this.title = scene.add.text(8, 3, titleText, {fontSize: "20px", color: `#${colour.toString(16)}`, fontFamily: "Arial",  wordWrap: {width: width - 20}})

        this.icon = scene.add.image(this.title.width + 25, 14, iconName).setScale(0.08).setOrigin(0.5)

        this.text = scene.add.text(width / 2 - 7, height / 2 + 13, tooltipText, {fontSize: "15px", color: "#FFFFFF", fontFamily: "Arial",  wordWrap: {width: width - 20}});
        this.text.setOrigin(0.5)

        this.add([this.borderShadow, this.backgroundBorder, this.background, this.title, this.icon, this.text, titleBox])
    
        scene.add.existing(this)
    }
}
