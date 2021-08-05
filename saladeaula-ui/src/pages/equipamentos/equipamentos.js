import React, {Component} from 'react'

import api from '../../services/api'

export default class Equipamentos extends Component {
    constructor(props){
        super(props)
        this.state = {
            equipamentos: []
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

    render(){
        return(
            <>
            </>
        )
    }
}