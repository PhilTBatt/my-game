import Phaser from "phaser";

export default class Tooltip extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Graphics
    title: Phaser.GameObjects.Text
    text: Phaser.GameObjects.Text
    icon: Phaser.GameObjects.Image | undefined = undefined

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, titleText: string, tooltipText: string, iconName: string, colour: number) {
        super(scene, x, y)
        
        this.background = scene.add.graphics()
        this.background.fillStyle(0x333333, 8)
        this.background.lineStyle(3, colour)
        this.background.fillRoundedRect(0, 0, width, height, 10)
        this.background.strokeRoundedRect(0, 0, width, height, 10)
        
        const titleBox = scene.add.graphics()
        titleBox.lineStyle(1, 0xFFFFFF, 0.5)
        titleBox.strokeRoundedRect(0, 0, width, 28, 10)
        
        this.title = scene.add.text(8, 3, titleText, {fontSize: "20px", color: `#${colour}`, fontFamily: "Arial",  wordWrap: {width: width - 20}})

        this.icon = scene.add.image(this.title.width + 25, 14, iconName).setScale(0.08).setOrigin(0.5)

        this.text = scene.add.text(width / 2 - 7, height / 2 + 13, tooltipText, {fontSize: "15px", color: "#FFFFFF", fontFamily: "Arial",  wordWrap: {width: width - 20}});
        this.text.setOrigin(0.5)

        this.add([this.background, this.title, this.icon, this.text, titleBox])
    
        scene.add.existing(this)
    }
}
