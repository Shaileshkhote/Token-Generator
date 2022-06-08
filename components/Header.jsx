import { React, useState, useEffect} from 'react'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import useMetaMask from '../hooks/metamask'
import { ethers } from 'ethers'
export default function Header({ account }) {
  const [connectedethers, setConnectedEthers] = useState(false)
  const [walletAddress, setWalletAddress] = useState('Connect Wallet')

  const [balance, setBalance] = useState('0')

  // Button handler button for handling a
  // request event for metamask
  const connectWallet = () => {
    // Asking if metamask is already present or not
    if (window.ethereum) {
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((res) => accountChangeHandler(res[0]))
    } else {
      alert('install metamask extension!!')
    }
  }

  useEffect(() => {
    if(account){
      getbalance(account)
    }
  
  })
  

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
    <header classNameName="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="#" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Token Generator
            </span>
          </a>

          <div className="flex md:order-2">
            <button
              onClick={handleAddNetwork}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm h-10 px-2 py-2 ml-3 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Shardeum Network
            </button>
            {account ? (
              <button
              disabled={account}
              onClick={connectWallet}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  h-10 px-2 py-2 ml-3 text-right mr-1 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {account.substring(0,6)+"..."}
            </button>
            ) : (
              <button
                onClick={connectWallet}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  h-10 px-2 py-2 ml-3 text-right mr-1 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Connect Wallet
              </button>
            )}

            <button
              type="button"
              class="text-gray-900 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm h-10 ml-3 px-2 py-2 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
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
            </button>

            <button
              data-collapse-toggle="mobile-menu-4"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-4"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-4"
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a
                  href="/Home"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Create Token
                </a>
              </li>
              <li>
                <a
                  href="/Dashboard"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
