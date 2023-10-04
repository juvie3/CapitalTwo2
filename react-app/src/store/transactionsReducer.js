export const LOAD_TRANSACTIONS = 'transactions/loadTransactions'
export const DELETE_TRANSACTION = 'transactions/deleteTransaction'

export const loadTransactions = (transactions) => ({
      type: LOAD_TRANSACTIONS,
      transactions
})

export const deleteTransaction = (transaction) => ({
      type: DELETE_TRANSACTION,
      transaction
})

export const fetchTransactions = () => async (dispatch) => {

      const res = await fetch('/api/accounts/transactions')

      if (res.ok) {
            const allTransactions = await res.json()
            dispatch(loadTransactions(allTransactions))
      } else {
            const errors = await res.json()
            return errors
      }
}

const initialState = {}

export const transactionsReducer = (state = initialState, action) => {
      switch (action.type) {
            case LOAD_TRANSACTIONS:
                  return { ...state, ...action.transactions }
            case DELETE_TRANSACTION:
                  return { ...action.transactions }
            default:
                  return state
      }
}
