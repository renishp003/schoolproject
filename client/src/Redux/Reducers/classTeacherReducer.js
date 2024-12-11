import { CLASS_TEACHER_REQUEST , CLASS_TEACHER_SUCCESS, CLASS_TEACHER_FAILUER } from "../types/type";


let initialState = {
    classTeacher : [],
    error : ''
}


const classTeacherReducer = (state = initialState, action) => {
    switch(action.type){
        case CLASS_TEACHER_REQUEST : 
           return state
        case CLASS_TEACHER_SUCCESS : 
           return {
            classTeacher : action.payload,
            error : ''
           }
        case CLASS_TEACHER_FAILUER : 
           return {
            classTeacher : state.classTeacher,
            error : action.payload
           }
        default : 
           return state
    }
}

export default classTeacherReducer