import { addDoc, collection, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useItems } from "../../../hooks/useItems";
import styles from './admin.module.css';
import { getDownloadURL, getStorage, uploadBytes,ref } from "firebase/storage";

import { app } from "../../../../firebase";

// brand:brend,
// model,
// infoDescription:about,
// minRadius,
// maxRadius,
// height,
// garbage:capacity,
// minGarbage:minCapacity,
// maxGarbage:maxCapacity,
// image:urlsImg,
// document:urlPdf

export default function EditProduct({itemIndex,close}){

    const storage = getStorage(app);
    const db = getFirestore(app);
    const collectionDb = collection(db, "items");

    const {items, itemsDocs}=useSelector(state=>state.items);
    const item=items[itemIndex];

    const {getAllItems}= useItems();

    const [error, setError] = useState('');

    const [image,setImage]= useState(item.image);
    const [imgsArr, setImgsArr] = useState([]);
    const [pdf, setPdf] = useState(item.document);
    const [brend, setBrend] = useState(item?.brand);
    const [model, setModel] = useState(item.model);
    const [about, setAbout] = useState(item.infoDescription);
    const [minRadius, setMinRadius] = useState(item.minRadius);
    const [maxRadius, setMaxRadius] = useState(item.maxRadius);
    const [height, setHeight] = useState(item.height);
    const [capacity, setCapactity] = useState(item.garbage);
    const [minCapacity, setMinCapactity] = useState(item.minGarbage);
    const [maxCapacity, setMaxCapactity] = useState(item.maxGarbage);

    const productImgHandler = (event) => {
        if (event.target.files.length) {
            setImgsArr(state=>[...state,...event.target.files]);
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

    const onUpdateDocument = async() => {



        await Promise.all([
            ...imgsArr.map(async (imgEl) => {
                const storageRef = ref(storage, `product-images/${imgEl.name}_${new Date().getTime()}`);//создаем реф из файла и имени
                return uploadBytes(storageRef, imgEl); //отсылаем на сервер - вернет объект(snapshot) с  ref файла на сервере
            }),
            uploadBytes(ref(storage, `product-pdf/${pdf.name}_${new Date().getTime()}`),pdf)//загружаем PDF
        ])
        .then(async (snapshots) => {// получаем массив snapshots            
            const urlsArr = await Promise.all(snapshots.map(async ({ ref }) => getDownloadURL(ref)));//делаем из массива снапшотов массив ссылок на файл (АСИНХРОННО!)
            console.log('URLS', urlsArr);
            //создаём документ
            try {
                const urlPdf=urlsArr.find(url=>url.match(/product-pdf/));
                const urlsImg = urlsArr.filter(url=>!!!url.match(/product-pdf/));//делаем массив url картинок строкой

                await updateDoc(itemsDocs[itemIndex], {
                    brand: brend,
                    model,
                    infoDescription: about,
                    minRadius,
                    maxRadius,
                    height,
                    garbage: capacity,
                    minGarbage: minCapacity,
                    maxGarbage: maxCapacity,
                    image:[...image,...urlsImg],
                    document: urlPdf||pdf
                })

                await getAllItems();
                close();

            } catch (e) {
                console.log('ERROR WRITE DOCUMENT !!', e)
            }
        });







        // updateDoc(itemsDocs[itemIndex], {
        //     brand: brend,
        //     model,
        //     infoDescription: about,
        //     minRadius,
        //     maxRadius,
        //     height,
        //     garbage: capacity,
        //     minGarbage: minCapacity,
        //     maxGarbage: maxCapacity,
        //     image,
        //     document: pdf
        // }).then(async()=>{
        //     await getAllItems();
        //     close();
        // })
    }

    const onDelImageFromArchive=(url)=>confirm('Удалить изображение?')&&setImage(state=>state.filter(img=>img!==url));
    const onDelImageFromUpload=(indexImg)=>confirm('Удалить изображение?')&&setImgsArr((state)=>state.filter((file,idx)=>idx!==indexImg));
    

    useEffect(()=>{
        console.log('CURREND FOR EDIT', items[itemIndex])
    },[])

    return(
        <div className={styles.formBlock}>
            EditProduct

            {/* <input type="file" onChange={productImgHandler} accept="image/png, image/gif, image/jpeg" multiple /> */}
            <div style={{ display: 'flex',gap:10 }}>
                {
                    image.map((img, idx) => <img key={idx + '_uploadImg'} src={img} className={styles.miniImg} onClick={()=>onDelImageFromArchive(img)} />)
                }
                {
                    imgsArr.map((img, idx) => <img key={idx + '_uploadImg'} src={URL.createObjectURL(img)} className={styles.miniImg} style={{border:'2px solid lightgreen',borderRadius:5}} onClick={()=>onDelImageFromUpload(idx)}/>)
                }
            </div>
            <input type="file" onChange={productImgHandler} accept="image/png, image/gif, image/jpeg" multiple/>
            <span>Бренд</span>
            <input type="text" value={brend} onChange={event => setBrend(event.target.value)} placeholder="Бренд" />
            <span>Модель</span>
            <input type="text" value={model} onChange={event => setModel(event.target.value)} placeholder="Модель" />
            <span>Описание</span>
            <textarea value={about} onChange={event => setAbout(event.target.value)} placeholder="Описание" />  
            <span>Грузоподъёмность на минимальном вылете</span>          
            <input type="number" value={minCapacity} onChange={event => setMinCapactity(event.target.value)} placeholder="Грузоподъёмность на минимальном вылете" />
            <span>Грузоподъёмность на максимальном вылете</span>
            <input type="number" value={maxCapacity} onChange={event => setMaxCapactity(event.target.value)} placeholder="Грузоподъёмность на максимальном вылете" />
            <span>Максимальная грузоподъёмность</span>
            <input type="number" value={capacity} onChange={event => setCapactity(event.target.value)} placeholder="Максимальная грузоподъёмность" />
            <span>Минимальный вылет стрелы</span>
            <input type="number" value={minRadius} onChange={event => setMinRadius(event.target.value)} placeholder="Минимальный вылет стрелы" />
            <span>Максимальный вылет стрелы</span>
            <input type="number" value={maxRadius} onChange={event => setMaxRadius(event.target.value)} placeholder="Максимальный вылет стрелы" />
            <span>Высота свободного стояния</span>
            <input type="number" value={height} onChange={event => setHeight(event.target.value)} placeholder="Высота свободного стояния" />
            <span>Документ</span>
            <a href={pdf} target="_blank" rel="noreferrer">текущий документ</a>
            <input type="file" onChange={productPdfHandler} accept="application/pdf" />
            <button onClick={onUpdateDocument}>Обновить</button>
            <button onClick={close}>Отмена</button>
        </div>
    )
}