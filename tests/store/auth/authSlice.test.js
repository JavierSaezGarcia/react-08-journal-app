import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { demoUser, initialState, authenticatedState } from "../../fixtures/authFixtures";


describe('Testing AuthSlice.js', () => {
    test('should return initial state and name "auth" ', () => {

        expect(authSlice.name).toBe('auth');
        const state = authSlice.reducer(initialState, {});
        // console.log(state);   
        expect(state).toEqual(initialState);
    });

    test('should do the authentication', () => {
        const state = authSlice.reducer(initialState, login(demoUser));
        // console.log(state);
        expect(state).toEqual({
            status: 'authenticated', // checking, not-authenticated, authenticated
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
    });
    test('should do logout without args', () => {

        const state1 = authSlice.reducer(initialState, login(demoUser));
       
        expect(state1).toEqual({
            status: 'authenticated', // checking, not-authenticated, authenticated
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
        const state2 = authSlice.reducer(state1, logout());
        // console.log(state2);
        expect(state2.status).toBe('not-authenticated');      

    });
    test('should do logout and display error message', () => {

        const errorMessage = 'Ceredenciales no son correctas';

        const state1 = authSlice.reducer(initialState, login(demoUser));
       
        expect(state1).toEqual({
            status: 'authenticated', // checking, not-authenticated, authenticated
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
        const state2 = authSlice.reducer(state1, logout({errorMessage}));
        console.log(state2.errorMessage);
       
        expect(state2.status).toBe('not-authenticated');
        expect(state2.errorMessage).toBe(errorMessage);

    });

    test('should change status to checking', () => { 
        const state = authSlice.reducer(authenticatedState, checkingCredentials() );        
        expect(state.status).toBe('checking');     
    });

});