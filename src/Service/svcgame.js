
export async function FetchData() {
    const url = "http://localhost:5157/cards"

    const response = await fetch(url)
    const res = await response.json()
    return res
}
// console.log(cards);


