import { useState, useEffect } from "react"
import { fetchAllGames } from "../api/gamesApi"

import GameCard from "../components/GameCard"
import SearchBar from "../components/SearchBar"

import styles from "./HomePage.module.css"


function HomePage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')

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

    const filteredGames = data.filter((game) => {
        const matchesName = game.title.toLowerCase().includes(search.toLowerCase())

        return matchesName
    })
    
    return (
    <div className={styles.container}>
        <div class={styles.header}>
            <h2 className={styles.title}>Katalog gier</h2>
            
            <SearchBar 
                value={search} 
                onChange={setSearch} 
            />
        </div>

        {loading && <p className={styles.loading}>Ładowanie katalogu gier...</p>}
        
        {error && <p className={styles.error}>Wystąpił błąd: {error}</p>}
        
        {!loading && !error && (
            <div className={styles.grid}>
                {filteredGames.slice(0, 20).map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        )}

        {!loading && !error && filteredGames.length === 0 && (
            <p style={{ textAlign: 'center', color: '#8b9bb4', padding: '40px' }}>
                Nie znaleziono gier pasujących do: "{search}"
            </p>
        )}

    </div>
    )
}

export default HomePage