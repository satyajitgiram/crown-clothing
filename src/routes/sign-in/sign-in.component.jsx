import { SignInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const Signin = () => {
    const logGoogleUser = async () => {
        const { user } = await SignInWithGooglePopup();
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    
    return(
        <div>
            <h1>Sign-In</h1>
            <button onClick={logGoogleUser}>Sign In with Google</button>
        </div>
    )
}

export default Signin;

