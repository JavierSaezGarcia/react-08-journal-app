import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { Provider } from "react-redux";
import { authSlice } from '../../../src/store/auth';
import { MemoryRouter } from 'react-router-dom';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
       return () => mockStartLoginWithEmailPassword({ email, password })
    }
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState // reescribe como queremos que se comporte el estado para ejecutar clicks en botones
    }

});

describe('Testing in <LoginPage />', () => {

    beforeEach(() => jest.clearAllMocks()); // ojo limpiar los mocks

    test('should display the component correctly', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)

    });

    test('Button should googleSignIn has been called', () => { 

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );      

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click( googleBtn );

        expect( mockStartGoogleSignIn ).toHaveBeenCalled();   

    });

    test('submit should call startLoginWithEmailPassword', () => { 

        const email    = 'javier@gmail.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );  

        const emailField = screen.getByRole('textbox', { name: 'Email' });
        fireEvent.change( emailField, { target: { name: 'email', value: email }} );

        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password }} );

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email,
            password
        });
        

    });

});