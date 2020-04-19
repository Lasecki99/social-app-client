import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, LOADING_UI, POST_SCREAM, SET_ERRORS, CLEAR_ERRORS, SET_SCREAM, STOP_LOADING_UI, SUBMIT_COMMENT } from '../types';
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

export const getScream = screamId => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.get(`/scream/${screamId}`);
    dispatch({ type: SET_SCREAM, payload: res.data });
    dispatch({ type: STOP_LOADING_UI });
  }
  catch (err) {
    console.log(err);
  }
}
//Post a scream
export const postScream = newScream => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post('/scream', newScream);
    dispatch({
      type: POST_SCREAM,
      payload: res.data
    });
    dispatch(clearErrors());
  }
  catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  }
};

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
//Submit a comment
export const submitComment = (screamId, commentData) => async dispatch => {
  try {
    const res = await axios.post(`/scream/${screamId}/comment`, commentData)
    dispatch({ type: SUBMIT_COMMENT, payload: res.data });
    dispatch(clearErrors());
  }
  catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
}

export const deleteScream = screamId => async dispatch => {
  try {
    await axios.delete(`/scream/${screamId}`);
    dispatch({ type: DELETE_SCREAM, payload: screamId })
  }
  catch (err) {
    console.log(err);
  }
}

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
}