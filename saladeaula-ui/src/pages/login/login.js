import React, { Component } from 'react'

import logo from '../../images/logo.svg'
import api from '../../services/api'

import { parseJwt, usuarioAutenticado } from '../../services/auth';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

            Usuario: {
                email: "",
                senha: ""
            },

            isLoading: false
        }
    }

    login = (event) => {
        event.preventDefault();

        this.setState({ isLoading: true })

        api.post("/login", {
            email: this.state.Usuario.email,
            senha: this.state.Usuario.senha
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    this.setState({ isLoading: false })

                    localStorage.setItem("jwt", resposta.data.token)

                    console.log('Token: ' + resposta.data.token)

                    console.log(this.props.history)
                    if(parseJwt().role === "1"){
                        this.props.history.push('/equipamentos')
                    }
                    else{
                        this.props.history.push('/')
                    }
                }
                console.log(parseJwt().role)
            })
            .catch(error => {
                console.log(error)
            })
    }

    atualizarState = (campo) => {
        this.setState(prevState => ({
            Usuario: {
                ...prevState.Usuario,
                [campo.target.name]: campo.target.value
            }
        }))
    }

    render() {
        return (
            <>
                <main>
                    <section id="content">
                        <h2>
                            Entre no senerth e tenha acesso as suas salas e  equipamentos cadastrados.
                        </h2>
                    </section>
                    <section id="signin">
                        <h1>Login</h1>
                        <div id="linha"></div>
                        <form onSubmit={this.login}>
                            <input name="email" type="email" value={this.state.Usuario.email} onChange={this.atualizarState} placeholder="Email" id="form-sign-in" />
                            <input name="senha" type="password" value={this.state.Usuario.senha} onChange={this.atualizarState} placeholder="Senha" id="form-sign-in" />
                            <button type="submit" id="btn-signin">Entrar</button>
                            <h4>Não possui conta? <a href="#">cadastre-se</a></h4>
                        </form>
                        <img src={logo} alt="logo" id="logo-signin" />
                        <h2>se<span>nerth</span></h2>
                    </section>
                </main>
            </>
        )
    }
}