import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCreateTransfer, fetchDeleteTransfer, fetchTransfers, fetchUpdateTransfer } from "../../store/transfersReducer"
import './styleTransfers.css'
import { useHistory } from "react-router-dom"
import { fetchAccounts } from "../../store/accountsReducer"
import { TransferConfirm } from "../TransferConfirm"
import OpenModalButton from "../OpenModalButton";


export const Transfers = () => {
      const dispatch = useDispatch()
      const history = useHistory()
      const { accountId } = useParams()
      const [payee, setPayee] = useState("")
      const [amount, setAmount] = useState()
      const [flagReload, setFlagReload] =useState(false)

      const accounts = useSelector((state) => state.accounts ? state.accounts : {})
      const transfers = useSelector((state) => state.transfers ? state.transfers : {})

      const backToAccts = () => {
            history.replace('/accounts')
      }

      let dollar = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
      });

      let today = new Date()
      let dateToday = today.getDate()
      let numMonthToday = today.getMonth()
      let monthToday

      if (numMonthToday === 0) monthToday = 'Jan'
      if (numMonthToday === 1) monthToday = 'Feb'
      if (numMonthToday === 2) monthToday = 'Mar'
      if (numMonthToday === 3) monthToday = 'Apr'
      if (numMonthToday === 4) monthToday = 'May'
      if (numMonthToday === 5) monthToday = 'Jun'
      if (numMonthToday === 6) monthToday = 'Jul'
      if (numMonthToday === 7) monthToday = 'Aug'
      if (numMonthToday === 8) monthToday = 'Sep'
      if (numMonthToday === 9) monthToday = 'Oct'
      if (numMonthToday === 10) monthToday = 'Nov'
      if (numMonthToday === 11) monthToday = 'Dec'


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

      const newTransfer = {
            accountId,
            payee,
            amount
      }

      const send = async (id) => {
            await dispatch(fetchUpdateTransfer(id))
            if (flagReload == true) {
                  setFlagReload(false)
            } else {
                  setFlagReload(true)
            }

      }

      const deleteTransfer = async (id) => {
            await dispatch(fetchDeleteTransfer(id))
      }

      useEffect(() => {
            dispatch(fetchTransfers())
            dispatch(fetchAccounts())
      }, [dispatch, flagReload])

      const acctArr = Object.values(accounts)
      const transferArray = Object.values(transfers)

      const account = acctArr.find((account) => account.id == accountId)
      const transferArr = transferArray.filter((transfer) => transfer.accountId == accountId)

      const pendingArr = transferArr.filter((transfer) => !transfer.date_paid)
      const sentArr = transferArr.filter((transfer) => transfer.date_paid)

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
                  <div id='outer-div-white-upper-boxshadow-transfers-page'>
                        <div id='white-upper-boxshadow-transfers-page'>
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
                                          min="1"
                                          max={account.funds}
                                          required
                                          />
                                    </label>
                                    <button id='pend-transfer' className="grow pointer" type="submit">
                                    Pend Transfer
                                    </button>



                                    </form>


                              </div>


                        </div>



                  </div>

                        <div id="transfer-div-transfer-page">


                        <div id='pending-text-transfers-page'>Pending Transfers</div>

                        <div id='pending-transfer-category-bar'>
                              <div id='date-transfers-page'>DATE</div>
                              <div>MONEY RECEIVER</div>
                              <div>STATUS</div>
                              <div>AMOUNT</div>
                        </div>

                        {
                              !pendingArr.length ?
                              <div id='pending-transfer-body-empty'>
                                    <h3>No Pending Transfers</h3>

                              </div>

                              :
                              pendingArr.map((transfer) => (
                                    <div id='pending-transfer-body'>
                                          <div>
                                          <div id='month-today-transfer-page'>
                                          {monthToday}
                                          </div>
                                          <div id='date-today-transfers-page'>
                                          {dateToday}
                                          </div>
                                          </div>
                                          <div id='payee-transfers-page'>{transfer.payee}</div>
                                          <div>
                                          {
                                          transfer.amount <= account.funds ?


                                                transfer.date_paid ?
                                                <div>
                                                {`Sent on ${transfer.date_paid}`}
                                                </div>
                                                :

                                                <div id='send-butt-transfers-page' className="pointer">

                                                <OpenModalButton
                                                buttonText="Send Money"
                                                modalComponent={<TransferConfirm transfer={transfer} />}
                                                />
                                                </div>



                                          :


                                                transfer.date_paid ?
                                                <div>
                                                {`Sent on ${transfer.date_paid}`}
                                                </div>
                                                :
                                                <div id='not-enough'>
                                                Not Enough Funds
                                                </div>



                                          }

                                          <div id='delete-butt-transfers-page' className="pointer" onClick={()=>deleteTransfer(transfer.id)} >Delete</div>


                                          </div>
                                          <div id='amount-transfers-page'>{dollar.format(transfer.amount)}</div>
                                    </div>


                              ))
                        }



                        <div id='pending-text-transfers-page'>Past Transfers</div>

                        <div id='pending-transfer-category-bar'>
                              <div id='date-transfers-page'>DATE</div>
                              <div>MONEY RECEIVER</div>
                              <div>STATUS</div>
                              <div>AMOUNT</div>
                        </div>

                        {
                              !sentArr.length ?
                              <div id='pending-transfer-body-empty'>
                                    <h3>No Past Transfers</h3>

                              </div>

                              :
                              sentArr.map((transfer) => (
                                    <div id='pending-transfer-body'>
                                          <div>
                                          <div id='month-today-transfer-page'>
                                          {monthToday}
                                          </div>
                                          <div id='date-today-transfers-page'>
                                          {transfer.date_paid.slice(5,7)}
                                          </div>
                                          </div>
                                          <div id='payee-transfers-page'>{transfer.payee}</div>
                                          <div>
                                          <div id='date-paid-transfers-page'>
                                                {`Sent ${transfer.date_paid.slice(0,16)}`}
                                          </div>


                                          </div>





                                          <div id='amount-transfers-page'>{dollar.format(transfer.amount)}</div>
                                    </div>


                              ))
                        }




                  </div>
            </div>












{/*
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


                  } */}



            </div>

      )


}
