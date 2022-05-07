import {
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
} from "../constants/adminConstant";

import axios from "axios";

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        const res = await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
    } catch (err) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: err.response.data.message,
        });

    }
}