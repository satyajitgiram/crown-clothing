import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}


const SignUpForm = () => {
    const [formField, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formField;
    const { setCurrentUser } = useContext(UserContext);

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formField, [name]:value});

    }

    const resetFormfields = () =>{
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword){
            alert('Password don not match')
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName})
            setCurrentUser(user)
            alert('User Created Successfully')
            resetFormfields();

            
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannnot create user, email already in use')
            } else {
                console.log("user creation error", error)
            }
            
        }

    }

    return (
        <div className="sign-up-container">
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
        </div>
    );
};

export default SignUpForm;