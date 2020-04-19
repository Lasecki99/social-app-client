import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';

const Home = ({ data: { loading, screams }, getScreams, data }) => {

  const [fetchData, setFetchData] = useState(null);

  // This useEffect need to be rebuild
  useEffect(() => {
    if (!fetchData) {
      getScreams();
      setFetchData(1);
    }
  }, [fetchData]);

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {!loading ? screams.map(scream => <Scream scream={scream} key={scream.screamId} />) : <p>Loading...</p>}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getScreams })(Home);