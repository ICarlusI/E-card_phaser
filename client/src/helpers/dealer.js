import Card from './card'

export default class Dealer {
    constructor(scene) {
        this.dealCards = () => {
            let playerSprite;
            let playerSprite2;
            let opponentSprite;
            let opponentSprite2;

            if (scene.isPlayerA) {
                playerSprite = 'citizen';
                playerSprite2 = 'king';
                opponentSprite = 'yugi';
                opponentSprite2 = 'yugi';
            } else {
                playerSprite = 'citizen';
                playerSprite2 = 'slave';
                opponentSprite = 'yugi2';
                opponentSprite2 = 'yugi2';
            };
            for (let i = 0; i < 4; i++) {
                let playerCard = new Card(scene);
                playerCard.render(475 + (i * 100), 650, playerSprite);

                let opponentCard = new Card(scene);
                scene.opponentCards.push(opponentCard.render(475 + (i * 100), 125, opponentSprite).disableInteractive());
            }

            for (let i = 0; i < 1; i++) {
                let playerCard = new Card(scene);
                playerCard.render(380 + (i * 100), 650, playerSprite2);

            }

        }

        
    }
}