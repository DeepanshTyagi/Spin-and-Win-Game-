/*
Created By Deepanshu Tyagi on 27/05/2020
*/
var game=()=>
{
    // HEre we write Basic Skeleton of Phareser Object 
    var prize_config=
    {
        count:11,
        prize_names:["0%","10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"]
    }
    let config=
        {
            type:Phaser.CANVAS,
            width:400,
            height:200,
            backgroundColor:0xffcc00,
            scene:
            {
             // basically to create a scene we have three steps 
            /*
            1. --> Upload assest
            2. --> Make this assest visible to the desktop
            3. --> Making updation*/
            preload : preload,
            create:create,
            update:update
            }
           
        };
    game=new Phaser.Game(config); // pass the config object 
    function preload()
    {
        console.log("In preload Function");
        //console.log(this);
        // now we load the images 
        this.load.image('background','background.jpg');
        this.load.image('pin','pin.png');
        this.load.image('wheel','FinalWheel.png');
    }
    function create()
    {
        
        console.log("In create function");
        // now lets create the image on canvas 
        let W= game.config.width;
        let H= game.config.height;
        let background=this.add.sprite(0,0,'background'); // In phaser sprite is called also image 
        background.setPosition(W/2,H/2); // set the position of image un the center 
        background.setScale(.80);//reduce the size of the image 
        
        // Now create a wheel on the background 
        this.wheel=this.add.sprite(W/2,H/2,'wheel');
        this.wheel.setPosition(W/2,H/2);
        this.wheel.setScale(.50);
        
        // Now create a pin 
        let pin=this.add.sprite(0,0,'pin');
        pin.setPosition((W/2)-10,(H/2)-80);
        pin.setScale(.05);
        
        // adding a event =listener for mouse click 
        this.input.on("pointerdown",spinwheel,this);
        
        // adding the welcone text
        font_style=
        {
            font:"bold 15px Roboto",
            align:"center",
            color:"red"
            
        };
        this.game_text=this.add.text(5,5,"Welcome to Spin and Win",font_style);
        
        
    }
    // Game loop
    function update()
    {
        console.log("In update Function");
        this.wheel.angle+=2; // with the help of this we will rotate the spin 
      //  this.wheel.alpha-=.01; // alpha 1 means oppase
                            // alpha 0 means transparent
        /*this.wheel.scaleX+=.001; 
        this.wheel.scaleY+=.001; // from scaleX and scaleY wheel becaome larger 
        */
    }
    function spinwheel()
    
    {
        console.log("You Clicked the mouse");
        this.game_text.setText("You Clicked on Mouse"); // Update the text
        
        let round=Phaser.Math.Between(2,4);
        console.log(round);
        let degree=Phaser.Math.Between(0,10)*32.72;
        
        let total_angel=round*360+degree;
        console.log(degree);
        
        let idx=prize_config.count-1-Math.floor(degree/(360/prize_config.count));
        
        tween = this.tweens.add({
            targets:this.wheel,
            angle:total_angel,
            ease:"Cubic.easeOut",
            duration : 3000,
            callbackScope:this,
//            scaleX:0.5,
//            scaleY:0.5,
            onComplete:function()
            {
            this.game_text.setText("Congratulations! You Won "+prize_config.prize_names[idx]);
            }
        });  
    }
    
    //--> Tweens are used to create animation in Phaser 
}
