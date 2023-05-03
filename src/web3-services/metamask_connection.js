
import Web3 from "web3"

const RightNetworkId = 4002


export const isConnected = async () => {
    if (!window.ethereum) throw new Error("Please Install Metamask to run this application")
    const web3 = new Web3(window.ethereum)


    try {
        const accounts = await web3.eth.getAccounts()
        if (accounts.length) {


            return true
        }
        return false
    } catch (error) {
        throw new Error(error)
    }


}

export const isOnRightNetwork = async () => {
    const connected = await isConnected()
    if (connected) {
        const web3 = new Web3(window.ethereum)
        const currentNetwork = await web3.eth.getChainId()
        if (currentNetwork === RightNetworkId) {
            return true
        }
        else {
            return false
        }
    }
}

export const getAccount = async () => {
    const connected = await isConnected()

    if (connected) {
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()
        return accounts[0]
    }
}

export const requestAccount = async () => {
    if (!window.ethereum) throw new Error("Before Clicking Please Install Metamask")


    try {
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.requestAccounts()
        
        return accounts[0]
    } catch (error) {
        throw new Error(error)
    }


}

/*
import DecentralizedChatData from "../build/contracts/DecentralizedChat.json" assert {type: "json"}
//import GroupsData from "../build/contracts/Groups.json" assert {type: "json"}
const connectWalletBtn = document.getElementById("connectWalletBtn")
const createAccountBtn = document.getElementById("createAccountBtn")
const accountCreationSection = document.querySelector('.accountCreationSection');
const chatSection = document.querySelector(".chatSection")
const sendMessageBtn = document.getElementById("sendMessageBtn")
const messageInput = document.getElementById("messageInput")
const walletAddressInput = document.getElementById("walletAddressInput")
const sendFriendRequestBtn = document.getElementById("sendFriendRequestBtn")

const DEPLOYED_NETWORK = "5777"
const web3 = new Web3(window.ethereum)
const dc = new web3.eth.Contract(DecentralizedChatData.abi, DecentralizedChatData.networks[DEPLOYED_NETWORK].address)
if (window.ethereum === "undefined") {
    alert("Please Install Metamask")
}
window.ethereum.on("accountsChanged", async () => {
    const connectedAccount = await requestAccounts()
    connectWalletBtn.innerHTML = connectedAccount.slice(0, 7) + "..." + connectedAccount.slice(35, -1);

})
console.log(window.ethereum)
async function requestAccounts() {
    if (window.ethereum !== "undefined") {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
            const rightNetwork = await checkChain()
            if (rightNetwork) {
                return accounts[0]
            }
            else {
                alert("You need To Change your network to the right Network")
            }
        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    }
    else {
        alert("Please Install Metamask")
    }
}

async function checkChain() {
    try {
        let connectedChain = await web3.eth.getChainId()
        console.log(connectedChain)
        if (connectedChain === 1337) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        console.log(error)
    }
}
async function checkUserExist() {
    const msgSender = await requestAccounts()
    try {
        const exist = await dc.methods.checkUserExists(msgSender).call({ from: msgSender })

        return exist

    } catch (error) {
        console.log(error)
        alert(JSON.stringify(error))
    }
}
async function createAccount(nickname) {
    const msgSender = await requestAccounts()
    try {
        const tx = await dc.methods.createAccount(nickname).send({ from: msgSender })
        alert("Account Created!")
        return tx

    } catch (error) {
        alert(JSON.stringify(error))
        console.log(error)
    }
}
async function sendMessage(to, messageContent) {
    try {
        const connectedAccount = await isConnected()
        if (connectedAccount) {
            const tx = await dc.methods.sendMessage(to, messageContent).send({ from: connectedAccount })
            return tx
        }
    } catch (error) {
        console.log(error)
    }

}
async function getPendingRequests(){
    try {
        const connectedAccount = await isConnected()
        if (connectedAccount) {
            const pendingRequests = await dc.methods.getPendingRequests().call({ from: connectedAccount })
            return pendingRequests
        }
    } catch (error) {
        console.log(error)
    }
}
async function acceptPendingRequest(index){
    try {
        const connectedAccount = await isConnected()
        if (connectedAccount) {
            const tx = await dc.methods.acceptPendingRequest(index).send({ from: connectedAccount })
            return tx
        }
    } catch (error) {
        console.log(error)
    }
}
async function denyPendingRequest(index) {
    try {
        const connectedAccount = await isConnected()
        if (connectedAccount) {
            const tx = await dc.methods.denyPendingRequest(index).send({ from: connectedAccount })
            return tx
        }
    } catch (error) {
        console.log(error)
    }
}
sendMessageBtn.addEventListener("click", () => {

    const to = document.querySelector(".friendAddress").innerHTML // address when you click a contact

    const wroteMessage = messageInput.value
    if (!wroteMessage.length) {
        alert("Your message is empty")
    }
    else {

        sendMessage(to, wroteMessage).then((transaction) => {
            if(transaction){
                //console.log(transaction.events.MessageSent.returnValues.message)
                const confirmedMsg = document.createElement("p")
                confirmedMsg.textContent = transaction.events.MessageSent.returnValues.message
                confirmedMsg.className = "user_message"
                document.querySelector(".chatBox").appendChild(confirmedMsg)
                messageInput.value = "";
            }
        }).catch((err) => {
            if(err){
                alert("Error on sending Message")
            }
        });
    }



})
async function sendFriendRequest(accountAddress){
    try {
        const connectedAccount = await isConnected()
        if (connectedAccount) {
            const tx = await dc.methods.sendFriendRequest(accountAddress).send({ from: connectedAccount })
            return tx
        }
    } catch (error) {
        console.log(error)
    }

}
sendFriendRequestBtn.addEventListener("click",()=>{

    sendFriendRequest(walletAddressInput.value).then((requestSuccess) => {
        if(Success){
            alert("Friend request sent!")
        }
    }).catch((err) => {
        console.log(err)
    });
})

async function getFriends() {
    try {
        const connectedAccount = await isConnected()
        if (connectedAccount) {
            const friends = await dc.methods.getFriends().call({ from: connectedAccount })
            return friends
        }
    } catch (error) {
        console.log(error)
    }

}
async function readMessage(friendAddress) {
    try {
        const connectedAccount = await isConnected()
        if (connectedAccount) {
            const friends = await dc.methods.readMessage(friendAddress).call({ from: connectedAccount })
            return friends
        }
    } catch (error) {
        console.log(error)
    }

}

connectWalletBtn.addEventListener("click", async () => {

    const connectedAccount = await requestAccounts()
    connectWalletBtn.innerHTML = connectedAccount.slice(0, 7) + "..." + connectedAccount.slice(35, -1);
    await renderCorrectInfo()

})

createAccountBtn.addEventListener("click", async () => {
    const nickname = document.getElementById("nicknameInput").value
    if (nickname.length > 0) {
        const exist = await checkUserExist()
        if (exist) {
            alert("You already have an account")
        }
        else {

            await createAccount(nickname)
            await renderCorrectInfo()
        }
    }
    else {
        alert("Type a valid Nickname")
    }

})


async function renderCorrectInfo() {


    const exist = await checkUserExist()
    const connectedAccount = await isConnected()

    if (exist) {

        dc.events.MessageSent({},(error,event)=>{
            if(error) throw new Error("There is an error on the contract event")
            
        
            
            if ((connectedAccount.toLowerCase() === event.returnValues.to.toLowerCase()) && event.returnValues.from.toLowerCase() == document.querySelector(".friendAddress").innerHTML.toLowerCase()){
                const receivedMessage = document.createElement("p")
                receivedMessage.textContent = event.returnValues.message
                receivedMessage.className = "received_message"
                document.querySelector(".chatBox").appendChild(receivedMessage)
            } 
        })

        accountCreationSection.style.display = "none"
        chatSection.style.display = "flex"
        const friends = await getFriends()
        document.querySelector(".contactsList").innerHTML = ""
        document.querySelector(".friendRequestsList").innerHTML = ""
        let contacts = new Array(friends.length)
        for (let i = 0; i < contacts.length; i++) {
            const contactCard = document.createElement("div")
            const friendName = document.createElement("h2")
            const friendAddress = document.createElement("p")
            contactCard.appendChild(friendName)
            contactCard.appendChild(friendAddress)
            contacts[i] = contactCard
        }
        for (let i = 0; i < contacts.length; i++) {
            contacts[i].className = "contactCard"

        }
        for (let i = 0; i < contacts.length; i++) {
            contacts[i].firstChild.innerHTML = friends[i].userName
            contacts[i].lastChild.innerHTML = formatAddress(friends[i].accountAddress)

            document.querySelector(".contactsList").appendChild(contacts[i])
        }
        console.log(connectedAccount)
        for (let i = 0; i < contacts.length; i++) {
            contacts[i].addEventListener("click", async () => {

                document.querySelector(".chatBox").innerHTML = ""
                document.querySelector(".nickname").innerHTML = friends[i].userName
                document.querySelector(".friendAddress").innerHTML = friends[i].accountAddress
                if (friends[i].accountAddress == document.querySelector(".friendAddress").innerHTML) {
                    for (let j = 0; j < contacts.length; j++) {
                        contacts[j].style.backgroundColor = ""


                    }
                    contacts[i].style.backgroundColor = "#4660e6"
                }
                const chatLog = await readMessage(friends[i].accountAddress)
                console.log(chatLog)
                const chat = new Array(chatLog.length)
                for (let j = 0; j < chat.length; j++) {
                    const msg = document.createElement("p")

                    if (chatLog[j].sender.toLowerCase() == connectedAccount.toLowerCase()) {
                        msg.className = "user_message"
                        msg.innerHTML = chatLog[j]._msg
                    } else {
                        msg.className = "received_message"
                        msg.innerHTML = chatLog[j]._msg
                    }
                    chat[j] = msg
                    document.querySelector(".chatBox").appendChild(chat[j])
                }

            })
        }

        console.log(contacts)
        const pendingRequests = await getPendingRequests()
        console.log(pendingRequests)
        let requests = new Array(pendingRequests.length)
        for (let i = 0; i < requests.length; i++) {
            const requestCard = document.createElement("div")
            const requestName = document.createElement("h1")
            const requestAddress = document.createElement("p")
            const acceptButton = document.createElement("button")
            const denyButton = document.createElement("button")

            requestCard.appendChild(requestName)
            requestCard.appendChild(requestAddress)
            requestCard.appendChild(acceptButton)
            requestCard.appendChild(denyButton)
            
            requests[i] = requestCard 
        }

        for (let i = 0; i < requests.length; i++) {
            requests[i].className = "requestCard"
            requests[i].children[2].className = "acceptButton"
            requests[i].children[3].className = "denyButton" 
            
        }
        console.log(requests)
        for (let i = 0; i < requests.length; i++) {
            requests[i].children[0].textContent = pendingRequests[i].name
            requests[i].children[1].textContent = pendingRequests[i].pubKey
            requests[i].children[2].textContent = "Accept"
            requests[i].children[3].textContent = "Deny"
            
        }
        for (let i = 0; i < requests.length; i++) {
            document.querySelector(".friendRequestsList").appendChild(requests[i])
            
        }
        //accept and deny friend request buttons
        for (let i = 0; i < requests.length; i++) {
            //accept button functionality 
            requests[i].children[2].addEventListener("click",()=>{
                acceptPendingRequest(i).then((result) => {
                    if(result){
                        alert("Accepted! Refresh the page to see your new contact.")
                        
                    }
                }).catch((err) => {
                    console.log(err)
                });
            })
            //deny button functionality
            requests[i].children[3].addEventListener("click",()=>{
                denyPendingRequest(i).then((result) => {
                    if(result){
                        alert("Denied!")
                    }
                }).catch((err) => {
                    console.log(err)
                });
            })
        }
    }
    else {
        accountCreationSection.style.display = "flex"
        chatSection.style.display = "none"

    }
}
async function isConnected() {
    const accounts = await ethereum.request({ method: "eth_accounts" })
    if (accounts.length) {
        return accounts[0]
    }
    else {
        return false
    }
}
window.onload = async (event) => {
    const connectedAccount = await isConnected()
    const rightNetwork = await checkChain()
    if (connectedAccount.length && rightNetwork) {
        connectWalletBtn.innerHTML = connectedAccount.slice(0, 7) + "..." + connectedAccount.slice(35, -1);
        renderCorrectInfo()
    }
}
window.ethereum.on("accountsChanged", () => {
    renderCorrectInfo()
})
function formatAddress(address) {
    return address.slice(0, 7) + "..." + address.slice(35, -1);
}
*/