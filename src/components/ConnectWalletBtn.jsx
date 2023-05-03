
import styles from "../styles/ConnectWalletBtn.module.css"
function ConnectWalletBtn({account,onClick}){

    const  formatAddress = (walletAddress)=>{
        return walletAddress.slice(0, 5) + "..." + walletAddress.slice(35, -1);
    }

    return (
      <button className={styles.btn} onClick={onClick}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
          alt="metamask_logo"
        />
        {account ? <h3>{formatAddress(account)}</h3> : <h3>Connect Wallet</h3>}
      </button>
    );
}


export default ConnectWalletBtn