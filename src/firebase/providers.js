import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try {
        // con esto evitamos que entre automaticamente en la cuenta de google
        googleProvider.setCustomParameters({
            'prompt': 'select_account'
        });

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

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        // await resp.user.updateProfile({ displayName });
        const { uid, photoURL } = resp.user;
        await updateProfile( FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const loginWithEmailPassword = async ({ email, password }) => {
    
    try {
        
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
              
        const { uid, photoURL, displayName } = resp.user;
        
        return {
            ok: true,
            uid, photoURL, displayName
           
        }
    } 
     catch (error) {        
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}
