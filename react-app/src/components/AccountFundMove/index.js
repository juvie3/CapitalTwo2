import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { fetchMoveAccountFunds } from "../../store/accountsReducer";
import { fetchTransactions } from "../../store/transactionsReducer";
import "./styleAccountFundMove.css"



export const AccountFundMove = ({ account }) => {
      const [funds, setFunds] = useState()
      const [selectAcct, setSelectAcct] = useState()
      const { closeModal } = useModal();
      const dispatch = useDispatch()
      const history = useHistory()
      const accounts = useSelector((state) => state.accounts ? state.accounts : {})


      const usersAccts = Object.values(accounts)
      const usersAcctsAvail = usersAccts.filter(acct => acct.id != account.id)


      const submitForm = async (e) => {
            e.preventDefault()

            const accountUpdated = {
                  // account_type: account.accountType,
                  idFrom: account.id,
                  idTo: selectAcct,
                  funds
            }

            // if (accountUpdated.account_type == "Checking") accountUpdated.account_type = "checking"
            // if (accountUpdated.account_type == "Savings") accountUpdated.account_type = "savings"

            await dispatch(fetchMoveAccountFunds(accountUpdated))
            await dispatch(fetchTransactions())
            closeModal()
            history.push(`/accounts/${account.id}`)

      }


      if (!account) return null

      return (

            <div id='funding-entire-page'>
            <div id='inner-funding-entire-page'>

            <form onSubmit={submitForm}>

                              <div className="funding-question-form">
                                    <div id='funding-page-question-text' className="funding-question-text">Choose an account and the amount to send:</div>
                                    <select id="acct-move"
                                          value={selectAcct}
                                          onChange={(e) => setSelectAcct(e.target.value)}
                                          required>
                                          <option value=''>Your available accounts</option>
                                          {
                                                usersAcctsAvail.map((acct) => (
                                                      <option value={acct.id}> {acct.accountType.toUpperCase()} ACCOUNT #{acct.id} </option>
                                                ))
                                          }

                                    </select>
                                    <input id='add-fund-input' className="amount-move funding-question-input"
                                    type='number'
                                    step='0.01'
                                    placeholder='Enter Amount'
                                    value={funds}
                                    onChange={(e) => setFunds(e.target.value)}
                                    min='1'
                                    max={account.funds}
                                    required
                                    />
                              </div>
                                    <div id='butt-div-form'>
                                    <button className="form-submit-butt-checking grow" type='submit'>Submit</button>
                                    </div>
                        </form>



            </div>



            </div>

      )

}
