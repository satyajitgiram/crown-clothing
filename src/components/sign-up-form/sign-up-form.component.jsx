import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {SignUpContainer} from './sign-up-form.styles.jsx'
import toast, { Toaster } from 'react-hot-toast';

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}


const SignUpForm = () => {
    const [formField, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formField;
    const errorNotify = () => toast.error("Error");

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formField, [name]:value});

    }

    const resetFormfields = () =>{
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(password, confirmPassword)
        if (password !== confirmPassword){
            toast.error("Password is not matching")
            return ;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName})
            toast.success("User Created Successfully")
            resetFormfields();
            
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                toast.error("Cannnot create user, email already in use")
            } else {
                console.log("user creation error", error)
            }
            
        }

    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your Email and Password</span>
            <form onSubmit={handleSubmit}>
            <FormInput
                label="Display Name"
                type="text" 
                required 
                name='displayName' 
                value={displayName} 
                onChange={handleChange}
                />
            <FormInput
                label="Email"
                ttype="email" 
                required 
                name='email' 
                value={email} 
                onChange={handleChange}
                />
            <FormInput
                label="Password"
                type="password" 
                required 
                name='password' 
                value={password}
                onChange={handleChange}
                />
            <FormInput
                label="Confirm Password"
                type="password"
                required 
                name='confirmPassword' 
                value={confirmPassword}
                onChange={handleChange}
                />
                <Button type="submit">Sign Up</Button>
            </form>
            <Toaster />
        </SignUpContainer>
    );
};

export default SignUpForm;