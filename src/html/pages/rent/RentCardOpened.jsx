import { useState } from "react";
import ServicesBlock from "../services/ServicesBlock.jsx";
import ServicesConditionsBlock from "../services/ServicesConditionsBlock.jsx";
import CharacteristicContent from "./CharacteristicContent.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import BackButton from "../../components/BackButton.jsx";

export default function RentCardOpened(props) {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(0)
    const [activeImage, setActiveImage] = useState(0)
    const {mainPhone,whatsapp,telegram}=useSelector(state=>state.about)

    return <>
        <div className="rentCardOpenedContainer">
            <BackButton link={'/rent'} absolute={false}/>
            <div className="pageNavigationBlock">
                <div className="pageNav" onClick={() => {
                    navigate('/')
                }}>Главная</div>
                <div className="pageNav" onClick={() => {
                    navigate('/rent')
                }}>Аренда</div>
                <div className="pageNav active">{props.model}</div>
            </div>  
            <div className="rentCardOpened">
                <div className="photosBlock">
                    <div className="photo">
                        {
                            props.image.map((image, imageIndex) => <img className={activeImage === imageIndex ? "craneImage active" : "craneImage"} key={"craneImage_"+imageIndex} src={props.image[imageIndex]} />)
                        }
                    </div>
                    <div className="photoNavigation">
                        {
                            props.image.length > 1 && props.image.map((navButton, navButtonIndex) => <div className={activeImage === navButtonIndex ? "photoNavButton active" : "photoNavButton"} key={"photoNavButton_"+navButtonIndex} onClick={() =>{
                                setActiveImage(navButtonIndex)
                            }}/>)
                        }
                    </div>
                    {props.image.length > 1 && 
                    <div className="navArrowPrev" onClick={() => {
                        if (activeImage === 0) {
                            setActiveImage(props.image.length - 1)
                        } else {
                            console.log(props.image.length - 1)
                            setActiveImage(activeImage - 1)
                        }
                    }}> 
                        <div className="overlay" />
                        <img src="/images/rent/arrowPrev.svg" />
                    </div>}
                    {props.image.length > 1 &&
                    <div className="navArrowNext" onClick={() => {
                        if (activeImage === props.image.length - 1) {
                            setActiveImage(0)
                        } else {
                            setActiveImage(activeImage + 1)
                        }
                    }}>
                        <div className="overlay" />
                        <img src="/images/rent/arrowNext.svg" />
                    </div>}
                </div>
                <div className="infoBlock">
                    <div className="infoTextCardBlock">
                        <div className="infoTitle">Аренда башенного крана <br/>{props.model}</div>
                        <div className="infoDescription">
                            {props.infoDescription}
                        </div>
                    </div>
                    <div className="infoTabBlock">
                         <div className="infoTabContent characteristic">
                            <CharacteristicContent {...props}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="servicesTitle">Оказываемые услуги</div>
            <ServicesBlock />
        </div>
    </>
}