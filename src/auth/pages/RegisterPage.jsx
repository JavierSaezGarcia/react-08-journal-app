import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, TextField, Link, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <form>
        <Grid container>
          <Grid item xs={12}>
          <TextField
              label='Full name'
              type="text"
              placeholder="Your full name"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label='Email'
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label='Password'
              type="password"
              placeholder="Password"
              fullWidth />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>
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
