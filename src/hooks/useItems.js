import { useDispatch } from "react-redux";
import { setItemDocsRedux, setItemRedux } from "../../store/silces/itemsSlice";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebase";



export const useItems=()=>{

    const db = getFirestore(app);
    const collectionDb = collection(db, "items");
    const dispatch = useDispatch();

    const getAllItems = async () => { //получаем все документы 
        const querySnapshots = await getDocs(collectionDb)
        let tempDocs = [];
        let docs=[];
        querySnapshots.forEach(snap => {           
            tempDocs = [...tempDocs, snap.data()];            
           docs=[...docs,doc(collectionDb,snap.id)];           
        });
        //console.log('ALL DATA🖥️',tempDocs);
        if(tempDocs.length){
            dispatch(setItemRedux(tempDocs));
            dispatch(setItemDocsRedux(docs));
        }

    } 


    return { getAllItems}
}