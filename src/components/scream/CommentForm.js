import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//Redux stuff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = theme => ({
  ...theme.spreadThis
});

const CommentForm = ({ classes, authenticated, submitComment, screamId, UI }) => {

  const [errors, setErrors] = useState({});
  const [body, setBody] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    submitComment(screamId, { body });
  }

  useEffect(() => {
    if (UI.errors) setErrors(UI.errors);
    if (!UI.errors && !UI.loading) {
      setBody('');
      setErrors({});
    }
  }, [UI]);

  const commentFormMarkup = authenticated ? (
    <Grid item sm={10} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField name='body' type='text' label='Comment on scream' error={errors.comment ? true : false} helperText={errors.comment} value={body} onChange={e => setBody(e.target.value)} fullWidth className={classes.textField} />
        <Button type='submit' variant='contained' color='primary' className={classes.button}>
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null
  return commentFormMarkup;
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  UI: state.ui,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));