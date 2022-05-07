import {
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAILURE,
  GET_ALLCOMMENT_REQUEST,
  GET_ALLCOMMENT_SUCCESS,
  GET_ALLCOMMENT_FAILURE,
  DISLIKE_REQUEST,
  DISLIKE_SUCCESS,
  DISLIKE_FAILURE,
  LIKE_REQUEST,
  LIKE_SUCCESS,
  LIKE_FAILURE,
  GET_COMMENT_DETAIL_REQUEST,
  GET_COMMENT_DETAIL_SUCCESS,
  GET_COMMENT_DETAIL_FAILURE,
} from "../constants/suggestionConstant";
import axios from "axios";

export const like = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LIKE_REQUEST,
    });
    const res = await axios.put(`/api/v1/suggestion/like/${id}`);
    dispatch({
      type: LIKE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LIKE_FAILURE,
      payload: err.response.data.error,
    });
  }
};

export const dislike = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DISLIKE_REQUEST,
    });
    const res = await axios.put(`/api/v1/suggestion/dislike/${id}`);
    dispatch({
      type: DISLIKE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DISLIKE_FAILURE,
      payload: err.response.data.error,
    });
  }
};

export const addcomment = (comment) => async (dispatch) => {
  try {
    console.log(comment);
    dispatch({
      type: COMMENT_REQUEST,
    });
    // const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.get(
      `/api/v1/suggestion/comment?comment=${comment}`
    );
    dispatch({
      type: COMMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENT_FAILURE,
      payload: err.response.data.message,
    });
  }
};

export const getallcomment = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALLCOMMENT_REQUEST,
    });

    // console.log("inside this block");

    const res = await axios.get(`/api/v1/suggestion/allcomment`);

    dispatch({
      type: GET_ALLCOMMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALLCOMMENT_FAILURE,
      payload: err.response.data.message,
    });
  }
};

export const commentDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COMMENT_DETAIL_REQUEST,
    });

    const res = await axios.get(`/api/v1/suggestion/commentdetail/${id}`);
    dispatch({
      type: GET_COMMENT_DETAIL_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_COMMENT_DETAIL_FAILURE,
      payload: err.response.data.message,
    });
  }
};
