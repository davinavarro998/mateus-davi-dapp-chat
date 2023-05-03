import ConnectWalletBtn from "./ConnectWalletBtn";
import styles from "../styles/Header.module.css"
import NavBar from "./NavBar";
import Link from "next/link";
function Header({ account, onClick, containsNavBar }) {





    return (
        <header className={styles.header}>
            <Link href={"/"}>

                <img className={styles.secondLogo} src="https://2ndmarket.com.br/logo.svg" alt="logo" />

            </Link>
            {
                containsNavBar ? (<NavBar />) : (<></>)
            }

            <ConnectWalletBtn onClick={onClick} account={account} />
        </header>
    )

}



export default Header