import {LOADER_SUCCESS } from "../types/type";
import axios from "axios";
import Swal from "sweetalert2";

export const isLoader = (data) => {
    return (dispatch) => {
        dispatch(loaderSuccess(data))
    }
}

export const loaderSuccess = (data) => {
    return {
        type: LOADER_SUCCESS,
        payload: data
    }
}