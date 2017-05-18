// LOAD DOM
document.addEventListener("DOMContentLoaded", function(event) {

   // GLOBAL VARIABLES
   let container = document.getElementById('container');
   let width = 430; //width of game screen
   // MODAL
   const submit = document.getElementById('submit');
   const getSeed = document.getElementById('getSeed');
   const getSeedLabel = document.getElementById('getSeedLabel');
   let modalText = document.getElementById('modalText');
   let modal = document.getElementById('modal');
   let seed = 'example';
   // LEVEL GENERATION
   let level = 0;
   let botOptions = [1, 2, 3];
   let botOptionIMGS = [];
   let url = '';
   // PLAYER CONTROLS
   let u = +25;
   let d = -25;
   let l = -25;
   let r = +25;
   // CREATE PLAYER & BOTS
   const player = document.getElementById('player');
   player.style.left = '190px';
   // MOVEMENT && SCORING
   let playerPosHoriz = 190;
   let playerPosVert = 0;
   let goalScore = [0, 0, 0, 0, 0];
   let goals = document.getElementsByClassName('goal');
   let lives = 3;

   // IF PLAYER TOUCHES A BOT, RESET POSITION & DECREMENT LIVES
   function collide() {

      console.log('oh no!');
      player.style.bottom = '0px';
      player.style.left = '190px';
      playerPosVert = 0;
      playerPosHoriz = 190;
      lives--;
      if (lives === 0) {
         console.log('you lose');
         setModal('loss');
      }
      console.log('lives left:', lives);
      if (lives === 0) {
         console.log(' out of lives!');
         //  makeModalRestart();
      }
   }

   /// ARROW KEY INPUT TRIGGERS MOVEMENT FUNCTIONS
   function checkKey(e) {
      e = e || window.event;
      let direction = '';
      if (e.keyCode == '38') {
        // right arrow
         move('up');
      } else if (e.keyCode == '40') {
         // down arrow
         move('down');
      } else if (e.keyCode == '37') {
         // left arrow
         move('left');
      } else if (e.keyCode == '39') {
         // right arrow
         move('right');
      }

   }

   // MOVE PLAYER IN DIRECTION
   function move(direction) {
      if (direction === 'up') {
         if (playerPosVert < 600) {
            playerPosVert = playerPosVert + u;
            player.style.bottom = playerPosVert + 'px';
         }
      } else if (direction === 'down') {
         if (playerPosVert > 0) {
            playerPosVert = playerPosVert + d;
            player.style.bottom = playerPosVert + 'px';
         }
      } else if (direction === 'left') {
         if (playerPosHoriz > 0) {
            playerPosHoriz = playerPosHoriz + l;
            player.style.left = playerPosHoriz + 'px';
         }
      } else {
         if (playerPosHoriz < 380) {
            playerPosHoriz = playerPosHoriz + r;
            player.style.left = playerPosHoriz + 'px';
         }
      }

      function resetPlayer() {
        player.style.bottom = '0px';
        player.style.left = '190px';
        playerPosVert = 0;
        playerPosHoriz = 190;
      }

      // IF PLAYER REACHES END GOALS, RESEST POSITION, LET GOALS ARRAY REFLECT WIN
      if (playerPosVert >= 600) {
         if (playerPosHoriz <= 86) {
            goals[0].className += ' win';
            resetPlayer();
            goalScore[0] = 1;
         } else if (playerPosHoriz > 86 && playerPosHoriz <= 172) {
            resetPlayer();
            goals[1].className += ' win';
            goalScore[1] = 1;
         } else if (playerPosHoriz > 172 && playerPosHoriz <= 258) {
           resetPlayer();
            goals[2].className += ' win';
            goalScore[2] = 1;
         } else if (playerPosHoriz > 258 && playerPosHoriz < 344) {
           resetPlayer();
            goals[3].className += ' win';
            goalScore[3] = 1;
         } else {
            resetPlayer();
            goals[4].className += ' win';
            goalScore[4] = 1;
         }
         if ((goalScore[0] === 1) && (goalScore[1] === 1) && (goalScore[2] === 1) && (goalScore[3] === 1) && (goalScore[4] === 1)) {
            console.log('you win it all!');
            setModal('win');
         }

      }
   }


   // CHECK FOR COLLISION
   function checkCollision(param1) {
      playerLeft = parseInt((player.style.left).match(/[0-9]+/));
      playerRight = (parseInt((player.style.left).match(/[0-9]+/)) + player.offsetWidth);
      playerBottom = parseInt((player.style.bottom).match(/[0-9]+/));
      playerTop = (parseInt((player.style.bottom).match(/[0-9]+/)) + player.offsetHeight);

      robotLeft = parseInt((param1.style.left).match(/[0-9]+/));
      robotRight = (parseInt((param1.style.left).match(/[0-9]+/)) + param1.offsetWidth);
      robotBottom = parseInt((param1.style.bottom).match(/[0-9]+/));
      robotTop = (parseInt((param1.style.bottom).match(/[0-9]+/)) + param1.offsetHeight);

      if (playerLeft < (robotRight)
      && robotLeft < (playerRight)
      && playerBottom < (robotTop)
      && robotBottom < (playerTop)) {
        debugger;
        param1.classList.add('zapped');
        player.classList.add('zapped');
        let ghost = document.createElement('div');
        console.log(ghost, 'ghost');
        ghost.style.position = 'absolute';
        ghost.style.left = robotLeft + "px";
        ghost.style.width = robotRight - robotLeft + "px";
        ghost.style.bottom = robotBottom + "px";
        ghost.style.height = robotTop - robotBottom + "px";
        ghost.style.backgroundColor = "rgba(63,91,63,.4)";
        ghost.style.display = 'block';
        container.append(ghost);

        let dead = document.createElement('div');
        console.log(dead, 'dead');
        dead.style.position = 'absolute';
        dead.style.left = playerLeft + "px";
        dead.style.width = playerRight - playerLeft + "px";
        dead.style.bottom = playerBottom + "px";
        dead.style.height = playerTop - playerBottom + "px";
        dead.style.backgroundColor = "rgba(191,104,63,.4)";
        dead.style.display = 'block';
        container.append(dead);

        collide();
      }


   }

   // CREATE GAME ON SCREEN
   function createGame() {

      // CREATE PLAYER
      player.style.backgroundImage = `url(http://galvanize-cors-proxy.herokuapp.com/https://robohash.org/${seed}?set=set3)`;
      // CREATE BOTS
      let numRows = levels[level].length;
      for (let x = 0; x < numRows; x++) {
         let row = levels[level][x];
         let botsPerRow = row.botPicks.length;
         let offset = parseInt((480 - (50 * botsPerRow)) / botsPerRow);
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
               checkCollision(bot);
               if (Math.abs(botPosition) >= 430) {
                  botPosition = -50;
               }

               if ((botPosition) < -50) {
                  botPosition = 430;

               }
               requestAnimationFrame(moveBot);

            }

            moveBot();

         }
      }
   }
   document.onkeydown = checkKey;




   // SET UP MODAL
   function setModal(outcome) {
      modal.classList.remove('hidden');
      submit.addEventListener('click', function(event) {
         if (outcome === 'win') {
            level++;
         } else if (outcome === 'loss') {
            location.reload();
         } else {
            event.preventDefault();
            if (getSeed.value !== ''){
              seed = getSeed.value;
            }
            console.log(seed, 'seed');
            createGame();

         }
         modal.classList.add('hidden');
      });

      if (outcome === 'win') {
         modalText.innerHTML = 'Continue to next level!';
         submit.value = 'continue';
         getSeed.classList.add('hidden');
         getSeedLabel.classList.add('hidden');
      } else if (outcome === 'loss') {
         modalText.innerHTML = 'Oh no! You\'re out of lives!';
         submit.value = 'restart';
         getSeed.classList.add('hidden');
         getSeedLabel.classList.add('hidden');
      }
   }

   setModal();

});
