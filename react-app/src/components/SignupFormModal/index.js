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
		<div className="signup-modal">
			<div className="signup-title">Sign Up</div>
			<form className="signup-form" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className="signup-field">
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						pattern="^\S+@\S+\.\S+$"
						required
						maxLength="250"
					/>
				</label>
				<label className="signup-field">
					Username
					<input
						type="text"
						placeholder="Min of 3 char"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						minLength="3"
						maxLength="40"
					/>
				</label>
				<label className="signup-field">
					First Name
					<input
						type="text"
						value={first_name}
						onChange={(e) => setFirstName(e.target.value)}
						required
						maxLength="99"
					/>
				</label>
				<label className="signup-field">
					Last Name
					<input
						type="text"
						value={last_name}
						onChange={(e) => setLastName(e.target.value)}
						required
						maxLength="99"
					/>
				</label>
				<label className="signup-field">
					Street
					<input
						type="text"
						placeholder="US address only"
						value={street}
						onChange={(e) => setStreet(e.target.value)}
						required
						maxLength="250"
					/>
				</label>
				<label className="signup-field">
					City
					<input
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
						maxLength="250"
					/>
				</label>
				<label className="signup-field">
					State
					<select
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
				<label className="signup-field">
					Zip Code
					<input
						type="text"
						value={zip_code}
						onChange={(e) => setZipCode(e.target.value)}
						required
						minLength="5"
						maxLength="10"
					/>
				</label>
				<label className="signup-field">
					Phone Number
					<input
						type="text"
						placeholder="10 digits, no dashes"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
						minLength="10"
						maxLength="10"
					/>
				</label>
				<label className="signup-field">
					Password
					<input
						type="password"
						placeholder="Min of 8 char"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						minLength="8"
						maxLength="200"
						required
					/>
				</label>
				<label className="signup-field">
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						minLength="8"
						maxLength="200"
						required
					/>
				</label>
				<button className='signup-button grow' type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
