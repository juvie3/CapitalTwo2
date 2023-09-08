import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../store/accountsReducer";
import { useEffect } from "react";

export const Accounts = () => {
      const dispatch = useDispatch()

      const user = useSelector((state) => state.session.user)
      const accounts = useSelector((state) => state.accounts ? state.accounts : {})


      useEffect(() => {
            dispatch(fetchAccounts())
      }, [dispatch])



      const acctArr = Object.values(accounts)


      if (!acctArr.length) return null
      return (
            <>
                  {
                        acctArr.map((acct) => (
                              <div>{`${acct.accountType} account with $${acct.funds}`}</div>

                        ))

                  }
            </>

      )


}
