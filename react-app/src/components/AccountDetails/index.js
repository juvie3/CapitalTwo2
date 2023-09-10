import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../store/accountsReducer";
import { useEffect } from "react";
import { fetchTransactions } from "../../store/transactionsReducer";
import { useHistory } from "react-router-dom";

import './styleAccountDetails.css'


export const AccountDetails = () => {
      const { accountId } = useParams()
      const dispatch = useDispatch()
      const history = useHistory()

      const user = useSelector((state) => state.session.user)
      const accounts = useSelector((state) => state.accounts ? state.accounts : {})
      const transactions = useSelector((state) => state.transactions ? state.transactions : {})

      let dollar = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          });


      useEffect(() => {
            dispatch(fetchAccounts())
            dispatch(fetchTransactions())
      }, [dispatch, accountId])


      const acctArr = Object.values(accounts)
      const transactionArr = Object.values(transactions)

      const account = acctArr.find((account) => account.id == accountId)
      const acctTransactionsArr = transactionArr.filter((transaction) => transaction.accountId == accountId)

      if (account?.accountType == "checking") account.accountType = "Checking";
      if (account?.accountType == "savings") account.accountType = "Savings";


      if (!account) return null
      return (
            <div id='acct-details-entire-page'>
            <div id='inner-acct-details-entire-page-1'>
                  <div id='acct-details-upper-div'>
                  <div id='inner-acct-details-upper-div'>

                        <div id='type-account-details'>{`360 ${account.accountType}`}</div>
                        <div>
                              <div id='avail-acct-details'>AVAILABLE BALANCE</div>
                              <div id='funds-acct-details'>{dollar.format(account.funds)}</div>
                        </div>
                        <div>
                        <div id='transfer-butt-acct-details' className="grow pointer">Transfer Money</div>

                        </div>

                  </div>
                  </div>



            </div>
            <div id='inner-acct-details-entire-page-2'>
                  <div id='transaction-div-acct-details'>
                        <div id='transaction-link-bar-acct-details'>
                              <div id='add-funds-butt-acct-details' className="grow pointer">
                              <i class="fa-solid fa-circle-plus"></i>
                                    {` Add Funds`}
                                    </div>
                              <div id='delete-butt-acct-details' className="grow pointer">
                              <i class="fa-solid fa-circle-minus"></i>
                                    {` Delete Account`}

                                    </div>

                        </div>


                  </div>


            </div>

            </div>
      )


}
