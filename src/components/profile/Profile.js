import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
import EditDetails from './EditDetails';
import ProfileSkeleton from '../../util/ProfileSkeleton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import MyButton from '../../util/MyButton';

const styles = theme => ({
  ...theme.spreadThis
});

const Profile = ({ classes, uploadImage, logoutUser, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading, authenticated } }) => {

  const handleImageChange = e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    uploadImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  const handleLogout = () => logoutUser();

  let profileMarkup = !loading ? (authenticated ? (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className='profile-image' />
          <input type='file' id='imageInput' hidden onChange={handleImageChange} />
          <MyButton tip='Edit profile picture' onClick={handleEditPicture} btnClassName='button'>
            <EditIcon color='primary' />
          </MyButton>
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5'>
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant='body2'>{bio}</Typography>}
          <hr />
          {location && (
            <>
              <LocationOn color='primary' /> <span>{location}</span>
              <hr />
            </>
          )}
          {website && (
            <>
              <LinkIcon color='primary' />
              <a href={website} target='_blank' rel='noopener noreferrer'>
                {' '}{website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color='primary' />{' '}
          <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
        <MyButton tip='Logout' onClick={handleLogout}>
          <KeyboardReturn color='primary' />
        </MyButton>
        <EditDetails />
      </div>
    </Paper>
  ) : (
      <Paper className={classes.paper}>
        <Typography variant='body2' align='center'>
          No profile found, please login again
      </Typography>
        <div className={classes.buttons}>
          <Button variant='contained' color='primary' component={Link} to='/login'>
            Login
        </Button>
          <Button variant='contained' color='secondary' component={Link} to='/signup'>
            Signup
        </Button>
        </div>
      </Paper>
    )) : (<ProfileSkeleton />)

  return profileMarkup;
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = { logoutUser, uploadImage };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
