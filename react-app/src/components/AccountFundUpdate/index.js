import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { fetchCreateAccount, fetchUpdateAccount } from "../../store/accountsReducer";
import { useModal } from "../../context/Modal";
import '../AccountCheckingForm/styleAccountCheckingForm.css'
import './styleAccountFundUpdate.css'


export const AccountFundUpdate = ({ account }) => {
      const dispatch = useDispatch();
      const history = useHistory();
      const user = useSelector((state) => state.session.user)
      const [funds, setFunds] = useState()
      const { closeModal } = useModal();

      const submitForm = async (e) => {
            e.preventDefault()

            const accountUpdated = {
                  account_type: account.accountType,
                  id: account.id,
                  funds
            }

            if (accountUpdated.account_type == "Checking") accountUpdated.account_type = "checking"
            if (accountUpdated.account_type == "Savings") accountUpdated.account_type = "savings"

            await dispatch(fetchUpdateAccount(accountUpdated))
            closeModal()
            history.replace('/accounts')

      }

      if (!account) return null

      return (

            <div id='funding-entire-page'>
            <div id='inner-funding-entire-page'>

            <form onSubmit={submitForm}>

                              <div className="funding-question-form">
                                    <div id='funding-page-question-text' className="funding-question-text">How much would you like to add to your account?</div>
                                    <input id='add-fund-input' className="funding-question-input"
                                    type='number'
                                    step='0.01'
                                    placeholder='Enter Amount (max: $50,000)'
                                    value={funds}
                                    onChange={(e) => setFunds(e.target.value)}
                                    min='1'
                                    max='50000'
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
