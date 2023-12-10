
import { FetchData } from "./src/Service/svcgame.js";
import * as ui from "/src/UI/uigame.js"
let cardData = await FetchData();

// ui.PrintCards(cardData);
// let cards = ui.shuffleDeck(cardData)
// ui.PrintCards(cards);



function makeCardsDraggable() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        card.draggable = true;
        card.addEventListener("dragstart", dragStart)
        card.addEventListener("dragend", sourcedrop);
    });
}

function dragStart(event) {
    console.log("Drag Start")
    event.dataTransfer.setData("text/plain", event.target.id);
    event.currentTarget.classList.add("dragging");
}


function allowDrop(event) {
    event.preventDefault();
}

function sourcedrop(event) {
    event.preventDefault()
    const cardId = event.dataTransfer.getData("text/plain");
    const draggedCard = document.getElementById(cardId);

    if (!draggedCard) return;
    // Handle dropping the card into the player containers (player1Container, player2Container)
    const player1Container = document.getElementById("p1");
    const player2Container = document.getElementById("p2");


    if (event.target === player1Container || event.target.closest("#p1")) {
        player1Container.appendChild(draggedCard);
    } else if (event.target === player2Container || event.target.closest("#p2")) {
        player2Container.appendChild(draggedCard);
    }
}
makeCardsDraggable();
const playerContainers = document.querySelectorAll(".player-container");

playerContainers.forEach((container) => {
    container.addEventListener("dragover", allowDrop)
    container.addEventListener("drop", sourcedrop);
});




