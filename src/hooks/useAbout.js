import { collection, getFirestore, getDoc, doc ,updateDoc } from "firebase/firestore"
import { app } from "../../firebase"
import { useDispatch } from "react-redux";
import { ref } from "firebase/storage";
import { setAboutDataRedux } from "../../store/silces/aboutSlice";
import { toast } from "react-toastify";



export const useAbout=()=>{
    const db = getFirestore(app);
    const docRef=doc(db,'about','about');
    
    const dispatch=useDispatch();
    

    const getAboutData= async()=>{

        const aboutSnap= await getDoc(docRef);
        if(aboutSnap.exists()){
            const about=aboutSnap.data();
            console.log('ABOUT DATA',about);
            dispatch(setAboutDataRedux(about))
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