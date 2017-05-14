// HTML & CSS
// empty game div -- maybe graphics - goals, start area, highway lanes (background image w/actual goals??)
// modal with form, seed input, submit,
document.addEventListener("DOMContentLoaded", function(event) {
   // global vars
   let container = document.getElementById('container');
   let modal = document.getElementById('modal');
   let seed = '';
   let characterPosHoriz = 500;
   let characterPosVert = 0;



   // make starting modal
   function makeModal() {
      let form = document.createElement('form');
      let seedInput = document.createElement('input');
      let seedLabel = document.createElement('label');
      let submit = document.createElement('input');
      seedInput.setAttribute('id', 'seed');
      seedLabel.htmlFor = 'seed';
      seedLabel.innerHTML = 'Please submit a seed:'
      submit.type = 'submit';
      form.append(seedLabel);
      form.append(seedInput);
      form.append(submit);
      modal.append(form);
      submit.addEventListener("click", function(event) {
         event.preventDefault();
         seed = seedInput.value;
         console.log(seed);
         modal.style.display = 'none';
         setupGame();
      });
   }

   makeModal();

   function setupGame() {

      defineCharacter();
      makeCharacters();
      defineRobots(2, 200);
      makeRobots();
   }

   function defineRobots(set, row) {
      for (let x = 0; x < 4; x++) {
         let offset = 300 * x;
         setTimeout(function() {
            console.log('robots');
            let robot = document.createElement('div');
            robot.className = 'robot';
            robot.style.backgroundImage = `url(https://robohash.org/${seed}/?set=set${set})`;
            container.append(robot);
            robot.style.left = -150 + 'px';
            robot.style.bottom = `${row}px`;
            let robotPos = offset;

            function moveRobot() {
               robotPos = robotPos + 2;

               robot.style.left = robotPos + "px";

               if (Math.abs(robotPos) >= 1100) {
                  robotPos = -150;
               }

               requestAnimationFrame(moveRobot);

            };
            offset = offset + 100;
            moveRobot();

         }, 3000);


      }

   }



   function defineCharacter() {
      console.log('characters');
      let character = document.createElement('div');
      character.id = 'character';
      character.className = 'character';
      character.style.backgroundImage = `url(https://robohash.org/${seed}/?set=set3)`;
      container.append(character);
      character.style.left = characterPosHoriz + 'px';
      character.style.bottom = characterPosVert + 'px';
   }

   function makeRobots() {
      console.log('make r');
   }

   function makeCharacters() {
      console.log('make c');
   }

   // function setup game

   // define robot templates ()
   // make robots ()
   // create character template ()
   // make robots ()

   //define robot templates:
   // GET request(s) to robots/seed - 1 for character, 2 for monster types
   // define robots objects
   // define character object

   // make robots
   // generate 1robot() every x seconds, 5 times -- row 1 & 3
   // generate 1robot() type 2 every x seconds, 5 times - row 2
   // generate character();


   //generate 1 robot:
   // set properties
   // set speed & movement, start over

   //generate character:
   // set properties
   // set movement to equal key values

   //listen for key values after game setup

   // every time robot moves
   // check if robot left, right, top, bottom coordinates match character
   // lives --
   // if lives = 0
   // alert modal - out of lives!
   // start button - direct back to index/reload page
   // move character back to beginning

   // every time character moves
   // check if character left, right, top, bottom coordinates match goal
   // leave a character or star etc in goal
   // update goal array
   // if goal array = full
   // alert modal - you win!
   // start button - direct back to index/reload page
   // move character back to beginning

});
//global vars
// modal
// submit
// form input
// seed
// array of goals
// goal 1
// goal 2
// goal 3
// goal 4
// goal 5
// up, down, left, right

// on DOM load
// function run modal X
// display modal X
// listen for submit click X
// store seed input value in seed variable X
// hide modal X


// setup game ()
// run modal()

// function setup game

// define robot templates ()
// make robots ()
// create character template ()
// make robots ()

//define robot templates:
// GET request(s) to robots/seed - 1 for character, 2 for monster types
// define robots objects
// define character object

// make robots
// generate 1robot() every x seconds, 5 times -- row 1 & 3
// generate 1robot() type 2 every x seconds, 5 times - row 2
// generate character();


//generate 1 robot:
// set properties
// set speed & movement, start over

//generate character:
// set properties
// set movement to equal key values

//listen for key values after game setup

// every time robot moves
// check if robot left, right, top, bottom coordinates match character
// lives --
// if lives = 0
// alert modal - out of lives!
// start button - direct back to index/reload page
// move character back to beginning

// every time character moves
// check if character left, right, top, bottom coordinates match goal
// leave a character or star etc in goal
// update goal array
// if goal array = full
// alert modal - you win!
// start button - direct back to index/reload page
// move character back to beginning
//back to beginning
//caracter back to beginning
//back to beginning
