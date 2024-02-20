import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage(props) {
    const navigate = useNavigate()
    useEffect(()=> {
        setTimeout(() => {
            props.setActivatedMainPage(true)
            window.scrollTo(0, 0);
        }, 750);
        return () => {
            setTimeout(() => {
                props.setActivatedMainPage(false)
                window.scrollTo(0, 0);
            }, 750);
        }
    }, [])
    return <>
    <div className="page mainPage">
        <div className="mainPageLeftContentBlock">
            <div className="titleBlock">
                <h1 className="title">Башенные краны в аренду<br /> по отличным ценам</h1>
                <h2 className="city">Москва</h2>
            </div>
            <div className="advantagesBlock">
                <div className="advantage">
                    <div className="advIcon" />
                    <div className="advText">Свои операторы башенных кранов<br /> и ремонтные бригады</div>
                </div>
                <div className="advantage">
                    <div className="advIcon" />
                    <div className="advText">Круглосуточная сервисная служба<br /> и собственная база запасных частей</div>
                </div>
                <div className="advantage">
                    <div className="advIcon" />
                    <div className="advText">Система управления оборудованием<br /> сокращает простои на 16%</div>
                </div>
            </div>
        </div>
        <div className="mainPageRightContentBlock">
            <div className="buttonBlock" onClickCapture={ () => navigate('/rent')}>Каталог →</div>
            <div className="partnersBlock">
                <div className="partnerLogo">
                    <img src="/images/partner1.png" />
                </div>
                <div className="partnerLogo">
                    <img src="/images/partner2.png" />
                </div>
                <div className="partnerLogo">
                    <img src="/images/partner3.png" />
                </div>
            </div>
        </div>
    </div>
    </>
}