import BackButton from "../buttons/BackButton";
import FirstBattle from "../../scenes/FirstBattle";

export default class ItemButtonPanel extends Phaser.GameObjects.Container {
    backButton: BackButton
    
    constructor(scene: FirstBattle) {
        super(scene, 0, 0)
        
        this.backButton = new BackButton(scene, 257, 527, 0x00FF00,  () => {
            this.setVisible(false)
            scene.buttonPanel?.setVisible(true)
        })

        this.add(this.backButton)

        scene.add.existing(this)
        this.setVisible(false)
    }
}