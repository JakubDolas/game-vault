const BASE_URL = '/api'

export async function fetchAllGames(category = '') {
    const url = category ? `${BASE_URL}/games?category=${category}` : `${BASE_URL}/games`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Nie udało się pobrać gier')
    }

    return await response.json()
}

export async function fetchGameById(id) {
    const response = await fetch(`${BASE_URL}/game?id=${id}`)

    if (!response.ok) {
        throw new Error(`Nie udało się pobrać szczegółów gry o ID ${id}`)
    }

    return await response.json()
}