import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { fetchCreateAccount, fetchDeleteAccount, fetchUpdateAccount } from "../../store/accountsReducer";
import { useModal } from "../../context/Modal";
import '../AccountCheckingForm/styleAccountCheckingForm.css'
import './styleAccountDelete.css'

export const AccountDelete = ({ account }) => {
      const dispatch = useDispatch();
      const history = useHistory();
      const user = useSelector((state) => state.session.user)
      const [funds, setFunds] = useState()
      const { closeModal } = useModal();

      const answerYes = async () => {

            // const accountUpdated = {
            //       account_type: account.accountType,
            //       id: account.id,
            //       funds
            // }

            // if (accountUpdated.account_type == "Checking") accountUpdated.account_type = "checking"
            // if (accountUpdated.account_type == "Savings") accountUpdated.account_type = "savings"

            await dispatch(fetchDeleteAccount(account.id))
            closeModal()
            history.replace('/accounts')

      }

      const answerNo = () => {
            closeModal()
      }

      if (!account) return null


      return (

            <div id='delete-acct-entire-page'>
            <div id='inner-delete-account-entire-page'>

            <div>

                              <div className="funding-question-form">
                                    <div id='delete-account-page-question-text' className="funding-question-text">Are you sure you want to delete this account?</div>
                                    <div id='forfeit'>Note: You Will Forfeit All Funds!</div>
                              </div>

                              <div className="delete-acct-butt-holder">

                                    {/* <div id="yes-butt-delete-acct">Yes</div>
                                    <div id="no-butt-delete-acct">No</div> */}

                                    <button id="yes-butt-delete-acct" onClick={answerYes} className="form-submit-butt-checking grow">Yes</button>

                                    <button id="no-butt-delete-acct" onClick={answerNo} className="form-submit-butt-checking grow">No</button>

                              </div>
                        </div>



            </div>



            </div>


      )


}
