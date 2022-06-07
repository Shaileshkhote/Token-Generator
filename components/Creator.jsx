import { useEffect, useState } from 'react'
import Web3 from 'web3'
import factoryABI from '../constants/abi/factory.json'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import MyModal from './Modal'
export default function Creator() {
    const contractAddress="0xAc725E4c2C4d3B88C10aEe65ff9AeCe1C2FCEE9B"
    const web3 = new Web3('https://liberty10.shardeum.org')

    const [name,setName]=useState()
    const [symbol,setSymbol]=useState()
    const [supply,setSupply]=useState()
    const [status,setStatus]=useState(false)
    const [tokenAddress,settokenAddress]=useState("")

    function handleInputName(e) {
      
          setName(e.target.value)
            console.log(name)
        
      }
      function handleInputSymbol(e) {
      
        setSymbol(e.target.value)
          console.log(name)
      
    }
    function handleInputMaxSupply(e) {
      
        setSupply(e.target.value)
          console.log(name)
      
    }

    const handleCreateToken =async()=> {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        console.log(accounts)
    
        const factoryContract = new ethers.Contract(contractAddress, factoryABI, provider);
    
        const factoryContractWithSigner = factoryContract.connect(signer);
        const tx = await factoryContractWithSigner.createToken(name,symbol,ethers.utils.parseEther(supply),accounts[0],{value: ethers.utils.parseEther("0.1")});
        console.log("Receipt",tx)
        const receipt = await tx.wait();
        console.log(receipt)
        if(receipt.status==1){
            setStatus(true)
            settokenAddress(receipt.events[0].args[0])
            console.log(status)

        }else{
            setStatus(false)
        }
        
    
      }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="min-h-1/2 bg-gray-900  border border-gray-900 rounded-2xl">
        <div className="mx-4 sm:mx-24 md:mx-34 lg:mx-56 mx-auto  flex items-center space-y-4 py-16 font-semibold text-gray-500 flex-col">
 
          <h1 className="text-white text-2xl">Create New Token</h1>
          <input
          onChange={(e)=>handleInputName(e)}
            className="w-full p-2 bg-gray-900 rounded-md  border border-gray-700 focus:border-blue-700"
            placeholder="Name Of Token"
            type="text"
            name="correo"
            id=""
          />
          <input
            className="w-full p-2 bg-gray-900 rounded-md border border-gray-700 "
            onChange={(e)=>handleInputSymbol(e)}
            placeholder="Token Symbol"
            type="text"
            name="Token Symbol"
            id=""
          />
         <input
            className="w-full p-2 bg-gray-900 rounded-md border border-gray-700 "
            onChange={(e)=>handleInputMaxSupply(e)}
            placeholder="Token Max Supply"
            type="number"
            name="Token Max Supply"
            id=""
          />
            <input
            className="w-full p-2 bg-gray-900 rounded-md border border-gray-700 "
            placeholder="Decimals 18"
            text="18"
            type="number"
            name="Decimals 18"
            disabled="true"
            id=""
          />

          <button
          onClick={handleCreateToken}
            className="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border border-gray-700 "
            type="submit"
            name="Create Token"
            id=""
          >
            {' '}
            Create Token
          </button>

          <MyModal isOpen={status} setIsOpen={setStatus} tokenAddress={tokenAddress}/>

          { status?(<div className="relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
					<div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
						<div className="text-green-500">
							<svg className="w-6 sm:w-5 h-6 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
						</div>
						<div className="text-sm font-medium ml-3">Success.</div>
					</div>
					<div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">Your Token Is Created SuccessFully at {tokenAddress} </div>
					<div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
					</div>
				</div>):('')

          }

          <p>
            Want to deploy your Own ?
            <a className="font-semibold text-sky-700" href="https://shardeum.org/blog/how-to-mint-your-cryptocurrency-on-shardeum-testnet/">
              Read docs
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
