export default function ServiceCard(props) {

    return <>
    
    <div className="serviceCard">
        <div className="serviceCardPhoto">
            <img src={props.img} />
        </div>
        <div className={props.text2 === undefined ? "serviceCardText full" : "serviceCardText"}>
            {props.text1}
        </div>
        {props.text2 ?
        <div className="serviceCardText2">
            {props.text2}
        </div> : ""}
    </div>

    </>
}