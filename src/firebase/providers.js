import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();
// con esto evitamos que entre automaticamente en la cuenta de google
googleProvider.setCustomParameters({
    'prompt': 'select_account'
});

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        // console.log({credentials});
        // const token = credentials.accessToken;
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // User info   
            displayName, email, photoURL, uid
            // token
        }


    } catch (error) {

        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }



    }

}