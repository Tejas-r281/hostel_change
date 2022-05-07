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

export const likeanddislikeReducer = (state = {}, action) => {
    switch (action.type) {
        case LIKE_REQUEST:
        case DISLIKE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case LIKE_SUCCESS:
        case DISLIKE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case LIKE_FAILURE:
        case DISLIKE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


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
                data: action.payload.data,
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

export const commentDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_COMMENT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
            };
        case GET_COMMENT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                // success:true,
            };
        case GET_COMMENT_DETAIL_FAILURE:
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



