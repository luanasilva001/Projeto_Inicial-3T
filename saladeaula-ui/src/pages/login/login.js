import React, {Component} from 'react'

import api from '../../services/api'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {

            Usuario: {
                email: "",
                senha: ""
            },

            isLoading: false
        }
    }

    login = () => {
        this.setState({ isLoading: true })

        api.post("/login", {
            email: this.state.Usuario.email,
            senha: this.state.Usuario.senha
        })
        .then(response => {
            if (response.status === 200){
                this.setState({isLoading: false})

                localStorage.setItem("jwt", response.data.token)

                // Redirects aqui
            }
            console.log(parseJwt().role)
        })
        .catch(error => {
            console.log(error)
            // Erro aqui
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