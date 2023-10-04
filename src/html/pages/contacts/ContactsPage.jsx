import { useNavigate } from "react-router-dom";
import ServicesConditionsBlock from "../services/ServicesConditionsBlock.jsx";
import { useSelector } from "react-redux";

export default function ContactsPage(props) {
    const navigate = useNavigate();

    const {secPhone1,secPhone2} = useSelector(state=>state.about)
    return <>
    <div className="page contactsPage">
        <div className="pageContentBlock">
            <div className="pageNavigationBlock">
                <div className="pageNav" onClick={() => {
                    navigate('/')
                }}>Главная</div>
                <div className="pageNav active">Контакты</div>
            </div>
            <div className="pageTitle">Контакты</div>
            <div className="contactsPageContent">
                <div className="contactsBlock">
                    <ServicesConditionsBlock />
                    <div className="secretaryNumbersBlock">
                        <div className="secretaryName">Секретарь</div>
                        <div className="secretaryPhones">
                            <a href={`tel:${secPhone1.replaceAll(/[-() /\\]/g,'')}`} target="_blank" className="secretaryPhone">{secPhone1}</a>
                            <a href={`tel:${secPhone2.replaceAll(/[-() /\\]/g,'')}`} target="_blank" className="secretaryPhone">{secPhone2}</a>
                        </div>
                    </div>
                    <div className="adresesMainBlock">
                        <div className="adresesTitle">Адреса</div>
                        <div className="adresesBlock">Россия, Московская обл., Ногинский район, посёлок Рыбхоз </div>
                        <div className="adresesBlock">Россия, Волгоградская обл., г. Волжский, ул. им Карла Маркса, д.52, оф. 4</div>
                        <div className="adresesAnnotation">Мы работаем по всей России</div>
                    </div>
                </div>
                <div className="contactsBlock">
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
    </div>
    </>
}