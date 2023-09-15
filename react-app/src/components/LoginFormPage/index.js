import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { useHistory } from "react-router-dom";
import "../SignupFormPage/SignupForm.css"
import "../SignupFormModal/SignupForm.css"
import '../LoginFormModal/LoginForm.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory()

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
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

  return (
    <div className="signup-modal-entire" id='signup-entire-page'>
      <div id='inner-signup-page'>

      <h1 id='login-title'>Log In</h1>



      <form id='form-signup-page' className="demo-user-2-signin-modal" onSubmit={handleSubmit}>
            <ul>
              { errors.length ?
                <li>Invalid Credentials</li> : null
                }
            </ul>
      <div id='whole-form-signin-modal'>
          <div id='email-signin-modal'>

            <label>
              {`Email `}
              <input id='email-input-signin-modal'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

          </div>

          <div id='password-signin-modal'>

            <label>
              {`Password `}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

          </div>



      </div>




        <button id='login-butt-login-modal' type="submit">Log In</button>
        <div id='demo-link' className="grow" onClick={demoSignIn}>Demo User 1</div>
        <div id='demo-link' className="grow demo-user-2-signin-modal" onClick={demo2SignIn}>Demo User 2</div>
      </form>

      </div>
    </div>
  );
}

export default LoginFormPage;
