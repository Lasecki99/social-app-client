import React, { useState, useEffect } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';

//MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';


const styles = theme => ({
  ...theme.spreadThis
});

const Login = ({ classes, history }) => {

  const dispatch = useDispatch();
  const loading = useSelector(state => state.ui.loading);
  const UIErrors = useSelector(state => state.ui.errors);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    UIErrors && setErrors(UIErrors);
  }, [UIErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    };

    dispatch(loginUser(userData, history));
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