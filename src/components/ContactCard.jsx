import { FaCheckCircle } from 'react-icons/fa';
import styles from "../styles/ContactCard.module.css"
import { useEffect, useState } from 'react';
import { alreadyFriends } from '@/web3-services/decentralized_chat_functions';

function ContactCard({ nickname, contactAddress, onClick, acceptable, acceptOnClick, active, connectedAccount, }) {
    const [areFriends,setAreFriends] = useState(false)
    const formatAddress = (walletAddress) => {
        return walletAddress.slice(0, 5) + "..." + walletAddress.slice(35, -1);
    }

    if (acceptable) {

        useEffect(() => {
            alreadyFriends(connectedAccount,contactAddress).then((result) => {
                setAreFriends(result)
            }).catch((err) => {
                console.log(err)
            });
            

        }, [connectedAccount, contactAddress])
    }

    
        
    if(!acceptable){
        return (

            <div onClick={onClick} style={active ? { "backgroundColor": "#4660e6" } : {}

            } className={acceptable ? (styles.requestCard) : styles.contactCard}>

                <h1>{nickname}</h1>
                <p>{formatAddress(contactAddress)}</p>
                {acceptable && !areFriends ? (

                    <div>
                        <div onClick={acceptOnClick} className={styles.accept}><FaCheckCircle /></div>



                    </div>
                ) : (<></>)}

            </div>
        )
    
    }
    if (acceptable && !areFriends )
    return (
        
        <div onClick={onClick}  style={active ? { "backgroundColor": "#4660e6" } : {}
        
        } className={acceptable ? ( styles.requestCard) :  styles.contactCard}>
            
            <h1>{nickname}</h1>
            <p>{formatAddress(contactAddress)}</p>
            {acceptable&&!areFriends ? (
                
                <div>
                    <div onClick={acceptOnClick} className={styles.accept}><FaCheckCircle /></div>
                    


                </div>
            ) : (<></>)}

        </div>
    )

}


export default ContactCard