document.getElementById('addPlayerForm').addEventListener('submit', addPlayerForm);
let registeredPlayers = GetData();
let PlayersPlayingPlayer1 = [];
let PlayersPlayingPlayer2 = [];
// console.log(registeredPlayers)
restoreData();
function addPlayerForm(event) {
    event.preventDefault();
    console.log(addPlayerForm)
    const playerNameInput = document.getElementById('playerName');
    const playerName = playerNameInput.value;

    playerNameInput.value = '';

    const tableBody = document.querySelector('.registered-table tbody');
    const newRow = document.createElement('tr');
    const button = document.createElement('button')
    const cell1 = document.createElement('td');
    button.appendChild(cell1)
    cell1.textContent = playerName;
    console.log(cell1)
    button.addEventListener('click', () => {
        console.log(`Clicked ${playerName}`);
        addToPlayers(playerName);
    });
    newRow.appendChild(button);
    tableBody.appendChild(newRow);
    SaveRegesteredPlayers(playerName);
    addToPlayers(playerName)
};

function SaveRegesteredPlayers(playerName) {
    let registeredPlayers = GetData();
    console.log(registeredPlayers)
    let playerObject = { Name: playerName, Score: 0 }
    registeredPlayers.push(playerObject)

    localStorage.setItem("registeredPlayers", JSON.stringify(registeredPlayers))
}

function GetData() {
    let registeredPlayers = JSON.parse(localStorage.getItem("registeredPlayers"));
    console.log(registeredPlayers)
    if (registeredPlayers == null) {
        return []
    }
    return registeredPlayers;
}

function restoreData() {
    // console.log(restoreData)
    let registeredPlayers = GetData();
    // console.log(registeredPlayers)
    const tableBody = document.querySelector('.registered-table tbody');
    tableBody.innerHTML = ""
    registeredPlayers.forEach(element => {
        console.log(element.Name)
        const newRow = document.createElement('tr');
        const cell1 = document.createElement('td');

        const button = document.createElement('button')
        button.appendChild(cell1)
        cell1.textContent = element.Name;

        newRow.appendChild(button);
        tableBody.appendChild(newRow);
        button.addEventListener('click', () => {
            console.log(`Clicked ${element.Name}`);
            let name = element.Name
            //save current name 
            addToPlayers(element.Name)
            console.log(PlayersPlayingPlayer1)
            console.log(PlayersPlayingPlayer2)
        });
    })
    // const container = getElementById("playerform")
    const filter = document.createElement("form");

    filter.innerHTML += `
    <div class= "playerform"> 
    <label>Filter by Name</label>
    <input type="text" id="filter"></input>
    </div>
    `;
    // container.appendChild(filter)
    document.body.appendChild(filter);
    const filterInput = document.getElementById("filter");

    filterInput.addEventListener("input", (event) => {
        event.preventDefault();
        const filterValue = event.target.value.toLowerCase();
        // Get all rows inside the table
        const rows = document.querySelectorAll('.registered-table tbody tr');

        rows.forEach(row => {
            const playerName = row.textContent.toLowerCase();
            // Show/hide rows based on the filter value
            row.style.display = playerName.includes(filterValue) ? 'table-row' : 'none';
        });
    });
}

function addToPlayers(playerName) {
    if (PlayersPlayingPlayer1.length === 0) {
        PlayersPlayingPlayer1.push(playerName);
        localStorage.setItem("PlayersPlayingPlayer1", JSON.stringify(PlayersPlayingPlayer1));
    }
    else if (!PlayersPlayingPlayer1.includes(playerName) && PlayersPlayingPlayer2.length === 0) {
        PlayersPlayingPlayer2.push(playerName);
        localStorage.setItem("PlayersPlayingPlayer2", JSON.stringify(PlayersPlayingPlayer2));
    }
}

document.getElementById('reset-players').addEventListener('click', function () {
    reset();
});

function reset() {
    PlayersPlayingPlayer1 = []
    PlayersPlayingPlayer2 = []
    localStorage.removeItem("PlayersPlayingPlayer1")
    localStorage.removeItem("PlayersPlayingPlayer2")
}