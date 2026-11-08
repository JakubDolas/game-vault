import styles from './SearchBar.module.css'

function SearchBar({ value, onChange }){

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                
                type="text"
                placeholder="Szukaj gry..."
                value = {value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default SearchBar