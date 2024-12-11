import { TEACHER_REQUEST , TEACHER_SUCCESS, TEACHER_FAILUER } from "../types/type";


let initialState = {
    teacher : [],
    error : ''
}


const teacherReducer = (state = initialState, action) => {
    switch(action.type){
        case TEACHER_REQUEST : 
           return state
        case TEACHER_SUCCESS : 
           return {
            teacher : action.payload,
            error : ''
           }
        case TEACHER_FAILUER : 
           return {
            teacher : state.teacher,
            error : action.payload
           }
        default : 
           return state
    }
}

export default teacherReducer