import { Link as RouterLink } from 'react-router-dom';
import { useMemo } from 'react';
import { Google } from "@mui/icons-material";
import {
  Button,
  Grid,
  Link,
  TextField,
  Typography
} from "@mui/material";

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';

export const LoginPage = () => {

  const { status }  = useSelector(state => state.auth)

  const dispatch =  useDispatch();

  const { email, password, onInputChange } = useForm({
    email: 'javier@gmail.com',
    password: '123456'
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
    dispatch(checkingAuthentication());
  };

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch(startGoogleSignIn());
  }

  return (

    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
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
              onChange={ onInputChange }
              
            />
            <TextField
              label='Password'
              type="password"
              placeholder="Password"
              fullWidth 
              password='password'
              name='password'
              value={password}
              onChange={onInputChange}
              
              />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
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
              onClick={onGoogleSignIn}
            >
              <Google />
              <Typography sx={{ ml: 1, fontSize: 14 }}> Google</Typography>

            </Button>
          </Grid>
          <Grid container direction="row" justifyContent="center" sx={{ mt: 2 }}>
            
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Don't you have an account?
            </Link>

          </Grid>

        </Grid>
      </form>
    </AuthLayout>

  )
}
