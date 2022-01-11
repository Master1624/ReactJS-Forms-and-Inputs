import useInput from "../hooks/use-input";

const BasicForm = (props) => {
	const {
		value: enteredName,
		isValid: nameIsValid,
		hasError: nameHasError,
		valueChangeHandler: nameChangeHandler,
		valueBlurHandler: nameBlurHandler,
		reset: resetFirst,
	} = useInput((value) => value.trim() !== "");
	const {
		value: enteredLast,
		isValid: lastIsValid,
		hasError: lastHasError,
		valueChangeHandler: lastChangeHandler,
		valueBlurHandler: lastBlurHandler,
		reset: resetLast,
	} = useInput((value) => value.trim() !== "");
	const {
		value: enteredEmail,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		valueBlurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput((value) =>
		/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
	);

	let formIsValid = false;

	if (nameIsValid && emailIsValid && lastIsValid) {
		formIsValid = true;
	}

	const formSubmissionHanlder = (event) => {
		event.preventDefault();
		if (!formIsValid) {
			return;
		}
		resetFirst();
		resetLast();
		resetEmail();
	};

	const firstInputClasses = nameHasError
		? "form-control invalid"
		: "form-control";
	const lastInputClasses = lastHasError
		? "form-control invalid"
		: "form-control";
	const emailInputClasses = emailHasError
		? "form-control invalid"
		: "form-control";
	return (
		<form onSubmit={formSubmissionHanlder}>
			<div className="control-group">
				<div className={firstInputClasses}>
					<label htmlFor="name">First Name</label>
					<input
						type="text"
						id="name"
						onChange={nameChangeHandler}
						onBlur={nameBlurHandler}
						value={enteredName}
					/>
					{nameHasError && (
						<p className="error-text">
							First Name must not be empty
						</p>
					)}
				</div>
				<div className={lastInputClasses}>
					<label htmlFor="last">Last Name</label>
					<input
						type="text"
						id="last"
						onChange={lastChangeHandler}
						onBlur={lastBlurHandler}
						value={enteredLast}
					/>
					{lastHasError && (
						<p className="error-text">
							Last Name must not be empty
						</p>
					)}
				</div>
			</div>
			<div className={emailInputClasses}>
				<label htmlFor="email">E-Mail Address</label>
				<input
					type="email"
					id="email"
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
					value={enteredEmail}
				/>
				{emailHasError && (
					<p className="error-text">Please enter a valid email</p>
				)}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;
