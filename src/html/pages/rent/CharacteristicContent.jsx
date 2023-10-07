import { useSelector } from "react-redux"

export default function CharacteristicContent(props) {
    const {mainPhone,whatsapp,telegram}=useSelector(state=>state.about)

    return <>
    <div className="infoTabTitle">
        <div className="infoTabTitleText">Характеристики</div>
        <div className="documentationBlock">
            <button className="documentationButton" onClick={()=> {
            window.open(props.document, '_blank');
            }}>
                <div className="docIcon" />
                <div className="docText">Скачать PDF</div>
            </button>
        </div>
    </div>
    <div className="characteristicBlock">
        <div className="charColumn weight">
            <div className="charName">Грузоподъемность</div>
            <div className="charTextBlock">
                <div className="charText1">На мин. вылете</div>
                <div className="charText2">{`${props.minGarbage} т.`}</div>
            </div>
            <div className="charTextBlock">
                <div className="charText1">На макс. вылете</div>
                <div className="charText2">{`${props.maxGarbage} т.`}</div>
            </div>
            <div className="charTextBlock">
                <div className="charText1">максимальная</div>
                <div className="charText2">{`${props.garbage} т.`}</div>
            </div>
        </div>
        <div className="charColumn radius">
            <div className="charName">Вылет стрелы</div>
            <div className="charTextBlock">
                <div className="charText1">Мин.</div>
                <div className="charText2">{`${props.minRadius} м.`}</div>
            </div>
            <div className="charTextBlock">
                <div className="charText1">Макс.</div>
                <div className="charText2">{`${props.maxRadius} м.`}</div>
            </div>
        </div>
        <div className="charColumn height">
        <div className="charName">Высота свободного стояния</div>
            <div className="charTextBlock">
                <div className="charText1">Макс.</div>
                <div className="charText2">{`${props.height} м.`}</div>
            </div>
        </div>
    </div>
    <div className="rentCardOpenedOrderBlock">
        <div className="conditionsDescription">Для получения консультации, заказа и индивидуальных условий сотрудничества,<br /> свяжитесь с нашим специалистом:</div>
        <a href={`tel:${mainPhone.replaceAll(/[-() /\\]/g,'')}`} target="_blank" className="consultButton">{mainPhone}</a>
    </div>
    </>
}