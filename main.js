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
   let goalScore = [0, 0, 0, 0, 0];
   let goals = document.getElementsByClassName('goal');
   let robot1 = document.getElementById('robot1');
   let charLeft = '';
   let charRight = '';
   let charTop = '';
   let charBottom = '';
   let robotLeft = '';
   let robotRight = '';
   let robotBottom = '';
   let robotTop = '';
   let setup = false;
   let lives = 3;

   // check goal
   //  for (let x = 0; x < goals.length; x++){
   //
   //  }

   // move user

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
      defineRobots(1, 200, 0);
      defineRobots(3, 400, 1);
      makeRobots();
      setup = true;
   }

   function defineRobots(set, row, counter) {

      for (let x = 0; x < 4; x++) {
         let offset = 300 * x;

         setTimeout(function() {
            // console.log('robots');
            let robot = document.createElement('div');
            robot.className = 'robot';
            robot.style.backgroundImage = `url(https://robohash.org/${seed}/?set=set${set})`;
            container.append(robot);
            robot.style.left = -150 + 'px';
            robot.style.bottom = `${row}px`;
            let robotPos = offset;
            robot.className += ` robot${x}`;

            function moveRobot() {
               robotPos = robotPos + 1;

               robot.style.left = robotPos + "px";



               if (Math.abs(robotPos) >= 1100) {
                  robotPos = -150;
               }

               requestAnimationFrame(moveRobot);
               checkCollision(counter);

            };
            offset = offset + 100;
            moveRobot();



         }, 3000);


      }

   }



   function defineCharacter() {
      // console.log('characters');
      let character = document.createElement('div');
      character.id = 'character';
      character.className = 'character';
      character.style.backgroundImage = `url(https://robohash.org/${seed}/?set=set3)`;
      container.append(character);
      character.style.left = characterPosHoriz + 'px';
      character.style.bottom = characterPosVert + 'px';

      // move user


   }

   document.onkeydown = checkKey;
   let u = +25;
   let d = -25;
   let l = -25;
   let r = +25;

   function move(direction) {

      if (direction === 'up') {
         characterPosVert = characterPosVert + u;
         character.style.bottom = characterPosVert + 'px';
      } else if (direction === 'down') {
         characterPosVert = characterPosVert + d;
         character.style.bottom = characterPosVert + 'px';
      } else if (direction === 'left') {
         characterPosHoriz = characterPosHoriz + l;
         character.style.left = characterPosHoriz + 'px';
      } else {
         characterPosHoriz = characterPosHoriz + r;
         character.style.left = characterPosHoriz + 'px';
      }



      if (characterPosVert >= 600) {
         if (characterPosHoriz <= 120) {
            console.log('you win in goal 1!');
            character.style.bottom = '0px';
            character.style.left = '500px';
            characterPosVert = 0;
            characterPosHoriz = 500;
            goals[0].className += ' win';
         } else if (characterPosHoriz > 120 && characterPosHoriz <= 340) {
            console.log('you win in goal 2!');
            character.style.bottom = '0px';
            character.style.left = '500px';
            characterPosVert = 0;
            characterPosHoriz = 500;
            goals[1].className += ' win';
         } else if (characterPosHoriz > 340 && characterPosHoriz <= 560) {
            console.log('you win in goal 3!');
            character.style.bottom = '0px';
            character.style.left = '500px';
            characterPosVert = 0;
            characterPosHoriz = 500;
            goals[2].className += ' win';
         } else if (characterPosHoriz > 560 && characterPosHoriz < 780) {
            console.log('you win in goal 4!');
            character.style.bottom = '0px';
            character.style.left = '500px';
            characterPosVert = 0;
            characterPosHoriz = 500;
            goals[3].className += ' win';
         } else {
            console.log('you win in goal 5!');
            character.style.bottom = '0px';
            character.style.left = '500px';
            characterPosVert = 0;
            characterPosHoriz = 500;
            goals[4].className += ' win';
         }
      }
   }

   function checkKey(e) {
      // console.log('checking key');
      e = e || window.event;
      let direction = '';
      if (e.keyCode == '38') {
         //  console.log('going up');
         move('up');
      } else if (e.keyCode == '40') {
         // down arrow
         //  console.log('down');
         move('down');
      } else if (e.keyCode == '37') {
         // left arrow
         move('left');
      } else if (e.keyCode == '39') {
         // right arrow
         move('right');
      }

   }

   function makeRobots() {
      // console.log('make r');
   }

   function makeCharacters() {
      // console.log('make c');
   }

   function collide() {
      console.log('oh no!');
      character.style.bottom = '0px';
      character.style.left = '500px';
      characterPosVert = 0;
      characterPosHoriz = 500;
      lives--;
      console.log('lives left:', lives);
   }

   function checkCollision(param1) {


      for (let y = 0; y < 4; y++) {
         let robotName = 'robot' + (y);
         //  console.log(robotName, 'rb name');
         //  console.log(param1, 'index');
         robot1 = document.getElementsByClassName(`${robotName}`)[param1];
         //  console.log(robot1);
         //  console.log(robot1, 'robot by class array');
         //  console.log(param1, 'param1');
         //  let robotName = 'robot' + (y);
         //  robot1 = document.getElementsByClassName(`${robotName}`)[param1];
         //  console.log(robot1);
         //  myRobot = document.getElementById(`${robotName}`);

         if (robot1) {
            charLeft = parseInt((character.style.left).match(/[0-9]+/));
            charRight = (parseInt((character.style.left).match(/[0-9]+/)) + character.offsetWidth);
            charTop = parseInt((character.style.bottom).match(/[0-9]+/));
            charBottom = (parseInt((character.style.bottom).match(/[0-9]+/)) + character.offsetHeight);;
            robotLeft = parseInt((robot1.style.left).match(/[0-9]+/));
            robotRight = (parseInt((robot1.style.left).match(/[0-9]+/)) + robot1.offsetWidth);
            robotBottom = parseInt((robot1.style.bottom).match(/[0-9]+/));
            robotTop = (parseInt((robot1.style.bottom).match(/[0-9]+/)) + robot1.offsetHeight);
            if ((((charBottom < robotTop) && (charBottom > robotBottom)) || ((charTop > robotBottom) && (charTop < robotTop))) && ((((charLeft > robotLeft) && (charLeft < robotRight)) || ((charRight > robotLeft) && (charRight < robotRight))))) {
               console.log('collided!');
               collide();

            }
         }


         // ((charLeft > robotLeft) && (charLeft < robotRight))
      }
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
// right, top, bottom coordinates match character
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
