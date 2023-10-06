import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function RentCard(props) {
    const navigate = useNavigate()
    const location = useLocation()
    function changeLocation(to, newLocation) {
        if (location.pathname != newLocation) {
            navigate(to)
            window.scrollTo(0, 0);
        }
    }
    const [imgSrc,setImgSrc]=useState('images/rentCardLoading.png')
    useEffect(()=>{
        const img = new Image();
        img.src=props.image[0];
        img.onload=()=>{setImgSrc(img.src)}
    },[])

    return <>
        <div className="rentCard">
            <div className="rentCardPhoto" onClick={() => {
                changeLocation(props.cardId)
            }}>
                <img src={imgSrc} />
                {/* <img src={props.image[0]||'images/rentCardLoading.png'} /> */}
                
            </div>
            <div className="rentCardContent brand">
                <div className="contentName">Бренд:</div>
                <div className="contentText">{props.brand}</div>
            </div>
            <div className="rentCardContent model">
                <div className="contentName">Модель:</div>
                <div className="contentText">{props.model}</div>
            </div>
            <div className="rentCardContent carbage">
                <div className="contentName">Грузоподъемность:</div>
                <div className="contentText">{`${props.garbage} т.`}</div>
            </div>
            <div className="rentCardContent radius">
                <div className="contentName">Вылет:</div>
                <div className="contentText">
                    <div className="radiusMinBlock">
                        <div className="radiusMinText">min</div>
                        <div className="radiusMinNumber">{`${props.minRadius} м.`}</div>
                    </div>
                    <div className="radiusMaxBlock">
                        <div className="radiusMaxText">max</div>
                        <div className="radiusMaxNumber">{`${props.maxRadius} м.`}</div>
                    </div>
                </div>
            </div>
            <div className="rentCardContent height">
                <div className="contentName">Макс высота:</div>
                <div className="contentText">{`${props.height} м.`}</div>
            </div>
            <div className="rentCardButton" onClick={() => {
                changeLocation(props.cardId)
            }}>Заказать \ Подробнее</div>
        </div>
    </>
}