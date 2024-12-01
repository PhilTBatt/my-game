import Phaser from "phaser";
import DefaultButtonPanel from "../button-panels/DefaultButtonPanel";
import Player from "../characters/Player";
import Enemy from "../characters/DefaultEnemy";
import AttackButtonPanel from "../button-panels/AttackPanel";
import DefendButtonPanel from "../button-panels/DefendPanel";
import ItemButtonPanel from "../button-panels/ItemPanel";
import StatsButtonPanel from "../button-panels/StatsPanel";
import Button from "../buttons/Button";

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

        this.player = new Player(this, 100, 6)
        this.enemy = new Enemy(this, 50)

        this.buttonPanel = new DefaultButtonPanel(this)

        this.attackButtonPanel = new AttackButtonPanel(this)
        this.defendButtonPanel = new DefendButtonPanel(this)
        this.itemButtonPanel = new ItemButtonPanel(this)
        this.statsButtonPanel = new StatsButtonPanel(this)

        const endTurnButton = new Button(this, 925, 290, 110, 45, "End Turn", 0xFCA400, 0x000000, '20px', () => this.endTurn())
    }

    update() {
    }

    endTurn() {
        this.enemy?.useTurn()
        this.player?.changeStamina(-this.player?.currentStamina + this.player?.maxStamina)
    }

}

export default BattleScreen