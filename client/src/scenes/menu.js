import io from 'socket.io-client';


export default class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'Menu'
        });
    }

    preload() {
        
        this.load.image('fond', 'src/assets/fond.jpg',);
        this.load.image('play','src/assets/play_button.png',)
        this.load.image('logo','src/assets/logo.png',)
        this.load.audio('menu_sound','src/assets/ost.mp3',)

       



    }

    create() {
     
        this.add.text(256,256, "Loading Game...");
        this.sound.play("menu_sound",{
            loop : true 
        })
        this.input.once('pointerup', function () {this.scene.start("Game")}, this);



       const kaiji = this.add.image(600, 400, 'fond');
        kaiji.scale = 2
        const playbutton = this.add.image(600, 400, 'play')
        this.add.image(600, 100, 'logo')

        playbutton.setInteractive();
        playbutton.on('pointerdown', function (pointer) {

            this.setTint(0xff0000);

      

    
        });

      
   
    }

    update() {

    }
}