import { createSlice } from "@reduxjs/toolkit";

const initialState={
    id:null,
    token: null,
    email:null,
}


export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserRedux:(state,action)=>action.payload,
        removeUserRedux:()=>initialState,
    }

})

export const {reducer:userReduser,actions:{removeUserRedux,setUserRedux}} = userSlice