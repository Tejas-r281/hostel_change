import {
    COMMENT_REQUEST,
    COMMENT_SUCCESS,
    COMMENT_FAILURE,
    GET_ALLCOMMENT_REQUEST,
    GET_ALLCOMMENT_SUCCESS,
    GET_ALLCOMMENT_FAILURE
} from "../constants/suggestionConstant";
import axios from "axios";

export const addcomment = (comment) => async (dispatch) => {
    try {
        console.log(comment);
        dispatch({
            type: COMMENT_REQUEST,
        });
        // const config = { headers: { "Content-Type": "application/json" } };
        const res = await axios.get(`/api/v1/suggestion/comment?comment=${comment}`);
        dispatch({
            type: COMMENT_SUCCESS,
            payload: res.data,
        });

    }
    catch (err) {
        dispatch({
            type: COMMENT_FAILURE,
            payload: err.response.data.message,
        });
    }

}

export const getallcomment = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_ALLCOMMENT_REQUEST,
        })

        console.log("inside this block");


        const res = await axios.get(`/api/v1/suggestion/allcomment`);

        dispatch(
            {
                type: GET_ALLCOMMENT_SUCCESS,
                payload: res
            }
        );
    }
    catch (err) {
        dispatch({
            type: GET_ALLCOMMENT_FAILURE,
            payload: err.response.data.message,
        })
    }

}

