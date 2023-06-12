// Los thunks son acciones que internamente tienen una tarea asincrona y que se ejecutan en paralelo.
// Si son sincronas se harian en los reducers

import { 
    loginWithEmailPassword, 
    logoutFirebase, 
    registerUserWithEmailPassword, 
    signInWithGoogle 
} from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { 
    checkingCredentials, 
    login, 
    logout 
} from "./authSlice"

export const checkingAuthentication = (email, password) => {
   
    return async(dispatch) => {       
           dispatch(checkingCredentials());      
    }    

}

export const startGoogleSignIn = () => {
    return async(dispatch) => {       
           dispatch(checkingCredentials());    
           const result = await signInWithGoogle();
           if (!result.ok) return dispatch(logout( result.errorMessage ));
           dispatch(login( result ));
    }        

}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async(dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({ email, password, displayName });

        if(!ok) return dispatch(logout({ errorMessage }));

        dispatch( login({ uid, displayName, email, photoURL }) );
        
    }
    
}  
// Si el usuario ya esta autenticado, no se ejecuta el dispatch de checkingCredentials 
export const startLoginWithEmailPassword = ({ email, password }) => { 
    
    
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await loginWithEmailPassword({ email, password });
        console.log(result);

        if ( !result.ok ) return dispatch( logout( result ) );
        dispatch( login( result ));

    }
    
}  
   
export const startLogout = () => {
    return async(dispatch) => {        
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch( logout() );
    }
}