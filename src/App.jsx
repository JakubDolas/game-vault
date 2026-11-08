import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GameDetailsPage from './pages/GameDetailsPage'
import FavoritesPage from './pages/FavoritesPage'

import styles from './App.module.css'
import { useState, useEffect } from 'react'

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites")
    
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (game) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === game.id)

    if (isAlreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== game.id))
    } else {
      setFavorites([...favorites, game])
    }
  }


  return (
    <BrowserRouter>
      <div className={styles.container}>
        <header className={styles.navbar}>
          <Link to="/" className={styles.logo}>
            Game<span>Vault</span>
          </Link>
          <nav className={styles.navLinks}>
            <Link to="/" className={styles.navLink}>
              Katalog
            </Link>

            <Link to="/favorites" className={styles.navLink}>
              Ulubione ({favorites.length})
            </Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/game/:id" 
            element={
              <GameDetailsPage 
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            } 
          />

          <Route path="/favorites" 
            element={
              <FavoritesPage 
                favorites={favorites}
                onToggleFavorite={toggleFavorite}    
              />
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App