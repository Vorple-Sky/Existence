var adventureManager;

// p5.play
var playerAvatar;

// Clickables: the manager class
var clickablesManager;    // the manager class
var clickables;           // an array of clickable objects

// keycods for W-A-S-D
const W_KEY = 87;
const S_KEY = 83;
const D_KEY = 68;
const A_KEY = 65;


var speed = 5;




// Allocate Adventure Manager with states table and interaction tables
function preload() {
  
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
  
}

// Setup the adventure manager
function setup() {
  createCanvas(1280, 720);

  
  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();
  //---

  
  playerAvatar = new Avatar("Player", 640, 400);
   
  
  playerAvatar.setMaxSpeed(10);

   
  playerAvatar.addMovingAnimation( 'assets/BrainWalkingforward01_.png', 'assets/BrainWalkingforward02.png');
  playerAvatar.addStandingAnimation('assets/BrainStandingright01_.png');

  
  adventureManager.setPlayerSprite(playerAvatar.sprite);

  
  adventureManager.setClickableManager(clickablesManager);

    // This will load the images, go through state and interation tables, etc
  adventureManager.setup();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 
  //--

  // NEW: line for debugging
  //adventureManager.changeState("Unlucky");
}


function draw() {
  
  // draws background rooms and handles movement from one to another


  adventureManager.draw();


  // draw the p5.clickables, in front of the mazes but behind the sprites 
  clickablesManager.draw();
  
  if( adventureManager.getStateName() !== "Splash" && 
      adventureManager.getStateName() !== "Instructions" ) {
      
    
    checkMovement();

    // this is a function of p5.play, not of this sketch
    drawSprite(playerAvatar.sprite);
   
  } 
}


function keyPressed() {
  adventureManager.keyPressed();
}




function checkMovement() {
  var xSpeed = 0;
  var ySpeed = 0;

  // Check x movement
  if(keyIsDown(RIGHT_ARROW) || keyIsDown(D_KEY)) {
    xSpeed = speed;
  }
  else if(keyIsDown(LEFT_ARROW) || keyIsDown(A_KEY)) {
    xSpeed = -speed;
  }
  
  // Check y movement
  if(keyIsDown(DOWN_ARROW) || keyIsDown(S_KEY)) {
    ySpeed = speed;
  }
  else if(keyIsDown(UP_ARROW) || keyIsDown(W_KEY)) {
    ySpeed = -speed;
  }

  playerAvatar.setSpeed(xSpeed,ySpeed);
}



function mouseReleased() {
  if( adventureManager.getStateName() === "Splash") {
    adventureManager.changeState("Instructions");
  }
}


//-------------- CLICKABLE CODE  ---------------//


function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed;
  }
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#AA33AA";
  this.noTint = false;
  this.tint = "#FF0000";
}


// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#AAAAAA";
}


clickableButtonPressed = function() {
  
  adventureManager.clickablePressed(this.name); 
}





class InstructionsScreen extends PNGRoom {
  
  preload() {
    // These are out variables in the InstructionsScreen class
    this.textBoxWidth = (width/6)*4;
    this.textBoxHeight = (height/6)*4; 

    
  }

  draw() {
    // tint down background image so text is more readable
    //tint(128);
     
    // this calls PNGRoom.draw()
    super.draw();
      
    // text draw settings
    fill(255);
    textAlign(CENTER);
    textSize(30);

    // Draw text in a box
    text(this.instructionsText, width/6, height/6, this.textBoxWidth, this.textBoxHeight );
  }
}


class NPCRoom extends PNGRoom {
  preload() {
    // define class varibles here, load images or anything else
    this.npc1 = new NPC("Classmate", 850, 360, 'assets/Npc1.png');
    this.npc1.addSingleInteraction("Hello, I\'m your classmate! \n I\'m new, let's be friends!.");
    
    // setup flag, seto false
    this.hasSetup = false;
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    // Idea is to call the npc1.setup() function ONE time, so we use this kind of flag
    if( this.hasSetup === false ) {
      // setup NPC 1
      this.npc1.setup();
      this.npc1.setPromptLocation(0,-30);
      
      

      this.hasSetup = true; 
    }

    // this calls PNGRoom.draw()
    super.draw();

    // draw our NPCs
    drawSprite(this.npc1.sprite);
    

    // When you have multiple NPCs, you can add them to an array and have a function 
    // iterate through it to call this function for each more concisely.
    this.npc1.displayInteractPrompt(playerAvatar);
    
  }

}

