import BackButton from "../buttons/BackButton";
import BattleScreen from "../scenes/BattleScreen";

export default class DefendButtonPanel extends Phaser.GameObjects.Container {
    backButton: BackButton
    
    constructor(scene: BattleScreen) {
        super(scene, 200, 365)
        
        this.backButton = new BackButton(scene, 533.33, 20, 0x00FF00,  () => {
            this.setVisible(false)
            if(scene.buttonPanel) {
                scene.buttonPanel.setVisible(true)
            }
        })

        this.add(this.backButton)

        scene.add.existing(this)
        this.setVisible(false)
    }
}