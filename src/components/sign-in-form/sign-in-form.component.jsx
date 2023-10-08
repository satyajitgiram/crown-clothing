import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import toast, { Toaster } from 'react-hot-toast';

import {SignInContainer, ButtonsContainer}  from "./sign-in-form.styles.jsx";

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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      toast.success("Logged in successfully")
      resetFormfields();

    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          toast.error("Incorrect Password for email")
          break;
        case "auth/user-not-found":
          toast.error("No user assosiated with this email")
          break;
        default:
          console.log(error);
          break;
      }
    }
  };

  return (
    <SignInContainer>
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
        
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
            Google Sign In{" "}
          </Button>
        </ButtonsContainer>
      </form>
      <Toaster />
    </SignInContainer>
  );
};

export default SignInForm;
