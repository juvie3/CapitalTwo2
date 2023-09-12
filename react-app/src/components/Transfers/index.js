import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCreateTransfer, fetchDeleteTransfer, fetchTransfers, fetchUpdateTransfer } from "../../store/transfersReducer"
import './styleTransfers.css'
import { useHistory } from "react-router-dom"
import { fetchAccounts } from "../../store/accountsReducer"

export const Transfers = () => {
      const dispatch = useDispatch()
      const history = useHistory()
      const { accountId } = useParams()
      const [payee, setPayee] = useState("")
      const [amount, setAmount] = useState()
      const [flag, setFlag] =useState(false)

      const accounts = useSelector((state) => state.accounts ? state.accounts : {})
      const transfers = useSelector((state) => state.transfers ? state.transfers : {})

      const backToAccts = () => {
            history.replace('/accounts')
      }

      let dollar = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
      });

      const initialize = async (e) => {
            e.preventDefault();

            const newTransfer = {
                  accountId,
                  payee,
                  amount
            }

            setPayee('')
            setAmount('')
            await dispatch(fetchCreateTransfer(newTransfer))

      }

      const send = async (id) => {
            await dispatch(fetchUpdateTransfer(id))
            if (flag == true) {
                  setFlag(false)
            } else {
                  setFlag(true)
            }

      }

      const deleteTransfer = async (id) => {
            await dispatch(fetchDeleteTransfer(id))
      }

      useEffect(() => {
            dispatch(fetchTransfers())
            dispatch(fetchAccounts())
      }, [dispatch, flag])

      const acctArr = Object.values(accounts)
      const transferArray = Object.values(transfers)

      const account = acctArr.find((account) => account.id == accountId)
      const transferArr = transferArray.filter((transfer) => transfer.accountId == accountId)

      const goDetails = () => {
            history.replace(`/accounts/${account.id}`)
      }

      if (account?.accountType == "checking") account.accountType = "Checking";
      if (account?.accountType == "savings") account.accountType = "Savings";

      if (!account) return null
      return (

            <div id='transfers-entire-page'>
            <div id='inner-transfers-entire-page-1'>
                  <div id='transfer-upper-div'>
                  <div id='inner-transfer-upper-div'>

                  <div>
                        <div id='type-account-details'>Transfers</div>
                        <div id='all-accts-butt' className="grow pointer" onClick={backToAccts}>See All Accounts</div>

                  </div>
                  <div>
                        <div id='avail-acct-details'>AVAILABLE BALANCE</div>
                        <div id='funds-acct-details'>{dollar.format(account.funds)}</div>
                        {/* <div id='avail-acct-details'>{`From your ${account.accountType}`}</div> */}

                  </div>

                  <div>
                        <div onClick={goDetails} id='transfer-butt-acct-details' className="grow pointer">Account Details</div>

                  </div>

                  </div>


                  </div>
            </div>

            <div id='inner-transfers-entire-page-2'>
                  <div id="transfer-div-transfer-page">
                        <div id='acct-number-transfers'>{`${account.accountType} Account #${account.id}`}</div>
                        <div id='transfer-text-transfers-page'>Money Transfers</div>

                        <div id="main-transfer-bar">

                        <form id="main-transfer-form" onSubmit={initialize}>

                              <label>
                                    <input id='transfer-payee-input'
                                    type="text"
                                    placeholder="Who are you sending money to?"
                                    value={payee}
                                    onChange={(e) => setPayee(e.target.value)}
                                    maxLength="200"
                                    required
                                    />
                              </label>
                              <label>
                                    <input id='transfer-amount-input'
                                    type="number"
                                    step="0.01"
                                    placeholder="How much do you want to send?"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    max={account.funds}
                                    required
                                    />
                              </label>
                              <button className="grow pointer" type="submit">Start Transfer</button>



                              </form>


                        </div>


                        <div id='pending-text-transfers-page'>Pending Transfers</div>

                        <div id='pending-transfer-category-bar'>
                              <div>DATE</div>
                              <div>MONEY RECEIVER</div>
                              <div>STATUS</div>
                              <div>AMOUNT</div>
                        </div>




                  </div>
            </div>




                  {
                        transferArr.length ?
                        transferArr.map((transfer) => (
                              <div id='individual-transfers' key={transfer.id} >
                                    <div>
                                    {transfer.payee}
                                    </div>
                                    <div>
                                    {transfer.amount}
                                    </div>

                                    {
                                          transfer.amount <= account.funds ?


                                                transfer.date_paid ?
                                                <div>
                                                {`Sent on ${transfer.date_paid}`}
                                                </div>
                                                :
                                                <div className="pointer" onClick={()=>send(transfer.id)} >
                                                Send it now!
                                                </div>



                                          :


                                                transfer.date_paid ?
                                                <div>
                                                {`Sent on ${transfer.date_paid}`}
                                                </div>
                                                :
                                                <div>
                                                Not enough funds to send.
                                                </div>



                                    }







                                    {
                                          transfer.date_paid ?
                                          null :
                                          <div className="pointer" onClick={()=>deleteTransfer(transfer.id)} >Delete</div>

                                    }

                              </div>
                        )) : null


                  }



            </div>

      )


}
