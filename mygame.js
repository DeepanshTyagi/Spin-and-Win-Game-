/*
Created By Deepanshu Tyagi on 27/05/2020
*/
function game()
{
    // HEre we write Basic Skeleton of Phareser Object 
    var prize_config=
    {
        count:11,
        prize_names:["CB Book","3000 CB CREDIT","35% OFF","HARD LUCK","70% OFF","CB SWAGPACK","100% OFF","NETFLIX SUBSCRIPTION","50% OFF","AMAZON VOUCHER","2 Extra SPIN","CB TSHIRT"]
    };
    let config=
        {
            type:Phaser.AUTO,
            width:1320,
            height:650,
            //canspin:true,
            //backgroundColor:0xffcc00,
            scene:
            {
             // basically to create a scene we have three steps 
            /*
            1. --> Upload assest
            2. --> Make this assest visible to the desktop
            3. --> Making updation*/
            preload : preload,
            create:create,
           // update:update
            },
        audio: 
          {
           disableWebAudio:true
          }
           
        };
    game=new Phaser.Game(config); 
    // pass the config object 
    function preload()
    {
        // now we load the images 
        this.load.image('background','./assests/back.jpg');
        this.load.image('pin','./assests/finalpin.png');
        this.load.image('wheel','./assests/FinalWheel1.png');
        this.load.image('stand','./assests/stand.png');
        this.load.image('spin_logo','./assests/spin-n-win-logo.png'); 
        this.load.image('button','./assests/spin_btn.png');
        this.load.image('congratulation','./assests/congratulation.png');
        this.load.image('sad','./assests/sad.png');
        this.load.audio('theme','./assests/wheel-audio.mp3');
        this.load.audio('thug','./assests/thuglife.mp3');
        this.load.audio('sadaudio','./assests/sad.mp3');
        this.load.audio('clap','./assests/clap.mp3');
    }
    function create()
    {
        
        console.log("In create function");
        // now lets create the image on canvas 
        let W= game.config.width;
        let H= game.config.height;
        let background=this.add.sprite(0,0,'background'); // In phaser sprite is called also image 
        background.setPosition(W/2,H/2); // set the position of image un the center 
        //background.setScale(.20);//reduce the size of the image 
        
        // Create a button 
        this.button=this.add.sprite(150,(H/2)+200,"button");
        this.button.setScale(.50);
        this.button.inputEnabled=true;
//        this.button.events.onInputDown.add(spinwheel,this);
//        this.button.input.on("pointerdown",spinwheel,this);
        this.button.setInteractive({ cursor: 'pointer'});
        this.button.on("pointerdown",spinwheel,this);
        
        // create a Spin and Win logo 
        this.logo=this.add.sprite(170,120,'spin_logo');
        this.logo.setScale(.20);
        
        // Now create a wheel on the background 
        this.wheel=this.add.sprite(0,0,'wheel');
        this.wheel.setPosition((W/2)+230,H/2);
        this.wheel.setScale(.25);
        this.wheel.setDepth(1);
        
        // Now create a pin 
        let pin=this.add.sprite(0,0,'pin');
        pin.setPosition((W/2)+230,(H/2)-250);
        pin.setScale(.25);
        pin.setDepth(1);
        
        
        // Now we will create a stand
        let stand=this.add.sprite((W/2)+230,(H/2)+250,'stand')
        stand.setScale(.25);
        
        // adding a event =listener for mouse click 
        // this.input.on("pointerdown",spinwheel,this);
          
        // adding the welcone text
        font_style=
        {
            font:"bold 30px Roboto",
            align:"center",
            color:"red"
            
        };
        this.game_text=this.add.text(5,5,"Welcome! Tap on the Spin Now button to spin the wheel",font_style);
        
        // adding the music 
        music = this.sound.add('theme');
        thug=this.sound.add('thug');
        sadmusic=this.sound.add('sadaudio');
        clap=this.sound.add('clap');
        canspin=true;
        
    }
    // Game loop
    /*
    function update()
    {
        console.log("In update Function");
        //this.wheel.angle+=2; // with the help of this we will rotate the spin 
      //  this.wheel.alpha-=.01; // alpha 1 means oppase
                            // alpha 0 means transparent
        /*this.wheel.scaleX+=.001; 
        this.wheel.scaleY+=.001; // from scaleX and scaleY wheel becaome larger 
        
    }*/
    
    function spinwheel()
    {
        if(canspin)
            {
                canspin=false;
                console.log("You Clicked the mouse");
        this.game_text.setText("Please wait wheel is spinning....................."); // Update the text
        this.button.inputEnabled=false;
        
        let round=Phaser.Math.Between(2,4);
        console.log(round);
        let degree=Phaser.Math.Between(0,11)*30;
        
        let total_angel=round*360+degree;
        console.log(degree);
        music.play();
        
        let idx=prize_config.count-1-Math.floor(degree/(360/prize_config.count));
        tween = this.tweens.add({
            targets:this.wheel,
            angle:total_angel,
            ease:"Cubic.easeOut",
            duration :5000,
            callbackScope:this,
//            scaleX:0.5,
//            scaleY:0.5,
            onComplete:function()
            {
            this.game_text.setText("Thanks for Trying your Luck ");
            if(prize_config.prize_names[idx+1]=="HARD LUCK")
                {
                    sadmusic.play();
                     let sad=this.add.sprite(190,280,'sad');
                      sad.setScale(.30);
                      var text1=this.add.text(5,350,"Better Luck next Time",{
                        font: "30px Arial Black",
                        fill: "red"
                    });
                     text1.stroke = "red";
                     text1.strokeThickness = 16;
                    //  Apply the shadow to the Fill only
                    text1.setShadow(2, 2, "#333333", 2, false, true);
                }
             else 
                {
                    if(prize_config.prize_names[idx+1]=="NETFLIX SUBSCRIPTION" || prize_config.prize_names[idx+1]=="AMAZON VOUCHER" || prize_config.prize_names[idx+1]=="100% OFF")
                        {
                           thug.play(); 
                        }
                    else 
                        {
                            clap.play();
                        }
                let congrat=this.add.sprite(190,280,'congratulation');
                    congrat.setScale(.60);
                   var text2= this.add.text(70,320,"You have won ",{
                        font: "30px Arial Black",
                        fill: "orange"
                    });
                     var text2=this.add.text(70,360,""+prize_config.prize_names[idx+1],{
                        font: "30px Arial Black",
                        fill: "orange"
                    });
                     text2.stroke = "yellow";
                     text2.strokeThickness = 16;
                     //  Apply the shadow to the Fill only
                     text2.setShadow(2, 2, "#333333", 2, false, true);
                }
            this.canspin=true;
            }
        }); 
            }
        
    }
    
    //--> Tweens are used to create animation in Phaser 
}
