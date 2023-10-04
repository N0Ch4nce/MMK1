import { useSelector } from "react-redux"

export default function ServicesConditionsBlock(props) {

    const {mainPhone,whatsapp,telegram}=useSelector(state=>state.about)
    return <>
    <div className="servicesConditionsBlock">
        <div className="conditionsTitle">Получите индвидуальные условия</div>
        <div className="conditionsDescription">Для получения консультации, заказа и индивидуальных условий сотрудничества,<br /> свяжитесь с нашим специалистом.</div>
        <div className="conditionsFrame">
            <div className="conditionsFrameBlock">
                <a href={`tel:${mainPhone.replaceAll(/[-() /\\]/g,'')}`} target="_blank" className="numberFrame">{mainPhone}</a>
                <a href="mailto:info@mmk-1.com" target="_blank" className="mailFrame">info@mmk-1.com</a>
            </div>
            <div className="messengersBlock">
                <a href={telegram} target="_blank" className="tgFrame">
                    <img src="/images/tgIcon.svg" />
                </a>
                <a href={whatsapp} target="_blank" className="whatsAppFrame">
                    <img src="/images/waIcon.svg" />
                </a>
            </div>
        </div>
</div>
    </>
}