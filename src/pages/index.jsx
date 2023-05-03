import Head from 'next/head'
import styles from "../styles/Home.module.css"
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { getAccount, requestAccount } from '@/web3-services/metamask_connection';
import ConnectWalletBtn from '@/components/ConnectWalletBtn';
import GenericButton from '@/components/GenericButton';
import GenericLink from '@/components/GenericLink';
import { checkUserExist } from '@/web3-services/decentralized_chat_functions';

export default function Home() {



  const [account, setAccount] = useState("")
  const [message, setMessage] = useState()
  const [userExist, setUserExist] = useState(false)
  function getAccountOnRender(){
    getAccount().then((returnedAccount) => {

      setAccount(returnedAccount)
      checkUserExist(returnedAccount).then((exist) => {
        setUserExist(exist)
      }).catch((err) => {
        console.log(err)
      });

    }).catch((err) => {
      console.log(err)
      setMessage(err.toString())
    });
  }

  
  useEffect(() => {
    getAccountOnRender()
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        getAccountOnRender()
      })
    }
  }, [])

  function handleClick() {
    requestAccount().then((result) => {
      setAccount(result)
    }).catch((err) => {

      console.log("caiu no catch")

      console.log(err)
    });
  }
  return (
    <>
      <Head>
        <title>Decentralized Chat</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header onClick={handleClick}  account={account} />

      <main className={styles.main}>
        <div className={styles.explanationSection}>
          <h1>Write on the <span>Blockchain</span></h1>
          <p >Using this app you can send direct Messages to other registered accounts.The messages are public for
            anyone to see but you cannot send messages to people that are not registered and are not on your
            Friends List</p>
          {
            account ? (

              <div className={styles.navigation}>
                <GenericLink textContent={"Register your account on the Blockchain."} to={"/register"} />
                
                {userExist?
                (<GenericLink textContent={"Your Chat"} to={"/chat"}/>)
                :
                (<></>)
                
              }

              </div>


            ) : (
              <ConnectWalletBtn onClick={handleClick} account={account} />

            )
          }
          {
            message ? <h3>{message}</h3> : <></>
          }
      
        </div>
        <img className={styles.imagem} src="https://www.svgrepo.com/show/353715/ethereum.svg" alt="imagemeDeContrato" ></img>
      </main>
    </>
  );

}
