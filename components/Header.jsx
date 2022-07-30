import { React, useState, useEffect} from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { connectors } from "../utils/connectors";
import Link from 'next/link';
import Home from '../pages/Home';
import { MenuIcon } from '@heroicons/react/solid'
import { FcMenu,FcCollapse } from "react-icons/fc";


export default function Header() {
  const { chainId, account, activate, active,library } = useWeb3React()
  const [walletAddress, setWalletAddress] = useState('Connect Wallet')
  const [balance, setBalance] = useState('0')
  let [open,setOpen]=useState(false);

  let Links =[
    {name:"Home",link:"/Home"},
    {name:"Create Token",link:"/Home"},
    {name:"Dashboard",link:"/Dashboard"},

  ];



  // Button handler button for handling a
  // request event for metamask
  const connectWallet = () => {

    console.log({chainId})

    activate(connectors.injected)

  }

  useEffect(() => {
    activate(connectors.injected)

    if(account){
      getbalance(account)
   
    }
  
  },[account])
  

  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {
    // Requesting balance method
    window.ethereum
      .request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      })
      .then((balance) => {
        // Setting balance
        setBalance(parseInt(ethers.utils.formatEther(balance)))
      })
  }

  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setWalletAddress(account.substring(0, 6) + '...')

    // Setting a balance
    getbalance(account)
  }

  const handleAddNetwork = async () => {
    // Check if MetaMask is installed
    // MetaMask injects the global API into window.ethereum
    if (window.ethereum) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1f90' }], // chainId must be in hexadecimal numbers
        })
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x1f90',
                  chainName: 'Shardeum Liberty',
                  rpcUrls: ['https://liberty10.shardeum.org'],
                  blockExplorerUrls: [
                    'https://explorer.liberty10.shardeum.org/',
                  ],
                  nativeCurrency: {
                    symbol: 'SHM',
                    decimals: 18,
                  },
                },
              ],
            })
          } catch (addError) {}
        }
      }
    } else {
      // if no window.ethereum then MetaMask is not installed
      alert(
        'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html',
      )
    }
  }

  return (
    <div>
    <div className='shadow-md w-full fixed top-0 left-0 z-20'>
      <div className='md:flex items-center justify-between bg-gray-900 py-4 md:px-10 px-7'>
      <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800'>
        <img src="/logo.png" className='w-36'/>
       
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
      {!open?<FcMenu/>:<FcCollapse/>}
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-gray-900 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
        {
          Links.map((link)=>(
            <li key={link.name} className='md:ml-8 text-sm md:my-0 my-7'>
              <Link href={link.link} className='text-gray-100 hover:text-gray-400 duration-500'><p className='text-gray-100 hover:text-gray-400 duration-500'>{link.name}</p></Link>
            </li>
          ))
        }

          <div classNameName="">
            <button
              onClick={handleAddNetwork}
              type="button"
              className="text-gray-900 md:ml-12 lg:ml-12 2xl:ml-12  bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gray-100 border border-gray-200 focus:ring-4  focus:ring-gray-100 font-medium rounded-lg text-sm h-10 ml-3 px-2 py-2 text-center  items-cente  dark:text-white "
            >
              Add Shardeum Network
            </button>
            {account ? (
              <button
              disabled={account}
              onClick={connectWallet}
              type="button"
              className="text-gray-900  bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gray-100 border border-gray-200 focus:ring-4  focus:ring-gray-100 font-medium rounded-lg text-sm h-10 ml-3 px-2 py-2 text-center  items-cente  dark:text-white "
            >
              {account.substring(0,6)+"..."}
            </button>
            ) : (
              <button
                onClick={connectWallet}
                type="button"
                className="text-gray-900  bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gray-100 border border-gray-200 focus:ring-4  focus:ring-gray-100 font-medium rounded-lg text-sm h-10 ml-3 px-2 py-2 text-center  items-cente  dark:text-white "
                >
                Connect Wallet
              </button>
            )}


            {/* <button
              type="button"
              className="text-gray-900  invisible md:visible lg:visible 2xl:visible bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm h-10 ml-3 px-2 py-2 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800  dark:text-white dark:hover:bg-gray-700 "
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 1200.000000 1200.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,1200.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M3607 7223 l-1506 -2608 882 -3 c789 -2 883 -1 893 13 7 9 486 837
                      1065 1840 579 1004 1056 1825 1059 1825 3 0 479 -821 1058 -1824 579 -1003
                      1058 -1831 1065 -1840 11 -15 85 -16 894 -14 l881 3 -1502 2603 c-827 1431
                      -1505 2605 -1508 2607 -2 2 -202 -337 -443 -755 -242 -418 -442 -760 -445
                      -760 -3 0 -200 336 -438 748 -238 411 -436 753 -441 760 -5 9 -513 -861 -1514
                      -2595z"
                  />
                  <path
                    d="M5800 6771 c-459 -97 -789 -532 -756 -997 15 -210 93 -400 235 -572
                      97 -117 302 -244 476 -294 69 -20 103 -23 245 -23 194 0 262 15 425 95 499
                      243 683 863 399 1343 -67 112 -221 268 -329 331 -213 124 -461 166 -695 117z"
                  />
                  <path
                    d="M3864 4598 c-5 -7 -203 -350 -441 -763 l-433 -750 1505 -3 c828 -1
                      2182 -1 3010 0 l1505 3 -439 760 -438 760 -2131 3 c-1683 2 -2132 -1 -2138
                      -10z"
                  />
                </g>
              </svg>
              {balance}
            </button> */}
      </div>
      </ul>

      </div>
    </div>
    </div>
  )
}
