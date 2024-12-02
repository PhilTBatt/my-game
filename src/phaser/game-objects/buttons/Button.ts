export default class Button extends Phaser.GameObjects.Container {
  cooldownActive: boolean = false

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, text: string, colour: number, borderColour: number, borderWidth: number, fontSize: string, onClick: () => void) {
    super(scene, x, y)
    
    const background = scene.add.graphics()
    background.fillStyle(colour)
    background.fillRoundedRect(-width / 2, -height / 2, width, height, 30)
    background.lineStyle(borderWidth, borderColour)
    background.strokeRoundedRect(-width / 2, -height / 2, width, height, 35)
    this.add(background)
    
    const buttonText = scene.add.text(0, 0, text, {fontSize, color: '#000', fontFamily: 'Arial', align: 'center'})
    buttonText.setOrigin(0.5)
    this.add(buttonText)
    
    this.setSize(width, height)
    this.setInteractive({ useHandCursor: true })
    
    this.on('pointerup', () => {
      if (this.cooldownActive) return
      this.cooldownActive = true
      onClick()
  
      scene.time.delayedCall(1000, () => {
        this.cooldownActive = false
      })
    })
      
    this.on('pointerover', () => {
      background.setScale(1.1)
      buttonText.setScale(1.25)
    })
      
    this.on('pointerout', () => {
      background.setScale(1)
      buttonText.setScale(1)
    })

    scene.add.existing(this)
  }
    
  }