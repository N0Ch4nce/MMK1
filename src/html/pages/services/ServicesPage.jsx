import { useNavigate } from "react-router-dom";
import ServicesBlock from "./ServicesBlock.jsx";
import ServicesConditionsBlock from "./ServicesConditionsBlock.jsx";

export default function ServicesPage(props) {
    const navigate = useNavigate()
    
    return <>
    <div className="page servicesPage">
        <div className="pageContentBlock">
            <div className="pageNavigationBlock">
                <div className="pageNav" onClick={() => {
                    navigate('/')
                }}>Главная</div>
                <div className="pageNav active">Услуги</div>
            </div>
            <div className="pageTitle">Наши услуги</div>
            {/* <div className="servicesDescription">
                <p>В процессе развития компания расширила объем предоставляемых услуг. <br/> Мы можем предложить нашим клиентам спектор самых необходимых услуг высокого качества от специалистов с опытом работы более 10 лет.</p>
                <p>Мы создаем условия при которых наши клиенты  получают высококачественный круглосуточный сервис на выгодных условиях и с положительным экономическим эффектом.</p>
            </div> */}
            <ServicesConditionsBlock />
            <ServicesBlock />
        </div>
    </div>
    </>
}