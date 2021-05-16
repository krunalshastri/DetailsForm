import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import React, { useState } from 'react';
import useStyles from './styles';
import Input from './Input';
import * as api from '../../api/index';

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (isSignedUp) {
      try {
        const { data } = await api.logIn(formData);
        localStorage.setItem('user', JSON.stringify({ ...data }));
        console.log(data);
        history.push('/details');
      } catch (error) {
        console.log(error.response.data.errors[0].msg);
        setError(error.response.data.errors[0].msg);

        console.error(error);
      }
    } else {
      try {
        const { data } = await api.signUp(formData);
        localStorage.setItem('user', JSON.stringify({ ...data }));
        history.push('/details');
      } catch (error) {
        console.log(error.response.data.errors[0].msg);
        setError(error.response.data.errors[0].msg);
        console.error(error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggle = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    });
    setIsSignedUp((prev) => !prev);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError('');
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <p style={{ color: 'red' }}>{error}</p>
        <Typography variant='h5'>
          {isSignedUp ? 'Sign In' : 'Sign Up'}
        </Typography>
        <form className={classes.form} onSubmit={handleOnSubmit}>
          <Grid container spacing={2}>
            {!isSignedUp && (
              <>
                <Input
                  name='name'
                  label='Name'
                  handleChange={handleChange}
                  autofocus
                  autoComplete='off'
                />
              </>
            )}
            <Input
              name='email'
              value={formData.email}
              label='Email'
              handleChange={handleChange}
              type='email'
              autoComplete='off'
            />
            <Input
              name='password'
              value={formData.password}
              label='Password'
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
              type={showPassword ? 'text' : 'password'}
            />
            {!isSignedUp && (
              <Input
                name='confirmPassword'
                label='Confirm Password'
                handleShowPassword={handleShowConfirmPassword}
                handleChange={handleChange}
                type={showConfirmPassword ? 'text' : 'password'}
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignedUp ? 'Sign in' : 'Sign up'}
          </Button>

          <Grid container justify='flex-end'>
            <Button onClick={toggle}>
              {isSignedUp
                ? "Don't have an account??Sign Up"
                : 'Already have an account!! Sign In'}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
