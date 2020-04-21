import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import Grid from '@material-ui/core/Grid';
import StaticProfile from '../components/profile/StaticProfile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

const User = ({ data: { screams, loading }, getUserData, match }) => {

  const [profile, setProfile] = useState(null);
  const [screamIdParam, setScreamIdParam] = useState(null);

  const handleData = async () => {
    const handle = match.params.handle;
    const screamId = match.params.screamId;

    if (screamId) setScreamIdParam(screamId);
    try {
      getUserData(handle);
      const res = await axios.get(`/user/${handle}`);
      setProfile(res.data.user);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!profile) handleData();
  }, [profile])

  const screamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
          screams.map(scream => {
            if (scream.screamId !== screamIdParam) return <Scream key={scream.screamId} scream={scream} />
            else return <Scream key={scream.screamId} scream={scream} openDialog />
          })
        )

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
            <StaticProfile profile={profile} />
          )}
      </Grid>
    </Grid>
  );
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(User);