import GenericLink from "./GenericLink"
import styles from "../styles/NavBar.module.css"

function NavBar(){

    return (
        <nav className={styles.NavBar}>
            <ul>
                <li>
                    <GenericLink to={"/"} textContent={"Home"}/>
                </li>
                <li>
                    <GenericLink to={"/register"} textContent={"Register"}/>
                </li>
                <li>
                    <GenericLink to={"/chat"} textContent={"Chat"} />
                </li>
                
                <li>
                    <GenericLink to={"/addcontacts"} textContent={"Add Contacts"} />
                </li>
            </ul>
        </nav>
    )

}

export default NavBar