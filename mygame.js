var game=()=>
{
    // HEre we write Basic Skeleton of Phareser Object 
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
        this.load.image('pin','pin.jpg');
        this.load.image('wheel','wheel.png');
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
        let wheel=this.add.sprite(0,0,'wheel');
        wheel.setPosition(W/2,H/2);
        wheel.setScale(.20);
        
        // Now create a pin 
        let pin=this.add.sprite(0,0,'pin');
        pin.setPosition((W/2)-10,(H/2)-80);
        pin.setScale(.05);
        
        
    }
    // Game loop
    function update()
    {
        console.log("In update Function");
    }
}
