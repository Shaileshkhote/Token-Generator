import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import Web3 from 'web3'
import TokenABI from '../../constants/abi/ERC20.json'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import MyModal from './MyModal'
import { useForm } from 'react-hook-form'


export default function MintModal({
  isOpen,
  setIsOpen,
  tokenAddress,
  isChangeMinter,
  setIsChangeMinter
}) {
  const contractAddress = tokenAddress
  const web3 = new Web3('https://liberty10.shardeum.org')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [tokensToMint, setTokensToMint] = useState()
  const [minterchange, setMinterchange] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(false)
  const [buttonText,setButtonText] = useState("Mint")
  const [messageModal,setmessageModal] = useState("Token Minted Succesfully")

  useEffect(() => {
    if(isChangeMinter){
        setButtonText("Change")
        setmessageModal("Address Changed Succesfully")
    }else{
        setButtonText("Mint")
        setmessageModal("Token Minted Succesfully")
    }
  

  })
  

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function handleInputTokens(e) {
    setTokensToMint(e.target.value)
    console.log(name)
  }
  function handleInputAddress(e) {
    setMinterchange(e.target.value)
    console.log(name)
  }

  function handleClick(data){
    console.log(data.mintTokens,)
      if(isChangeMinter){
          handleMinterChange(data);
      }else{
          handleMint(data)
      }
  }

  async function handleMint(data) {
    try{
    setIsSubmitting(true)
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    console.log(accounts)

    const tokenContract = new ethers.Contract(
      contractAddress,
      TokenABI,
      provider,
    )

    const tokenContractWithSigner = tokenContract.connect(signer)
    const tx = await tokenContractWithSigner.mintTokens(
      ethers.utils.parseEther(data.mintTokens),
    )

    console.log('Receipt', tx)
    const receipt = await tx.wait()
    console.log(receipt)
    if (receipt.status == 1) {
      setStatus(true)
      console.log(status)
      setIsSubmitting(false)
    } else {
      setIsSubmitting(false)
      setStatus(false)
    }
  }
  catch(error){
    console.log({error})
    if(error.code === 4001){
      setIsSubmitting(false)
      setStatus(false)
      toast.error("Tnx Rejected By User");
    }
  }
  }

  async function handleMinterChange(data) {
    try{
    setIsSubmitting(true)
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    console.log(accounts)

    const tokenContract = new ethers.Contract(
      contractAddress,
      TokenABI,
      provider,
    )

    const tokenContractWithSigner = tokenContract.connect(signer)
    const tx = await tokenContractWithSigner.setMinter(
      data.changedMinter
    )

    console.log('Receipt', tx)
    const receipt = await tx.wait()
    console.log(receipt)
    if (receipt.status == 1) {
      setStatus(true)
      console.log(status)
      setIsSubmitting(false)
    } else {
      setIsSubmitting(false)
      setStatus(false)
    }

  }
  catch(error){
    console.log({error})
    if(error.code === 4001){
      setIsSubmitting(false)
      setStatus(false)
      toast.error("Tnx Rejected By User");
    }
  }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {buttonText}
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(handleClick)}>
                  <MyModal
                    isOpen={status}
                    setIsOpen={setStatus}
                    isMetamask="False"
                    message={messageModal}
                    tokenAddress=""
                  />
                  {isChangeMinter ? (
                    <div className="mt-2">
                     
                      <input
                        className="w-full p-2 bg-white rounded-md border border-gray-700 "
                        onChange={(e) => handleInputAddress(e)}
                        placeholder="Enter Address"
                        type="text"
                        name="Mint Tokens"
                        id=""
                        {...register("changedAddress", { required: true })}
                        
                      />
                      {errors.mintTokens && <p className='text-sm text-red-500'>Please Address</p>}
                    </div>
                  ) : (
                    <div className="mt-2">
                      <input
                        className="w-full p-2 bg-white rounded-md border border-gray-700 "
                        onChange={(e) => handleInputTokens(e)}
                        placeholder="Enter No of Tokens"
                        type="number"
                        name="Mint Tokens"
                        id=""
                        {...register("mintTokens", { required: true })}
                      />
                      {errors.changedMinter && <p className='text-sm text-red-500'>Please Check Entered Tokens</p>}
                    </div>
                  )}

                  <div className=" justify-center mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 mr-3 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>

                    {isSubmitting ? (
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 mr-3 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        disabled="true"
                      >
                        <svg
                          role="status"
                          class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-900"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 mr-3 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      
                      >
                        {buttonText}
                      </button>
                    )}
                    
                  </div>
                  </form>
                  </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
