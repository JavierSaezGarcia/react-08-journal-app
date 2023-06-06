import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, TextField, Link, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from '../../hooks';
import { useState } from 'react';

const formData = {
  displayName: '',
  email: '',
  password: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El email debe tener una @' ],
  password: [ (value) => value.length >= 6, 'El password debe tener al menos 6 caracteres' ],
  displayName: [ (value) => value.length > 1, 'El nombre es obligatorio' ],
}

export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { 
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations );


  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if( !isFormValid) return;
    console.log(formState);
    
  };

  return (
    <AuthLayout title="Register">
      <h1>FormValid {isFormValid ? 'Valid':'Invalid'}</h1>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label='Full name'
              type="text"
              placeholder="Your full name"
              fullWidth
              sx={{ mb: 2 }}
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
            <TextField
              label='Email'
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              sx={{ mb: 2 }}
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid  && formSubmitted}
              helperText={emailValid}
              
            />
            <TextField
              label='Password'
              type="password"
              placeholder="Password"
              fullWidth 
              sx={{ mb: 2 }}
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid  && formSubmitted}
              helperText={passwordValid}
              />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Create an account
            </Button>
          </Grid>
          <Grid container direction="row" justifyContent="center" sx={{ mt: 2 }}>
            <Typography>Do you already have an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login" sx={{ ml: 1 }}>
              Login
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  )
}
