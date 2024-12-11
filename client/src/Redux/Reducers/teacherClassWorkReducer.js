import { TEACHER_CLASS_WORK_REQUEST , TEACHER_CLASS_WORK_SUCCESS, TEACHER_CLASS_WORK_FAILUER } from "../types/type";


let initialState = {
    teacherClassWork : [],
    error : ''
}


const teacherClassWorkReducer = (state = initialState, action) => {
    switch(action.type){
        case TEACHER_CLASS_WORK_REQUEST : 
           return state
        case TEACHER_CLASS_WORK_SUCCESS : 
           return {
            teacherClassWork : action.payload,
            error : ''
           }
        case TEACHER_CLASS_WORK_FAILUER : 
           return {
            teacherClassWork : state.teacherClassWork,
            error : action.payload
           }
        default : 
           return state
    }
}

export default teacherClassWorkReducer