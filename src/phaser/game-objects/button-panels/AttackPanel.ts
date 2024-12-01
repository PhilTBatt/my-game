import AttackButton from "../buttons/AttackButton";
import BackButton from "../buttons/BackButton";
import BattleScreen from "../scenes/BattleScreen";

export default class AttackButtonPanel extends Phaser.GameObjects.Container {
    backButton: BackButton
    attack1: AttackButton | undefined = undefined
    attack2: AttackButton | undefined = undefined
    attack3: AttackButton | undefined = undefined
    
    constructor(scene: BattleScreen) {
        super(scene, 0, 0)
        
        this.backButton = new BackButton(scene, 266.67, 400, 0xF80000,  () => {
            this.setVisible(false)
            if(scene.buttonPanel) {
                scene.buttonPanel.setVisible(true)
            }
        })

        this.add(this.backButton)

        if (scene.player?.attacks) {
            scene.player.attacks.forEach((attack, index) => {
                if (index === 0 && attack) {
                    this.attack1 = new AttackButton(scene, 733.33, 400, `${attack.name}: ${attack.value}`)
                    this.add(this.attack1)
                }
                if (index === 1 && attack) {
                    this.attack2 = new AttackButton(scene, 266.67, 525, `${attack.name}: ${attack.value}`)
                    this.add(this.attack2)
                }
                if (index === 2 && attack) {
                    this.attack3 = new AttackButton(scene, 733.33, 525, `${attack.name}: ${attack.value}`)
                    this.add(this.attack3)
                }
            })
        }

        scene.add.existing(this)
        this.setVisible(false)
    }
}