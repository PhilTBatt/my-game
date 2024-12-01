import BackButton from "../buttons/BackButton";
import DefendButton from "../buttons/DefendButton";
import BattleScreen from "../scenes/BattleScreen";

export default class DefendButtonPanel extends Phaser.GameObjects.Container {
    backButton: BackButton
    defend1: DefendButton | undefined = undefined
    defend2: DefendButton | undefined = undefined
    defend3: DefendButton | undefined = undefined
    
    constructor(scene: BattleScreen) {
        super(scene, 0, 0)
        
        this.backButton = new BackButton(scene, 733.33, 400, 0x003EF8,  () => {
            this.setVisible(false)
            if(scene.buttonPanel) {
                scene.buttonPanel.setVisible(true)
            }
        })

        this.add(this.backButton)
        
        if (scene.player?.attacks) {
            scene.player.defends.forEach((defend, index) => {
                if (index === 0 && defend) {
                    this.defend1 = new DefendButton(scene, 266.67, 400, `${defend.name}: ${defend.value}`)
                    this.add(this.defend1)
                }
                if (index === 1 && defend) {
                    this.defend2 = new DefendButton(scene, 266.67, 525, `${defend.name}: ${defend.value}`)
                    this.add(this.defend2)
                }
                if (index === 2 && defend) {
                    this.defend3 = new DefendButton(scene, 733.33, 525, `${defend.name}: ${defend.value}`)
                    this.add(this.defend3)
                }
            })
        }

        scene.add.existing(this)
        this.setVisible(false)
    }
}