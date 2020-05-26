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
            preload : preload1,
            create:create1,
            update:update1
            }
           
        }
    let game=new Phaser.Game(config); // pass the config object 
    var preload1=()=>
    {
        console.log("In preload Function");
    }
    var create1=()=>
    {
        console.log("In create function");
    }
    // Game loop
    var update1=()=>
    {
        console.log("In update Function");
    }
}