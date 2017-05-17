/*
bugs:
  - collision w/same top & bottom << or top & bottom equal *
  - pick square images/full width & height
  - create space between goals << just make divs smaller, check for frogger at them. how to keep frogger off margins? position him relative?
  - why are lives decrementing when moving player under 0? bc not touching/bordering a monster

changes:
  - make everything half scale
  - create goal counter
  - make robots smaller than row
  - make robots and player different sizes?

extras:
 - add log/water collision logic
 - customize images > custom api
*/

// LOAD DOM
document.addEventListener("DOMContentLoaded", function(event) {
   // GLOBAL VARIABLES

   // MODAL
   const submit = document.getElementById('submit');
   const getSeed = document.getElementById('getSeed');
   const getSeedLabel = document.getElementById('getSeedLabel');
   let modalText = document.getElementById('modalText');
   let modal = document.getElementById('modal');
   let seed = '';
   let level = 0;
   let botOptions = [1, 2, 3];
   let botOptionIMGS = [];
   let url = '';
   let container = document.getElementById('container');
   let width = 430;
   // PLAYER CONTROLS
   let u = +25;
   let d = -25;
   let l = -25;
   let r = +25;
   // KEEP TRACK OF WINS/LOSSES
   let outcome = 'default';
   // CREATE PLAYER & BOTS
   const player = document.getElementById('player');

   function collide() {
      console.log('oh no!');
      player.style.bottom = '0px';
      player.style.left = '500px';
      playerPosVert = 0;
      playerPosHoriz = 500;
      lives--;
      console.log('lives left:', lives);
      if (lives === 0) {
         console.log(' out of lives!');
         //  makeModalRestart();
      }
   }

   function checkCollision(param1, param2) {
      charLeft = parseInt((player.style.left).match(/[0-9]+/));
      charRight = (parseInt((player.style.left).match(/[0-9]+/)) + player.offsetWidth);
      charBottom = parseInt((player.style.bottom).match(/[0-9]+/));
      charTop = (parseInt((player.style.bottom).match(/[0-9]+/)) + player.offsetHeight);;
      let bots = document.getElementsByClassName('bot');
      for (let x = 0; x < bots.length; x++) {
         robotLeft = parseInt((bots[x].style.left).match(/[0-9]+/));
         robotRight = (parseInt((bots[x].style.left).match(/[0-9]+/)) + bots[x].offsetWidth);
         robotBottom = parseInt((bots[x].style.bottom).match(/[0-9]+/));
         robotTop = (parseInt((bots[x].style.bottom).match(/[0-9]+/)) + bots[x].offsetHeight);

         if ((((charBottom < robotTop) && (charBottom > robotBottom)) || ((charTop > robotBottom) && (charTop < robotTop)) || ((charTop === robotTop) && (charBottom === robotBottom))) && (((charLeft > robotLeft) && (charLeft < robotRight)) || ((charRight > robotLeft) && (charRight < robotRight)))) {
            console.log('collided!');
            collide();
         }

      }
   }


   function createGame() {

      // CREATE PLAYER
      player.style.backgroundImage = `url(http://galvanize-cors-proxy.herokuapp.com/https://robohash.org/${seed}?set=set3)`;
      // CREATE BOTS
      let numRows = levels[level].length;
      for (let x = 0; x < numRows; x++) {
         let row = levels[level][x];
         let botsPerRow = row.botPicks.length;
         let offset = parseInt((530 - (50 * botsPerRow)) / botsPerRow);
         console.log(offset);
         for (let y = 0; y < botsPerRow; y++) {
            let bot = document.createElement('div');
            let set = levels[level][x].botPicks[y];
            bot.className = 'bot';
            if (x < 5) {
               bot.style.bottom = ((x + 1) * 50) + 'px';
            } else {
               bot.style.bottom = ((x + 2) * 50) + 'px';
            }
            bot.style.backgroundImage = `url(http://galvanize-cors-proxy.herokuapp.com/https://robohash.org/${seed}?set=set${set})`;
            container.append(bot);
            let botOffset = (((offset) + 50) * y);
            bot.style.left = botOffset + 'px';
            let botPosition = botOffset;

            function moveBot() {
               botPosition = botPosition + row.velocity;
               bot.style.left = botPosition + 'px';
               if (Math.abs(botPosition) >= 480) {
                  botPosition = -50;
               }

               if ((botPosition) < -50) {
                  botPosition = 480;
               }
               requestAnimationFrame(moveBot);
               checkCollision();
            }
            moveBot();
         }
      }
   }

   //  document.onkeydown = checkKey;




   // SET UP MODAL
   function setModal() {
      submit.addEventListener('click', function(event) {
         if (outcome === 'win') {
            // restart
         } else if (outcome === 'loss') {
            // restart
         } else {
            event.preventDefault();
            seed = getSeed.value;
            console.log(seed, 'seed');
            createGame();

         }
         modal.classList.add('hidden');
      });

      if (outcome === 'win') {
         stopMovement();
         modalText.innerHTML = 'Continue to next level!';
         submit.value = 'continue';
         getSeed.classList.add('hidden');
         getSeedLabel.classList.add('hidden');
      } else if (outcome === 'loss') {
         stopMovement();
         modalText.innerHTML = 'Oh no! You\'re out of lives!';
         submit.value = 'restart';
         getSeed.classList.add('hidden');
         getSeedLabel.classList.add('hidden');
      }
   }

   // STOP GAME
   function stopMovement() {
      // stop player & monster movement on loss/win
   }

   setModal();





   // MAKE CREATING PLAYER AND BOTS A CALL BACK FUNCTION AFTER SUBMIT IS CLICKED & IMAGES ARE LOADED
   //  createPlayer();


});



