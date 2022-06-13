import Head from 'next/head'
import Image from 'next/image'
import Header from '../../components/Header'
import DashboardComp from '../../components/DashboardComp'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import factoryABI from '../../constants/abi/factory.json'
import { useWeb3React } from '@web3-react/core'
import { toast,ToastContainer } from 'react-toastify'
import Footer from '../../components/Footer'


const dashboard = () => {
  const contractAddress = '0xF76ffd184421aB715eB09aF543c8f73Df5fE38A1'
  const web3 = new Web3('https://liberty10.shardeum.org')

  const [tokenAddresses, setTokenAddresses] = useState([])
  const [tokensCreated, setTokensCreated] = useState(0)
  const { chainId, account, activate, active,library } = useWeb3React()


  const factoryTokenContract = new web3.eth.Contract(
    factoryABI,
    contractAddress,
  )

  

  useEffect(() => {
    if(active){
    async function fetchTokensCreated() {
      const tempTokensCreated = await factoryTokenContract.methods
        .getTokensCreatedLength(account)
        .call()
      setTokensCreated(tempTokensCreated)
    }
    fetchTokensCreated()
    console.log(tokensCreated)
  }else{
    // toast.warning("Please Connect Your Wallet To View Dashboard")
  }
  })

  useEffect(() => {
    async function fetchTokensAddress() {
      for (var i = 0; i < tokensCreated; i++) {
        var tokenAddress = await factoryTokenContract.methods
          .creatorsMap(account, [i])
          .call()
        setTokenAddresses((arr) => [...new Set([...arr, tokenAddress])])
        console.log(tokenAddresses)
      }
    }
    fetchTokensAddress()
  }, [tokensCreated])


  return (
    <div className="h-screen bg-gray-700">
       {/* <ToastContainer /> */}
      <Header />
      <div className='flex justify-evenly flex-wrap w-full'>

      {tokenAddresses.map((value) => {
          console.log({value})
        return (

        <DashboardComp tokenAddress={value} />

        )

      })}

      </div>

      <Footer/>
    </div>
  )
}

export default dashboard
