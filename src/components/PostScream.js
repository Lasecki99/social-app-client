import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyButton from '../util/MyButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { postScream, clearErrors } from '../redux/actions/dataActions';

const styles = theme => ({
  ...theme.spreadThis,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
})

const PostScream = ({ clearErrors, postScream, classes, UI: { loading }, UI }) => {

  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    postScream({ body });
  }

  const handleOpen = () => {
    setOpen(true);
    setBody('');
  }

  const handleClose = () => {
    if (Object.keys(errors).length) setErrors({});
    setOpen(false);
    clearErrors();
  }

  useEffect(() => {
    if (UI.errors) setErrors(UI.errors)
    else if (UI.errors === null) setOpen(false);
  }, [UI.errors]);

  return (
    <>
      <MyButton onClick={handleOpen} tip='Post a Scream !'>
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <MyButton tip='Close' onClick={handleClose} tipClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField name='body' type='text' label='SCREAM!!' multiline rows='3' placeholder='Scream at your fellow apes' error={errors.body ? true : false} helperText={errors.body} className={classes.textField} onChange={e => setBody(e.target.value)} fullWidth />
            <Button type='submit' variant='contained' color='primary' className={classes.submitButton} disabled={loading}>
              Submit
              {loading && (
                <CircularProgress size={30} className={classes.progressSpinner} />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  UI: state.ui
});

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream));