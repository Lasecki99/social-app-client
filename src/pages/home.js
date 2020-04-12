import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Scream from '../components/Scream';

const Home = () => {

  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    if (!fetchData) {
      axios.get('/screams')
        .then(res => {
          setFetchData({
            screams: res.data
          })
        })
        .catch(err => console.log(err));
    }
  }, [fetchData]);

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {fetchData ? fetchData.screams.map(scream => <Scream scream={scream} key={scream.screamId} />) : <p>Loading...</p>}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
    </Grid>
  );
};

export default Home;