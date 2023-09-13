import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { fetchCreateAccount, fetchUpdateAccount } from "../../store/accountsReducer";
import { useModal } from "../../context/Modal";
import '../AccountCheckingForm/styleAccountCheckingForm.css'
import '../AccountFundUpdate/styleAccountFundUpdate.css'

import './styleTransferConfirm.css'
import { fetchCreateTransfer, fetchUpdateTransfer } from "../../store/transfersReducer";


export const TransferConfirm = ({ transfer }) => {
      const dispatch = useDispatch();
      const history = useHistory();
      const user = useSelector((state) => state.session.user)
      const [funds, setFunds] = useState()
      const { closeModal } = useModal();

      const submitForm = () => {

      }

      const no = async () => {




            // await dispatch(fetchCreateTransfer(newTransfer))
            closeModal()
            // history.replace(`/accounts/${account.id}`)

      }

      const send = async (transfer) => {
            console.log('here', transfer.id);
            await dispatch(fetchUpdateTransfer(transfer.id))
            closeModal()

      }

      return (

            <div id='funding-entire-page'>
            <div id='inner-funding-entire-page'>
                  <div id='ready-to-send'>Ready to Send</div>


            <form>

                              <div className="funding-question-form">
                                    <div id='funding-page-question-text' className="funding-question-text">We just need {transfer.payee}'s phone number or email address:</div>
                                    <input id='add-fund-input' className="funding-question-input"
                                    type='text'
                                    placeholder='Enter it here'
                                    value={funds}
                                    onChange={(e) => setFunds(e.target.value)}
                                    min='1'
                                    max='50000'

                                    />
                              </div>
                              <div className="delete-acct-butt-holder">

                              <button id="send-butt-confirm-transfer" onClick={send} className="form-submit-butt-checking grow">Send</button>

                              <button id="close-butt-confirm-transfer" onClick={no} className="form-submit-butt-checking grow">Close</button>

                              </div>
                        </form>



            </div>



            </div>
      )


}
