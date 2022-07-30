import { useEffect, useState } from 'react'
import Web3 from 'web3'
import ERC20ABI from '../constants/abi/ERC20.json'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import MintModal from './modals/MintModal'
import { useWeb3React } from '@web3-react/core'

export default function DashboardComp({ tokenAddress }) {
  const web3 = new Web3('https://liberty10.shardeum.org')
  const contractAddress = tokenAddress

  const [tokenName, setTokenName] = useState()
  const [tokenSymbol, setTokenSymbol] = useState()
  const [tokenSupply, setTokenSupply] = useState()
  const [tokenTotalSupply, setTokenTotalSupply] = useState()
  const [isMint, setIsMint] = useState(false)
  const [isChangeMinter, setIsChangeMinter] = useState(false)

  let explorerLink =
    'https://explorer.liberty10.shardeum.org/token/' + tokenAddress

  const ERC20TokenContract = new web3.eth.Contract(ERC20ABI, contractAddress)

  useEffect(() => {
    async function fetchData() {
      var temptokenName = await ERC20TokenContract.methods.name().call()
      var temptokenSymbol = await ERC20TokenContract.methods.symbol().call()
      var temptokenSupply = await ERC20TokenContract.methods
        .totalSupply()
        .call()
      var temptokenTotalSupply = await ERC20TokenContract.methods
        .supply()
        .call()
      setTokenName(temptokenName)
      setTokenSymbol(temptokenSymbol)
      setTokenSupply(web3.utils.fromWei(temptokenSupply))
      setTokenTotalSupply(web3.utils.fromWei(temptokenTotalSupply))
    }

    fetchData()
  })

  function handleMint() {
    setIsMint(true)
    setIsChangeMinter(false)
  }

  function handleMinterBtn() {
    setIsMint(true)
    setIsChangeMinter(true)
  }

  return (
    <div className="bg-gray-700 h-full  w-auto p-5 flex flex-wrap ">
      <div className="sm:mt-8 my-16 lg:mt-5">
        <div className="bg-white border border-coolGray-100 shadow-dashboard rounded-md">
          <div className="flex flex-col justify-center items-center px-4 pt-8 pb-6 border-b border-coolGray-100">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="50px"
              height="50px"
              viewBox="0 0 200.000000 195.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,195.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  d="M845 1943 c-144 -23 -325 -96 -439 -177 -69 -49 -186 -169 -235 -239
-49 -72 -119 -224 -143 -312 -28 -106 -31 -354 -5 -457 91 -362 355 -631 716
-730 103 -29 399 -32 503 -5 363 91 637 360 729 716 29 109 35 283 15 397 -33
192 -119 363 -249 501 -94 99 -172 156 -292 214 -148 72 -229 90 -415 94 -85
2 -168 1 -185 -2z m109 -505 c21 -38 41 -68 46 -68 4 0 38 54 76 120 38 65 72
116 76 112 14 -14 488 -841 488 -851 0 -7 -53 -12 -140 -13 l-140 -3 69 -120
70 -120 -250 -3 c-137 -1 -361 -1 -498 0 l-250 3 70 120 69 120 -140 3 c-87 1
-140 6 -140 13 0 8 249 445 438 767 l54 94 32 -54 c18 -29 49 -83 70 -120z"
                />
                <path
                  d="M822 1051 c-94 -164 -172 -302 -172 -305 0 -3 158 -6 350 -6 193 0
                        350 3 350 6 0 10 -344 604 -350 604 -3 0 -83 -135 -178 -299z m248 27 c138
-71 86 -278 -70 -278 -156 0 -208 207 -70 278 24 12 56 22 70 22 14 0 46 -10
70 -22z"
                />
              </g>
            </svg>

            <h2 className="text-sm font-medium text-coolGray-900">
              {tokenSymbol ? (
                tokenSymbol
              ) : (
                <div class="w-40 h-2 rounded-md mx-auto mt-3">
                  <div class="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
                    <div class="flex flex-col space-y-1">
                      <div class="w-24 bg-gray-300 h-3 rounded-md "></div>
                    </div>
                  </div>
                </div>
              )}
            </h2>
            <h3 className="mb-3 text-xs font-medium text-coolGray-400">
              {tokenName ? (
                tokenName
              ) : (
                <div class="w-40 h-2 rounded-md mx-auto mt-3">
                  <div class="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
                    <div class="flex flex-col space-y-1">
                      <div class="w-24 bg-gray-300 h-3 rounded-md "></div>
                    </div>
                  </div>
                </div>
              )}
            </h3>
            <div className="flex items-center">
              <button
                onClick={handleMint}
                className=" px-4 py-2 font-medium text-sm text-white bg-green-500 hover:bg-green-600 rounded-md"
              >
                <p>Mint</p>
              </button>
              <button
                onClick={handleMinterBtn}
                className=" px-4 py-2 ml-3 font-medium text-sm text-white bg-green-500 hover:bg-green-600 rounded-md"
              >
                <p>Change Minter</p>
              </button>

              <MintModal
                isOpen={isMint}
                setIsOpen={setIsMint}
                tokenAddress={tokenAddress}
                isChangeMinter={isChangeMinter}
              />
            </div>
          </div>
          <div className="flex flex-wrap pt-4 pb-6 -m-2">
            <div className="w-full md:w-1/3 p-2">
              <div className="text-center">
                <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                  {tokenTotalSupply ? (
                    tokenTotalSupply
                  ) : (
                    <div class="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
                      <div class="flex flex-col space-y-1">
                        <div class="w-16 bg-gray-300 h-3 rounded-md "></div>
                      </div>
                    </div>
                  )}
                </p>
                <p className="text-xs text-coolGray-400 font-medium">
                  Total Supply
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-2">
              <div className="text-center">
                <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                  {tokenSupply ? (
                    tokenSupply
                  ) : (
                    <div class="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
                      <div class="flex flex-col space-y-1">
                        <div class="w-20 bg-gray-300 h-3 rounded-md "></div>
                      </div>
                    </div>
                  )}
                </p>
                <p className="text-xs text-coolGray-400 font-medium">
                  Cir Supply
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-2">
              <div className="text-center">
                <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                  18
                </p>
                <p className="text-xs text-coolGray-400 font-medium">
                  Decimals
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-full  p-2">
              <div className="text-center">
                <p className="mb-1 text-xs text-blue-400 font-semibold">
                  <a href={explorerLink}>View on Shardeum Explorer</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
