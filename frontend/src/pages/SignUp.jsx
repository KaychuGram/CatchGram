import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Import the necessary hooks and components from React
import { useContext, useState } from 'react';
import { useNavigate, Navigate, Link as RouterLink } from 'react-router-dom';
import CurrentUserContext from '../contexts/current-user-context';
import { createUser } from '../adapters/user-adapter';

// Create a default theme using MUI
const defaultTheme = createTheme();

// Define the SignUpPage component
export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    if (!username || !password) return setErrorText('Missing username or password');

    const [user, error] = await createUser({ username, password });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate('/');
  };

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  // If the user is already logged in, navigate to the home page
  if (currentUser) return <Navigate to="/" />;

  // Return the styled sign-up form
  return (
    <ThemeProvider theme={defaultTheme}>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} onChange={handleChange} sx={{ mt: 3 }}>
            <TextField
              autoComplete="off"
              type="text"
              id="username"
              name="username"
              label="Username"
              fullWidth
              required
              autoFocus
              onChange={handleChange}
              value={username}
              sx={{ marginBottom: 3 }} 
            />
            <TextField
              autoComplete="off"
              type="password"
              id="password"
              name="password"
              label="Password"
              fullWidth
              required
              onChange={handleChange}
              value={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up Now!
            </Button>
          </Box>
        </Box>
        {errorText && <Typography color="error">{errorText}</Typography>}
        <Typography>
          Already have an account with us?{' '}
          <RouterLink to="/login" component={Link} variant="body2">
            Log in!
          </RouterLink>
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
