import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GameDetailsPage from './pages/GameDetailsPage'
import styles from './App.module.css'

function App() {
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
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<GameDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App