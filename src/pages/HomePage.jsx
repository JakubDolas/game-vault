import { useState, useEffect } from "react"
import { fetchAllGames } from "../api/gamesApi"

import GameCard from "../components/GameCard"

import styles from "./HomePage.module.css"


function HomePage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadData = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await fetchAllGames()
            setData(data)
        } catch (err) {
            setError(err.message || 'Wystapil nieoczekiwany blad')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])
    
    return (
    <div className={styles.container}>
        <h2 className={styles.title}>Katalog gier</h2>
        
        {loading && <p className={styles.loading}>Ładowanie katalogu gier...</p>}
        
        {error && <p className={styles.error}>Wystąpił błąd: {error}</p>}
        
        {!loading && !error && (
            <div className={styles.grid}>
                {data.slice(0, 20).map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        )}
    </div>
    )
}

export default HomePage