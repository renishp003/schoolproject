import { SCHOOL_REQUEST , SCHOOL_SUCCESS, SCHOOL_FAILUER } from "../types/type";


let initialState = {
    school : [],
    error : ''
}


const schoolReducer = (state = initialState, action) => {
    switch(action.type){
        case SCHOOL_REQUEST : 
           return state
        case SCHOOL_SUCCESS : 
           return {
            school : action.payload,
            error : ''
           }
        case SCHOOL_FAILUER : 
           return {
            school : state.school,
            error : action.payload
           }
        default : 
           return state
    }
}

export default schoolReducer