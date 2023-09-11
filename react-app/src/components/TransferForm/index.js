import { useState } from "react"
import { useParams } from "react-router-dom"

export const TransferForm = () => {
      const { accountId } = useParams
      const [payee, setPayee] = useState("")

      return (

            <div>Hello World</div>

      )


}
