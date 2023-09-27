import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../store/accountsReducer";
import { useEffect } from "react";
import { fetchTransactions } from "../../store/transactionsReducer";
import { useHistory } from "react-router-dom";
import boardwalk from './boardwalk.jpg'
import tileBack from './capTile.jpeg'
import './styleAccounts.css'
import { AccountTiles } from "../AccountTiles";

export const Accounts = () => {
      const dispatch = useDispatch()
      const history = useHistory()

      const user = useSelector((state) => state.session.user)
      const accounts = useSelector((state) => state.accounts ? state.accounts : {})
      // const transactions = useSelector((state) => state.transactions ? state.transactions : {})


      useEffect(() => {
            dispatch(fetchAccounts())
            // dispatch(fetchTransactions())
      }, [dispatch])

      const handleNewAcct = () => {
            history.replace('/accounts/existingnew')
      }


      const acctArr = Object.values(accounts)
      // const transactionArr = Object.values(transactions)



      if (acctArr.length) {

            return (
                  <div id='accounts-entire-page'>

                        <img id='boardwalk-img' src={boardwalk} />
                        <div id='boardwalk-text'>What works for you? Learn what we have to offer, and explore our products below to plan for your future.</div>

                        {/* <div id='account-box-holder'>
                              <div id='left-account-box-holder'>
                                    <div id='upper-left-account-box'>
                                          <div id='upper-left-text-1-acct-box' >360 Checking Acct</div>
                                          <div id='upper-left-text-2-acct-box' >{acctArr[0].funds}</div>
                                          <div id='upper-left-text-3-acct-box' >AVAILABLE BALANCE</div>
                                          <div id='view-acct'>View Account</div>
                                    </div>
                                    <div id='lower-left-account-box'>
                                          <div id='left-lower-left-panel-account-box'>
                                                <div id='lower-left-text-1-acct-box'>Explore other products</div>
                                                <div id='lower-left-text-2-acct-box'>Explore all our products now to find an account that's right for you.</div>
                                          </div>
                                          <div id='butt-holder'>
                                                <div className="grow" onClick={handleNewAcct} id='lower-left-text-3-acct-box' >Open a new account</div>
                                          </div>
                                    </div>
                              </div>

                              <div id='right-account-box-holder'>
                                    <div id='upper-right-account-box' style={{ backgroundImage:`url(${tileBack})` }}>
                                                <div id='upper-left-text-1-acct-box' >360 Savings Acct</div>
                                                <div id='upper-left-text-2-acct-box' >45678.90</div>
                                                <div id='upper-left-text-3-acct-box' >AVAILABLE BALANCE</div>
                                    </div>
                                    <div id='lower-right-account-box'>

                                    </div>
                              </div>


                        </div> */}

                        <div id='account-tiles-holder'>
                              <div id='inner-holder-test'>
                              { acctArr.map((account) => (

                                    <AccountTiles account={account} key={account.id} />

                              ))}

                              <div id='lower-left-account-box'>
                                          <div id='left-lower-left-panel-account-box'>
                                                <div id='lower-left-text-1-acct-box'>Explore other products</div>
                                                <div id='lower-left-text-2-acct-box'>Explore all our products now to find an account that's right for you.</div>
                                          </div>
                                          <div id='butt-holder'>
                                                <div className="grow" onClick={handleNewAcct} id='lower-left-text-3-acct-box' >Open a new account</div>
                                          </div>
                                    </div>
                              </div>


                        </div>

                        {/* {
                              acctArr.map((acct) => (
                                    <div>{`${acct.accountType} account with $${acct.funds}`}</div>

                              ))

                        }

                        {
                              transactionArr.map((acct) => (
                                    <div>{`${acct.payee} was paid ${acct.amount} on ${acct.datePaid} for ${acct.product}`}</div>

                              ))

                        } */}





                  </div>

            )


      } else {

            return (
                  <div id='accounts-entire-page'>

                        <img id='boardwalk-img' src={boardwalk} />
                        <div id='boardwalk-text'>Welcome to CapitalTwo, and thank you for choosing to bank with us. Get started by exploring our products below.</div>


                        <div id='account-tiles-holder'>
                              <div id='inner-holder-test'>

                              <div id='lower-left-account-box'>
                                          <div id='left-lower-left-panel-account-box'>
                                                <div id='lower-left-text-1-acct-box'>Explore our products</div>
                                                <div id='lower-left-text-2-acct-box'>Explore all our products now to find an account that's right for you.</div>
                                          </div>
                                          <div id='butt-holder'>
                                                <div className="grow" onClick={handleNewAcct} id='lower-left-text-3-acct-box' >Open a new account</div>
                                          </div>
                                    </div>
                              </div>


                        </div>







                  </div>

            )




      }


}
