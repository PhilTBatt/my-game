import BackButton from "../buttons/BackButton";
import DefendButton from "../buttons/DefendButton";
import FirstBattle from "../../scenes/FirstBattle";

export default class DefendButtonPanel extends Phaser.GameObjects.Container {
    backButton: BackButton
    defend1: DefendButton | undefined = undefined
    defend2: DefendButton | undefined = undefined
    defend3: DefendButton | undefined = undefined
    
    constructor(scene: FirstBattle) {
        super(scene, 500, 138)
        
        this.backButton = new BackButton(scene, 243, 260, 0x003EF8,  () => {
            this.setVisible(false)
            scene.buttonPanel?.setVisible(true)
            scene.defendButtonPanel?.defend1?.blockIcon.setVisible(false)
            scene.defendButtonPanel?.defend1?.staminaIcon.setVisible(false)
            scene.defendButtonPanel?.defend2?.blockIcon.setVisible(false)
            scene.defendButtonPanel?.defend2?.staminaIcon.setVisible(false)
            scene.defendButtonPanel?.defend3?.blockIcon.setVisible(false)
            scene.defendButtonPanel?.defend3?.staminaIcon.setVisible(false)
        })

        this.add(this.backButton)
        
        if (scene.player?.defends) {
            scene.player.defends.forEach((defend, index) => {
                if (index === 0 && defend) {
                    this.defend1 = new DefendButton(scene, -243, 260, defend)
                    this.add(this.defend1)
                }
                if (index === 1 && defend) {
                    this.defend2 = new DefendButton(scene, -243, 389, defend)
                    this.add(this.defend2)
                }
                if (index === 2 && defend) {
                    this.defend3 = new DefendButton(scene, 243, 389, defend)
                    this.add(this.defend3)
                }
            })
        }

        this.setSize(1000, 276)
        scene.add.existing(this)
        this.setVisible(false)
    }

    disableButtons() {
        this.backButton.disableInteractive()
        this.defend1?.disableInteractive()
        this.defend2?.disableInteractive()
        this.defend3?.disableInteractive()
    }

    enableButtons() {
        this.backButton.setInteractive()
        this.defend1?.setInteractive()
        this.defend2?.setInteractive()
        this.defend3?.setInteractive()
    }

    resetPanel() {
        this.setVisible(false)

        this.defend1?.blockIcon.setVisible(false)
        this.defend2?.blockIcon.setVisible(false)
        this.defend3?.blockIcon.setVisible(false)
        this.defend1?.staminaIcon.setVisible(false)
        this.defend2?.staminaIcon.setVisible(false)
        this.defend3?.staminaIcon.setVisible(false)
    }
}
