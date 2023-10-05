import ServiceCard from "./ServiceCard.jsx";


export default function ServicesBlock(props) {
    return <>
    <div className="servicesBlock">
        <ServiceCard
        img="/images/services/service1.png"
        text1="Операторы башенного крана"
        text2="По всей России"
        />
        {/* <div className="serviceCard">
            <div className="serviceCardPhoto">
                <img src="/images/services/service1.png" />
            </div>
            <div className="serviceCardText">
                Операторы башенного крана
            </div>
            <div className="serviceCardText2">
                По всей России
            </div>
        </div> */}

        <ServiceCard
        img="/images/services/service2.png"
        text1="Монтаж и демонтаж башенного крана"
        text2="График работ 24/7"
        />
        {/* <div className="serviceCard">
            <div className="serviceCardPhoto">
                <img src="/images/services/service2.png" />
            </div>
            <div className="serviceCardText">
            Монтаж и демонтаж башенного крана
            </div>
            <div className="serviceCardText2">
                График работ 24/7
            </div>
        </div> */}

        <ServiceCard
        img="/images/services/service3.png"
        text1="Выезд специалиста на объект, для приёма площадки для работ по установке кранов и подъемников"
        />
        {/* <div className="serviceCard">
            <div className="serviceCardPhoto">
                <img src="/images/services/service3.png" />
            </div>
            <div className="serviceCardText full">
                Выезд специалиста на объект, для приёма площадки для работ по установке кранов и подъемников
            </div>
        </div> */}

        <ServiceCard
        img="/images/services/service4.png"
        text1="Обслуживание и ремонт башенных кранов"
        text2="24/7 Сервисная  служба"
        />
        {/* <div className="serviceCard">
            <div className="serviceCardPhoto">
                <img src="/images/services/service4.png" />
            </div>
            <div className="serviceCardText">
                Обслуживание и ремонт башенных кранов
            </div>
            <div className="serviceCardText2">
                24/7 Сервисная  служба
            </div>
        </div> */}

        <ServiceCard
        img="/images/services/service5.png"
        text1="Разработка проекта на основания под башенные краны"
        text2="В кратчайшие сроки"
        />
        {/* <div className="serviceCard">
            <div className="serviceCardPhoto">
                <img src="/images/services/service5.png" />
            </div>
            <div className="serviceCardText">
                Разработка проекта на основания под башенные краны
            </div>
            <div className="serviceCardText2">
                В кратчайшие сроки
            </div>
        </div> */}

        <ServiceCard
        img="/images/services/service6.png"
        text1="Установка приборов безопасности"
        text2="Приборы типа ОНК и ОГМ"
        />
        {/* <div className="serviceCard">
            <div className="serviceCardPhoto">
                <img src="/images/services/service6.png" />
            </div>
            <div className="serviceCardText">
                Установка приборов безопасности
            </div>
            <div className="serviceCardText2">
                Приборы типа ОНК и ОГМ
            </div>
        </div> */}

        <ServiceCard
        img="/images/services/service7.png"
        text1="Увеличение высоты после привязки крана к зданию"
        text2="Гарантия безопасности"
        />
        {/* <div className="serviceCard">
            <div className="serviceCardPhoto">
                <img src="/images/services/service7.png" />
            </div>
            <div className="serviceCardText">
                Увеличение высоты после привязки крана к зданию
            </div>
            <div className="serviceCardText2">
                Гарантия безопасности
            </div>
        </div> */}

        <ServiceCard
        img="/images/services/service8.png"
        text1="Разработка ППР на башенные краны"
        text2="Опыт инженеров более 10 лет"
        />
        {/* <div className="serviceCard">
            <div className="serviceCardPhoto">
                <img src="/images/services/service8.png" />
            </div>
            <div className="serviceCardText">
                Разработка ППР на башенные краны
            </div>
            <div className="serviceCardText2">
                Опыт инженеров более 10 лет
            </div>
        </div> */}
        
    </div>
    </>
}