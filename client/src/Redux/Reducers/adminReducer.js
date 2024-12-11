import { ADMIN_REQUEST , ADMIN_SUCCESS, ADMIN_FAILUER } from "../types/type";


let initialState = {
    admin : [],
    error : ''
}


const adminReducer = (state = initialState, action) => {
    switch(action.type){
        case ADMIN_REQUEST : 
           return state
        case ADMIN_SUCCESS : 
           return {
            admin : action.payload,
            error : ''
           }
        case ADMIN_FAILUER : 
           return {
            admin : state.admin,
            error : action.payload
           }
        default : 
           return state
    }
}

export default adminReducer