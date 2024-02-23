import { useNavigate } from "react-router-dom"

export default function BackButton(props) {
    const navigate = useNavigate()
    return <>
    <div className={props.absolute === true ? "rentCardBackButton absolute" : "rentCardBackButton"} onClick={() => {
        navigate(props.link)
    }}>
        <div className="backButtonBackground" />
        <div className="backArrow">←</div>
        <div className="backText">Назад</div>
    </div>
    </>
}