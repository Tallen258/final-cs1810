import { dealCards } from "./src/Service/playgameSvc.js";
import { FetchData } from "./src/Service/svcgame.js";
import * as ui from "/src/UI/uigame.js"
let cardData = await FetchData();
let cards = ui.shuffleDeck(cardData)
let split = dealCards(cards)
let p1deck = split[0]
let p2deck = split[1]
p1deck = [p1deck[0], p1deck[1]]//remove when done testing
p2deck = [p2deck[0], p2deck[1]]
let battlCards = []
// ui.updateScore(p1deck, p2deck);
ui.displayCards(p1deck, p2deck)
makeCardsDraggable();
const playerContainers = document.querySelectorAll(".player-container");
playerContainers.forEach((container) => {
    container.addEventListener("dragover", allowDrop)
    container.addEventListener("drop", sourcedrop);
});
function makeCardsDraggable() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        card.draggable = true;
        card.addEventListener("dragstart", dragStart)
        card.addEventListener("drop", sourcedrop);
    });
}
function dragStart(event) {
    console.log("Drag Start")
    // console.log(event.target.id)
    event.dataTransfer.setData("text/plain", event.target.id);
    // console.log(event.dataTransfer.getData("text/plain"))
    event.currentTarget.classList.add("dragging");
}
function allowDrop(event) {
    event.preventDefault();
}
function sourcedrop(event) {
    event.preventDefault()
    // console.log("drop")
    const cardId = event.dataTransfer.getData("text/plain");
    // console.log(cardId)
    const draggedCard = document.getElementById(cardId);
    if (!draggedCard) return;
    // Handle dropping the card into the player containers (player1Container, player2Container)
    const gameboard = document.getElementById("gameboard")
    //if deck has 1 card if same check if card in balttle deck is the same player as dropping card
    if (canDrop(cardId, battlCards)) {
        gameboard.appendChild(draggedCard);
        battlCards.push(cardId)
        removeCardFromDeck(cardId)
        if (battlCards.length >= 2) {
            let winner = compareBattleDeck(battlCards)
            console.log(winner);
            addToWinner(battlCards, getOwner(winner))
            battlCards = []
            gameboard.innerHTML = ""
            // console.log(ui.updateScore(deck1,deck2))
        }
        let score1 = p1deck.length
        let score2 = p2deck.length
        ui.updateScore(score1, score2)
        ui.updatePlayerNames()
    }
    event.currentTarget.classList.remove("dragging");
    ui.displayCards(p1deck, p2deck)
    makeCardsDraggable();
    updateScoresAndCheckWinner(p1deck, p2deck)
}
function compareBattleDeck(battleDeck) {
    // console.log(battleDeck)
    if (battleDeck.length == 2) {
        if (getValue(battleDeck[0]) > getValue(battleDeck[1])) {
            return battleDeck[0]
        }
        else {
            return battleDeck[1]
        }
    }
}
function addToWinner(cardID, winner) {
    console.log(addToWinner)
    console.log(winner)
    if (winner === "p1") {
        p1deck.push({ id: getID(cardID[0]), suite: getSuite(cardID[0]), value: getValue(cardID[0]) })
        p1deck.push({ id: getID(cardID[1]), suite: getSuite(cardID[1]), value: getValue(cardID[1]) })
    }
    else {
        p2deck.push({ id: getID(cardID[0]), suite: getSuite(cardID[0]), value: getValue(cardID[0]) })
        p2deck.push({ id: getID(cardID[1]), suite: getSuite(cardID[1]), value: getValue(cardID[1]) })
    }
    // console.log(p1deck)
    // console.log(p2deck)
}
function removeCardFromDeck(cardId) {
    // console.log(removeCardFromDeck)
    let owner = getOwner(cardId)
    let value = getValue(cardId)
    let suite = getSuite(cardId)
    let temp = []

    if (owner === "p1") {
        for (let x = 0; x < p1deck.length; x++) {
            // console.log(p1deck[x])
            if (value == p1deck[x].value && suite == p1deck[x].suite) { }
            else {
                temp.push(p1deck[x])
            }
        }
        p1deck = temp
    }
    else {
        for (let x = 0; x < p2deck.length; x++) {
            if (value == p2deck[x].value && suite == p2deck[x].suite) { }
            else {
                temp.push(p2deck[x])
            }
        }
        p2deck = temp
    }
}
function canDrop(card, battleDeck) {
    if (battleDeck.length <= 0) {
        return true;
    }
    else if (battleDeck.length >= 2) {
        return false;
    }
    else {
        console.log(battleDeck[0])
        if (getOwner(card) === getOwner(battleDeck[0])) {
            return false;
        }
    }
    return true;
}
function getValue(cardId) {

    console.log(getValue)
    let deckID = cardId.split(",")
    let playerDeck = parseInt(deckID[3])
    return playerDeck
}
function getID(cardId) {
    console.log(getID)
    let deckID = cardId.split(",")
    let playerDeck = deckID[0]
    // console.log(deckID[0])

    return playerDeck
}
function getSuite(cardId) {
    console.log(getSuite)
    let deckID = cardId.split(",")
    let playerDeck = deckID[1]
    // console.log(deckID[1])

    return playerDeck
}
function getOwner(cardId) {
    // console.log(cardId)
    if (cardId && cardId.includes(',')) {
        let deckID = cardId.split(",");
        let playerDeck = deckID[2];
        return playerDeck;
    }
}
function checkEmptyDeckWinner(p1deck, p2deck) {
    console.log(p1deck)
    const p1DeckSize = p1deck.length;
    const p2DeckSize = p2deck.length;
    let gameWinner = '';

    if (p1DeckSize === 0 && p2DeckSize >= 4) {
        gameWinner = "Red Player"
        ui.winner(gameWinner);
    } else if (p2DeckSize === 0 && p1DeckSize >= 4) {
        gameWinner = "Blue Player"
        ui.winner(gameWinner);
    }
}
function updateScoresAndCheckWinner(p1deck, p2deck) {
    let score1 = p1deck.length;
    let score2 = p2deck.length;
    ui.updateScore(score1, score2);
    ui.updatePlayerNames()
    checkEmptyDeckWinner(p1deck, p2deck); // Check if a deck is empty to display the winner
}