class NPCRoom1 extends PNGRoom {
  preload() {
    // define class varibles here, load images or anything else
    this.npc1 = new NPC("Friend", 830, 450, 'assets/Npc5.png');
    this.npc1.addSingleInteraction("Hey pal, How are you? \n Lets catch up sometime.");
    
    // setup flag, seto false
    this.hasSetup = false;
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    // Idea is to call the npc1.setup() function ONE time, so we use this kind of flag
    if( this.hasSetup === false ) {
      // setup NPC 1
      this.npc1.setup();
      this.npc1.setPromptLocation(0,-30);
      
      

      this.hasSetup = true; 
    }

    // this calls PNGRoom.draw()
    super.draw();

    // draw our NPCs
    drawSprite(this.npc1.sprite);
    

    // When you have multiple NPCs, you can add them to an array and have a function 
    // iterate through it to call this function for each more concisely.
    this.npc1.displayInteractPrompt(playerAvatar);
    
  }

  

}

class NPCRoom2 extends PNGRoom {
  preload() {
    // define class varibles here, load images or anything else
    this.npc1 = new NPC("Teacher", 750, 550, 'assets/Npc1.png');
    this.npc1.addSingleInteraction("Hello Brain, I wanted to check in \n I noticed you are not doing your work...");
    
    // setup flag, seto false
    this.hasSetup = false;
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    // Idea is to call the npc1.setup() function ONE time, so we use this kind of flag
    if( this.hasSetup === false ) {
      // setup NPC 1
      this.npc1.setup();
      this.npc1.setPromptLocation(0,-30);
      
      

      this.hasSetup = true; 
    }

    // this calls PNGRoom.draw()
    super.draw();

    // draw our NPCs
    drawSprite(this.npc1.sprite);
    

    // When you have multiple NPCs, you can add them to an array and have a function 
    // iterate through it to call this function for each more concisely.
    this.npc1.displayInteractPrompt(playerAvatar);
    
  }

  

}

class NPCRoom3 extends PNGRoom {
  preload() {
    // define class varibles here, load images or anything else
    this.npc1 = new NPC("Stranger", 400, 570, 'assets/Npc4.png');
    this.npc1.addSingleInteraction("Hello, I\'m a bit lost \n Could you help me find my \n way around");
    
    // setup flag, seto false
    this.hasSetup = false;
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    // Idea is to call the npc1.setup() function ONE time, so we use this kind of flag
    if( this.hasSetup === false ) {
      // setup NPC 1
      this.npc1.setup();
      this.npc1.setPromptLocation(0,-30);
      
      

      this.hasSetup = true; 
    }

    // this calls PNGRoom.draw()
    super.draw();

    // draw our NPCs
    drawSprite(this.npc1.sprite);
    

    // When you have multiple NPCs, you can add them to an array and have a function 
    // iterate through it to call this function for each more concisely.
    this.npc1.displayInteractPrompt(playerAvatar);
    
  }

  

}

class NPCRoom4 extends PNGRoom {
  preload() {
    // define class varibles here, load images or anything else
    this.npc1 = new NPC("Boss", 400, 570, 'assets/Npc2.png');
    this.npc1.addSingleInteraction("Brain, your late again \n I\'m not happy about this.");
    
    // setup flag, seto false
    this.hasSetup = false;
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    // Idea is to call the npc1.setup() function ONE time, so we use this kind of flag
    if( this.hasSetup === false ) {
      // setup NPC 1
      this.npc1.setup();
      this.npc1.setPromptLocation(0,-30);
      
      

      this.hasSetup = true; 
    }

    // this calls PNGRoom.draw()
    super.draw();

    // draw our NPCs
    drawSprite(this.npc1.sprite);
    

    // When you have multiple NPCs, you can add them to an array and have a function 
    // iterate through it to call this function for each more concisely.
    this.npc1.displayInteractPrompt(playerAvatar);
    
  }

  

}
class NPCRoom5 extends PNGRoom {
  preload() {
    // define class varibles here, load images or anything else
    this.npc1 = new NPC("Family", 230, 520, 'assets/Npc3.png');
    this.npc1.addSingleInteraction("Brain, honey I\'m glad to see you heading home \n I\'m happy you are safe.");
    
    // setup flag, seto false
    this.hasSetup = false;
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    // Idea is to call the npc1.setup() function ONE time, so we use this kind of flag
    if( this.hasSetup === false ) {
      // setup NPC 1
      this.npc1.setup();
      this.npc1.setPromptLocation(0,-30);
      
      

      this.hasSetup = true; 
    }

    // this calls PNGRoom.draw()
    super.draw();

    // draw our NPCs
    drawSprite(this.npc1.sprite);
    

    // When you have multiple NPCs, you can add them to an array and have a function 
    // iterate through it to call this function for each more concisely.
    this.npc1.displayInteractPrompt(playerAvatar);
    
  }

  

}

class TemplateScreen extends PNGRoom {
  preload() {
    
  }

  
  draw() {
    
    super.draw();

    
  }
}


