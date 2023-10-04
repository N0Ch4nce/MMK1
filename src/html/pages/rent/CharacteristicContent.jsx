export default function CharacteristicContent(props) {
    return <>
    <div className="infoTabTitle">Характеристики</div>
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
    </>
}