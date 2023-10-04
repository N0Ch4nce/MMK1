import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    img: null,
    field1: null,
    field2: null,
    field3: null,
    secPhone1: "8-804-700-40-42",
    secPhone2: "+7 (961) 065-89-79",
    whatsapp: "https://wa.me/+79053953932",
    telegram: "https://t.me/mmkblog",
    mainPhone: "+7 (999) 974-52-15",
}


export const aboutSlice = createSlice({
    name:'about',
    initialState,
    reducers:{
        removeAboutRedux:()=>initialState,  
        setAboutDataRedux:(state,action)=>action.payload,
        
    }

})

export const {reducer:aboutReduser,actions:{removeAboutRedux, setAboutDataRedux }} = aboutSlice;