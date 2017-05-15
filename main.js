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
      defineRobots(1, 100, 0, 1, 4, 300);
      defineRobots(2, 200, 1, -2, 3, 390);
      defineRobots(1, 400, 2, 1, 4, 300);
      defineRobots(2, 500, 3, -2, 3, 390);
      makeRobots();
      setup = true;
   }

   function defineRobots(set, row, counter, speed, number, between) {
      console.log(speed, 'speed');
      for (let x = 0; x < number; x++) {
         let offset = between * x;

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
               robotPos = robotPos + speed;

               robot.style.left = robotPos + "px";



               if (Math.abs(robotPos) >= 1100) {
                  robotPos = -150;
               }

               if ((robotPos) < -150) {
                  robotPos = 1100;
               }


               requestAnimationFrame(moveRobot);
               checkCollision(counter, number);

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

   function checkCollision(param1, param2) {


      for (let y = 0; y < param2; y++) {
         let robotName = 'robot' + (y);

         robot1 = document.getElementsByClassName(`${robotName}`)[param1];

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

      }
   }
});
