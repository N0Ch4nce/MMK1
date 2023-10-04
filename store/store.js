import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReduser, userSlice } from "./silces/userSlice";
import { itemsReduser, itemsSlice } from "./silces/itemsSlice";
import { aboutReduser, aboutSlice } from "./silces/aboutSlice";

import { createStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage'

const reducers = combineReducers({[userSlice.name]:userReduser,[itemsSlice.name]:itemsReduser,[aboutSlice.name]:aboutReduser})

const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, reducers)



// export const store = configureStore(
//     {
//         reducer:reducers,
//         devTools:true,
//     }
//     )

  
        export let store = createStore(persistedReducer)
        export let persistor = persistStore(store)
