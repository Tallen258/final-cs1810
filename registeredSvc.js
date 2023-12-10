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
        SavePlayersPlaying(playerName);
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
            //save current name 
            addToPlayers(element.Name)
            console.log(PlayersPlayingPlayer1)
            console.log(PlayersPlayingPlayer2)
            SavePlayersPlaying(playerName)
        });
    })





    const filter = document.createElement("form");

    filter.innerHTML += `
    <label>Filter by Name</label>
    <input type="text" id="filter"></input>
    `;

    document.body.appendChild(filter);

    const filterInput = document.getElementById("filter");

    filterInput.addEventListener("input", (event) => {
        event.preventDefault();
        const filterValue = event.target.value.toLowerCase();

        // Get all registered players
        let registeredPlayers = GetData();

        // Filter the players based on the input value
        let filteredPlayers = registeredPlayers.filter(player => {
            return player.Name.toLowerCase().includes(filterValue);
        });

        // Clear the table body
        const tableBody = document.querySelector('.registered-table tbody');
        tableBody.innerHTML = "";

        // Display filtered players
        filteredPlayers.forEach(player => {
            const newRow = document.createElement('tr');
            const cell1 = document.createElement('td');
            cell1.textContent = player.Name;
            newRow.appendChild(cell1);
            tableBody.appendChild(newRow);
        });
    })
}



function addToPlayers(playerName) {
    SavePlayersPlaying()

    if (PlayersPlayingPlayer1.length === 0) {
        PlayersPlayingPlayer1.push(playerName);
    }
    else if (!PlayersPlayingPlayer1.includes(playerName) && PlayersPlayingPlayer2.length === 0) {
        PlayersPlayingPlayer2.push(playerName);
    }
   

}

function SavePlayersPlaying() {

    localStorage.setItem("PlayersPlayingPlayer1", JSON.stringify(PlayersPlayingPlayer1));
    localStorage.setItem("PlayersPlayingPlayer2", JSON.stringify(PlayersPlayingPlayer2));

}

document.getElementById('reset-players').addEventListener('click', function () {
    reset();
});
function reset() {
    localStorage.removeItem("PlayersPlayingPlayer1")
    localStorage.removeItem("PlayersPlayingPlayer2")
}