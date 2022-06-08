import Head from 'next/head'
import Image from 'next/image'
import Header from '../../components/Header'
import Creator from '../../components/Creator'
import { useEffect, useState} from 'react'

const Home = () => {

  const [account, setAccount] = useState()

  useEffect(() => {

    if (window.ethereum) {
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((res) => setAccount(res[0]))
    } else {
      alert('install metamask extension!!')
    }


  })
  
  return (
    <div className="bg-gray-700">
      <Header account={account}/>
      <Creator/>
  </div>
  )
}

export default Home
