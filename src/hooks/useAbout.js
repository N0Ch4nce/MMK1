import { collection, getFirestore, getDoc, doc ,updateDoc } from "firebase/firestore"
import { app, docRef } from "../../firebase"
import { useDispatch } from "react-redux";
import { ref } from "firebase/storage";
import { setAboutDataRedux } from "../../store/silces/aboutSlice";
import { toast } from "react-toastify";

let start = true;

export const useAbout=()=>{
    // const db = getFirestore(app);
    // const docRef=doc(db,'about','about');
    
    const dispatch=useDispatch();
    

    const getAboutData= async()=>{
        if (!start) return;
        start=false;


        console.log('GET ABOUT')
        try {
            const aboutSnap= await getDoc(docRef);
            const about=aboutSnap.data();
            console.log('ABOUT',about);
            
            dispatch(setAboutDataRedux(about));
        } catch (error) {
            console.log('ABOUT ERROR', error)
            start=true;
            getAboutData();
        }


    }

    const updateAbout = async(data)=>{

        updateDoc(docRef,data).then(()=>{
            getAboutData().then(()=>{                
                toast.success('Данные успешно обновлены!')
            })
            
        })
    }

    return { getAboutData,updateAbout}
}