import Link from "next/link"

import styles from "../styles/GenericLink.module.css"
const GenericLink = ({to ,textContent})=>{


    return (
        <Link className={styles.genericLink} href={to? to: "/"}>{textContent}</Link>
    )
}

export default GenericLink