import { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { fetchCreateAccount } from "../../store/accountsReducer";
import '../AccountCheckingForm/styleAccountCheckingForm.css'
import { FormsContext } from '../../context/forms'

export const AccountSavingsForm = () => {
      const dispatch = useDispatch();
      const history = useHistory();
      const user = useSelector((state) => state.session.user)
      const [funds, setFunds] = useState()

      const { save, setSave } = useContext(FormsContext)

      const showSave = () => {
            if (save === false) setSave(true)
            if (save === true ) setSave(false)
      }

      const submitForm = async (e) => {
            e.preventDefault()

            const newAccount = {
                  account_type: 'savings',
                  funds
            }

            if (save === false) setSave(true)
            if (save === true ) setSave(false)

            await dispatch(fetchCreateAccount(newAccount))
            history.replace('/accounts')

      }

      return (

            <div id='checking-form-entire-page'>
                  <div id='inner-checking-form-entire-page'>
                        <div className="form-title-1">New Savings Account Application</div>
                        <div className="form-title-2">Here's what we have so far</div>
                        <div className="form-title-3">We prefilled some of your information that we already have to make it fast and easy.</div>


                        <form onSubmit={submitForm}>
                              <div className="outer-form-input">
                                    <div className="form-label">First Name:</div>
                                    <input className="form-input"
                                    type='text'
                                    placeholder={user.firstName}
                                    value={user.firstName}
                                    readOnly
                                    />
                              </div>
                              <div className="outer-form-input">
                                    <div className="form-label">Last Name:</div>
                                    <input className="form-input"
                                    type='text'
                                    placeholder={user.lastName}
                                    value={user.lastName}
                                    readOnly
                                    />
                              </div>
                              <div className="outer-form-input">
                                    <div className="form-label">Email Address:</div>
                                    <input className="form-input"
                                    type='text'
                                    placeholder={user.email}
                                    value={user.email}
                                    readOnly
                                    />
                              </div>
                              <div className="outer-form-input">
                                    <div className="form-label">Street Address:</div>
                                    <input className="form-input"
                                    type='text'
                                    placeholder={user.street}
                                    value={user.street}
                                    readOnly
                                    />
                              </div>
                              <div className="outer-form-input">
                                    <div className="form-label">City:</div>
                                    <input className="form-input"
                                    type='text'
                                    placeholder={user.city}
                                    value={user.city}
                                    readOnly
                                    />
                              </div>
                              <div className="outer-form-input">
                                    <div className="form-label">State:</div>
                                    <input className="form-input"
                                    type='text'
                                    placeholder={user.state}
                                    value={user.state}
                                    readOnly
                                    />
                              </div>
                              <div className="outer-form-input">
                                    <div className="form-label">Zip Code:</div>
                                    <input className="form-input"
                                    type='text'
                                    placeholder={user.zipCode}
                                    value={user.zipCode}
                                    readOnly
                                    />
                              </div>
                              <div className="outer-form-input">
                                    <div className="form-label">Phone Number:</div>
                                    <input className="form-input"
                                    type='text'
                                    placeholder={user.phone}
                                    value={user.phone}
                                    readOnly
                                    />
                              </div>
                              <div className="funding-question-form">
                                    <div className="funding-question-text">How much would you like to fund your new account?</div>
                                    <input className="funding-question-input"
                                    type='number'
                                    step='0.01'
                                    placeholder='Enter Amount Here'
                                    value={funds}
                                    onChange={(e) => setFunds(e.target.value)}
                                    min='0'
                                    max='250000'
                                    required
                                    />

                              </div>
                              <div id='butt-div-form'>
                                    <button className="form-submit-butt-checking grow" type='submit'>Submit</button>
                                    <div onClick={showSave} className="close-form grow">Close</div>
                                    </div>

                        </form>

                  </div>


            </div>

      )

}
