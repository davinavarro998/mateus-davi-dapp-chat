//Uncomment below if your are getting the abi and the address from the build folder

/*  import DECENTRALIZED_CHAT_DATA from "../build/contracts/DecentralizedChat.json"

const DECENTRALIZED_CHAT_ABI = DECENTRALIZED_CHAT_DATA.abi
const DECENTRALIZED_CHAT_ADDRESS =
DECENTRALIZED_CHAT_DATA.networks[5777].address;

*/


//Uncomment below if your are getting the abi and the address from the AddressAbi.js file
import { DECENTRALIZED_CHAT_ADDRESS,DECENTRALIZED_CHAT_ABI } from "./AddressAbi";
 



import Web3 from "web3"


export const getDecentralizedChat = ()=>{
    if(!window.ethereum) throw new Error("No Metamask")
    const web3 = new Web3(window.ethereum)
    return new web3.eth.Contract(DECENTRALIZED_CHAT_ABI,DECENTRALIZED_CHAT_ADDRESS)
}
export const createAccount = async (nickname, msgSender) => {

    try {
        const web3 = new Web3(window.ethereum)
        const decentralizedChat = new web3.eth.Contract(DECENTRALIZED_CHAT_ABI, DECENTRALIZED_CHAT_ADDRESS)
        const tx = await decentralizedChat.methods.createAccount(nickname).send({ from: msgSender })
        return tx
    } catch (error) {
        throw new Error("Create Account Failed")
    }

}

export const checkUserExist = async (msgSender) => {

    try {
        const web3 = new Web3(window.ethereum)
        const decentralizedChat = new web3.eth.Contract(DECENTRALIZED_CHAT_ABI, DECENTRALIZED_CHAT_ADDRESS)
        const exists = await decentralizedChat.methods.checkUserExists(msgSender).call({ from: msgSender })

        return exists


    } catch (error) {
        throw new Error("Could not check if user exists")
    }

}

export const getFriends = async (msgSender)=>{
    try {
        const web3 = new Web3(window.ethereum)
        const decentralizedChat = new web3.eth.Contract(DECENTRALIZED_CHAT_ABI, DECENTRALIZED_CHAT_ADDRESS)
        const friends = await decentralizedChat.methods.getFriends().call({ from: msgSender })

        return friends


    } catch (error) {
        throw new Error("Could not get friends list.")
    }
}

export const readMessage = async (msgSender,friendAddress) =>{
    try {
        const web3 = new Web3(window.ethereum)
        const decentralizedChat = new web3.eth.Contract(DECENTRALIZED_CHAT_ABI, DECENTRALIZED_CHAT_ADDRESS)
        const friends = await decentralizedChat.methods.readMessage(friendAddress).call({ from: msgSender })

        return friends


    } catch (error) {
        throw new Error("Could not get Chatlog.")
    }

}


export const sendMessage = async (msgSender, friendAddress,messageContent) => {
    try {
        const web3 = new Web3(window.ethereum)
        const decentralizedChat = new web3.eth.Contract(DECENTRALIZED_CHAT_ABI, DECENTRALIZED_CHAT_ADDRESS)
        const tx = await decentralizedChat.methods.sendMessage(friendAddress,messageContent).send({ from: msgSender })

        return tx


    } catch (error) {
        throw new Error("Could not send Message.")
    }

}


export const sendFriendRequest = async(targetAddress,msgSender)=>{
    try {
        const web3 = new Web3(window.ethereum)
        const decentralizedChat = new web3.eth.Contract(DECENTRALIZED_CHAT_ABI, DECENTRALIZED_CHAT_ADDRESS)
        const tx = await decentralizedChat.methods.sendFriendRequest(targetAddress).send({ from: msgSender })

        return tx


    } catch (error) {
        throw new Error("Could not send Friend Request.")
    }
}
export const acceptPendingRequest = async (msgSender,index) =>{
    try {
        const web3 = new Web3(window.ethereum)
        const decentralizedChat = new web3.eth.Contract(DECENTRALIZED_CHAT_ABI, DECENTRALIZED_CHAT_ADDRESS)
        const tx = await decentralizedChat.methods.acceptPendingRequest(index).send({ from: msgSender })

        return tx


    } catch (error) {
        throw new Error("Could not send accept Pending Request.")
    }
}

export const denyPendingRequest = async (msgSender,index) =>{
    try {
        const web3 = new Web3(window.ethereum)
        const decentralizedChat = new web3.eth.Contract(DECENTRALIZED_CHAT_ABI, DECENTRALIZED_CHAT_ADDRESS)
        const tx = await decentralizedChat.methods.denyPendingRequest(index).send({ from: msgSender })

        return tx


    } catch (error) {
        throw new Error("Could not deny Pending Request.")
    }
}
export const getDenyRequests = async (msgSender)=>{
    try {
        const web3 = new Web3(window.ethereum)
        const decentralizedChat = new web3.eth.Contract(DECENTRALIZED_CHAT_ABI, DECENTRALIZED_CHAT_ADDRESS)
        const denyRequests = await decentralizedChat.methods.getDenyRequests().call({ from: msgSender })

        return denyRequests


    } catch (error) {
        throw new Error("Could not get  Denied Requests.")
    }

}
export const getPendingRequests = async (msgSender)=>{
    try {
        const web3 = new Web3(window.ethereum)
        const decentralizedChat = new web3.eth.Contract(DECENTRALIZED_CHAT_ABI, DECENTRALIZED_CHAT_ADDRESS)
        const pendingRequests = await decentralizedChat.methods.getPendingRequests().call({ from: msgSender })

        return pendingRequests


    } catch (error) {
        throw new Error("Could not get PendingRequests.")
    }

}

export const alreadyFriends = async (msgSender,account2)=>{
    try {
        const web3 = new Web3(window.ethereum)
        const decentralizedChat = new web3.eth.Contract(DECENTRALIZED_CHAT_ABI, DECENTRALIZED_CHAT_ADDRESS)
        const areFriends = await decentralizedChat.methods.alreadyFriends(msgSender,account2).call({ from: msgSender })

        return areFriends


    } catch (error) {
        throw new Error("Could not Check if the two accounts are friends.")
    }
}