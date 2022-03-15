import {
    COMMENT_REQUEST,
    COMMENT_SUCCESS,
    COMMENT_FAILURE,
    GET_ALLCOMMENT_REQUEST,
    GET_ALLCOMMENT_SUCCESS,
    GET_ALLCOMMENT_FAILURE,

} from "../constants/suggestionConstant";

export const commentReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMENT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
            };
        case COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                comment: action.payload,
                success:true,
            };
        case COMMENT_FAILURE:
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

export const allcommentReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALLCOMMENT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
            };
        case GET_ALLCOMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                // success:true,
            };
        case GET_ALLCOMMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                // success:false,
            };
        default:
            return state;
    }
}

