import Button from "../buttons/Button";
import BattleScreen from "../scenes/BattleScreen";

export default class DefaultButtonPanel extends Phaser.GameObjects.Container {
    attackButton: Button
    defendButton: Button
    itemsButton: Button
    statsButton: Button
    
    constructor(scene: BattleScreen) {
        super(scene, 0, 0)
        
        this.attackButton = new Button(scene, 257, 398, 440, 103, 'Attack', 0xE6E6E6, 0xF80000, 10, '80px',  () => {
            this.setVisible(false)
            scene.attackButtonPanel?.setVisible(true)
        })
        this.add(this.attackButton)

        this.defendButton = new Button(scene, 743, 398, 440, 103, 'Defend', 0xE6E6E6, 0x003EF8, 10, '80px', () => {
            this.setVisible(false)
            scene.defendButtonPanel?.setVisible(true)
        })
        this.add(this.defendButton)

        this.itemsButton = new Button(scene, 257, 527, 440, 103, 'Items', 0xE6E6E6, 0x00FF00, 10, '80px', () => {
            this.setVisible(false)
            scene.itemButtonPanel?.setVisible(true)
        })
        this.add(this.itemsButton)

        this.statsButton = new Button(scene, 743, 527, 440, 105, 'Stats', 0xE6E6E6, 0xFFFF00, 10, '80px', () => {
            this.setVisible(false)
            scene.itemButtonPanel?.setVisible(true)
        })
        this.add(this.statsButton)

        scene.add.existing(this)
    }
}