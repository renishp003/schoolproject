import { GET_ACTIVITY_PHOTO } from "../types/type"

const initialState = {
    activityImages:[]
}

export const  activityReducer =(state = initialState,action) => {
  switch (action.type) {

  case GET_ACTIVITY_PHOTO:{
   return {...state,activityImages:action.payload}
  }

  default:
    return state
  }
}
