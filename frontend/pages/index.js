import Head from 'next/head'
import styles from '../styles/Home.module.css'

import run from "../../broadcast/Greeter.s.sol/4/run-latest.json"
import GreeterABI from "../../out/Greeter.sol/Greeter.json"
const GreeterAddress = run["transactions"][0]["contractAddress"]


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Foundry Boilerplate!
        </h1>


        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
      </main>
    </div>
  )
}
