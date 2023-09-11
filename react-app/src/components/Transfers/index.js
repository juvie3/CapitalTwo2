import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCreateTransfer, fetchDeleteTransfer, fetchTransfers, fetchUpdateTransfer } from "../../store/transfersReducer"
import './styleTransfers.css'
import { useHistory } from "react-router-dom"

export const Transfers = () => {
      const dispatch = useDispatch()
      const history = useHistory()
      const { accountId } = useParams()
      const [payee, setPayee] = useState("")
      const [amount, setAmount] = useState()


      const transfers = useSelector((state) => state.transfers ? state.transfers : {})

      const backToAccts = () => {
            history.replace('/accounts')
      }

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


      const transferArray = Object.values(transfers)

      const transferArr = transferArray.filter((transfer) => transfer.accountId == accountId)

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
                              maxLength="200"
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
                        <div className="pointer" onClick={backToAccts}>See All Accounts</div>


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
                                          <div className="pointer" onClick={()=>send(transfer.id)} >
                                          Send it now!
                                          </div>

                                    }
                                    {
                                          transfer.date_paid ?
                                          null :
                                          <div className="pointer" onClick={()=>deleteTransfer(transfer.id)} >Delete</div>

                                    }

                              </div>
                        )) : null


                  }


            </div>
            </div>

      )


}
