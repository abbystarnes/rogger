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


   // MOVEMENT && SCORING
   let playerPosHoriz = 190;
   let playerPosVert = 0;
   let goalScore = [1, 1, 0, 1, 1];
   let goals = document.getElementsByClassName('goal');
   let lives = 3;
  //  for (let z = 0; z)
  //  let life = document.createElement('div');
  //  life.classList.add('life');
  //  container.append('life');

   // CREATE PLAYER & BOTS
   const player = document.getElementById('player');
   player.style.left = playerPosHoriz + 'px';

   // IF PLAYER TOUCHES A BOT, RESET POSITION & DECREMENT LIVES
   function collide() {

      console.log('oh no!');
      playerPosVert = 0;
      playerPosHoriz = 190;
      player.style.bottom = playerPosVert + 'px';
      player.style.left = playerPosHoriz + 'px';
      lives--;
      if (lives === 0) {
         console.log('you lose');
         setModal('loss');
      }
   }

   /// ARROW KEY INPUT TRIGGERS MOVEMENT FUNCTIONS
   function checkKey(e) {
     if (lives > 0){
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
        playerPosVert = 0;
        playerPosHoriz = 190;
        player.style.bottom = playerPosVert + 'px';
        player.style.left = playerPosHoriz + 'px';
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
   function checkCollision(botPosHoriz, botPosVert, bot) {
      if (playerPosHoriz < (botPosHoriz + 50) && (playerPosHoriz + 50) > botPosHoriz && playerPosVert < (botPosVert + 50) && (playerPosVert + 50) > botPosVert) {

        //
        let ghost1 = document.createElement('div');
        ghost1.style.position = 'absolute';
        ghost1.style.left = botPosHoriz + 'px';
        ghost1.style.width = 50 + 'px';
        ghost1.style.bottom = botPosVert + 'px';
        ghost1.style.height = 50 + 'px';
        ghost1.style.backgroundColor = "rgba(63,91,63,.4)";
        ghost1.style.display = 'block';
        container.append(ghost1);

        let ghost = document.createElement('div');
        ghost.style.position = 'absolute';
        ghost.style.left = playerPosHoriz + "px";
        ghost.style.width = 50 + "px";
        ghost.style.bottom = playerPosVert + 'px';
        ghost.style.height = 50 + "px";
        ghost.style.backgroundColor = "rgba(63,91,124,.4)";
        ghost.style.display = 'block';
        container.append(ghost);
        bot.classList.add('zapped');
        player.classList.add('zapped');
        collide();
      }
   }

   // CREATE GAME ON SCREEN
   function createGame() {

      // CREATE PLAYER
      let playerImage = `url(http://galvanize-cors-proxy.herokuapp.com/https://robohash.org/${seed}?set=set3)`;
      player.style.backgroundImage = playerImage;

      // CREATE BOTS
      let numRows = levels[level].length;
      for (let x = 0; x < numRows; x++) {
         let row = levels[level][x];
         let botsPerRow = row.botPicks.length;
         let offset = parseInt((480 - (50 * botsPerRow)) / botsPerRow);
         for (let y = 0; y < botsPerRow; y++) {
           let botPosVert = 0;
           let botPosHoriz = 0;
            let bot = document.createElement('div');
            let set = levels[level][x].botPicks[y];
            bot.className = 'bot';
            if (x < 5) {
               botPosVert = ((x + 1) * 50);
               bot.style.bottom = botPosVert + 'px';
            } else {
               botPosVert = ((x + 2) * 50);
               bot.style.bottom = botPosVert + 'px';
            }
            bot.style.backgroundImage = `url(http://galvanize-cors-proxy.herokuapp.com/https://robohash.org/${seed}?set=set${set})`;
            container.append(bot);
            botPosHoriz = (((offset) + 50) * y);
            bot.style.left = botPosHoriz + 'px';

            function moveBot() {
               botPosHoriz = botPosHoriz + row.velocity;
               bot.style.left = botPosHoriz + 'px';
               if (Math.abs(botPosHoriz) >= 430) {
                  botPosHoriz = -50;
               }

               if ((botPosHoriz) < -50) {
                  botPosHoriz = 430;

               }
               requestAnimationFrame(moveBot);
               checkCollision(botPosHoriz, botPosVert, bot);
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
            console.log(level, 'level');
            let bots = container.getElementsByClassName('bot');
            while (bots[0]) {
                bots[0].parentNode.removeChild(bots[0]);
            }
            createGame();
         } else if (outcome === 'loss') {
            location.reload();
         } else {
            event.preventDefault();
            if (getSeed.value !== ''){
              seed = getSeed.value;
            }
            console.log(seed, 'seed');
            if (lives > 0){
              createGame();
            }
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
