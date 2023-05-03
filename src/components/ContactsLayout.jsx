import { useState } from "react"
import styles from "../styles/ContactsLayout.module.css"
import ContactCard from "./ContactCard"

function ContactsLayout({ friends, onClick }) {

    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(index);
        onClick(index);
    }

    return (
        <div className={styles.contactsContainer}>
            <h1 className={styles.yourContacts}>Your Contacts</h1>
            <div className={styles.contactsList}>
                {friends ? (
                    friends.map((friend, index) => {
                        return <ContactCard
                            active={index === activeIndex}
                            onClick={() => handleClick(index)}
                            key={index}
                            contactAddress={friend.accountAddress}
                            nickname={friend.userName} />
                    })
                ) : (<></>)}

            </div>
        </div>
    )
}

export default ContactsLayout;