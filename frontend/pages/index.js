import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import styles from "../styles/Home.module.css";

const NETWORK = "rinkeby";
import run from "../../broadcast/Greeter.s.sol/4/run-latest.json"
import ABI from "../../out/Greeter.sol/Greeter.json"
const GreeterAddress = run["transactions"][0]["contractAddress"]
const GreeterABI = ABI["abi"]

export default function Home() {
    const [walletConnected, setWalletConnected] = useState(false);
    // loading is set to true when we are waiting for a transaction to get mined
    const [loading, setLoading] = useState(false);
    const [greeting, setGreeting] = useState("Not Connected");
    const web3ModalRef = useRef();


    const connectWallet = async () => {
        try {
            // Get the provider from web3Modal, which in our case is MetaMask
            // When used for the first time, it prompts the user to connect their wallet
            await getProviderOrSigner();
            setWalletConnected(true);
        } catch (err) {
            console.error(err);
        }
    };

    const connectContract = async () => {
        try {
            console.log("connecting contract");
            const provider = await getProviderOrSigner();
            console.log("provider", provider);
            console.log("greeter address: " + GreeterAddress);
            console.log("greeter abi: " + GreeterABI);
            const greeterContract = new Contract(GreeterAddress, GreeterABI, provider);
            console.log("greeter contract", greeterContract);
            return greeterContract;
        }
        catch (err) {
            console.error(err);
        }
    }

    const getGreeting = async () => {
        try {
            console.log("getting greeting");
            const greeterContract = await connectContract();
            setGreeting(await greeterContract.greeting());
        } catch (err) {
            console.error(err.message);
        }
    };

    const getProviderOrSigner = async (needSigner = false) => {
        // Connect to Metamask
        // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);

        // If user is not connected to the Rinkeby network, let them know and throw an error
        const { chainId } = await web3Provider.getNetwork();
        if (chainId !== 4) {
            window.alert("Change the network to Rinkeby");
            throw new Error("Change network to Rinkeby");
        }

        if (needSigner) {
            const signer = web3Provider.getSigner();
            return signer;
        }
        return web3Provider;
    };

    // useEffects are used to react to changes in state of the website
    // The array at the end of function call represents what state changes will trigger this effect
    // In this case, whenever the value of `walletConnected` changes - this effect will be called
    useEffect(() => {
        // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
        if (!walletConnected) {
            // Assign the Web3Modal class to the reference object by setting it's `current` value
            // The `current` value is persisted throughout as long as this page is open
            web3ModalRef.current = new Web3Modal({
                network: NETWORK,
                providerOptions: {},
                disableInjectedProvider: false,
            });
            connectWallet();
        }
        connectContract();
        getGreeting();
    }, [walletConnected, greeting]);

    /*
        renderButton: Returns a button based on the state of the dapp
      */
    const renderButton = () => {
        // If wallet is not connected, return a button which allows them to connect their wllet
        if (!walletConnected) {
            return (
                <button onClick={connectWallet} className={styles.button}>
                    Connect your wallet
                </button>
            );
        }
    }

    // If we are currently waiting for something, return a loading button
    if (loading) {
        return <button className={styles.button}>Loading...</button>;
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Foundry Boilerplate</title>
                <meta name="description" content="Foundry Greeter Contract" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Foundry Boilerplate!
                </h1>

                <p className={styles.description}>
                    Greeting is set to: {' '}
                    <code className={styles.code}>{greeting}</code>
                </p>
                {renderButton()}
            </main>
        </div>
    )
}