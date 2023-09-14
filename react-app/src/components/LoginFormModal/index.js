import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.replace('/accounts')
    }
  };

  const demoSignIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.replace('/accounts')
    }
  };

  const demo2SignIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo2@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
      history.replace('/accounts')
    }
  };

  return (
    <div id="login-form-modal-entire">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          { errors.length ?
            <li>Invalid Credentials</li> : null
            }
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <div id='demo-link' className="grow" onClick={demoSignIn}>Demo User 1</div>
        <div id='demo-link' className="grow" onClick={demo2SignIn}>Demo User 2</div>
      </form>
    </div>
  );
}

export default LoginFormModal;
