document.getElementById('addPlayerForm').addEventListener('submit', addPlayerForm);
let registeredPlayers= GetData();
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

    const cell1 = document.createElement('td');
    cell1.textContent = playerName; 

    newRow.appendChild(cell1);
    tableBody.appendChild(newRow);

    SaveRegesteredPlayers(playerName);
};

function SaveRegesteredPlayers(playerName) {
    let registeredPlayers = GetData();
    console.log(registeredPlayers)
    let playerObject = { Name: playerName, Score: 0 }
    registeredPlayers.push(playerObject)
    
    localStorage.setItem("registeredPlayers",JSON.stringify( registeredPlayers))

}


function GetData(){
let registeredPlayers = JSON.parse(localStorage.getItem("registeredPlayers"));
console.log(registeredPlayers)
if (registeredPlayers==null){
    return []
}
return registeredPlayers;

}

function restoreData(){
    console.log(restoreData)

    let registeredPlayers = GetData();
    console.log(registeredPlayers)
    const tableBody = document.querySelector('.registered-table tbody');
    tableBody.innerHTML=""
    // registeredPlayers.foreach((player)=>{
    //     const newRow = document.createElement('tr');
    //     const cell1 = document.createElement('td');
    //     cell1.textContent = player.Name; 
    //     newRow.appendChild(cell1);
    //     tableBody.appendChild(newRow);
    // })
    registeredPlayers.forEach(element => {
        console.log(element.Name)
        const newRow = document.createElement('tr');
        const cell1 = document.createElement('td');
        cell1.textContent = element.Name; 
        newRow.appendChild(cell1);
        tableBody.appendChild(newRow);
    });
}