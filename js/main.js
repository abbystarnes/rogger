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
   let playerImage;
   let botImage1;
   let botImage2;


 //  console.log(svg, 'svg');
// 'GET', `https://frogger-api.herokuapp.com/creature/${seed}`
function request(method, url){
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
 });
}

   let engineObj = null;
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
   let goalScore = [0, 1, 0, 1, 0];
   let goals = document.getElementsByClassName('goal');
   let lives = 3;
   let playerLivesCounter = 0;
   let outcome = 'default';
   // CREATE PLAYER & BOTS
   let playerPosHoriz = 190;
   let playerPosVert = 0;
   const player = document.getElementById('player');
   player.style.left = playerPosHoriz + 'px';


   /// ARROW KEY INPUT TRIGGERS MOVEMENT FUNCTIONS
   function checkKey(e) {
      if (lives > 0) {
         e = e || window.event;
         let direction = '';
         if (e.keyCode == '38') {
            // right arrow
            mover('up');
         } else if (e.keyCode == '40') {
            // down arrow
            mover('down');
         } else if (e.keyCode == '37') {
            // left arrow
            mover('left');
         } else if (e.keyCode == '39') {
            // right arrow
            mover('right');
         }
      }
   }


   // MOVE PLAYER IN DIRECTION
   function mover(direction) {
      if (direction === 'up') {
         if (((playerPosVert >= 550) && (playerPosHoriz < 86 || (playerPosHoriz > 172 && playerPosHoriz < 258) || playerPosHoriz > 344)) || playerPosVert < 550) {
            if (playerPosVert < 600) {
               playerPosVert = playerPosVert + u;
               player.style.bottom = playerPosVert + 'px';
            }
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

      // reset player to beginning
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
            outcome = 'win';
            setModal();
         }

      }
   }

   // get array of created bot objects && move them, remove movement on end of level
   class Engine {
      constructor() {
         this.botObjs = [];
         this.requestId = null;
         this.MoveRobots();
      }
      InitRobots(botObjs) {
         this.botObjs = botObjs;
      }

      MoveRobots() {
         for (let x = 0; x < this.botObjs.length; x++) {
            this.botObjs[x].move();
         }
         this.requestId = window.requestAnimationFrame(this.MoveRobots.bind(this));
      }

      RemoveRobots() {
         for (let x = 0; x < this.botObjs.length; x++) {
            this.botObjs[x].remove();
         }
         window.cancelAnimationFrame(this.requestId);
      }
   }

   // create robot class
   class Robot {
      constructor(vertPosition, horizPosition, velocity, offset, set) {
         this.verticalPosition = vertPosition;
         this.horizontalPosition = horizPosition;
         this.velocity = velocity;
         this.offset = offset;
         this.set = set;
         this.level = level;
         this.bot = this.create();
         this.requestId = this.move();
      }
      remove() {
         this.bot.parentNode.removeChild(this.bot);
      }
      create() {
         let bot = document.createElement('div');
         bot.className = 'bot';
         bot.style.bottom = this.verticalPosition + 'px';
        //  console.log(botImage1, 'bot image 1');
         bot.innerHTML = botImage1;
         container.append(bot);
         bot.style.left = this.horizontalPosition + 'px';
         return bot;
      }
      move() {
         this.horizontalPosition = this.horizontalPosition + this.velocity;
         this.bot.style.left = this.horizontalPosition + 'px';
         if (Math.abs(this.horizontalPosition) >= 430) {
            this.horizontalPosition = -50;
         }
         if ((this.horizontalPosition) < -50) {
            this.horizontalPosition = 430;
         }
         this.checkCollision(this.horizontalPosition, this.verticalPosition);
      }
      checkCollision() {
         if (playerPosHoriz < (this.horizontalPosition + 50) && (playerPosHoriz + 50) > this.horizontalPosition && playerPosVert < (this.verticalPosition + 50) && (playerPosVert + 50) > this.verticalPosition) {

            this.collide();
         }
      }
      collide() {
         console.log('oh no!');
         playerPosVert = 0;
         playerPosHoriz = 190;
         player.style.bottom = playerPosVert + 'px';
         player.style.left = playerPosHoriz + 'px';
         lives--;
         playerLives[playerLivesCounter].style.backgroundImage = '';
         playerLivesCounter++;
         if (lives === 0) {
            console.log('you lose');
            outcome = 'loss';
            setModal();
         }
      }
   }

   let playerLives = document.getElementsByClassName('life');


   // CREATE NEW LEVEL ON SCREEN
   function createGame() {
    //  console.log(botImage1, botImage2, playerImage, 'ta');
      outcome = 'default';
      engineObj = new Engine();
      // CREATE PLAYER
      for (let x = 0; x < goals.length; x++) {
         goals[x].classList.remove('win');
      }

      goalScore = [0, 1, 0, 1, 0];
      // console.log(goalScore);

      // CREATE BOTS
      let numRows = levels[level].length;
      let botObjs = [];
      for (let x = 0; x < numRows; x++) {
         let row = levels[level][x];
         let botsPerRow = row.botPicks.length;
         let offset = parseInt((480 - (50 * botsPerRow)) / botsPerRow);
         for (let y = 0; y < botsPerRow; y++) {
            let botPosVert = 0;
            let botPosHoriz = 0;
            let set = levels[level][x].botPicks[y];
            if (x < 5) {
               botPosVert = ((x + 1) * 50);
            } else {
               botPosVert = ((x + 2) * 50);
            }

            botPosHoriz = (((offset) + 50) * y);

            botObjs.push(new Robot(botPosVert, botPosHoriz, row.velocity, offset, set));
         }
      }
      engineObj.InitRobots(botObjs);
   }

   document.onkeydown = checkKey;

   submit.addEventListener('click', function(event) {
      event.preventDefault();
      if (outcome === 'win') {
         level++;
        //  console.log(level, 'level');
         engineObj.RemoveRobots();

         createGame();

      } else if (outcome === 'loss') {
         location.reload();
      } else {

         if (getSeed.value !== '') {
            seed = getSeed.value;
         }
         console.log(seed, 'seed');


         if (lives > 0) {
           request('Get', `https://frogger-api.herokuapp.com/creature/${seed}`)
              .then(function(e) {
                seed = seed + 'awdf ';
                playerImage = e;
                player.innerHTML = playerImage;
                for (let b = 0; b < playerLives.length; b++) {
                   playerLives[b].innerHTML =playerImage;
                }
                console.log(e);
                request('Get', `https://frogger-api.herokuapp.com/creature/${seed}`)
                  .then(function(de){
                         console.log('second done');
                         seed = seed + ' ';
                        //  console.log(seed, 'seed');
                         botImage1 = de;
                         createGame();
                  }), function(e){

                  };
              }), function (e){

              };

         }
      }
      modal.classList.add('hidden');
   });

   // SET UP MODAL
   function setModal() {
      modal.classList.remove('hidden');


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
