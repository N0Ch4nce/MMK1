import { BrowserRouter } from "react-router-dom";
import MainContent from "./MainContent";
import { PersistGate } from "redux-persist/integration/react";
import {store,persistor} from '../store/store.js';
import { useEffect, useRef } from "react";
import Preloader from "./html/components/Preloader.jsx";

export default function TopContent(props) {

    const gate = useRef()
    useEffect(()=>{
        console.log(gate)
    }, [])
    return <>
    <PersistGate ref={gate} loading={<Preloader />} persistor={persistor}>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </PersistGate>
    </>
}