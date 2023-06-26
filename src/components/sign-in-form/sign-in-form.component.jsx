import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formField, setFormFields] = useState(defaultFormFields);
  const { email, password } = formField;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formField, [name]: value });
  };

  const resetFormfields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
}

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await signInAuthUserWithEmailAndPassword(email, password);
        console.log(response)
        resetFormfields();
    } catch (error) {
        switch (error.code) {
            case 'auth/wrong-password':
                alert("Incorrect Password for email")
                break;
            case 'auth/user-not-found':
                alert("no user assosiated with this email")
                break;
            default:    
                console.log(error)
                break;
        }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          ttype="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />

        <div className="buttons-container">
        <Button type="submit">Sign In</Button>
        <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In </Button>
        </div>
            
      </form>
    </div>
  );
};

export default SignInForm;