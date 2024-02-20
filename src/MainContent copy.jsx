import { useEffect, useRef, useState } from 'react'
import './CSS/style.css'
import './CSS/media.css'
import './CSS/transition.css'
import './CSS/preloader.css'
import './CSS/fonts.css'
import styles from './html/pages/admin/admin.module.css';
import Header from './html/components/Header.jsx'
import Footer from './html/components/Footer.jsx'
import MainPage from './html/pages/main/MainPage.jsx'
import RentPage from './html/pages/rent/RentPage.jsx'
import RentCardOpened from './html/pages/rent/RentCardOpened.jsx'
import AboutPage from './html/pages/about/AboutPage.jsx'
import ServicesPage from './html/pages/services/ServicesPage.jsx'
import ContactsPage from './html/pages/contacts/ContactsPage.jsx'
import CanvasApp from './3D/CanvasApp.jsx'
import Page404 from './html/components/Page404.jsx'
import Preloader from './html/components/Preloader.jsx'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import AdminPage from './html/pages/admin/AdminPage'
import { ToastContainer, toast } from 'react-toastify'
import { useItems } from './hooks/useItems'
import { useAbout } from './hooks/useAbout'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { removeUserRedux } from '../store/silces/userSlice'


export default function MainContent() {
  const location = useLocation()
  const nodeRef = useRef()
  const pageContentRef = useRef()
  const key = location.pathname.split('/')[1]
  const [activePage, setActivePage] = useState(location.pathname.split('/')[1])
  const [activatedMainPage, setActivatedMainPage] = useState(false)
  const [previousPage, setPreviousPage] = useState(undefined)
  const [transition, setTransition] = useState(false)
  const {email} = useSelector(state=>state.user);
  const dispatch = useDispatch();

  const [windowLoaded, setWindowLoaded] = useState(false)
  const [craneRendered, setCraneRendered] = useState(false)
  const [websiteReady, setWebsiteReady] = useState(false)
  const [preloaderOff, setPreloaderOff] = useState(false)

  useEffect(() => {
    if (preloaderOff) {
      setTransition(true)
      setTimeout(() => {
        setTransition(false)
      }, 1500);
    }
  }, [location.pathname.split('/')[1]])

  useEffect(()=> {
    if (windowLoaded && craneRendered) {
      setWebsiteReady(true)
    }
  }, [craneRendered])

  useEffect(()=> {
    setTimeout(() => {
      setPreloaderOff(true)
    }, 1000);
  }, [websiteReady])


  useEffect(() => {
    setActivePage(location.pathname.split('/')[1])
    if (location.pathname.split('/')[2] != undefined || previousPage != undefined) {
      window.scrollTo(0, 0);
      pageContentRef.current.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        if (window.innerWidth > 1280) {
          pageContentRef.current.scrollTo(0, 0);
        } else {
          window.scrollTo(0, 0);
        }
      }, 900)
    }
    return setPreviousPage(location.pathname.split('/')[2])
  }, [location.pathname])

  const {getAllItems} = useItems();
  const {getAboutData} = useAbout();

  useEffect(()=>{
      getAllItems();
      getAboutData();
      setWindowLoaded(true);
  },[]);


  return <>
  {/* <CanvasApp activePage={activePage} activatedMainPage={activatedMainPage} setActivatedMainPage={setActivatedMainPage} craneRendered={craneRendered} setCraneRendered={setCraneRendered}/> */}
  <Header activePage={activePage} setActivePage={setActivePage} transition={transition}/>
  <ToastContainer/>
  
  <div className="pageContent" ref={pageContentRef} style={activePage === "" ? {pointerEvents: 'none'} : {}}>
  {email&&<div className={styles.adminButtonBlock}>
    <Link className={styles.adminButton} to={'/admin'}>Панель администратора</Link>
    <div className={styles.exitAdminButton} onClick={(event)=>{event.stopPropagation();toast.warning(`Выход с администрирования ${email}`); dispatch(removeUserRedux())}}>
      <div className={styles.crossLine}/>
      <div className={styles.crossLine}/>
    </div>
  </div>}
  {/* {email&&<div style={{color:'yellow',fontSize:13,cursor:'pointer', position:'fixed',top:80,right:20,display:'flex',gap:10}}  ><Link to={'/admin'}>{email}</Link><span onClick={(event)=>{event.stopPropagation();toast.warning(`Выход с администрирования ${email}`); dispatch(removeUserRedux())}}>❌</span></div>} */}
    <SwitchTransition component={null}>
      <CSSTransition
      timeout={900}
      key={key}
      appear={true}
      unmountOnExit
      >
        <Routes location={location} nodeRef={nodeRef}>
            <Route index element={<MainPage activatedMainPage={activatedMainPage} setActivatedMainPage={setActivatedMainPage} />} />
            <Route path="/rent/*" element={<RentPage />} />
            <Route path="/about/" element={<AboutPage />} />
            <Route path="/services/" element={<ServicesPage />} />
            <Route path="/contacts/" element={<ContactsPage />} />
            <Route path='/admin' element={<AdminPage/>} />
            <Route path='/*' element={<Page404/>} />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  </div>
  <Footer />
  <div className={preloaderOff ? "backgroundBlock" : "backgroundBlock active"}/>
  <Preloader windowLoaded={windowLoaded} craneRendered={craneRendered}/>
  <div className={transition && preloaderOff ? "transitionBlock active" : "transitionBlock"} >
    <div className="transitionLine"/>
    <div className="transitionLine"/>
    <div className="transitionLine"/>
    <div className="transitionLine"/>
    <div className="transitionLine"/>
    <div className="transitionLine"/>
    <div className="transitionLine"/>
    <div className="transitionLine"/>
    <div className="transitionLine"/>
    <div className="transitionLine"/>
    <div className="transitionLine"/>
  </div>
  </>
  
}


