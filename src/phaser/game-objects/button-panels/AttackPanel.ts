import BackButton from "../buttons/BackButton";
import BattleScreen from "../scenes/BattleScreen";

export default class AttackButtonPanel extends Phaser.GameObjects.Container {
    backButton: BackButton
    
    constructor(scene: BattleScreen) {
        super(scene, 200, 365)
        
        this.backButton = new BackButton(scene, 66.67, 20, 0xF80000,  () => {
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