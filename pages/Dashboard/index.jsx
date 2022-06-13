import Head from 'next/head'
import Image from 'next/image'
import Header from '../../components/Header'
import DashboardComp from '../../components/DashboardComp'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import factoryABI from '../../constants/abi/factory.json'
import { Web3ReactProvider } from '@web3-react/core'

const Dashboard = () => {
  const contractAddress = '0xF76ffd184421aB715eB09aF543c8f73Df5fE38A1'
  const web3 = new Web3('https://liberty10.shardeum.org')

  const [account, setAccount] = useState()
  const [tokenAddresses, setTokenAddresses] = useState([])
  const [tokensCreated, setTokensCreated] = useState(0)

  const factoryTokenContract = new web3.eth.Contract(
    factoryABI,
    contractAddress,
  )

  

  useEffect(() => {
    async function fetchTokensCreated() {
      const tempTokensCreated = await factoryTokenContract.methods
        .getTokensCreatedLength('0xE380cD25C971dBEf7B400803D0bA270412651433')
        .call()
      setTokensCreated(tempTokensCreated)
    }
    fetchTokensCreated()
    console.log(tokensCreated)
  })

  useEffect(() => {
    async function fetchTokensAddress() {
      for (var i = 0; i < tokensCreated; i++) {
        var tokenAddress = await factoryTokenContract.methods
          .creatorsMap('0xE380cD25C971dBEf7B400803D0bA270412651433', [i])
          .call()
        setTokenAddresses((arr) => [...new Set([...arr, tokenAddress])])
        console.log(tokenAddresses)
      }
    }
    fetchTokensAddress()
  }, [tokensCreated])

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
      <Header />
      <div className='flex justify-evenly flex-wrap w-full'>

      {tokenAddresses.map((value) => {
          console.log({value})
        return (

        <DashboardComp tokenAddress={value} />

        )

      })}
      </div>
    </div>
  )
}

export default Dashboard
