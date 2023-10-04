import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAbout } from "../../../hooks/useAbout";
import { useSelector } from "react-redux";
import styles from '../admin/admin.module.css';
import { useItems } from "../../../hooks/useItems";


export default function AboutPage(props) {
    const navigate = useNavigate();



    //selectors
    const { field1, field2, field3, img } = useSelector(state => state.about);
    const isAuth = useSelector(state => !!state.user.id);

    //state
    const [uploadImg, setUploadImg] = useState(null);
    const [field1State, setField1State] = useState(field1);
    const [field2State, setField2State] = useState(field2);

    //hooks
    const { getAboutData, updateAbout } = useAbout();

    //funcs
    const changeImgHandler = (event) => {
        const file = event.target.files[0];
        if (file) {
            // setUploadImg(URL.createObjectURL(file))
            const fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onloadend = () => {
                // console.log('DATA',fr.result)
                setUploadImg(fr.result);
            }
            // setUploadImg();
        }
    }

    const onUpdateAboutData = () => {
        const data={};
        if(uploadImg)data.img=uploadImg;
        if(field1!==field1State)data.field1=field1State;
        if(field2!==field2State)data.field2=field2State;
        console.log('DATA',data);

        updateAbout(data)
    }

    const isChangedData=()=>uploadImg||field1!=field1State||field2!=field2State;

    const block1=useRef();
    const block2=useRef();



    useEffect(()=>{
        if(!isAuth){
            block1.current.innerHTML=field1;
            block2.current.innerHTML=field2;
        }        
    },[field1,isAuth])
    const {getAllItems} = useItems();
    
  
    useEffect(()=>{
        getAllItems();
        getAboutData();
    },[]);


    return <>
        <div className="page aboutPage">
            <div className="pageContentBlock">
                <div className="pageNavigationBlock">
                    <div className="pageNav" onClick={() => {
                        navigate('/')
                    }}>Главная</div>
                    <div className="pageNav active">О нас</div>
                </div>
                <div className="pageTitle">О нас</div>
                <div className="aboutBlock">
                    <div className="photoBlock">
                        <div className="image">
                            <img src={uploadImg || img || "/images/aboutPhoto.jpeg"} />
                        </div>
                        {isAuth && 
                            <label>
                                <div className={styles.aboutPhotoButton}>Выбрать фотографию</div>
                                <input type="file" hidden={true} onChange={changeImgHandler} accept="image/png, image/gif, image/jpeg" />
                            </label>
                        }
                        <h3>Основатель компании ММК-1<br />Мазлоев Роман Борисович</h3>
                    </div>
                    

                    {isAuth?<textarea className={`descriptionBlock ${styles.textField}`}  id="editorjs" value={field1State||field1} onChange={event=>setField1State(event.target.value)} disabled={!isAuth} />
                    :<div className={`descriptionBlock `} ref={block1} id="editorjs" value={field1State||field1} onChange={event=>setField1State(event.target.value)} disabled={!isAuth} ></div>}

                </div>
                <div className="aboutBlock">

                    {
                        isAuth
                        ?<textarea className={`descriptionBlock2 ${styles.textField}`}  value={field2State||field2} onChange={event=>setField2State(event.target.value)} disabled={!isAuth}/>
                        :<div className={`descriptionBlock2`} ref={block2} ></div>
                    }
                    

                   
                    <div className="requisitesBlock">
                        <div className="requisitesBox">
                            <div className="requisitesTitle">ООО «ММК-1»</div>
                            <div className="requisitesContent1">
                                <div className="requisitesRow">
                                    <div className="text1">ОГРН</div>
                                    <div className="text2">1193443015633</div>
                                </div>
                                <div className="requisitesRow">
                                    <div className="text1">ИНН</div>
                                    <div className="text2">3435137750</div>
                                </div>
                                <div className="requisitesRow">
                                    <div className="text1">КПП</div>
                                    <div className="text2">343501001</div>
                                </div>
                            </div>
                            <div className="requisitesContent2">
                                <div className="adressRow">Юр. адрес:</div>
                                <div className="adressRow">404130, Волгоградская обл.,г. Волжский, ул. им Карла Маркса, д. 52, офис 4</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isAuth && isChangedData()&& <button onClick={onUpdateAboutData} style={
                {position:'fixed', bottom:100, right:50, zIndex:9999, color:'white', fontSize: 18, fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase', padding: "20px 70px", fontFamily: "ManifoldExtended"}
            }>Обновить</button>}
        </div>
    </>
}