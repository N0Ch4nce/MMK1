import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { removeUserRedux } from "../../../store/silces/userSlice"
import { useItems } from "../../hooks/useItems"
import { useAbout } from "../../hooks/useAbout"

export default function Header(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const [activeHeader, setActiveHeader] = useState(false)
    useEffect(() => {
        setActiveHeader(false)
    }, [location.pathname]);

  



    return <>
    <div className={activeHeader ? "headerOverlay active" : "headerOverlay"} onClick={() => {
        setActiveHeader(false)
    }} />
    
    <div className={activeHeader ? "headerCircle active" : "headerCircle"} onClick={() => {
        setActiveHeader(!activeHeader)
    }}>
        <div className="line" />
        <div className="line" />
        <div className="line" />
        <div className="line" />
    </div>
    <div className={activeHeader ? "header active" : "header"}>
        <div className="headerContent">
            <div className="headerBlock">
                <div className="logoHeader" onClick={()=> {
                    navigate('/')
                }}>
                    <img src="/images/logo.svg" />
                </div>
            </div>
            <div className="headerBlock">
                <div className="navigationHeader">
                    <div className={props.activePage === '' ? "navLi active" : "navLi"}
                        onClick={() => { 
                            if (props.transition === false) {
                                navigate('/') 
                            }
                        }}>Главная</div>

                    <div className={props.activePage === 'rent' ? "navLi active" : "navLi"}
                        onClick={() => { 
                            if (props.transition === false) {
                                navigate('/rent') 
                            }
                        }}>Аренда</div>

                    <div className={props.activePage === 'about' ? "navLi active" : "navLi"}
                        onClick={() => { 
                            if (props.transition === false) {
                                navigate('/about') 
                            }
                        }}>О нас</div>

                    <div className={props.activePage === 'services' ? "navLi active" : "navLi"}
                        onClick={() => { 
                            if (props.transition === false) {
                                navigate('/services') 
                            }
                        }}>Услуги</div>

                    <div className={props.activePage === 'contacts' ? "navLi active" : "navLi"}
                        onClick={() => { 
                            if (props.transition === false) {
                                navigate('/contacts') 
                            }
                        }}>Контакты</div>
                    

                </div>
            </div>
        </div>
    </div>
    </>
}