import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
        token: null
    },
    reducers: {
        login: (state, {payload}) => {
            state.status =  'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.uid = payload.uid,
            state.email= payload.email,
            state.displayName= payload.displayName,
            state.photoURL= payload.photoURL,
            state.errorMessage= payload.errorMessage,
            state.token= payload.token            

        },
        logout: (state, {payload}) => {
            state.status =  'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.uid = null,
            state.email= null,
            state.displayName= null,
            state.photoURL= null,
            state.errorMessage= payload.errorMessage,
            state.token= null           
        },
        checkingCredentials: (state) => {
          state.status = 'checking';          
          
        }
        
    }
    
});

export const { login, logout, checkingCredentials } = authSlice.actions