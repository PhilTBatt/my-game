import Button from "../buttons/Button";
import BattleScreen from "../scenes/BattleScreen";

export default class DefaultButtonPanel extends Phaser.GameObjects.Container {
    attackButton: Button
    defendButton: Button
    itemsButton: Button
    statsButton: Button
    
    constructor(scene: BattleScreen) {
        super(scene, 200, 365)
        
        this.attackButton = new Button(scene, 66.67, 20, 400, 120, 'Attack', 0xE6E6E6, 0xF80000, '50px',  () => {
            this.setVisible(false)
            if(scene.attackButtonPanel) {
                scene.attackButtonPanel.setVisible(true)
            }
        })
        this.add(this.attackButton)

        this.defendButton = new Button(scene, 533.33, 20, 400, 120, 'Defend', 0xE6E6E6, 0x00FF00, '50px', () => this.setVisible(false))
        this.add(this.defendButton)

        this.itemsButton = new Button(scene, 66.67, 160, 400, 120, 'Items', 0xE6E6E6, 0x0000FF, '50px', () => this.setVisible(false))
        this.add(this.itemsButton)

        this.statsButton = new Button(scene, 533.33, 160, 400, 120, 'Stats', 0xE6E6E6, 0xFFFF00, '50px', () => this.setVisible(false))
        this.add(this.statsButton)

        scene.add.existing(this)
    }
}