import React, {Component} from 'react'

import api from '../../services/api'

export default class Salas extends Component{
    constructor(props){
        super(props)
        this.state = {
            salas: []
        }
    }

    buscarSalas = () => {
        // Pode necessitar Header
        api.get('/salas')

        .then(resposta => {
            if (resposta.status === 200) {
                this.setState({salas: resposta.data})

                console.log(this.state.salas)
            }
        })
        .catch(erro => console.log(erro));
    }

    atualizarCampos = (campo) => {
        this.setState({ [campo.target.name] : campo.target.value })
    }

    componentDidMount(){
        this.buscarSalas
    }

    render() {
        return (
            <>

            </>
        )
    }
}