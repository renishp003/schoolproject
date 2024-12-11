import { STUDENT_REQUEST , STUDENT_SUCCESS, STUDENT_FAILUER } from "../types/type";


let initialState = {
    student : [],
    error : ''
}


const studentReducer = (state = initialState, action) => {
    switch(action.type){
        case STUDENT_REQUEST : 
           return state
        case STUDENT_SUCCESS : 
           return {
            student : action.payload,
            error : ''
           }
        case STUDENT_FAILUER : 
           return {
            student : state.student,
            error : action.payload
           }
        default : 
           return state
    }
}

export default studentReducer