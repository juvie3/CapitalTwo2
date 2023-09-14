export const LOAD_TRANSFERS = 'transfers/loadTransfers'
export const DELETE_TRANSFER = 'transfers/deleteTransfer'


export const loadTransfers = (transfers) => ({
      type: LOAD_TRANSFERS,
      transfers
})

export const deleteTransfer = (transfers) => ({
      type: DELETE_TRANSFER,
      transfers
})

export const fetchTransfers = () => async (dispatch) => {

      const res = await fetch('/api/transfers/')

      if (res.ok) {
            const allTransfers = await res.json()

            const transferObj = {}
            allTransfers.forEach(transfer => transferObj[transfer.id] = transfer)

            dispatch(loadTransfers(transferObj))
      } else {
            const errors = await res.json()
            return errors
      }

}

export const fetchCreateTransfer = (transfer) => async (dispatch) => {

      const { accountId, payee, amount } = transfer
      const newTransfer = { payee, amount, date_paid: "no"}

      const res = await fetch(`/api/transfers/new/${accountId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTransfer),
      })

      if (res.ok) {
            const allTransfers = await res.json()

            const transferObj = {}
            allTransfers.forEach(transfer => transferObj[transfer.id] = transfer)

            dispatch(loadTransfers(transferObj))
      } else {
            const errors = await res.json()
            return errors
      }

}

export const fetchUpdateTransfer = (transfer) => async (dispatch) => {

      const { id, phone } = transfer

      const newTransfer = { phone }


      const res = await fetch(`/api/transfers/send/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTransfer),
      })

      if (res.ok) {
            const allTransfers = await res.json()

            const transferObj = {}
            allTransfers.forEach(transfer => transferObj[transfer.id] = transfer)

            dispatch(loadTransfers(transferObj))
      } else {
            const errors = await res.json()
            return errors
      }
}

export const fetchDeleteTransfer = (id) => async (dispatch) => {

      const res = await fetch(`/api/transfers/delete/${id}`, {
            method: 'DELETE'
      })

      if (res.ok) {
            const allTransfers = await res.json()

            const transferObj = {}
            allTransfers.forEach(transfer => transferObj[transfer.id] = transfer)

            dispatch(deleteTransfer(transferObj))
      } else {
            const errors = await res.json()
            return errors
      }
}


const initialState = {}

export const transfersReducer = (state = initialState, action) => {
      switch (action.type) {
            case LOAD_TRANSFERS:
                  return { ...action.transfers }
            case DELETE_TRANSFER:
                  return { ...action.transfers }
            default:
                  return state
      }

}
