import { Checkbox, FormControlLabel, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { auth } from "../../lib/firebase";
import "./styles.css";

const initialValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = ({ setShowSignup }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialValue);
  const [checked, setChecked] = useState(false);

  const errorInitialValue = { state: false, msg: "" };
  const [passwordError, setPasswordError] = useState(errorInitialValue);
  const [emailError, setEmailError] = useState(errorInitialValue);

  const disabled =
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword;
  const toggleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      setShowSignup(false);
      setLoading(false);
    }, 1500);
  };

  const createAccount = (e) => {
    e.preventDefault();
    setLoading(true);

    const error = formData.password === formData.confirmPassword;

    if (!error) {
      setPasswordError({ state: true, msg: "Passwords do not match" });
      setEmailError(errorInitialValue);
      setFormData({ ...formData, confirmPassword: "" });
    } else {
      setEmailError(errorInitialValue);
      setPasswordError(errorInitialValue);
    }

    auth
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(() => {
        auth.currentUser
          .updateProfile({
            displayName: `${formData.firstName} ${formData.lastName}`,
          })
          .then(() => {
            setLoading(false);
            setEmailError(errorInitialValue);
            setPasswordError(errorInitialValue);
          });
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setEmailError({ state: true, msg: "Email is already in use" });
          setFormData({ ...formData, email: "" });
          setPasswordError(errorInitialValue);
        }
        if (error.code === "auth/invalid-email") {
          setEmailError({
            state: true,
            msg: "Email address not properly formatted",
          });
          setFormData({ ...formData, email: "" });
          setPasswordError(errorInitialValue);
        }
        if (error.code === "auth/weak-password") {
          setPasswordError({
            state: true,
            msg: "Password should be atleast 6 characters",
          });
          setEmailError(errorInitialValue);
          setFormData({ ...formData, password: "", ConfirmPass: "" });
        } else if (err) {
          setEmailError({ state: true, msg: "An unknown error occured" });
          setPasswordError({ state: true, msg: "An unknown error occured" });
        }
        setLoading(false);
      });
  };

  return (
    <div className="signup__container">
      <div className="signup" style={{ opacity: loading ? "0.5" : "1" }}>
        {loading && <div className="login__loading signup__loading" />}
        <div className="signup__container">
          <div className="signup__left">
            <img
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
              alt="Google"
              className="login__logo"
            />
            <h1 className="signup__heading">Create your Google Account</h1>
            <h1 className="signup__subheading">Continue to Gmail</h1>

            <form className="signup__inputs">
              <div className="signup__nameInputs">
                <TextField
                  id="oulined-basic"
                  label="First Name"
                  variant="outlined"
                  type="name"
                  className="signup__nameInput"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <TextField
                  id="oulined-basic"
                  label="Last Name"
                  variant="outlined"
                  type="name"
                  className="signup__nameInput"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
              <TextField
                id="oulined-basic"
                label="Email"
                fullWidth
                variant="outlined"
                error={emailError.state}
                helperText={
                  emailError.state
                    ? emailError.msg
                    : "You can use letters, numbers & periods"
                }
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <div className="signup__passwordInputs">
                <div className="signup__passwordWrapper">
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    type={checked ? "text" : "password"}
                    variant="outlined"
                    className="signup__passwordInput"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    error={passwordError.state}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Confirm Password"
                    type={checked ? "text" : "password"}
                    variant="outlined"
                    className="signup__passwordInput"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    error={passwordError.state}
                  />
                </div>
                <p
                  className={`signup__helpertext ${
                    passwordError.state && "signin__error"
                  }`}
                >
                  {passwordError.state
                    ? passwordError.msg
                    : "Use 8 or more characters with a mix of letters, numbers & symbols"}
                </p>

                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                  }
                  label="Show Password"
                />
              </div>
              <div className="signup__buttons">
                <Button
                  className="signup__button"
                  color="primary"
                  variant="text"
                  onClick={toggleSignup}
                >
                  Sign In instead
                </Button>

                <Button
                  className="signup__button"
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={createAccount}
                  disabled={disabled}
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
          <figure className="signup__figure">
            <img
              className="signup__figureImg"
              src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
            />
            <figcaption className="signup__figCaption">
              One account. All of google working for you
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Signup;
