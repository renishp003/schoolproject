import { CLASS_DIVISION_REQUEST , CLASS_DIVISION_SUCCESS, CLASS_DIVISION_FAILUER } from "../types/type";


let initialState = {
    classAndDivision : [],
    error : ''
}


const classAndDivisionReducer = (state = initialState, action) => {
    switch(action.type){
        case CLASS_DIVISION_REQUEST : 
           return state
        case CLASS_DIVISION_SUCCESS : 
           return {
            classAndDivision : action.payload,
            error : ''
           }
        case CLASS_DIVISION_FAILUER : 
           return {
            classAndDivision : state.classAndDivision,
            error : action.payload
           }
        default : 
           return state
    }
}

export default classAndDivisionReducer