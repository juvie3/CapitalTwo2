import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { fetchAccounts, fetchCreateAccount, fetchUpdateAccount } from "../../store/accountsReducer";
import { useModal } from "../../context/Modal";
import '../AccountCheckingForm/styleAccountCheckingForm.css'
import '../AccountFundUpdate/styleAccountFundUpdate.css'

import './styleTransferConfirm.css'
import { fetchCreateTransfer, fetchUpdateTransfer } from "../../store/transfersReducer";


export const TransferConfirm = ({ transfer }) => {
      const dispatch = useDispatch();
      const history = useHistory();
      const user = useSelector((state) => state.session.user)
      const [phone, setPhone] = useState()

      const { closeModal } = useModal();

      // console.log('',transfer);

      const submitForm = async () => {

            const newTransfer = {
                  phone,
                  id: transfer.id
            }


            await dispatch(fetchUpdateTransfer(newTransfer))
            await dispatch(fetchAccounts())
            history.replace(`/transfers/${transfer.accountId}`)
            closeModal()
      }

      const no = async () => {

            closeModal()

      }

      const sendDemo1 = () => {
            setPhone('demo@aa.io')
      }

      const sendDemo2 = () => {
            setPhone('demo2@aa.io')
      }

      const send = async () => {
            console.log('here', transfer);
            await dispatch(fetchUpdateTransfer(transfer.id))
            await dispatch(fetchAccounts())
            history.replace(`/transfers/${transfer.accountId}`)
            closeModal()
      }

      return (

            <div id='funding-entire-page'>
            <div id='inner-funding-entire-page'>
                  <div id='ready-to-send'>Ready to Send</div>



                        <form onSubmit={submitForm} >
                              <div className="funding-question-form">
                                    <div id='funding-page-question-text' className="funding-question-text">We just need {transfer.payee}'s phone number or email address:</div>
                                    <input id='add-fund-input' className="funding-question-input"
                                    type='text'
                                    placeholder='Enter it here'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    maxLength='100'
                                    required
                                    />
                              </div>
                              <div id='for-demo-users'>For Demo Users:</div>
                              {
                                    user.id != 1 ?  <div className="grow pointer" id='send-demo-1' onClick={sendDemo1}> Send to Demo User 1</div> : null
                              }
                              {
                                    user.id != 2 ?  <div className="grow pointer" id='send-demo-2' onClick={sendDemo2}> Send to Demo User 2</div> : null
                              }

                              <div id='butt-holder-transfer-confirm' className="delete-acct-butt-holder">

                              <button id="send-butt-confirm-transfer" type="submit" className="form-submit-butt-checking grow">Send</button>

                              <button id="close-butt-confirm-transfer" onClick={no} className="form-submit-butt-checking grow">Close</button>

                              </div>

                        </form>




            </div>



            </div>
      )


}
