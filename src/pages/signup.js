import React, { useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  ...theme.spreadThis
});

const Signup = ({ classes, history }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newUserData = {
      email,
      password,
      confirmPassword,
      handle
    };
    try {
      const res = await axios.post('/signup', newUserData);
      console.log(res);
      localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
      setLoading(false);
      history.push('/');
    }
    catch (err) {
      console.log(err.response.data);
      setErrors(err.response.data);
      setLoading(false);
    }
  };

  const handleChange = e => {
    const value = e.target.value;
    switch (e.target.name) {
      case 'email':
        setEmail(value)
        break;
      case 'password':
        setPassword(value)
        break;
      case 'handle':
        setHandle(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        return;
    }
  };


  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='monkey' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>Signup</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField id='email' name='email' type='email' label='Email' className={classes.textField} value={email} onChange={handleChange} fullWidth helperText={errors.email} error={errors.email ? true : false} />
          <TextField id='password' name='password' type='password' label='Password' className={classes.textField} value={password} onChange={handleChange} fullWidth helperText={errors.password} error={errors.password ? true : false} />
          <TextField id='confirmPassword' name='confirmPassword' type='password' label='Confirm Password' className={classes.textField} value={confirmPassword} onChange={handleChange} fullWidth helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} />
          <TextField id='handle' name='handle' type='text' label='Handle' className={classes.textField} value={handle} onChange={handleChange} fullWidth helperText={errors.handle} error={errors.password ? true : false} />
          {errors.general && (
            <Typography variant='body2' className={classes.customError}>{errors.general}</Typography>
          )}
          <Button type='submit' variant='contained' color='primary' className={classes.button} disabled={loading} >Signup {loading && (
            <CircularProgress size={30} className={classes.progress} />
          )}</Button>
          <br />
          <small>already have an account ? login <Link to='/login' >here</Link></small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup);