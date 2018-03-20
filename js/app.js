/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Functionb  to setup the game
function setGame(){
    const deck = document.querySelectorAll('li.card');

    //Turn all cards upside down
    deck.forEach(function(elem){
      elem.setAttribute('class', 'card');
    })

    const deckArr = Array.from(deck);
    const deckShuff = shuffle(deckArr);
    const table = document.querySelector('.deck');

    table.style.display = 'none';

    //Faster remove firstChild variant from Stackoverflow https://stackoverflow.com/a/3955238/9285923
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }

    for (i = 0; i < deckShuff.length; i++ ){
      table.appendChild(deckShuff[i]);
    }

    table.style.display = 'flex';

}

let cardsTurned = 0;
let card1;
let card2;

//Card turning function
function turnCard(evt){
  var t0 = performance.now();
  const classes = evt.target.classList;
  const nodeName = evt.target.nodeName;
  const firtsClass = classes.item(1);

  if (nodeName === 'LI' && firtsClass != 'match' && firtsClass != 'open' && cardsTurned === 0){
    cards(classes);
    card1 = evt.target;
    cardsTurned++;
  }
  else if (nodeName === 'LI' && firtsClass != 'match' && firtsClass != 'open' && cardsTurned === 1){
    cards(classes);
    card2 = evt.target;
    eval(card1, card2);
    cardsTurned = 0;
  }
  else{};

  var t1 = performance.now();
  console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
}

  function cards(classes){
    classes.toggle('open');
    classes.toggle('show');
    console.log(classes.item(1));
  }

  function eval(cardOne, cardTwo){
    const cardOneClass = cardOne.childNodes[1].classList[1]
    const cardTwoClass = cardTwo.childNodes[1].classList[1]
    const cardOneClassList = cardOne.classList
    const cardTwoClassList = cardTwo.classList

    if(cardOneClass === cardTwoClass){
      cards(cardOneClassList);
      cards(cardTwoClassList);
      cardOneClassList.toggle('match');
      cardTwoClassList.toggle('match');
    }

    else{
      setTimeout(function(){
        cards(cardOneClassList);
        cards(cardTwoClassList);
      }, 500)
    }
    console.log(cardOneClass);
    console.log(cardTwoClass);
  }



//Event for the restart button
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', setGame);

//Event for clicking on the cards
const cardDeck = document.getElementsByClassName('deck')[0];
cardDeck.addEventListener('click', turnCard);

setGame();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
