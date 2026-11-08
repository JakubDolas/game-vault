import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

import { fetchGameById } from "../api/gamesApi"

function GameDetailsPage(){
    const {id} = useParams()

    const [game, setGame] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadGame = async () => {
        try {
            setLoading(true)
            setError(null)

            const game = await fetchGameById(id)
            console.log("Pobrana gra z API:", game)
            setGame(game)
        } catch (err) {
            setError(err.message || `Wystapil blad pobierania gry o id: ${id}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadGame()
    }, [id])

    return (
        <div>
            <Link to="/" style={{ color: '#00d4ff', marginBottom: '15px', display: 'inline-block'}}>
                Wróć do katalogu gier
            </Link>
            <h2>Szczegóły gry o ID {id}</h2>
        </div>
    )
}

export default GameDetailsPage