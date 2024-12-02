import BackButton from "../buttons/BackButton";
import BattleScreen from "../../scenes/BattleScreen";

export default class StatsButtonPanel extends Phaser.GameObjects.Container {
    backButton: BackButton
    
    constructor(scene: BattleScreen) {
        super(scene, 0, 0)
        
        this.backButton = new BackButton(scene, 743, 527, 0xFFFF00,  () => {
            this.setVisible(false)
            scene.buttonPanel?.setVisible(true)
        })

        this.add(this.backButton)

        scene.add.existing(this)
        this.setVisible(false)
    }
}