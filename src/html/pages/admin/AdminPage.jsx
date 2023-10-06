import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "../../components/Form";
import { useDispatch, useSelector } from "react-redux";
import { removeUserRedux, setUserRedux } from "../../../../store/silces/userSlice";
import { ToastContainer, toast } from "react-toastify";
import AddProducts from "./AddProducts";
import { useState,useEffect } from "react";
import { collection, doc, getDocs, getFirestore, updateDoc , deleteDoc} from "firebase/firestore";
import { app } from "../../../../firebase";
import { useItems } from "../../../hooks/useItems";
import EditProduct from "./EditProduct";
import styles from './admin.module.css';
import { setAboutDataRedux } from "../../../../store/silces/aboutSlice";
import { useAbout } from "../../../hooks/useAbout";



export default function AdminPage() {
        //selectors
        const isAuth = useSelector(state => !!state.user.email);
        const { user } = useSelector(state => state);    
        const {items, itemsDocs}=useSelector(state=>state.items);
        const {about}= useSelector(state=>state)

    //state
    const [isAddProduct,setIsAddProduct] = useState(false);
    const [docs,setDocs]=useState([]);
    const [selectedItemIndex, setSelectedItemIndex]=useState(null);

    const [mainPhone,setMainPhone] = useState(about.mainPhone);
    const [secPhone1,setSecPhone1] = useState(about.secPhone1);
    const [secPhone2,setSecPhone2] = useState(about.secPhone2);
    const [whatsapp,setWhatsapp] = useState(about.whatsapp);
    const [telegram,setTelegram] = useState(about.telegram);
    

    //hooks
    const dispatch = useDispatch();
    const auth = getAuth();
    const {getAllItems} = useItems();
    const {updateAbout} = useAbout()




    //func
    const handleLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                dispatch(setUserRedux({
                    id: user.uid, token: user.accessToken
                    , email: user.email
                }));
                toast.success(`Успешный вход ${user.email}`);
            })
            .catch(() => {
                
                toast.error('Пользователь или пароль указаны неверно')
            });
    }

    const onDeleteDoc=(index)=>{
        if(confirm('Удалить ?')){
            deleteDoc(itemsDocs[index]).then(()=>{
                getAllItems();
                toast.success('Позиция удалена')
            })
        }
    }

    const onUpdateAbout=()=>{
        updateAbout({
            mainPhone,
            secPhone1,
            secPhone2,
            whatsapp,
            telegram
        })
    }


    //html
    const adminHtml =()=> {

        if(selectedItemIndex!==null){
            return <EditProduct itemIndex={selectedItemIndex} close={()=>setSelectedItemIndex(null)}/>
        }
    
    
    return <div style={{display:'flex',flexDirection:'column'}}>

        <div style={{display:'flex',flexDirection:'column'}}>
            
            {
                isAddProduct
                ?<AddProducts close={()=>setIsAddProduct(false)}/>
                    : <div className={styles.mainWrap} >
                        <div style={{ display: 'flex', flexDirection: 'column' }} className={styles.itemsBlock}>
                            <div className={styles.redactorInputTitle}>
                                Редактирование кранов
                            </div>
                            <div className={styles.list}>
                                {
                                    items.map((item, index) => {
                                        return <div key={Math.random()} onClick={() => setSelectedItemIndex(index)} className={styles.listItem}>
                                            {`${item.brand} ${item.model}`}
                                            <span onClick={(event) => { event.stopPropagation(); onDeleteDoc(index) }} style={{ cursor: 'pointer' }}>
                                                ❌</span>
                                        </div>
                                    })
                                }
                            </div>
                            <button onClick={() => setIsAddProduct(true)} className={styles.button}>Добавить товар</button>
                        </div>
                        <div className={styles.aboutBlock}>
                            <div className={styles.columnBlock}>
                                <div className={styles.redactorInputTitle}>
                                    Редактирование контактов
                                </div>
                                <div className={styles.contactsRedactorInput}>
                                    <span>Главный номер</span>
                                    <input type="text" value={mainPhone} onChange={event=>setMainPhone(event.target.value)}/>
                                </div>
                                <div className={styles.contactsRedactorInput}>
                                    <span>Секретарь телефон 1</span>
                                    <input type="text" value={secPhone1} onChange={event=>setSecPhone1(event.target.value)}/>
                                </div>
                                <div className={styles.contactsRedactorInput}>
                                    <span>Секретарь телефон 2</span>
                                    <input type="text" value={secPhone2} onChange={event=>setSecPhone2(event.target.value)}/>
                                </div>
                                <div className={styles.contactsRedactorInput}>
                                    <span>WhatsApp</span>
                                    <input type="text" value={whatsapp} onChange={event=>setWhatsapp(event.target.value)}/>
                                </div>
                                <div className={styles.contactsRedactorInput}>
                                    <span>Telegram</span>
                                    <input type="text" value={telegram} onChange={event=>setTelegram(event.target.value)}/>
                                </div>
                            </div>
                            <button onClick={onUpdateAbout} className={styles.button}>Обновить</button>
                        </div>
                    </div>
            }
        </div>
    </div>}
    //effects
    useEffect(()=>{
        getAllItems();
    },[])

    
    

    return (
        <div style={{ display: "flex", flexDirection: 'column' }}>           
            <div className={styles.adminTitle}>Страница администратора</div>

            {
                !isAuth
                    ? <Form handleClick={handleLogin} title={'Авторизоваться'} />
                    : adminHtml()
            }


        </div>
    )
}