import { Link } from "react-router-dom"
import styles from "./GameCard.module.css"

export function GameCard({ game }){
    
    return (
        <Link to={`/game/${game.id}`} className={styles.card} >
            <img src={game.thumbnail} alt={game.title} className={styles.image} />
            
            <div className={styles.info}>
                <h3 className={styles.title}>{game.title}</h3>

                <div className={styles.tags}>
                    <span className={styles.genre}>{game.genre}</span>
                    <small className={styles.platform}>{game.platform}</small>
                </div>
            </div>
        </Link>
    )
}

export default GameCard