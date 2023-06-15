import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography
} from "@mui/material";

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startLoginWithEmailPassword, startGoogleSignIn } from '../../store/auth';


const formData = {
  // creamos un hook para el formulario
    email: '',
    password: ''  
}

export const LoginPage = () => {
const { status, errorMessage } = useSelector( state => state.auth );  

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const onSubmit = ( event ) => {
    event.preventDefault();

    // console.log({ email, password })
    dispatch( startLoginWithEmailPassword({ email, password }) );
  }

  const onGoogleSignIn = () => {
    // console.log('onGoogleSignIn');
    dispatch( startGoogleSignIn() );
  }

  return (

    <AuthLayout title="Login">
      
      <form 
        aria-label="submit-form"
        onSubmit={onSubmit} 
        className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label='Email'
              type="email"
              placeholder="email@gmail.com"
              fullWidth
              sx={{ mb: 2 }}
              name='email'
              value={email}
              onChange={onInputChange}

            />
            <TextField
              label='Password'
              type="password"
              placeholder="Password"
              fullWidth
              password='password'
              name='password'
              inputProps={{
                'data-testid': 'password'
              }}
              value={password}
              onChange={onInputChange}

            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1, mt: 1 }}>
          <Grid
            item
            xs={12}
            display={!!errorMessage ? '' : 'none'}
          >
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              disabled={isAuthenticating}
              type="submit"
              variant="contained"
              fullWidth
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              disabled={isAuthenticating}
              variant="contained"
              fullWidth
              aria-label="google-btn"
              onClick={onGoogleSignIn}
            >
              <Google />
              <Typography sx={{ ml: 1, fontSize: 14 }}> Google</Typography>
            </Button>
          </Grid>
          <Grid container direction="row" justifyContent="center" sx={{ mt: 2 }}>
            <Typography>Don't you have an account? </Typography>
            <Link component={RouterLink} color="primary" to="/auth/register" sx={{ ml: 1 }}>Register</Link>

          </Grid>

        </Grid>
      </form>
    </AuthLayout>

  )
}
