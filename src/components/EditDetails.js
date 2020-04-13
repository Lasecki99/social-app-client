import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';


const styles = theme => ({
  ...theme.spredThis,
  button: {
    float: 'right'
  }
});

const EditDetails = ({ editUserDetails, classes, credentials }) => {

  const [userDetails, setUserDetails] = useState({ bio: '', website: '', location: '', open: false });

  const mapUserDetailsToState = credentials => {
    setUserDetails({
      ...userDetails,
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : '',
    })
  }

  const handleOpen = () => {
    setUserDetails({ ...userDetails, open: true });
  };

  const handleClose = () => {
    setUserDetails({ ...userDetails, open: false });
  };

  const handleChange = e => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = () => {
    const details = {
      bio: userDetails.bio,
      website: userDetails.website,
      location: userDetails.location
    };
    editUserDetails(details);
    handleClose();
  };

  useEffect(() => {
    credentials && mapUserDetailsToState(credentials);
  }, [credentials]);

  console.log(userDetails);
  return (
    <>
      <Tooltip title='Edit details' placement='top'>
        <IconButton onClick={handleOpen} className={classes.button}>
          <EditIcon color='primary' />
        </IconButton>
      </Tooltip>
      <Dialog
        open={userDetails.open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'>
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='bio'
              type='text'
              label='Bio'
              multiline
              rows='3'
              placeholder='A short bio about yourself'
              className={classes.textField}
              value={userDetails.bio}
              onChange={handleChange}
              fullWidth />
            <TextField
              name='website'
              type='text'
              label='Website'
              placeholder='Your personal/professional website'
              className={classes.textField}
              value={userDetails.website}
              onChange={handleChange}
              fullWidth />
            <TextField
              name='location'
              type='text'
              label='Location'
              placeholder='Where you live'
              className={classes.textField}
              value={userDetails.location}
              onChange={handleChange}
              fullWidth />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>Cancel</Button>
          <Button onClick={handleSubmit} color='primary'>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));