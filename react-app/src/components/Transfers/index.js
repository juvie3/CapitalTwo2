import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCreateTransfer, fetchDeleteTransfer, fetchTransfers, fetchUpdateTransfer } from "../../store/transfersReducer"
import './styleTransfers.css'

export const Transfers = () => {
      const dispatch = useDispatch()
      const { accountId } = useParams()
      const [payee, setPayee] = useState("")
      const [amount, setAmount] = useState()

      const transfers = useSelector((state) => state.transfers ? state.transfers : {})

      const initialize = async (e) => {
            e.preventDefault();

            const newTransfer = {
                  accountId,
                  payee,
                  amount
            }

            setPayee('')
            setAmount('')
            await dispatch(fetchCreateTransfer(newTransfer))

      }

      const send = async (id) => {
            await dispatch(fetchUpdateTransfer(id))
      }

      const deleteTransfer = async (id) => {
            await dispatch(fetchDeleteTransfer(id))
      }

      useEffect(() => {
            dispatch(fetchTransfers())
      }, [dispatch])


      const transferArr = Object.values(transfers)

      return (

            <div id='transfers-entire-page'>
            <div id='inner-transfers-entire-page'>

                  <form onSubmit={initialize}>

                        <label>
                              <input
                              type="text"
                              placeholder="Who are you sending money to?"
                              value={payee}
                              onChange={(e) => setPayee(e.target.value)}
                              required
                              />
                        </label>
                        <label>
                              <input
                              type="number"
                              step="0.01"
                              placeholder="How much do you want to send?"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              required
                              />
                        </label>
                        <button type="submit">Initialize</button>


                  </form>

                  {
                        transferArr.length ?
                        transferArr.map((transfer) => (
                              <div id='individual-transfers' key={transfer.id} >
                                    <div>
                                    {transfer.payee}
                                    </div>
                                    <div>
                                    {transfer.amount}
                                    </div>
                                    {
                                          transfer.date_paid ?
                                          <div>
                                          {`Sent on ${transfer.date_paid}`}
                                          </div>
                                          :
                                          <div onClick={()=>send(transfer.id)} >
                                          Send it now!
                                          </div>

                                    }
                                    {
                                          transfer.date_paid ?
                                          null :
                                          <div onClick={()=>deleteTransfer(transfer.id)} >Delete</div>

                                    }

                              </div>
                        )) : null


                  }


            </div>
            </div>

      )


}
