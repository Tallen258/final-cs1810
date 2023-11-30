
export function PrintCards() {
    const suites = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const CardValues = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    const cardsContainer = document.getElementById("cardsContainer");
    if (cardsContainer!==null){
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
            let card = { value: value, suite: suite };
            deck.push(card);
        }
    }

    return deck;
}
function dealCards(deck) {
    const player1Container = document.getElementById("p1")
    const player2Container = document.getElementById('p2')

    for (let i = 0; i < deck.length; i++) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.draggable = true;
        cardElement.innerHTML = `<p> ${deck[i].value} of ${deck[i].suite}</p><br><h1>${deck[i].value}</h1>`;

        if (i < deck.length / 2) {
            player1Container.appendChild(cardElement);
        }
        else {
            player2Container.appendChild(cardElement);
        }
    }

}

// Generating and shuffling the deck
let deck = BuildDeck();

console.log('Before shuffling:', deck);
deck = shuffleDeck(deck);
console.log('After shuffling:', deck);

// Calling the function to print cards in HTML
PrintCards();
dealCards(deck);
