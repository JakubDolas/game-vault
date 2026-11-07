import { useParams, Link } from "react-router-dom"

function GameDetailsPage(){
    const {id} = useParams()

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