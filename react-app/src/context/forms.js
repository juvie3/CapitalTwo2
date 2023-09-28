import { createContext, useState } from "react";

export const FormsContext = createContext();

export const FormsProvider = props => {
      const [form, setForm] = useState(false)
      const [save, setSave] = useState(false)
      const [feedback, setFeedback] = useState(false)

      return (
            <FormsContext.Provider
                  value={{ form, setForm, save, setSave, feedback, setFeedback }}
            >
            {props.children}
            </FormsContext.Provider>
      )

}
