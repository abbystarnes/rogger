var theThing = document.querySelector("#thing");
var currentPos = 0;
var playerPos = -300;

let container = document.getElementById('contentContainer');
let player = document.getElementById('player');
player.style.bottom = playerPos + "px";
// console.log(container.style.width.value);
var requestAnimationFrame = window.requestAnimationFrame;
let up = 'up';
let down = 'down';
let left = 'left';
let right = 'right';



function moveThing() {
   currentPos = currentPos + 2;

   //  console.log('running');
   theThing.style.left = currentPos + "px";
   //  console.log(theThing.style.left);
   //  console.log(player.style.bottom);
   if (Math.abs(currentPos) >= 550) {
      currentPos = 0;
   }


   requestAnimationFrame(moveThing);
   if (theThing.style.left === '200px') {
      console.log('it\'s a hit!');
   }
}
moveThing();




function movePlayer(direction) {
   console.log(direction, 'direction');
   if (direction === up) {
      console.log('matches');
      playerPos = (playerPos + 15);
      player.style.bottom = playerPos + "px";

      console.log(player.style.bottom, 'psb');
   }
}


// get thing to move left to right in a loop

// get things to notice each other/ make contact

// allow for user input (arrow keys)

document.onkeydown = checkKey;

function checkKey(e) {

   e = e || window.event;

   if (e.keyCode == '38') {
      // up arrow
      movePlayer(up);
      // console.log('clicked up');
   } else if (e.keyCode == '40') {
      // down arrow
      movePlayer(down);
   } else if (e.keyCode == '37') {
      // left arrow
      movePlayer(left);
   } else if (e.keyCode == '39') {
      // right arrow
      movePlayer(right);
   }

}


let formSub = document.getElementById('submit');
formSub.addEventListener("click", getSeed);
let seed = document.getElementById('seed');
let mySeed = '';

function getSeed() {
   mySeed = seed.value;
   player.src = `https://robohash.org/${mySeed}/?set=set3`;
   theThing.src = `https://robohash.org/${mySeed}/?set=set2`;
}
