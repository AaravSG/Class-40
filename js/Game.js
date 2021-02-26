class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  //gameState 0
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1I);
    car2 = createSprite(300,200);
    car2.addImage(car2I);
    car3 = createSprite(500,200);
    car3.addImage(car3I);
    car4 = createSprite(700,200);
    car4.addImage(car4I);
    cars = [car1, car2, car3, car4];
  }

  //gameState 1
  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){

      background("black");
      image(trackI,0,-displayHeight*4,displayWidth,displayHeight*5  );
    
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 170;
      var y;

      var sides;

      for(var plr in allPlayers){

        
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        sides= x+ allPlayers[plr].sidePosition;
        cars[index-1].x = sides;
        cars[index-1].y = y;

        if (index === player.index){
          fill("red");
          ellipse(sides,y,70);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
        textSize(20)
        textAlign(CENTER)
        fill("white")
        text(allPlayers[plr].name,sides,y+70);
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.sidePosition += 5;
      sides 
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.sidePosition -= 5;
      player.update();
    }




   

    if(player.distance> 3660){

        gameState = 2;
    }

    drawSprites();
  }

 // gameState 2
  end(){

  // console.log("1st Place: "+ player)

  }
}


