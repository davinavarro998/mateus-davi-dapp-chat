
import Header from "@/components/Header"
import Head from "next/head"
import { useEffect, useState } from "react"
import { getAccount, requestAccount } from "@/web3-services/metamask_connection"
import { acceptPendingRequest, checkUserExist, getPendingRequests, sendFriendRequest } from "@/web3-services/decentralized_chat_functions"
import styles from "../styles/AddContacts.module.css"
import GenericForm from "@/components/GenericForm"
import GenericLink from "@/components/GenericLink"
import ContactCard from "@/components/ContactCard"

function AddContacts() {

    const [account, setAccount] = useState("")
    const [userExist, setUserExist] = useState(false)
    const [contactAddressInput, setContactAddressInput] = useState("")
    const [loadingTx, setLoadingTx] = useState(false)
    const [pendingRequests, setPendingRequests] = useState([])
    async function getAccountOnRender() {
        try {
            const returnedAccount = await getAccount();
            setAccount(returnedAccount);
            const exist = await checkUserExist(returnedAccount);
            setUserExist(exist);
            const returnedPendingRequests = await getPendingRequests(returnedAccount)
            console.log(returnedPendingRequests)
            setPendingRequests(returnedPendingRequests)

        } catch (err) {
            console.log(err);

        }
    }

    async function handleRequestButtonClick() {
        if (contactAddressInput) {
            setLoadingTx(true)
            try {
                const tx = await sendFriendRequest(contactAddressInput, account)
                if (tx) {
                    setLoadingTx(false)
                    alert("Friend Request Sent! await the response.")
                    console.log(tx)
                }
            } catch (error) {
                setLoadingTx(false)
                console.log(error)
            }

        }
        else {
            alert("Type a valid address")
        }
    }
    async function handleClick() {
        try {
            const result = await requestAccount();
            setAccount(result);
        } catch (err) {
            console.log("caiu no catch");
            console.log(err);
        }
    }
    async function handleAcceptClick(index) {
        try {
            const tx = await acceptPendingRequest(account, index)
            if (tx) {
                console.log(tx)
                alert("Request Accepted! \n Check the Chat page to see your contact there")
            }
            return tx
        } catch (error) {
            console.log(error)
        }
    }
/*     async function handleDenyClick(index) {
        try {
            const tx = await denyPendingRequest(account, index)
            if (tx) {
                console.log(tx)
            }
        } catch (error) {
            console.log(error)
        }
    } */
    useEffect(() => {
        getAccountOnRender()
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", () => {
                getAccountOnRender()
            })
        }
    }, [])
    return (
      <>
        <Head>
          <title>Decentralized Chat</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="https://2ndmarket.com.br/icon.svg" />
        </Head>
        <Header containsNavBar={true} account={account} onClick={handleClick} />
        {loadingTx ? <h1>Processing your Transaction!</h1> : <></>}
        {account && userExist ? (
          <main className={styles.addFriendMain}>
            <GenericForm
              btnOnClick={handleRequestButtonClick}
              handleOnChange={(e) => {
                setContactAddressInput(e.target.value);
              }}
              buttonPlaceHolder={"Send friend request"}
              label={"Send a Friend Request"}
              inputPlaceHolder={"Paste the address of a registered user"}
            />

            <div className={styles.pendingRequestsSection}>
              <h1>Pending Requests</h1>
              <div className={styles.pendingRequestList}>
                {/* <ContactCard acceptable={true} nickname={"Anything"} contactAddress={"0xxxxxxxxx"} /><ContactCard acceptable={true} nickname={"Anything"} contactAddress={"0xxxxxxxxx"} /> */}
                {pendingRequests.length ? (
                  pendingRequests.map((pendingRequest, index) => {
                    return (
                      <ContactCard
                        key={index}
                        connectedAccount={account}
                        acceptOnClick={() => {
                          handleAcceptClick(index);
                        }}
                        acceptable={true}
                        nickname={pendingRequest.name}
                        contactAddress={pendingRequest.pubKey}
                      />
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </main>
        ) : (
          <main className={styles.addFriendMain}>
            <div>
              <h1>Connect your Wallet First!</h1>
              <h2>Are you Connected?</h2>
              <GenericLink to={"/register"} textContent={"Register HERE!"} />
            </div>
          </main>
        )}
      </>
    );

}


export default AddContacts