import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";


import { useEffect, useRef, useState } from "react";



export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [numOfWhitelisted, setNumOfWhitelisted] = useState(0);
  const web3ModalRef = useRef();

  const getProviderOrSigner = async(needSigner = False) => {
    try {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);

      const {chainId} = await web3Provider.getNetwork();

      if (chainId != 4) {
        window.alert("Change the network to Rinkeby");
        throw new Error("Change the network to Rineby")
      }
    } catch (err) {
      console.error(err);
    }
  }



  const connectWallet = async() => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      checkIfAddressWhitelisted();
      getNumberOfWhitelisted();
    } catch(err) {
      console.error(err)
    }
  }
  useEffect(() => {
    if(!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disabledInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div>
      <head>
        <title> Whitelist dApp</title>
        <meta name="description" content="Whitelist-Dapp" />
      </head>
        <div className={styles.main}>
          <h1 className={styles.title}>
            Welcome to Crypto Devs!
          </h1>
          <div className={styles.description}>
            {numOfWhitelisted} have already joined the Whitelist
          </div>
          <div>
            <img className={styles.image} src="./crypto-devs.svg" />
          </div>
        </div>


      <footer className={styles.footer}>
        Made by Crypto Devs
      </footer>
    </div>
  )
}
