import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

import { fetchGameById } from "../api/gamesApi"

import styles from "./GameDetailsPage.module.css"

function GameDetailsPage({ favorites, onToggleFavorite }){
    const {id} = useParams()

    const [game, setGame] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const isFavorite = favorites.some((fav) => fav.id === game?.id)

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

    if (loading) {
        return <div className={styles.loading}>Ładowanie szczegółów gry...</div>
    }

    if (error || !game) {
        return <div className={styles.error}>Błąd: {error || 'Nie znaleziono gry'}</div>
    }

        return (
        <div className={styles.container}>
            <Link to="/" className={styles.backButton}>
                ← Wróć do katalogu
            </Link>

            {/* 1. Nagłówek: Okładka + Informacje */}
            <div className={styles.headerSection}>
                <img src={game.thumbnail} alt={game.title} className={styles.image} />
                
                <div className={styles.headerInfo}>
                    <h1 className={styles.title}>{game.title}</h1>
                    <span className={styles.genre}>{game.genre}</span>
                    
                    <div className={styles.metaData}>
                        <p><strong>Platforma:</strong> {game.platform}</p>
                        <p><strong>Wydawca:</strong> {game.publisher}</p>
                        <p><strong>Data premiery:</strong> {game.release_date}</p>
                    </div>

                    <div className={styles.buttonGroup}>
                        <a 
                            href={game.game_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className={styles.playButton}
                        >
                            Zagraj za darmo
                        </a>
                        <button 
                            className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
                            onClick={() => onToggleFavorite(game)}
                            >
                            {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. Sekcja: O grze */}
            <div className={styles.section}>
                <h2>O grze</h2>
                <p className={styles.description}>{game.description}</p>
            </div>

            {/* 3. Sekcja: Zrzuty ekranu */}
            {game.screenshots && game.screenshots.length > 0 && (
                <div className={styles.section}>
                    <h2>Zrzuty ekranu</h2>
                    <div className={styles.screenshotsGrid}>
                        {game.screenshots.map((screen) => (
                            <img 
                                key={screen.id} 
                                src={screen.image} 
                                alt="Zrzut ekranu" 
                                className={styles.screenshot} 
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* 4. Sekcja: Minimalne wymagania sprzętowe */}
            {game.minimum_system_requirements && (
                <div className={styles.section}>
                    <h2>Minimalne wymagania sprzętowe (PC)</h2>
                    <div className={styles.requirementsGrid}>
                        <div className={styles.reqCard}>
                            <span>System:</span>
                            <strong>{game.minimum_system_requirements.os || 'Brak danych'}</strong>
                        </div>
                        <div className={styles.reqCard}>
                            <span>Procesor:</span>
                            <strong>{game.minimum_system_requirements.processor || 'Brak danych'}</strong>
                        </div>
                        <div className={styles.reqCard}>
                            <span>Pamięć RAM:</span>
                            <strong>{game.minimum_system_requirements.memory || 'Brak danych'}</strong>
                        </div>
                        <div className={styles.reqCard}>
                            <span>Karta graficzna:</span>
                            <strong>{game.minimum_system_requirements.graphics || 'Brak danych'}</strong>
                        </div>
                        <div className={styles.reqCard}>
                            <span>Dysk:</span>
                            <strong>{game.minimum_system_requirements.storage || 'Brak danych'}</strong>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GameDetailsPage