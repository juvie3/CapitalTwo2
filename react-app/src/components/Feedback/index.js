import React, { useState, useContext } from "react";
import { FormsContext } from '../../context/forms'
import bullhorn from "./feedback.png"
import './styleFeedback.css'


export const Feedback = () => {
      const { feedback, setFeedback } = useContext(FormsContext)

      const showFeedback = () => {
            if (feedback === false) {
              setFeedback(true)
            } else {
              setFeedback(false)
            }
      }

      return (

            <div id='feedback-page-outer' >
                  <div onClick={showFeedback} id='feedback-x' className="pointer" >X</div>
                  <div id='feedback-page-inner'>
                        <img id='feedback-bull' src={bullhorn} />
                        <div id='feedback-help'>Help Us Improve</div>
                        <div id='feedback-please'>Please tell us about your overall experience using our website.</div>

                              <textarea id="feedback-input"
                                    rows="5"
                                    cols="42"
                              />
                        <div onClick={showFeedback} id='feedback-btn' className="grow pointer" >Submit</div>

                  </div>
            </div>

      )

}
