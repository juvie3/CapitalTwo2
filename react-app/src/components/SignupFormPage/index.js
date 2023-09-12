import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
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
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(
          username,
          email,
          password,
          first_name,
          last_name,
          street,
          city,
          state,
          zip_code,
          phone
        )
      );
      if (data) {
        setErrors(data);
      } else {
        history.replace("/accounts");
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div id='signup-entire-page'>
      <div id='inner-signup-page'>


      <h1>Sign Up</h1>


      <form id='form-signup-page' onSubmit={handleSubmit}>
      <div id='whole-form-signup-page'>
      <div id='email-signup-page'>


          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Email
            <input id='email-input-signup-page'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern="^\S+@\S+$"
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
            <input id='state-input-signup-page'
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              maxLength="250"
            />
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
              maxLength="250"
            />
          </label>


              </div>

              <div>

          <label>
            Phone Number
            <input id='phone-input-signup-page'
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              maxLength="35"
            />
          </label>

              </div>

              <div id='password-signup-page'>

          <label>
            Password
            <input id='password-input-signup-page'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

export default SignupFormPage;