/*
global vars - seed, robot pos, player pos
new game modal -- seed
reset game/loss modal
win/next level modal

GET png request(s) -- seed

define robots
move robots - direction/speed
define player
set player controls
move player
check collision
check win

set water rows
*/


/*
load
restart modal
win modal
modal  <- modal(start/win/restart)
robot vars - distance between, offset, speed

// on load submit load icon, on make players/robots, setup game (if lag)

setup game (on http requests complete <- need #image types ahead of time)
  * do I need this in a function? just wait for load? *
  make player
  get level - sets robot variables
    make robots (image set, bottom offset, index, speed/direction, #monsters, distance between)
    ^ make distance between calc based on #monsters; need index?; try to call only once

define robots
  for #robots
    set distance between
    create robot div
    add class robot
    set background image << http response var(s)
    * set robot left & bottom offset
    set robot position to offset (space between * index of monster)
    append robot
    set robot classname by index: bot, robot2, etc (for looping through robots in collide check << probably unnecessary << just get all by class robot and apply in a loop?)

    declare move robot () << move out?!
      increment robot position
      update left position of robot
      if robot reaches end in either direction, reset to beginning
      request animation frame
      check collision() << move out?! could loop through all continually/while game running do this, or by row frog is in // only check once robots = true (looping through existing should take care of this? get array of robots once define is complete/true)

    move robot()

define player (player)
      make
      give id, class, background image (http GET url)
      * set position left & bottom
      append

 keydown listener
 check key ()

 global vars for u,d,l,r (move up to top)

 move player()
  for each direction, move player position < change to object literal, run once? object: keycode, direction name, +/- #pixels to move
  check goals for win // change to only runs on player pos = goal,  height < change to object literal
    ^ make this cleaner - margins between goals, clear win/loss < change 1 hop to be 1 whole box?
      if goal, reset player position << break out into function, update goals
        if all goals, display win modal, update level

  collided
    alert user
    reset player position (put a delay on this?, maybe combined with alerting user - toast?)
    decrement lives
    if no more lives
      run restart modal

  check collision (robot class name, number of robot rows << don't need if getting all and looping through all)
        set value of player & robot borders (l,r,t,b)

        if player is on water row (top & bottom within water row ranges)
          collision is when player is NOT touching a robot < rename check death, element
        check collision function or (!collision function, if player in water row) << need to update to fix sneaking through aligned bug
          if collision, run collide()

  GET requests currently at bottom, move up
*/

//* BONUS: python firebase api from robohash template w/custom images < THURS
// THURS
// ts currently at bottom, move up
//    *
//    /
//
// //* BONUS: python firebase api from robohash template w/custom images < THURS
// // THURS
// ts currently at bottom, move up
//    *
//    /

//* BONUS: python firebase api from robohash template w/custom images < THURS
// THURS
