import { Link } from 'react-router-dom'
import GameCard from '../components/GameCard'
import styles from './FavoritesPage.module.css'

function FavoritesPage({ favorites }) {
    if (favorites.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <h2 className={styles.emptyTitle}>Twoja lista ulubionych jest pusta</h2>
                <p className={styles.emptyText}>
                    Przeglądaj katalog i klikaj serduszko przy grach, w które chcesz zagrać!
                </p>
                <Link to="/" className={styles.browseButton}>
                    Odkrywaj gry
                </Link>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                Twoje Ulubione Gry ({favorites.length})
            </h2>
            <div className={styles.grid}>
                {favorites.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    )
}

export default FavoritesPage