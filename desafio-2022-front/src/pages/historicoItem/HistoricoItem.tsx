import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Header } from "../../shared/components"
import { api, registrarToken } from "../../shared/services/api"
import { getItem } from "../../shared/services/cookie"
import { IItem } from "../homeItens/components/TabelaItem"
import { Historico } from "./components/Historico"
import '../../shared/style/style.css'
import wave from '../../../src/imgs/Vector.png'
import otherwave from '../../../src/imgs/Vector1.png'

export const HistoricoItem = () => {
    const {id} = useParams()
    const[item, setItem] = useState<IItem[]>([])
    const history = useNavigate()

    const token = getItem('token')
    registrarToken(token)
    useEffect(() => {
        api.get(`/item/historico/listar/${id}`)
        .then((response) => {
            setItem(response.data.content)
        })
        .catch((err) => {
            console.error('Ocorreu o erro' + err)
            alert("Houve algum erro ao carregar o historico do item.")
        })
    }, [])

    return (
        <div className="background">
            <div className="divOnda">
                <img className="imgOnda" src={otherwave}/>
            </div>
            <Header titulo="Histórico"></Header>
            <Historico itens={item}></Historico>
            <div className="input">
                <button className="button" type="button" onClick={() => {
                    history(`/atualizar-item/${id}`)
                }}>
                    Atualizar
                </button>
            </div>
            <div className="containerLink">
                <Link className="a2" to="/lista-item">    
                    Voltar
                </Link>
            </div> 
            <div className="divOnda">
                <img className="imgOnda" src={wave}/>
            </div>
        </div>
    )
}