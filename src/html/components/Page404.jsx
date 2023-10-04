import { useLocation, useNavigate } from "react-router"

export default function Page404(props) {
    const navigate = useNavigate()


    return <>
    <div className="page404">
        <div className="title404">Страница 404</div>
        <p>Данной страницы не существует</p>
        <div className="backButton" onClick={() => {
            navigate('/')
        }}>Вернуться на главную</div>
    </div>
    </>
}