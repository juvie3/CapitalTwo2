import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { fetchCreateAccount, fetchDeleteAccount, fetchUpdateAccount } from "../../store/accountsReducer";
import { useModal } from "../../context/Modal";
import '../AccountCheckingForm/styleAccountCheckingForm.css'
import '../AccountDelete/styleAccountDelete.css'
import { fetchDeleteTransfer } from "../../store/transfersReducer";

export const TransferDelete = ({ transfer }) => {
      const dispatch = useDispatch();
      const history = useHistory();
      const user = useSelector((state) => state.session.user)
      const [funds, setFunds] = useState()
      const { closeModal } = useModal();


      const answerYes = async () => {

            await dispatch(fetchDeleteTransfer(transfer.id))
            closeModal()
            history.push(`/transfers/${transfer.accountId}`)

      }

      const answerNo = () => {
            closeModal()
      }

      if (!transfer) return null


      return (

            <div id='delete-acct-entire-page'>
            <div id='inner-delete-account-entire-page'>

            <div>

                              <div className="funding-question-form">
                                    <div id='delete-account-page-question-text' className="funding-question-text">Are you sure you want to delete this money transfer?</div>
                              </div>

                              <div className="delete-acct-butt-holder">

                                    <button id="yes-butt-delete-acct" onClick={answerYes} className="form-submit-butt-checking grow">Yes</button>

                                    <button id="no-butt-delete-acct" onClick={answerNo} className="form-submit-butt-checking grow">No</button>

                              </div>
                        </div>



            </div>



            </div>


      )


}
