import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../store/accountsReducer";
import { useEffect } from "react";
import { fetchTransactions } from "../../store/transactionsReducer";
import { useHistory } from "react-router-dom";

import './styleAccountDetails.css'
import '../Transfers/styleTransfers.css'
import OpenModalButton from "../OpenModalButton";
import { AccountCheckingForm } from "../AccountCheckingForm";
import { AccountFundUpdate } from "../AccountFundUpdate";
import { AccountDelete } from "../AccountDelete";


export const AccountDetails = () => {
      const { accountId } = useParams()
      const dispatch = useDispatch()
      const history = useHistory()

      const user = useSelector((state) => state.session.user)
      const accounts = useSelector((state) => state.accounts ? state.accounts : {})
      const transactions = useSelector((state) => state.transactions ? state.transactions : {})

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

      let dollar = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
      });

      const backToAccts = () => {
            history.replace('/accounts')
      }

      const goTransfer = () => {
            history.replace(`/transfers/${accountId}`)
      }

      useEffect(() => {
            dispatch(fetchAccounts())
            dispatch(fetchTransactions())
      }, [dispatch, accountId])


      const acctArr = Object.values(accounts)
      const transactionArr = Object.values(transactions)

      const account = acctArr.find((account) => account.id == accountId)
      const acctTransactionsArrPending = transactionArr.filter((transaction) => transaction.accountId == accountId)

      if (account?.accountType == "checking") account.accountType = "Checking";
      if (account?.accountType == "savings") account.accountType = "Savings";


      const acctTransactionsArr = acctTransactionsArrPending.sort((t1, t2) => (Date.parse(t1.datePaid) < Date.parse(t2.datePaid)) ? 1 : (Date.parse(t1.datePaid) > Date.parse(t2.datePaid)) ? -1 : 0 )


      if (!account) return null
      return (
            <div id='acct-details-entire-page'>
            <div id='inner-acct-details-entire-page-1'>
                  <div id='acct-details-upper-div'>
                  <div id='inner-acct-details-upper-div'>

                        <div>
                        <div id='type-account-details'>{`360 ${account.accountType}`}</div>
                        <div id='all-accts-butt' className="grow pointer" onClick={backToAccts}>See All Accounts</div>

                        </div>

                        <div>
                              <div id='avail-acct-details'>AVAILABLE BALANCE</div>
                              <div id='funds-acct-details'>{dollar.format(account.funds)}</div>
                        </div>
                        <div>
                        <div onClick={goTransfer} id='transfer-butt-acct-details' className="grow pointer">Transfer Money</div>

                        </div>

                  </div>
                  </div>



            </div>


            <div id='inner-acct-details-entire-page-2'>
                  <div id='transaction-div-acct-details'>

                  <div id='white-upper-boxshadow-transfers-page'>
                  <div id='acct-number-transfers'>{`${account.accountType} Account #${account.id}`}</div>
                              <div id='transfer-text-transfers-page'>Account Transactions</div>

                        <div id='transaction-link-bar-acct-details'>
                              <div id='add-funds-butt-acct-details' className="grow pointer">
                              <i class="fa-solid fa-circle-plus"></i>
                                    <OpenModalButton
                                    buttonText="Add Funds"
                                    modalComponent={<AccountFundUpdate account={account} />}
                                    />
                                    </div>
                              <div id='delete-butt-acct-details' className="grow pointer">
                              <i class="fa-solid fa-circle-minus"></i>
                                    <OpenModalButton
                                    buttonText="Delete Account"
                                    modalComponent={<AccountDelete account={account} />}
                                    />

                                    </div>

                        </div>

                  </div>

                  </div>


                  <div id="transfer-div-transfer-page">










            <div id='pending-text-transfers-page'>Transactions</div>

            <div id='pending-transfer-category-bar'>
                  <div id='date-transfers-page'>DATE</div>
                  <div>DESCRIPTION</div>
                  <div>STATUS</div>
                  <div>AMOUNT</div>
            </div>

            {
                  !acctTransactionsArr.length ?
                  <div id='pending-transfer-body-empty'>
                        <h3>No Past Transactions</h3>

                  </div>

                  :
                  acctTransactionsArr.map((trans) => (
                        <div id='pending-transfer-body'>
                              <div>
                              <div id='month-today-transfer-page'>
                              {trans.datePaid.slice(8,11)}
                              </div>
                              <div id='date-today-transfers-page'>
                              {trans.datePaid.slice(5,7)}
                              </div>
                              </div>
                              <div id='payee-transfers-page'>{trans.payee}: {trans.product}</div>
                              <div>


                              {
                                    trans.product === "Transfer From" ?

                                    <div id='date-paid-transfers-page'>
                                    {`Recvd ${trans.datePaid.slice(0,16)}`}
                                    </div>

                                    :

                                    <div id='date-paid-transfers-page'>
                                    {`Paid ${trans.datePaid.slice(0,16)}`}
                                    </div>

                              }





                              </div>

                              {
                                    trans.product === "Transfer From" ?

                                    <div id='amount-transfers-page'>{dollar.format(trans.amount)}</div>

                                    :

                                    <div id='amount-transfers-page'>-{dollar.format(trans.amount)}</div>

                              }



                        </div>


                  ))
            }




            </div>









            </div>

            </div>
      )


}
