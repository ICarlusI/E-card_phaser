import io from 'socket.io-client';
import Card from '../helpers/card';
import Dealer from "../helpers/dealer";
import Zone from '../helpers/zone';
import Systeme from '../helpers/systeme';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('king', 'src/assets/King.jpg');
        this.load.image('yugi', 'src/assets/yugi.png');
        this.load.image('citizen', 'src/assets/citizen.jpg');
        this.load.image('slave', 'src/assets/slave.jpg');
        this.load.image('yugi2', 'src/assets/yugi.png');
        this.load.image('fond2', 'src/assets/deal.png');

    }

    create() {
        this.add.image(500, 400, 'fond2');
        this.isPlayerA = false;
        this.opponentCards = [];

        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

        this.dealer = new Dealer(this);

        this.Systeme = new Systeme(this);

        let self = this;

        this.socket = io('http://localhost:3000');

        this.socket.on('connect', function () {
            console.log('Connected!');
        });

        this.socket.on('isPlayerA', function () {
            self.isPlayerA = true;
        })

        this.socket.on('dealCards', function () {
            self.dealer.dealCards();
            self.dealText.disableInteractive();
            
        })

        this.socket.on('Systeme', function () {
            self.Systeme.calcul();
            self.playText.disableInteractive();
            
        })

        this.socket.on('cardPlayed', function (gameObject, isPlayerA) {
            if (isPlayerA !== self.isPlayerA) {
                let sprite = gameObject.opponentSprite;
                self.opponentCards.shift().destroy();
                self.dropZone.data.values.cards++;
                let card = new Card(self);
                card.render(((self.dropZone.x - 350) + (self.dropZone.data.values.cards * 50)), (self.dropZone.y), sprite).disableInteractive();
            }
        })

        this.dealText = this.add.text(75, 350, ['Start E-CARD']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        this.playText = this.add.text(1100, 350, ['VALIDER']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
        
        this.dealText.on('pointerdown', function () {
            self.socket.emit("dealCards");
        })

        this.playText.on('pointerdown', function () {
            self.socket.emit("Systeme");
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })


        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

    
        this.input.on('drop', function (pointer, gameObject, dropZone) {

            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
    
            gameObject.input.enabled = false;

    
        });
    }

    update() {
        

    }
}