import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCreateTransfer, fetchTransfers } from "../../store/transfersReducer"
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
            console.log('newwwwwww',newTransfer);
            await dispatch(fetchCreateTransfer(newTransfer))
      }

      useEffect(() => {
            dispatch(fetchTransfers())
      }, [dispatch])

      console.log('transfers', transfers);

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
                              <div id='individual-transfers'>
                                    <div>
                                    {transfer.payee}
                                    </div>
                                    <div>
                                    {transfer.amount}
                                    </div>
                                    {
                                          transfer.paid_date ?
                                          <div>
                                          {`Sent on ${transfer.paid_date}`}
                                          </div>
                                          :
                                          <div>
                                          Send it now!
                                          </div>

                                    }
                                    {
                                          transfer.paid_date ?
                                          null :
                                          <div>Delete</div>

                                    }

                              </div>
                        )) : null


                  }


            </div>
            </div>

      )


}
