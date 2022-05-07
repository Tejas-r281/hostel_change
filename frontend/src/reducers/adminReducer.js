import {
DELETE_USER_REQUEST,
DELETE_USER_SUCCESS,
DELETE_USER_FAIL,
} from "../constants/adminConstant";

export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                success:true,
            };
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success:false,
            };
        default:
            return state;
    }
}
