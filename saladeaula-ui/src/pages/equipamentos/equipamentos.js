import React, {Component} from 'react'

import api from '../../services/api'

export default class Equipamentos extends Component {
    constructor(props){
        super(props)
        this.state = {
            equipamentos: [],

            Equipamento: {
                nomeEquipamento: '',
                tipoEquipamento: '',
                marca: '',
                numeroDeSerie: '',
                descricao: '',
                numeroPatrimonio: '',
                estado: ''
            }
        }
    }

    buscarEquipamentos = () => {
        api.get('/equipamentos')

        .then(resposta => {
            if (resposta.status === 200) {
                
                this.setState({equipamentos: resposta.data})

                console.log(this.state.equipamentos)
            }
        })
        .catch(erro => console.log(erro));
    }

    atualizarCampos = (campo) => {
        this.setState({ [campo.target.name] : campo.target.value })
    }

    componentDidMount(){
        this.buscarEquipamentos();
    }

    cadastrarEquipamento = (event) => {
        event.preventDefault();

        let equipamento = {
            nomeEquipamento : this.state.Equipamento.nomeEquipamento,
            tipoEquipamento : this.state.Equipamento.tipoEquipamento,
            marca : this.state.Equipamento.marca,
            numeroDeSerie : this.state.Equipamento.numeroDeSerie,
            descricao : this.state.Equipamento.descricao,
            numeroPatrimonio : this.state.Equipamento.numeroPatrimonio,
            estado : this.state.Equipamento.estado
        }

        api.post('/equipamentos', equipamento)

        .then(resposta => {
            if (resposta.status === 201) {
                console.log('Equipamento cadastrado!')
            }
        })

        .catch(erro => {
            console.log(erro)
        })

        .then(this.buscarEquipamentos)
    }

    render(){
        return(
            <>
                
            </>
        )
    }
}