import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../store/accountsReducer";
import { useEffect } from "react";
import { fetchTransactions } from "../../store/transactionsReducer";
import boardwalk from './boardwalk.jpg'
import './styleAccounts.css'

export const Accounts = () => {
      const dispatch = useDispatch()

      const user = useSelector((state) => state.session.user)
      const accounts = useSelector((state) => state.accounts ? state.accounts : {})
      const transactions = useSelector((state) => state.transactions ? state.transactions : {})


      useEffect(() => {
            dispatch(fetchAccounts())
            dispatch(fetchTransactions())
      }, [dispatch])



      const acctArr = Object.values(accounts)
      const transactionArr = Object.values(transactions)


      if (!acctArr.length || !transactionArr.length) return null
      return (
            <div id='accounts-entire-page'>

                  <img id='boardwalk-img' src={boardwalk} />
                  <div id='boardwalk-text'>What works for you? Learn to design your own payment plan for your account. Explore plans.</div>

                  <div id='account-box-holder'>
                        <div id='left-account-box-holder'>
                              <div id='upper-left-account-box'>
                                    <div id='upper-left-text-1-acct-box' >360 Checking Acct</div>
                                    <div id='upper-left-text-2-acct-box' >{acctArr[0].funds}</div>
                                    <div id='upper-left-text-3-acct-box' >AVAILABLE BALANCE</div>
                                    <div id='view-acct'>View Account</div>
                              </div>
                              <div id='lower-left-account-box'>

                              </div>
                        </div>

                        <div id='right-account-box-holder'>
                              <div id='upper-right-account-box'>

                              </div>
                              <div id='lower-right-account-box'>

                              </div>
                        </div>


                  </div>

                  {
                        acctArr.map((acct) => (
                              <div>{`${acct.accountType} account with $${acct.funds}`}</div>

                        ))

                  }

                  {
                        transactionArr.map((acct) => (
                              <div>{`${acct.payee} was paid ${acct.amount} on ${acct.datePaid} for ${acct.product}`}</div>

                        ))

                  }





            </div>

      )


}
