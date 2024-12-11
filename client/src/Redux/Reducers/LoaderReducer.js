import { LOADER_SUCCESS } from "../types/type";


let initialState = {
    loader : false
}


const loaderReducer = (state = initialState, action) => {
    switch(action.type){
        case LOADER_SUCCESS : 
           return {
            loader : action.payload
           }
        default : 
           return state
    }
}

export default loaderReducer