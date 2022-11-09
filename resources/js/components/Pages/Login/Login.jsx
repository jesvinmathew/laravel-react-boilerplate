import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from "../../App/Footer";
const theme = createTheme();

const Login = ({ setToken }) => {
  const clearFormError = {email:'', password: '', error: ''}
  const [formError, setFormError] = useState(clearFormError);

  const handleSubmit = async event => {
    event.preventDefault();
    setFormError({
      ...clearFormError
    })
    const data = new FormData(event.currentTarget);
    axios.post('login', data).then((response) => {
      if(response.data.success) {
        setToken(response.data.data.token);
        window.location.reload(false);
      }
      else{
        setFormError({
          ...formError,
          'error':response.data.message
        })
      }
    }).catch(err => {
      if (err.hasOwnProperty('request')) {
        if(err.request.status==422){
          const errors = err.response.data.errors
          setFormError({
            ...errors
          })
        }
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {formError.error!=''?<Alert severity="error">{formError.error}</Alert>:''}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={formError.email !== ''}
              helperText={formError.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={formError.password !== ''}
              helperText={formError.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login