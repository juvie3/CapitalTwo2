import { createContext, useState } from "react";

export const FormsContext = createContext();

export const FormsProvider = props => {
      const [form, setForm] = useState(false)
      const [save, setSave] = useState(false)

      return (
            <FormsContext.Provider
                  value={{ form, setForm, save, setSave }}
            >
            {props.children}
            </FormsContext.Provider>
      )

}
