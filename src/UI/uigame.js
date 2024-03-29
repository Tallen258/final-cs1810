let deck = BuildDeck();
deck = shuffleDeck(deck);

document.addEventListener("DOMContentLoaded", function () {
    const refreshButton = document.getElementById("refresh");
    if (refreshButton) {
        refreshButton.addEventListener("click", refreshPage);
    }
});
export function PrintCards(cards) {
    console.log(cards[0])
    const cardsContainer = document.getElementById("cardsContainer");
    if (cardsContainer !== null) {
        let cardHTML = "";
        for (let x = 0; x < cards.length; x++) {
            cardHTML += `<div class = "card" draggable= "true">
                    <p> ${cards[x].id} of ${cards[x].suite} </p>
                    <br>
                    <h1> ${cards[x].value}
                    </div>`
        }
        cardsContainer.innerHTML = cardHTML;
    }
}
export function shuffleDeck(deck) {
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
export function displayCards(p1deck, p2deck) {
    console.log(displayCards)
    console.log([p1deck, p2deck])
    const player1Container = document.getElementById("card-container1")
    const player2Container = document.getElementById('card-container2')
    player1Container.innerHTML = ""
    player2Container.innerHTML = ""

    for (let i = 0; i < p1deck.length; i++) {
        const cardElement = document.createElement("div");
        cardElement.id = p1deck[i].id + "," + p1deck[i].suite + "," + "p1" + "," + p1deck[i].value
        cardElement.classList.add("card");
        cardElement.draggable = true;
        cardElement.style = "background-color: rgb(31, 31, 113);"
        cardElement.innerHTML = `<p> ${p1deck[i].id} of ${p1deck[i].suite}</p><br><h1>${p1deck[i].value}</h1>`;
        player1Container.appendChild(cardElement);
    }
    for (let i = 0; i < p2deck.length; i++) {
        const cardElement = document.createElement("div");
        cardElement.id = p2deck[i].id + "," + p2deck[i].suite + "," + "p2" + "," + p2deck[i].value
        cardElement.classList.add("card");
        cardElement.draggable = true;
        cardElement.style = "background-color: rgb(127, 31, 31);"
        cardElement.innerHTML = `<p> ${p2deck[i].id} of ${p2deck[i].suite}</p><br><h1>${p2deck[i].value}</h1>`;
        player2Container.appendChild(cardElement);
    }

}
export function updateScore(p1score, p2score) {
    // console.log(updateScore)
    let p1 = document.getElementById("p1")
    let p2 = document.getElementById("p2")
    console.log("p1 deck", p1score)
    p1.innerHTML = `<td>${p1score}</td>`;
    p2.innerHTML = `<td>${p2score}</td>`;
}
function getPlayerNames() {
    let playersPlayingPlayer1 = JSON.parse(localStorage.getItem("PlayersPlayingPlayer1"));
    let playersPlayingPlayer2 = JSON.parse(localStorage.getItem("PlayersPlayingPlayer2"));
    return {
        playersPlayingPlayer1,
        playersPlayingPlayer2
    };
}
export function updatePlayerNames() {
    const playerNames = getPlayerNames();

    let p1 = document.getElementById("p1name");
    let p2 = document.getElementById("p2name");

    if (playerNames.playersPlayingPlayer1 != null) {
        p1.innerHTML = `<td>${playerNames.playersPlayingPlayer1} </td>`;
    }
    if (playerNames.playersPlayingPlayer2 != null) {
        p2.innerHTML = `<td>${playerNames.playersPlayingPlayer2} </td>`;
    }
}

export function winner(winningPlayer) {
    let gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    let winnerElement = document.createElement('p');
    winnerElement.textContent = `The winner is ${winningPlayer}!`;
    gameContainer.appendChild(winnerElement);

    let playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.addEventListener('click', () => {
        // Reload the page when the "Play Again" button is clicked
        location.reload();
    });
    gameContainer.appendChild(playAgainButton);
}

export function refreshPage() {
    location.reload();
}
export default {
    PrintCards,
    shuffleDeck,
    BuildDeck,
    displayCards,
    updateScore,
    updatePlayerNames,
    winner,
}