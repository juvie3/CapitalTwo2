import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";

import "./styleLandingPage.css";
import profile from "./profile.png";
import lock from "./lock.png";
import firstImg from "./capPhotoMAX.avif";
import tablet from "./capImg1.png";
import flower from "./capImg2.png";
import car from "./capImg3.png";
import deal from "./capDealsImg.webp";
import wellness from "./capWellnessImg.avif";
import bullHorn from "./capBullHorn.png";
import { useHistory } from "react-router-dom";
import { Accounts } from "../Accounts";

export const LandingPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory()

  const user = useSelector((state) => state.session.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));

    if (data) {
      setErrors(data);
      console.log(errors);
    } else {
      history.replace('/accounts')
    }
  };

  const demoSignIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
      history.replace('/accounts')
    }
  };

  const demo2SignIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo2@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
      history.replace('/accounts')
    }
  };

  const goSignUp = () => {
    history.replace('/signup')
  }

  return (
    <div id="landing-entire-page">
      <div id="inner-div-landing-entire-page">

        {
          !user ?

              <div id="sign-in-div-landing-page">
                <form onSubmit={handleSubmit}>
                        <ul id='errors-landing-page'>
                          { errors.length ?
                            <div>Invalid Credentials</div> : null
                            }
                        </ul>
                  <div id="inner-div-sign-in-div-landing-page">
                    <div id="username-div-sign-in-landing-page">

                      <div className="label-sign-in-landing-page">Email</div>
                      <div className="box-input-sign-in-landing-page">
                        <img
                          className="icon-box-sign-in-landing-page"
                          src={profile}
                        />
                        <input
                          className="username-password-input-land-page"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div onClick={goSignUp} className="lower-label-sign-in-landing-page">
                        Sign up as a new user
                      </div>
                    </div>
                    <div id="username-div-sign-in-landing-page">
                      <div className="label-sign-in-landing-page">Password</div>
                      <div className="box-input-sign-in-landing-page">
                        <img className="icon-box-sign-in-landing-page" src={lock} />
                        <input
                          className="username-password-input-land-page"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div onClick={demoSignIn} className="lower-label-sign-in-landing-page">
                        Sign in as Demo User 1
                      </div>
                    </div>
                    <div id="username-div-sign-in-landing-page">
                      <div id="blank" className="label-sign-in-landing-page">
                        blank
                      </div>
                      <button type="submit" id="sign-in-butt-landing-page">
                        Sign In
                      </button>
                      <div onClick={demo2SignIn} className="lower-label-sign-in-landing-page">
                        Sign in as Demo User 2
                      </div>
                    </div>
                  </div>
                </form>
              </div>

          :

            null

        }







        <div id="first-image-div-landing-page">
          <img id="first-image-landing-page" src={firstImg} />

          {
            !user ?

                <div id="first-image-box-div-landing-page">
                  <div id="first-img-div-1-landing-page">
                    SEE IF YOU'RE PRE-APPROVED
                  </div>
                  <div id="first-img-div-2-landing-page">Find your match</div>
                  <div id="first-img-div-3-landing-page">
                    Check for pre-approved offers and choose the one that's best for
                    you.
                  </div>
                  <div className="no" id="first-img-div-4-landing-page">Get started</div>
                </div>

            :

              null

          }





        </div>

        <div id="tab-flower-car-div-landing-page">
          <div className="tab-flower-car-div">
            <img className="image-tab-flower-care" src={tablet} />
            <div className="text-1-tab-flower-car">No Impact, no worries</div>
            <div className="text-2-tab-flower-car">
              Check if you're pre-approved for card offers with no impact to
              your credit score.
            </div>
            <div className="text-3-tab-flower-car">
              See if I'm Pre-Approved ›
            </div>
          </div>
          <div className="tab-flower-car-div">
            <img className="image-tab-flower-care" src={flower} />
            <div className="text-1-tab-flower-car">Savings starts here</div>
            <div className="text-2-tab-flower-car">
              Keep your money growing with one of the best savings rates in
              America.
            </div>
            <div className="text-3-tab-flower-car">
              Compare accounts ›
              </div>
          </div>
          <div className="tab-flower-car-div">
            <img className="image-tab-flower-care" src={car} />
            <div className="text-1-tab-flower-car">Easier car buying</div>
            <div className="text-2-tab-flower-car">
              Pre-qualify to see your real rate and payment before visiting the
              dealer.
            </div>
            <div className="text-3-tab-flower-car">
              Check out Auto Navigator ›
            </div>
          </div>
        </div>

        <div id="can-we-help-div-landing-page">
          <div id="help-text-1-landing-page">HOW CAN WE HELP?</div>
          <div id="help-text-2-landing-page">
            We'll offer ideas to help you meet your goal.
          </div>
          <div className="no" id="help-text-3-landing-page">See suggestions</div>
        </div>

        <div id="shoppers-deals-div-landing-page">
          <img id="deal-image-landing-page" src={deal} />
          <div id="right-deal-div-landing-page">
            <div id="text-1-right-deal-div">DEALS FOR SHOPPERS</div>
            <div id="text-2-right-deal-div">
              Automatically get better deals when you shop online
            </div>
            <div id="text-3-right-deal-div">
              Capital One Shopping is a free tool that instantly searches for
              savings and applies them to your cart.
            </div>
            <div id="text-4-right-deal-div">Add Capital One Shopping ›</div>
          </div>
        </div>

        <div id="shoppers-deals-div-landing-page">
          <div id="right-deal-div-landing-page">
            <div id="text-1-right-deal-div">FINANCIAL WELLNESS</div>
            <div id="text-2-right-deal-div">Put CreditWise in your pocket</div>
            <div id="text-3-right-deal-div">
              Get help building your credit score and financial future with our
              free app.
            </div>
            <div id="text-4-right-deal-div">Get started ›</div>
          </div>
          <img id="deal-image-landing-page" src={wellness} />
        </div>

        {/* <div id='more-text-landing-page' >WE'RE MORE THAN JUST A BANK</div>

                        <div id='temp-footer'></div> */}
        {/* <img id="bullHorn-landing-page" src={bullHorn} /> */}
      </div>
    </div>
  );
};
