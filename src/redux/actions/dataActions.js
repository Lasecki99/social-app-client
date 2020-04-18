import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM } from '../types';
import axios from 'axios';

// Get all screams
export const getScreams = () => async dispatch => {
  dispatch({ type: LOADING_DATA });
  try {
    const res = await axios.get('/screams');
    dispatch({
      type: SET_SCREAMS,
      payload: res.data
    });
  }
  catch (err) {
    dispatch({
      type: SET_SCREAMS,
      payload: []
    });
    console.log(err);
  }
}

// Like a scream
export const likeScream = screamId => async dispatch => {
  try {
    const res = await axios.get(`/scream/${screamId}/like`);
    dispatch({
      type: LIKE_SCREAM,
      payload: res.data
    })
  }
  catch (err) {
    console.log(err);
  }
}

// Unlike a scream
export const unlikeScream = screamId => async dispatch => {
  try {
    const res = await axios.get(`/scream/${screamId}/unlike`);
    dispatch({
      type: UNLIKE_SCREAM,
      payload: res.data
    })
  }
  catch (err) {
    console.log(err);
  }
}