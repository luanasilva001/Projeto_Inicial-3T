import axios from 'axios'
import React, {Component} from 'react'

import api from '../../services/api'

export default class Salas extends Component{
    constructor(props){
        super(props)
        this.state = {
            salas: [],

            Sala: {
                nomeSala: '',
                metragem: '',
                andar: ''
            }
        }
    }

    buscarSalas = () => {
        // Pode necessitar Header
        api.get('/sala')

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
        this.buscarSalas();
    }

    cadastrarSala = (event) => {
        event.preventDefault();

        let sala = {
            nomeSala : this.state.Sala.nomeSala,
            metragem : this.state.Sala.metragem,
            andar : this.state.Sala.andar
        }

        api.post('/sala', sala)

        .then(resposta => {
            if(resposta.status === 201){
                console.log('Sala cadastrada!')
            }
        })

        .catch(erro => {
            console.log(erro)
        })

        .then(this.buscarSalas)
    };

    render() {
        return (
            <>
                
            </>
        )
    }
}