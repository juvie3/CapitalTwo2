import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../store/accountsReducer";
import { useEffect } from "react";
import { fetchTransactions } from "../../store/transactionsReducer";

export const Accounts = () => {
      const dispatch = useDispatch()

      const user = useSelector((state) => state.session.user)
      const accounts = useSelector((state) => state.accounts ? state.accounts : {})
      const transactions = useSelector((state) => state.transactions ? state.transactions : {})


      useEffect(() => {
            dispatch(fetchAccounts())
            dispatch(fetchTransactions())
      }, [dispatch])



      const acctArr = Object.values(accounts)
      const transactionArr = Object.values(transactions)


      if (!acctArr.length || !transactionArr.length) return null
      return (
            <>
                  {
                        acctArr.map((acct) => (
                              <div>{`${acct.accountType} account with $${acct.funds}`}</div>

                        ))

                  }

                  {
                        transactionArr.map((acct) => (
                              <div>{`${acct.payee} was paid ${acct.amount} on ${acct.datePaid} for ${acct.product}`}</div>

                        ))

                  }





            </>

      )


}
