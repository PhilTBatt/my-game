import BackButton from "../buttons/BackButton";
import FirstBattle from "../../scenes/FirstBattle";

export default class StatsButtonPanel extends Phaser.GameObjects.Container {
    backButton: BackButton 
    
    constructor(scene: FirstBattle) {
        super(scene, 0, 0)
        
        this.backButton = new BackButton(scene, 743, 527, 0xFFFF00,  () => {
            this.setVisible(false)
            scene.buttonPanel?.setVisible(true)
        })

        this.add(this.backButton)

        this.setSize(1000, 275)
        scene.add.existing(this)
        this.setVisible(false)
    }

    disableButtons() {
        this.backButton.disableInteractive()
    }

    enableButtons() {
        this.backButton.setInteractive()
    }
}