//create array of cards
const cardsArray = [
  {
    name: "hamster",
    img: "img/icons8-cute-hamster-80.png",
  },
  {
    name: "pumpkin",
    img: "img/icons8-cute-pumpkin-80.png",
  },
  {
    name: "skull",
    img: "img/icons8-cute-skull-80.png",
  },
  {
    name: "termite",
    img: "img/icons8-cute-termite-50.png",
  },
  {
    name: "termiteLarge",
    img: "img/icons8-cute-termite-96.png",
  },
  {
    name: "croissant",
    img: "img/icons8-kawaii-croissant-100.png",
  },
  {
    name: "cupcake",
    img: "img/icons8-kawaii-cupcake-90.png",
  },
  {
    name: "frenchFries",
    img: "img/icons8-kawaii-french-fries-100.png",
  },
  {
    name: "jam",
    img: "img/icons8-kawaii-jam-100.png",
  },
  {
    name: "pizza",
    img: "img/icons8-kawaii-pizza-100.png",
  },
  {
    name: "shellfish",
    img: "img/icons8-kawaii-shellfish-100.png",
  },
  {
    name: "rabbit",
    img: "img/icons8-year-of-rabbit-100.png",
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
  const card = document.createElement('div')
  card.classList.add('card')
  card.dataset.name = item.name

  //create front of card and and front css class
  const front = document.createElement('div')
  front.classList.add('front')

  //create back of card and add back css class, back is shown when card is flipped
  const back = document.createElement('div')
  back.classList.add('back')
  back.style.backgroundImage = `url(${item.img})`

  //append card to grid, and front and back to each card
  grid.appendChild(card)
  card.appendChild(front)
  card.appendChild(back)
})

//add match css styling
const match = () => {
  var selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.add("match");
  });
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

//event listener for grid
grid.addEventListener("click", function (event) {
  //the event target is the clicked item
  let clicked = event.target;

  //do not allow the grid section itself to be selected; only select divs inside the grid
  //do not allow same element to be clicked twice
  //do not allow already matched items to be selected
  if (clicked.nodeName === "SECTION" || clicked === previousTarget || clicked.parentNode.classList.contains('selected')) {
    return;
  }
  //only allow 2 guesses at a time
  if (count < 2) {
    count++;
    if (count === 1) {
      //assign first guess
      //added parentNode because we're clicking an inner div and the data-name is still on outer div
      firstGuess = clicked.parentNode.dataset.name
      console.log(firstGuess)
      clicked.parentNode.classList.add('selected')
    } else {
      //assign second guess
      secondGuess = clicked.parentNode.dataset.name
      console.log(secondGuess)
      clicked.parentNode.classList.add('selected')
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