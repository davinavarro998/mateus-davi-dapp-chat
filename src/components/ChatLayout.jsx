


import styles from "../styles/ChatLayout.module.css"

function ChatLayout({contactNickname,contactAddress,chatLog,connectedAccount,onClick,onChange,messageInput}){

    function convertUnixTimestampToLocalDateString(unixTimestamp) {
        // Create a new date object with the Unix epoch timestamp
        const date = new Date(unixTimestamp * 1000);


        // Calculate the local time by subtracting the local time offset
        const localTime = new Date(date.getTime() );

        // Get the components of the local date and time
        const day = String(localTime.getDate()).padStart(2, '0');
        const month = String(localTime.getMonth() + 1).padStart(2, '0');
        const year = localTime.getFullYear();
        const hours = String(localTime.getHours()).padStart(2, '0');
        const minutes = String(localTime.getMinutes()).padStart(2, '0');

        // Create the local date string in the desired format
        const localDateString = `${day}/${month}/${year} ${hours}:${minutes}`;

        // Return the local date string
        return localDateString;
    }
    return (
        <div className={styles.ChatLayout}>
            <div className={styles.chatHeader}>
                <img src="https://2ndmarket.com.br/icon.svg" alt="" />
                <div >
                        {contactAddress? (
                        <>
                            <h1>{contactNickname}</h1>
                            <p>{contactAddress}</p>
                        </>
                        ) : (
                        <>
                            <h1>Click on one of your contacts!</h1>
                            <p>0x0000000000000000000000000000000000000000</p>
                        </>
                        )}
                        
                    </div>
            </div>
            <div className={styles.chatBox}>
                
            
                {chatLog.length&& contactAddress? 
                
                chatLog.map((message,index)=>{

                    
                    return (
                        
                        <div key={index} className={message.sender.toLowerCase()==connectedAccount.toLowerCase()? styles.userMessage : styles.receivedMessage}>
                            <p className={styles.textContent}>{message._msg}</p>
                            <p>{convertUnixTimestampToLocalDateString(message.timestamp)}</p>
                        </div>
                    )
                })
                :<></>}
            </div>
            <div className={styles.chatFooter}>
               <input value={messageInput} onChange={onChange} placeholder="Type your Message" type="text"  />
               <button onClick={onClick}>Send</button>
            </div>
        </div>
    )

}

export default ChatLayout