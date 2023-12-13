
export async function FetchData() {

    // const url = "https://ta1810-finalproject.azurewebsites.net/cards" 
    const url = "http://localhost:5157/cards"

    const response = await fetch(url)
    const res = await response.json()
    return res
}


