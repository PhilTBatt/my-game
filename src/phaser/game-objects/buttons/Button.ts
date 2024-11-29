export class Button extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, text: string, colour: number, borderColour: number, fontSize: string, onClick: () => void) {
    super(scene, x, y)
    
    const background = scene.add.graphics()
    background.fillStyle(colour)
    background.fillRoundedRect(-width / 2, -height / 2, width, height, 40)
    background.lineStyle(10, borderColour)
    background.strokeRoundedRect(-width / 2, -height / 2, width, height, 40)
    this.add(background)
    
    const buttonText = scene.add.text(0, 0, text, {fontSize, color: '#000', fontFamily: 'Arial', align: 'center'})
    buttonText.setOrigin(0.5)
    this.add(buttonText)
    
    this.setSize(width, height)
    this.setInteractive({ useHandCursor: true })
    
    this.on('pointerup', onClick)
      
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