import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material";
import {
  Button,
  Grid,
  Link,
  TextField,
  Typography
} from "@mui/material";

import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
  return (

    <AuthLayout title="Login">
      <form>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label='Email'
              type="email"
              placeholder="email@gmail.com"
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
          <Grid item xs={12} md={6}>
            <Button variant="contained" fullWidth>
              Login
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" fullWidth>
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
