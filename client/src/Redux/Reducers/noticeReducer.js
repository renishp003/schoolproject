import { NOTICE_REQUEST , NOTICE_SUCCESS, NOTICE_FAILUER } from "../types/type";

let initialState = {
    notice : [],
    error : ''
}

const noticeReducer = (state = initialState, action) => {
    switch(action.type){
        case NOTICE_REQUEST : 
           return state
        case NOTICE_SUCCESS : 
           return {
            notice : action.payload,
            error : ''
           }
        case NOTICE_FAILUER : 
           return {
            notice : state.notice,
            error : action.payload
           }
        default : 
           return state
    }
}

export default noticeReducer