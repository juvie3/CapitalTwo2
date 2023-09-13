export const LOAD_ACCOUNTS = 'accounts/loadAccounts'
export const DELETE_ACCOUNT = 'accounts/deleteAccount'
// export const CREATE_ACCOUNT = 'accounts/createAccount'

export const loadAccounts = (accounts) => ({
      type: LOAD_ACCOUNTS,
      accounts
})

export const deleteAccount = (accounts) => ({
      type: DELETE_ACCOUNT,
      accounts
})

export const fetchAccounts = () => async (dispatch) => {

      // console.log('hello from thunk');

      const res = await fetch('/api/accounts/')

      if (res.ok) {
            const allAccounts = await res.json()

            const acctObj = {}
            allAccounts.forEach(acct => acctObj[acct.id] = acct)
            dispatch(loadAccounts(acctObj))
      } else {
            const errors = await res.json()
            return errors
      }
}

export const fetchCreateAccount = (account) => async (dispatch) => {

      const res = await fetch('/api/accounts/new', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(account),
      })

      if (res.ok) {
            const allAccounts = await res.json()

            const acctObj = {}
            allAccounts.forEach(acct => acctObj[acct.id] = acct)
            dispatch(loadAccounts(acctObj))
      } else {
            const errors = await res.json()
            return errors
      }
}

export const fetchUpdateAccount = (account) => async (dispatch) => {

      const { account_type, funds } = account
      const accountUpdated = { account_type, funds }

      const res = await fetch(`/api/accounts/update/${account.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(accountUpdated)
      })

      if (res.ok) {
            const allAccounts = await res.json()

            const acctObj = {}
            allAccounts.forEach(acct => acctObj[acct.id] = acct)
            dispatch(loadAccounts(acctObj))
      } else {
            const errors = await res.json()
            return errors
      }
}

export const fetchDeleteAccount = (accountId) => async (dispatch) => {

      const res = await fetch(`/api/accounts/delete/${accountId}`, {
            method: 'DELETE'
      })

      if (res.ok) {
            // dispatch(deleteAccount(accountId))
            const allAccounts = await res.json()

            const acctObj = {}
            allAccounts.forEach(acct => acctObj[acct.id] = acct)
            dispatch(deleteAccount(acctObj))
      } else {
            const errors = await res.json()
            return errors
      }
}


const initialState = {}

export const accountsReducer = (state = initialState, action) => {
      switch (action.type) {
            case LOAD_ACCOUNTS:
                  return { ...action.accounts }
            case DELETE_ACCOUNT:
                  return { ...state.accounts }
            default:
                  return state
      }
}
