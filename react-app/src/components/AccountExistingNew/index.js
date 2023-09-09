import './styleAccountExistingNew.css'
import checkback from './cap-background-checking.png'
import saveback from './cap-background-savings.png'
import checkicon from './checkicon.png'
import savingsicon from './savingsicon.png'

export const AccountExistingNew = () => {

      return (
            <div id='entire-page-exist-new-acct'>
                  <div id='exit-new-open-account-upper-div'>
                        <div id='inner-exit-new-open-account-upper-div'> Open a new account</div>
                  </div>

                  {/* <div id='checking-div-open-account-existing' style={{ backgroundImage: `url(${checkback})` }}></div> */}

                  <div className='checking-saving-div-open-account-existing'>
                        <div className='checking-saving-div-text-open-account-existing'>
                              <div className='checking-saving-1-text'>Checking Accounts</div>
                              <div className='checking-saving-2-text'>For your everyday banking needs - no minimum deposit required.</div>
                              <div className='checking-saving-div-box-open-account-existing'>
                                    <img className='checking-saving-icon-open-account-existing' src={checkicon} />
                                    <div className='checking-saving-box-text-1-open-account-existing'>360 Checking</div>
                                    <div className='checking-saving-box-text-2-open-account-existing'>Pay bills, make deposits, and transfer money - all without the extra fees.</div>
                                    <ul className='checking-saving-box-text-3-open-account-existing'>
                                          <li>No fees or minimums</li>
                                          <li>24/7 mobile banking on the app</li>
                                          <li>70,000+ fee-free ATMs</li>
                                    </ul>
                                    <div className='checking-saving-box-text-4-open-account-existing'>Open account</div>
                              </div>

                        </div>
                        <img className='checking-saving-background-open-account-exiting' src={checkback} />


                  </div>

                  <div className='checking-saving-div-open-account-existing'>
                        <div className='checking-saving-div-text-open-account-existing'>
                              <div className='checking-saving-1-text'>Savings Accounts</div>
                              <div className='checking-saving-2-text'>Accounts that make it easy for you to start saving for the future.</div>
                              <div className='checking-saving-div-box-open-account-existing'>
                                    <img className='checking-saving-icon-open-account-existing' src={savingsicon} />
                                    <div className='checking-saving-box-text-1-open-account-existing'>360 Performance Savings</div>
                                    <div className='checking-saving-box-text-2-open-account-existing'>A high-yield, fee-free savings account you can open in about 5 minutes.</div>
                                    <ul className='checking-saving-box-text-3-open-account-existing'>
                                          <li>4.30% APY</li>
                                          <li>No fees or minimums</li>
                                          <li>24/7 mobile banking on the app</li>
                                    </ul>
                                    <div className='checking-saving-box-text-4-open-account-existing'>Open account</div>
                              </div>

                        </div>
                        <img className='checking-saving-background-open-account-exiting' src={saveback} />


                  </div>


            </div>
      )


}
