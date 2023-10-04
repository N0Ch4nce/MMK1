import { createSlice } from "@reduxjs/toolkit";

const initialState={
itemsDocs:[],
items:[],
}


export const itemsSlice = createSlice({
    name:'items',
    initialState,
    reducers:{
        removeItemsRedux:()=>initialState,
        setItemDocsRedux:(state,action)=>{state.itemsDocs=action.payload},
        setItemRedux:(state,action)=>{state.items=action.payload},      
        
    }

})

export const {reducer:itemsReduser,actions:{removeItemsRedux,setItemDocsRedux,setItemRedux}} = itemsSlice