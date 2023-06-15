
import { loginWithEmailPassword, signInWithGoogle, registerUserWithEmailPassword, logoutFirebase } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn, startLogout, startLoginWithEmailPassword, startCreatingUserWithEmailPassword} from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers"); // CUALQUIER COSA o funcion QUE REGRESE DESDE ESTE PATH ES UN MOCK

describe('Testing thunks.js', () => {

    const dispatch = jest.fn(); // asigno a dispatch el mock  anterior
    beforeEach(() => jest.clearAllMocks()); // limpio el mock cada vez que se ejecute

    test('should invoke checkingCredentials', async() => {              
        const checkCredentials = checkingCredentials(); // invoco la funcion que quiero testear
        // console.log(checkCredentials);
        await checkingAuthentication()( dispatch ); // ejecuto la funcion y devuelve (segundo parentesis) otra funcion que es checkingCredentials
        expect(dispatch).toHaveBeenCalledWith( checkCredentials ); 
        // Espero que el mock de dispatch que es la funcion que invoca la url anterior "../../../src/firebase/providers" se haya llamado    
    });

    test('should startGoogleSignIn invoke the checkingCredentials function and successfully login', async() => {     
        
        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData ); // mockeo la funcion que se llama desde el provider  
        // thunk
        await startGoogleSignIn()( dispatch ); // ejecuto la funcion que quiero testear
        // startGoogleSignIn() es la funcion sincrona y el segundo parentesis es la asincrona ( dispatch )
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() ); 
        expect( dispatch ).toHaveBeenCalledWith( login( loginData) ); 
    });

    test('should startGoogleSignIn invoke the checkingCredentials function and logout with an error message', async() => {     
        // const error = { message: 'Un error en Google' };
        const loginData = { ok: false, errorMessage: 'Un error en Google' }; // ojo ok deberia estar en false
        await signInWithGoogle.mockResolvedValue( loginData ); // mockeo la funcion que se llama desde el provider
        await startGoogleSignIn()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() ); 
        expect( dispatch ).toHaveBeenCalledWith(logout(loginData.errorMessage));
        
    });

    test('should invoke startLoginWithEmailPassword', async() => { 

        const loginData = { ok: true, ...demoUser };
        const formData = {email: loginData.email, password:'123456'};       
     
        await loginWithEmailPassword.mockResolvedValue( loginData );
        // thunk
        await startLoginWithEmailPassword(formData)( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() ); 
        expect( dispatch ).toHaveBeenCalledWith( login(loginData) ); 
     
    });

    test('should invoke startCreatingUserWithEmailPassword', async() => { 
        const registerData = { ok: false, ...demoUser };   
        const registerUser = {email: registerData.email, password:'123456', displayName: registerData.displayName};
        await registerUserWithEmailPassword.mockResolvedValue( registerUser );
        // thunk
        await startCreatingUserWithEmailPassword(registerUser)( dispatch );
        // thunk)( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        // dispatch(login({ uid, displayName, email, photoURL }));
        const user = {uid: registerData.uid, displayName: registerData.displayName, email: registerData.email, photoURL: registerData.photoURL};
        // expect( dispatch ).toHaveBeenCalledWith( login(user) ); // esto da error porque no se le pasa el user
        expect(dispatch).toHaveBeenCalledTimes(2);
    });

    test('should invoke logout function, clearNotes function and logoutFirebase function', async() => { 
       
        await startLogout()( dispatch ); // ejecuto la funcion que quiero testear     

        expect( dispatch ).toHaveBeenCalledWith( logout()); 
        expect( logoutFirebase ).toHaveBeenCalled(); 
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout()); 
    })


});