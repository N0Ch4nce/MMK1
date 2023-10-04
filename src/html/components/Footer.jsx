import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Footer(props) {

    const {secPhone1,secPhone2,mainPhone}=useSelector(state=>state.about);
    return <>
    <div className="footer">
        <div className="footerContent">
            <div className="footerBlock logo">
                <div className="footerLogo">
                    <img src="/images/logoWhite.svg" alt="MMK-1 logo" />
                </div>
            </div>
            <div className="footerCenterBlock">
                <div className="footerBlock contacts1">
                    <div className="contactsRow title"></div>
                    <a href={`tel:${mainPhone.replaceAll(/[-() /\\]/g,'')}`} target="_blank" className="contactsRow mainPhone">
                        {mainPhone}
                    </a>
                    <a href="mailto:info@mmk-1.com" target="_blank" className="contactsRow">
                        <div className="mailIcon" />
                        <span>info@mmk-1.com</span>
                    </a>
                </div>
                <div className="footerBlock contacts2">
                    <div className="contactsRow title">секретарь</div>
                    <a href={`tel:${secPhone1.replaceAll(/[-() /\\]/g,'')}`} target="_blank" className="contactsRow">
                        {secPhone1}
                    </a>
                    <a href={`tel:${secPhone2.replaceAll(/[-() /\\]/g,'')}`} target="_blank" className="contactsRow">
                        {secPhone2}
                    </a>
                </div>
                <div className="footerBlock contacts3">
                    <div className="contactsRow title"></div>
                    <div className="adress">Россия, Московская обл., Ногинский район, посёлок Рыбхоз </div>
                    <div className="adress">Россия, Волгоградская обл., г. Волжский, ул. им Карла Маркса, д.52, оф. 4 </div>
                </div>
                <a href="https://lavaweb.ru" target="_blank" className="footerBlock lavaweb">
                    <div className="lavawebdescription">Разработано в</div>
                    <div className="lavaWebLogoFooter">
                        <img src="/images/lavawebWhite.svg" alt="lavaweb logo" />
                    </div>
                </a>
                {/* <Link to={'/admin'} style={{fontSize:13}}>admin</Link> */}
            </div>
        </div>
    </div>
    </>
}