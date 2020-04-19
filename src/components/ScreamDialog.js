import React, { useState } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
//MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MyButton from '../util/MyButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

// Redux stuff
import { connect } from 'react-redux';
import { getScream } from '../redux/actions/dataActions';

const styles = theme => ({
  ...theme.spreadThis,
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  }
})

const ScreamDialog = ({ getScream, screamId, classes, scream: { body, createdAt, likeCount, commentCount, userImage, userHandle }, UI: { loading } }) => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    getScream(screamId);
  }

  const dialogMarkup = loading ? (
    <CircularProgress size={190} />
  ) : (
      <Grid container spacing={5}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography component={Link} color='primary' variant='h5' to={`/users/${userHandle}`}>
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant='body1'>
            {body}
          </Typography>
        </Grid>
      </Grid>
    )

  return (
    <>
      <MyButton onClick={handleOpen} tip='Expand scream' tipClassName={classes.expandButton}>
        <UnfoldMore color='primary' />
      </MyButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='sm'>
        <MyButton tip='Close' onClick={() => setOpen(false)} tipClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.ui
});

export default connect(mapStateToProps, { getScream })(withStyles(styles)(ScreamDialog));