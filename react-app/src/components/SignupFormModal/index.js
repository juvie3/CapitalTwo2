import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

function SignupFormModal() {
      const dispatch = useDispatch();
      const [email, setEmail] = useState("");
      const [username, setUsername] = useState("");
      const [first_name, setFirstName] = useState("");
      const [last_name, setLastName] = useState("");
      const [street, setStreet] = useState("");
      const [city, setCity] = useState("");
      const [state, setState] = useState("");
      const [zip_code, setZipCode] = useState("");
      const [phone, setPhone] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [errors, setErrors] = useState([]);
      const { closeModal } = useModal();
      const history = useHistory()

      const handleSubmit = async (e) => {

            e.preventDefault();
            if (password === confirmPassword) {
                  const data = await dispatch(signUp(username, email, password, first_name, last_name, street, city, state, zip_code, phone));
                  if (data) {
                        setErrors(data);
                  } else {
                        closeModal();
                        history.replace('/accounts')
                  }
            } else {
                  setErrors([
                        "Confirm Password field must be the same as the Password field",
                  ]);
            }
      };


  return (
    <div className="signup-modal-entire" id='signup-entire-page'>
      <div id='inner-signup-page'>


      <h1>Sign Up</h1>


      <form id='form-signup-page' onSubmit={handleSubmit}>
      <div id='whole-form-signup-page'>
      <div id='email-signup-page'>


          <ul>
            {errors.map((error, idx) => (
              <div className="error-list" key={idx}>{error}</div>
            ))}
          </ul>
          <label>
            Email
            <input id='email-input-signup-page'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern="^\S+@\S+\.\S+$"
              required
              maxLength="250"
            />
          </label>

          </div>

          <div id='username-signup-page'>

          <label>
            Username
            <input id='username-input-signup-page'
              type="text"
              placeholder="Min of 3 char"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
              maxLength="40"
            />
          </label>

          </div>


          <div id='firstname-signup-page'>
            <label>
              First Name
              <input id='firstname-input-signup-page'
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
                maxLength="99"
              />
            </label>


          </div>

          <div id='lastname-signup-page'>

          <label>
            Last Name
            <input id='lastname-input-signup-page'
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
              maxLength="99"
            />
          </label>

          </div>

              <div>
            <label>
              Street
              <input id='street-input-signup-page'
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
                maxLength="250"
              />
            </label>


              </div>


              <div>

          <label>
            City
            <input id='city-input-signup-page'
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              maxLength="250"
            />
          </label>

              </div>

              <div>

          <label>
            State
            <select id='state-input-signup-page'
              value={state}
              onChange={(e) => setState(e.target.value)}
              required>
                  <option value=''>Choose</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
              </select>
          </label>

              </div>

              <div>

          <label>
            Zip Code
            <input id='zip-input-signup-page'
              type="text"
              value={zip_code}
              onChange={(e) => setZipCode(e.target.value)}
              required
              minLength="5"
              maxLength="10"
            />
          </label>


              </div>

              <div>

          <label>
            Phone Number
            <input id='phone-input-signup-page'
              type="text"
              placeholder="10 digits, no dashes"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="^\S+-\S+\-\S+$"
              required
              minLength="10"
              maxLength="10"
            />
          </label>

              </div>

              <div id='password-signup-page'>

          <label>
            Password
            <input id='password-input-signup-page'
              type="password"
              placeholder="Min of 8 char"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="8"
              maxLength="200"
              required
            />
          </label>

              </div>

              <div id='confirm-password-signup-page'>

            <label>
              Confirm Password
              <input id='confirm-password-input-signup-page'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength="8"
                maxLength="200"
                required
              />
            </label>


              </div>





      </div>




        <button id='signup-butt-signup-page' type="submit">Sign Up</button>
      </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
