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
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						pattern='^\S+@\S+$'
						required
						maxLength="250"
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						maxLength="40"
					/>
				</label>
				<label>
					First Name
					<input
						type="text"
						value={first_name}
						onChange={(e) => setFirstName(e.target.value)}
						required
						maxLength="99"
					/>
				</label>
				<label>
					Last Name
					<input
						type="text"
						value={last_name}
						onChange={(e) => setLastName(e.target.value)}
						required
						maxLength="99"
					/>
				</label>
				<label>
					Street
					<input
						type="text"
						value={street}
						onChange={(e) => setStreet(e.target.value)}
						required
						maxLength="250"
					/>
				</label>
				<label>
					City
					<input
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
						maxLength="250"
					/>
				</label>
				<label>
					State
					<input
						type="text"
						value={state}
						onChange={(e) => setState(e.target.value)}
						required
						maxLength="250"
					/>
				</label>
				<label>
					Zip Code
					<input
						type="text"
						value={zip_code}
						onChange={(e) => setZipCode(e.target.value)}
						required
						maxLength="250"
					/>
				</label>
				<label>
					Phone Number
					<input
						type="text"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
						maxLength="35"
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
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
