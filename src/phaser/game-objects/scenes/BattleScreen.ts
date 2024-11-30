import Phaser from "phaser";
import DefaultButtonPanel from "../button-panels/DefaultButtonPanel";
import Player from "../characters/Player";
import Enemy from "../characters/DefaultEnemy";
import AttackButtonPanel from "../button-panels/AttackPanel";
import DefendButtonPanel from "../button-panels/DefendPanel";
import ItemButtonPanel from "../button-panels/ItemPanel";
import StatsButtonPanel from "../button-panels/StatsPanel";

class BattleScreen extends Phaser.Scene {
    buttonPanel: DefaultButtonPanel | undefined = undefined
    attackButtonPanel: AttackButtonPanel | undefined = undefined
    defendButtonPanel: DefendButtonPanel | undefined = undefined
    itemButtonPanel: ItemButtonPanel | undefined = undefined
    statsButtonPanel: StatsButtonPanel | undefined = undefined
    player: Player | undefined = undefined
    enemy: Enemy | undefined = undefined
    
    constructor() {
        super('BattleScreen')
    }

    preload() {
    }

    create() {
        this.add.rectangle(500, 300, 1000, 600, 0x00ffff)
        this.add.rectangle(500, 375, 1000, 300, 0x40CF55)
        this.add.rectangle(500, 462.5, 1000, 275, 0x929292)

        this.player = new Player(this, "Player", 100, 6)
        this.enemy = new Enemy(this, "Enemy", 50)

        this.buttonPanel = new DefaultButtonPanel(this)

        this.attackButtonPanel = new AttackButtonPanel(this)
        this.defendButtonPanel = new DefendButtonPanel(this)
        this.itemButtonPanel = new ItemButtonPanel(this)
        this.statsButtonPanel = new StatsButtonPanel(this)
    }

    update() {
    }

}

export default BattleScreen