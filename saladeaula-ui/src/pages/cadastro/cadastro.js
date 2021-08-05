import React, {Component} from 'react'

import api from '../../services/api'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {

            Usuario: {
                nomeUsuario: "",
                idTipoUsuario: 0,
                email: "",
                senha: ""
            },
        }
    }

    cadastrarUsuario = () => {
        this.setState({ isLoading: true })

        let UsuarioCad = {
            nomeUsuario : this.state.Usuario.nomeUsuario,
            idTipoUsuario : this.state.Usuario.idTipoUsuario,
            email : this.state.Usuario.email,
            senha : this.state.Usuario.senha
        }

        api.post('/usuario')

        
        .then(resposta => {
            if(resposta.status === 201){
                console.log('Usuário cadastrado!')
            }
        })

        .catch(erro => {
            console.log(erro)
        })
        
    }

    atualizarState = (campo) => {
        // this.setState({ [campo.target.name] : campo.target.value})
        this.setState(prevState => ({
            Usuario: {
                ...prevState.Usuario,
                [campo.target.name] : campo.target.value
            }
        }))
    }

    render() {
        return (
            <>

            </>
        )
    }
}