import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReduser, userSlice } from "./silces/userSlice";
import { itemsReduser, itemsSlice } from "./silces/itemsSlice";
import { aboutReduser, aboutSlice } from "./silces/aboutSlice";

import { createStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage'

const reducers = combineReducers({ [userSlice.name]: userReduser, [itemsSlice.name]: itemsReduser, [aboutSlice.name]: aboutReduser })

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['items','about','user']
}

const persistedReducer = persistReducer(persistConfig, reducers)


export let store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export let persistor = persistStore(store)
