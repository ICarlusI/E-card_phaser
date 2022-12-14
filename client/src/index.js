import Phaser from "phaser";
import Game from "./scenes/game"
import Menu from "./scenes/menu"


const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 1280,
    height: 780,
    scene: [
        Menu,Game, 
    ]
};

const game = new Phaser.Game(config);