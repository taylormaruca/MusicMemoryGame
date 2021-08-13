//create array of cards
const cardsArray = [
  {
    name: "adele",
    img: "img/adele.png",
    audio: "audioFiles/adele.mp3",
  },
  {
    name: "britney",
    img: "img/britney.png",
    audio: "audioFiles/britney.mp3",
  },
  {
    name: "queen",
    img: "img/queen.png",
    audio: "audioFiles/queen.mp3",
  },
  {
    name: "bruno",
    img: "img/bruno-mars.png",
    audio: "audioFiles/bruno.mp3",
  },
  {
    name: "nsync",
    img: "img/nsync.png",
    audio: "audioFiles/nsync.mp3",
  },
  {
    name: "stevie",
    img: "img/stevie-wonder.png",
    audio: "audioFiles/stevie.mp3",
  },
  {
    name: "taylor",
    img: "img/taylor-swift.png",
    audio: "audioFiles/taylor.mp3",
  },
  {
    name: "weeknd",
    img: "img/weeknd.png",
    audio: "audioFiles/weeknd.mp3",
  },
];

//duplicate the array using concat and shuffle the array
let gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

//set variables
let firstGuess = "";
let secondGuess = "";
let count = 0;
let previousTarget = null;
let delay = 1200;

//div with id of game is root for entire app
const game = document.getElementById("game");

//create a section element with the grid class (from css)
const grid = document.createElement("section");
grid.setAttribute("class", "grid");

//append the grid section to the game div
game.appendChild(grid);

gameGrid.forEach((item) => {
  //create a card element (div), add css card class, use name dataset to set name
  const card = document.createElement("div");
  card.setAttribute("data-audio", item.audio);
  card.classList.add("card");
  card.dataset.name = item.name;

  //create front of card and and front css class
  const front = document.createElement("div");
  front.classList.add("front");

  //create back of card and add back css class, back is shown when card is flipped
  const back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = `url(${item.img})`;

  //append card to grid, and front and back to each card
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

//add match css styling and pull audio
const match = () => {
  var selected = document.querySelectorAll(".selected");
  var audio = new Audio(selected[0].getAttribute("data-audio"));
  selected.forEach((card) => {
    card.classList.add("match");
  });
  audio.play();
};

//reset guesses if not correctly matched
const resetGuesses = () => {
  firstGuess = "";
  secondGuess = "";
  count = 0;

  //remove selected css styling
  var selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.remove("selected");
  });
};

// Move Counter  Var Setup 1 of 5
let clicks = 0;
// Move Counter  Var Setup 2 of 5
function countClick() {
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
}
// Move Counter  Reset Var Setup 5 of 5
function resetMoveCount() {
  clicks = 0;
  document.getElementById("clicks").innerHTML = "";
}

// Timer  Var Setup 1 of 5
var c = 0;
var t;
var timer_is_on = 0;
// Timer  function Setup 2 of 5
function timedCount() {
  document.getElementById("txt").value = c;
  c = c + 1;
  t = setTimeout("timedCount()", 1000);
}

function startTimer() {
  if (!timer_is_on) {
    timer_is_on = 1;
    timedCount();
  }
}

function stopCount() {
  clearTimeout(t);
  timer_is_on = 0;
}
// Timer  Var  Reset Var Setup 5 of 5
function resetCount() {
  clearTimeout(t);
  c = 0;
  timer_is_on = 0;
  document.getElementById("txt").value = 0;
}
//

//event listener for grid
grid.addEventListener("click", function (event) {
  //the event target is the clicked item
  let clicked = event.target;

  //do not allow the grid section itself to be selected; only select divs inside the grid
  //do not allow same element to be clicked twice
  //do not allow already matched items to be selected
  if (
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("selected")
  ) {
    return;
  }
  //only allow 2 guesses at a time
  if (count < 2) {
    count++;
    if (count === 1) {
      //assign first guess
      //added parentNode because we're clicking an inner div and the data-name is still on outer div
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add("selected");
    } else {
      //assign second guess
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add("selected");
    }
    //if both guesses are not empty
    if (firstGuess !== "" && secondGuess !== "") {
      //and the first guess matches the second match
      if (firstGuess === secondGuess) {
        //run the match function and reset the guesses
        //delay is used so that selected items stay visible for longer
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        //if not a match, reset the guesses
        setTimeout(resetGuesses, delay);
      }
    }
    //assign clicked value to previousTarget after the first click
    previousTarget = clicked;
  }
});