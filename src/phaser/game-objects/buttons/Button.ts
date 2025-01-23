export default class Button extends Phaser.GameObjects.Container {
  cooldownActive: boolean = false
  background: Phaser.GameObjects.Graphics
  buttonText: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, text: string, textColour: string, colour: number, borderColour: number, borderWidth: number, fontSize: string, onClick: () => void) {
    super(scene, x, y)
    
    this.background = scene.add.graphics()
    this.background.fillStyle(colour)
    this.background.lineStyle(borderWidth, borderColour)

    if (width < 40 || height < 40) {
      this.background.fillRoundedRect(-width / 2, -height / 2, width, height, 10)
      this.background.strokeRoundedRect(-width / 2, -height / 2, width, height, 15)
    } else {
      this.background.fillRoundedRect(-width / 2, -height / 2, width, height, 30)
      this.background.strokeRoundedRect(-width / 2, -height / 2, width, height, 35)
    }

    this.add(this.background)s
    
    this.buttonText = scene.add.text(0, 0, text, {fontSize, color: textColour, fontFamily: 'Arial', align: 'center'})
    this.buttonText.setOrigin(0.5)
    this.add(this.buttonText)
    
    this.setSize(width, height)
    this.setInteractive({useHandCursor: true})
    
    scene.add.existing(this)

    this.on('pointerup', () => {
      if (this.cooldownActive) return
      this.cooldownActive = true
      onClick()
  
      scene.time.delayedCall(1000, () => {
        this.cooldownActive = false
      })
    })
      
    this.on('pointerover', () => {
      this.background.setScale(1.1)
      this.buttonText.setScale(1.25)
    })
      
    this.on('pointerout', () => {
      this.background.setScale(1)
      this.buttonText.setScale(1)
    })
  }
}