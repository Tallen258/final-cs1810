export function PrintCards() {
    const suites = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const CardValues = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    const cardsContainer = document.getElementById("cardsContainer");
    let cardHTML = "";

    for (const suite of suites) {
        for (const value of CardValues) {
            cardHTML += `<div class = "card" draggable= "true">
            <p> ${value} of ${suite} </p>
            <br>
            <h1> ${value}
            </div>`
        }
    }
    cardsContainer.innerHTML = cardHTML;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function BuildDeck() {
    const suites = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    let deck = [];

    // create a deck of cards
    for (const suite of suites) {
        for (const value of values) {
            let card = { Value: value, Suit: suite };
            deck.push(card);
        }
    }

    return deck;
}

// Generating and shuffling the deck
let deck = BuildDeck();
console.log('Before shuffling:', deck);
deck = shuffleDeck(deck);
console.log('After shuffling:', deck);

// Calling the function to print cards in HTML
PrintCards();