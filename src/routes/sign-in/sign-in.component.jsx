import { signInWithGooglePopup,  createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";


const Signin = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    
    return(
        <div>
            <h1>Sign-In</h1>
            <button onClick={logGoogleUser}>Sign In with Google</button>
            <SignUpForm/>
        </div>
    )
}

export default Signin;

