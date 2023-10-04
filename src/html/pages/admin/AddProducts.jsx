import { useState } from "react";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { doc, setDoc, addDoc, getFirestore, collection, getDocs, } from 'firebase/firestore'
import { app } from "../../../../firebase";
import styles from './admin.module.css';
import { useItems } from "../../../hooks/useItems";
import { toast } from "react-toastify";



export default function AddProducts({close}) {

    //state
    const [imgsArr, setImgsArr] = useState([]);
    const [pdf, setPdf] = useState(null);
    const [error, setError] = useState('');

    const [brend, setBrend] = useState('');
    const [model, setModel] = useState('');
    const [about, setAbout] = useState('');
    const [minRadius, setMinRadius] = useState('');
    const [maxRadius, setMaxRadius] = useState('');
    const [height, setHeight] = useState('');
    const [capacity, setCapactity] = useState('');
    const [minCapacity, setMinCapactity] = useState('');
    const [maxCapacity, setMaxCapactity] = useState('');
    //firebase
    const [items, setItems] = useState([]);

    const storage = getStorage(app);
    const db = getFirestore(app);
    const collectionDb = collection(db, "items");

    //hooks
    const {getAllItems}=useItems()


    //funcs
    const productImgHandler = (event) => {
        if (event.target.files.length) {
            setImgsArr([...event.target.files]);
            setError('');
        } else {
            setImgsArr(null);
            setError('wrong image type')
        }
    }
    const productPdfHandler = (event) => {
        if (event.target.files[0]) {
            console.log('FILE', event.target.files[0])
            setPdf(event.target.files[0]);
            setError('');
        } else {
            setPdf(null)
        }
    }

    const addProduct = async (event) => {//добавляем картинки и документ
        if(!validateFields()){
            return
        }
        event.preventDefault();

        //const tempArr= 
        if(pdf){
            await Promise.all([
                ...imgsArr.map(async (imgEl) => {
                    const storageRef = ref(storage, `product-images/${imgEl.name}_${new Date().getTime()}`);//создаем реф из файла и имени
                    return uploadBytes(storageRef, imgEl); //отсылаем на сервер - вернет объект(snapshot) с  ref файла на сервере
                }),
                uploadBytes(ref(storage, `product-pdf/${pdf?.name}_${new Date().getTime()}`),pdf)
            ])
            .then(async (snapshots) => {// получаем массив snapshots            
                const urlsArr = await Promise.all(snapshots.map(async ({ ref }) => getDownloadURL(ref)));//делаем из массива снапшотов массив ссылок на файл (АСИНХРОННО!)
                console.log('URLS', urlsArr);
                //создаём документ
                try {
                    const urlPdf=urlsArr.find(url=>url.match(/product-pdf/));
                    const urlsImg = urlsArr.filter(url=>!!!url.match(/product-pdf/));//делаем массив url картинок строкой
                    const docRef = await addDoc(collectionDb, {//создаём документ и передаём в него данные
                        brand:brend,
                        model,
                        infoDescription:about,
                        minRadius,
                        maxRadius,
                        height,
                        garbage:capacity,
                        minGarbage:minCapacity,
                        maxGarbage:maxCapacity,
                        image:urlsImg,
                        document:urlPdf
                    });
    
                    await getAllItems();
                    toast.success('Позиция успешно добавлена')
                    close();
    
                } catch (e) {
                    console.log('ERROR WRITE DOCUMENT !!', e)
                }
            });
        }else{
            await Promise.all([
                ...imgsArr.map(async (imgEl) => {
                    const storageRef = ref(storage, `product-images/${imgEl.name}_${new Date().getTime()}`);
                    return uploadBytes(storageRef, imgEl); 
                })
                
            ])
            .then(async (snapshots) => {        
                const urlsArr = await Promise.all(snapshots.map(async ({ ref }) => getDownloadURL(ref)));  
                try {       
                    
                    const docRef = await addDoc(collectionDb, {//создаём документ и передаём в него данные
                        brand:brend,
                        model,
                        infoDescription:about,
                        minRadius,
                        maxRadius,
                        height,
                        garbage:capacity,
                        minGarbage:minCapacity,
                        maxGarbage:maxCapacity,
                        image:urlsArr,
                        document:''
                    });
    
                    await getAllItems();
                    toast.success('Позиция успешно добавлена')
                    close();
    
                } catch (e) {
                    console.log('ERROR WRITE DOCUMENT !!', e)
                }
            });

        }

        
    }

    const validateFields=()=>{
        setError('');
        
        if(!imgsArr.length){
            setError('Не добавлено фото');
            
            return false
        }
        if(!brend){
            setError('Не указан бренд');
            return false
        }
        if(!model){
            setError('Не указана модель');
            return false
        }
        if(!about){
            setError('Не указано описание');
            return false
        }

        if(!minRadius||!maxRadius||!height||!capacity||!minCapacity||!maxCapacity){
            setError('Не все характеристики крана указаны');
            return false
        }

        // if(!pdf){
        //     setError('Не добавлен файл технической документации')
        //     return false
        // }
        

        return true
    }

    return (
        <div className={styles.formBlock}>
            addProduct
            <input type="file" onChange={productImgHandler} accept="image/png, image/gif, image/jpeg" multiple />
            <div style={{ display: 'flex',gap:10}}>
                {
                    imgsArr.map((img, idx) => <img key={idx + '_uploadImg'} src={URL.createObjectURL(img)} className={styles.miniImg} />)
                }
            </div>
            <input type="text" value={brend} onChange={event => setBrend(event.target.value)} placeholder="Бренд" />
            <input type="text" value={model} onChange={event => setModel(event.target.value)} placeholder="Модель" />
            <textarea value={about} onChange={event => setAbout(event.target.value)} placeholder="Описание" />
            <h6>Характеристики</h6>
            <input type="number" value={minCapacity} onChange={event => setMinCapactity(event.target.value)} placeholder="Грузоподъёмность на минимальном вылете" />
            <input type="number" value={maxCapacity} onChange={event => setMaxCapactity(event.target.value)} placeholder="Грузоподъёмность на максимальном вылете" />
            <input type="number" value={capacity} onChange={event => setCapactity(event.target.value)} placeholder="Максимальная грузоподъёмность" />
            <input type="number" value={minRadius} onChange={event => setMinRadius(event.target.value)} placeholder="Минимальный вылет стрелы" />
            <input type="number" value={maxRadius} onChange={event => setMaxRadius(event.target.value)} placeholder="Максимальный вылет стрелы" />
            <input type="number" value={height} onChange={event => setHeight(event.target.value)} placeholder="Высота свободного стояния" />
            <input type="file" onChange={productPdfHandler} accept="application/pdf" />
            {!!error&&<h3>{error} ⚠️</h3>}
            <button onClick={addProduct}>сохранить</button>
            <button onClick={close}>Отмена</button>
        </div>
    )
}