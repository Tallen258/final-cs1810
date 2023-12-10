let numplayers = 2

export function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

export function dealCards(deck) {
    let p1 = []
    let p2 = []

    for (let x = 0; x < deck.length; x++) {
        if (x % numplayers === 0) {
            p1.push(deck[x])
        }
        else {
            p2.push(deck[x])
        }
    }
    return [p1, p2]
}
export function compareCard(card1, card2) {

    if (card1 > card2) {
        return card1
    }
    else
        return card2;

}
export function checkDeck(deck) {
    // check to see if the selected data is from p1 or p2 
    let decks = []
    if (!decks) {
        if (deck !== decks[0]) {
            decks.push(deck)
        }
    }
    else
        decks.push(deck)

}

//decide who will win and lose 


