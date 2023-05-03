import styles from "../styles/GenericButton.module.css"

const GenericButton = ({onClick,textContent})=>{
    return (
        <button className={styles.btn} onClick={onClick}>
            {textContent}
        </button>
    )
}


export default GenericButton