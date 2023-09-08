export const LOAD_ACCOUNTS = 'accounts/loadAccounts'

export const loadAccounts = (accounts) => ({
      type: LOAD_ACCOUNTS,
      accounts
})

export const fetchAccounts = () => async (dispatch) => {

      // console.log('hello from thunk');

      const res = await fetch('/api/accounts/')

      if (res.ok) {
            const allAccounts = await res.json()
            console.log(allAccounts, 'allaccouts');
            dispatch(loadAccounts(allAccounts))
      } else {
            const errors = await res.json()
            console.log(errors, "error");
            return errors
      }
}


const initialState = {}

export const accountsReducer = (state = initialState, action) => {
      switch (action.type) {
            case LOAD_ACCOUNTS:
                  return { ...state, ...action.accounts }
            default:
                  return state
      }
}
