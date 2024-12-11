import { ASSIGNMENT_REQUEST , ASSIGNMENT_SUCCESS, ASSIGNMENT_FAILUER } from "../types/type";


let initialState = {
    assignment : [],
    error : ''
}


const assignmentReducer = (state = initialState, action) => {
    switch(action.type){
        case ASSIGNMENT_REQUEST : 
           return state
        case ASSIGNMENT_SUCCESS : 
           return {
            assignment : action.payload,
            error : ''
           }
        case ASSIGNMENT_FAILUER : 
           return {
            assignment : state.assignment,
            error : action.payload
           }
        default : 
           return state
    }
}

export default assignmentReducer