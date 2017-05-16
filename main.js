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
   let played = false;
   let url = '';
   var logs = document.getElementsByClassName('water');
   console.log(logs, 'logs');


   function makeModalRestart() {
      character.style.display = 'none';
      if (played) {
         let myForm = document.getElementsByTagName('form')[0];
         myForm.remove();
      }
      form = document.createElement('form');
      let restart = document.createElement('input');
      restart.setAttribute('id', 'restart');
      restart.type = 'submit';
      restart.value = 'click to restart game';
      form.append(restart);
      modal.append(form);
      modal.style.display = 'block';
      restart.addEventListener("click", function(event) {});

   }

   function makeModalWin() {
      character.style.display = 'none';
      if (played) {
         let myForm = document.getElementsByTagName('form')[0];
         myForm.remove();
      }
      form = document.createElement('form');
      let newLevel = document.createElement('input');
      let celebrate = document.createElement('p');
      newLevel.setAttribute('id', 'newLevel');
      newLevel.type = 'submit';
      newLevel.value = 'continue';
      celebrate.innerHTML = 'continue to next level!';
      form.append(celebrate);
      form.append(newLevel);
      modal.append(form);
      modal.style.display = 'block';
      restart.addEventListener("click", function(event) {
         //  event.preventDefault();
         //  seed = seedInput.value;
         //  console.log(seed);
         //  modal.style.display = 'none';
         //  setupGame();
      });

   }

   function makeModal() {
      played = true;
      form = document.createElement('form');
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


         // console.log('robots');

         let robot = document.createElement('div');
         robot.className = 'robot';
         if (x === 2 || x === 3) {
            robot.className += ' water';
         }
         robot.style.backgroundImage = `url(${url})`;
         // /// GET ///////////////////


         ////////////////////////////
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



      }

   }



   function defineCharacter() {
      // console.log('characters');
      let character = document.createElement('div');
      character.id = 'character';
      character.className = 'character';
      character.style.backgroundImage = `url(${url})`;
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
            goalScore[0] = 1;
         } else if (characterPosHoriz > 120 && characterPosHoriz <= 340) {
            console.log('you win in goal 2!');
            character.style.bottom = '0px';
            character.style.left = '500px';
            characterPosVert = 0;
            characterPosHoriz = 500;
            goals[1].className += ' win';
            goalScore[1] = 1;
         } else if (characterPosHoriz > 340 && characterPosHoriz <= 560) {
            console.log('you win in goal 3!');
            character.style.bottom = '0px';
            character.style.left = '500px';
            characterPosVert = 0;
            characterPosHoriz = 500;
            goals[2].className += ' win';
            goalScore[2] = 1;
         } else if (characterPosHoriz > 560 && characterPosHoriz < 780) {
            console.log('you win in goal 4!');
            character.style.bottom = '0px';
            character.style.left = '500px';
            characterPosVert = 0;
            characterPosHoriz = 500;
            goals[3].className += ' win';
            goalScore[3] = 1;
         } else {
            console.log('you win in goal 5!');
            character.style.bottom = '0px';
            character.style.left = '500px';
            characterPosVert = 0;
            characterPosHoriz = 500;
            goals[4].className += ' win';
            goalScore[4] = 1;
         }
         if ((goalScore[0] === 1) && (goalScore[1] === 1) && (goalScore[2] === 1) && (goalScore[3] === 1) && (goalScore[4] === 1)) {
            console.log('you win it all!');
            makeModalWin();
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
      if (lives === 0) {
         console.log(' out of lives!');
         makeModalRestart();
      }
   }

   function checkCollision(param1, param2) {


      charLeft = parseInt((character.style.left).match(/[0-9]+/));
      charRight = (parseInt((character.style.left).match(/[0-9]+/)) + character.offsetWidth);
      charBottom = parseInt((character.style.bottom).match(/[0-9]+/));
      charTop = (parseInt((character.style.bottom).match(/[0-9]+/)) + character.offsetHeight);;


      // if (charBottom >= 400) {
      //    let drowning = true;
      //    for (let p = 0; p < logs.length; p++) {
      //
      //       robotLeft = parseInt((logs[p].style.left).match(/[0-9]+/));
      //       robotRight = (parseInt((logs[p].style.left).match(/[0-9]+/)) + logs[p].offsetWidth);
      //       robotBottom = parseInt((logs[p].style.bottom).match(/[0-9]+/));
      //       robotTop = (parseInt((logs[p].style.bottom).match(/[0-9]+/)) + logs[p].offsetHeight);
      //
      //       if ((((charBottom < robotTop) && (charBottom > robotBottom)) || ((charTop > robotBottom) && (charTop < robotTop)) || ((charTop === robotTop) && (charBottom === robotBottom))) && (((charLeft > robotLeft) && (charLeft < robotRight)) || ((charRight > robotLeft) && (charRight < robotRight)))) {
      //          drowning = false;
      //       } else if ((charBottom === robotBottom) && (charTop === robotTop) && (charLeft === robotLeft) && (charRight === robotRight)) {
      //          drowning = false;
      //       }
      //    }
      //    if (drowning) {
      //       console.log('fell in water!');
      //       collide();
      //    }
      // } else {


      for (let y = 0; y < param2; y++) {
         if (robot1) {
            let robotName = 'robot' + (y);
            robot1 = document.getElementsByClassName(`${robotName}`)[param1];
            robotLeft = parseInt((robot1.style.left).match(/[0-9]+/));
            robotRight = (parseInt((robot1.style.left).match(/[0-9]+/)) + robot1.offsetWidth);
            robotBottom = parseInt((robot1.style.bottom).match(/[0-9]+/));
            robotTop = (parseInt((robot1.style.bottom).match(/[0-9]+/)) + robot1.offsetHeight);



            if ((((charBottom < robotTop) && (charBottom > robotBottom)) || ((charTop > robotBottom) && (charTop < robotTop)) || ((charTop === robotTop) && (charBottom === robotBottom))) && (((charLeft > robotLeft) && (charLeft < robotRight)) || ((charRight > robotLeft) && (charRight < robotRight)))) {
               console.log('collided!');
               collide();
            }
         }

         //  }
      }
   }





   var xhr = new XMLHttpRequest();
   xhr.responseType = 'arraybuffer';
   xhr.onload = function() {
      var blb = new Blob([xhr.response], {
         type: 'image/png'
      });
      console.log(blb, 'blb');
      url = window.URL.createObjectURL(blb);
      console.log(url, 'url');
   }

   xhr.open('GET', 'http://galvanize-cors-proxy.herokuapp.com/https://robohash.org/53df');
   xhr.send();
});;
