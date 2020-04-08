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

const Login = ({ classes, history }) => {
  console.log(classes);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email,
      password
    };
    try {
      const res = await axios.post('/login', userData);
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
      default:
        return;
    }
  };


  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='monkey' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>Login</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField id='email' name='email' type='email' label='Email' className={classes.textField} value={email} onChange={handleChange} fullWidth helperText={errors.email} error={errors.email ? true : false} />
          <TextField id='password' name='password' type='password' label='Password' className={classes.textField} value={password} onChange={handleChange} fullWidth helperText={errors.password} error={errors.password ? true : false} />
          {errors.general && (
            <Typography variant='body2' className={classes.customError}>{errors.general}</Typography>
          )}
          <Button type='submit' variant='contained' color='primary' className={classes.button} disabled={loading} >Login {loading && (
            <CircularProgress size={30} className={classes.progress} />
          )}</Button>
          <br />
          <small>don't have an account ? sign up <Link to='/signup' >here</Link></small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);