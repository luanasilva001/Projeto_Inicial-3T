import React, {Component} from 'react'

import logo from '../../images/logo.svg'
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

        api.post('/usuario', UsuarioCad, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        })

        
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
                <main>
                    <section id="content">
                        <h2>
                            Entre no senerth e tenha acesso as suas salas e  equipamentos cadastrados.
                        </h2>
                    </section>
                    <section id="signup">
                        <h1>Cadastre-se</h1>
                        <div id="linha"></div>
                        <form onSubmit={this.login}>
                            <input name="nomeUsuario" type="text" value={this.state.Usuario.nomeUsuario} onChange={this.atualizarState} placeholder="Nome do Usuario" id="form-sign-up" />
                            <input name="email" type="email" value={this.state.Usuario.email} onChange={this.atualizarState} placeholder="Email" id="form-sign-up" />
                            <input name="senha" type="password" value={this.state.Usuario.senha} onChange={this.atualizarState} placeholder="Senha" id="form-sign-up" />
                            <button type="submit" id="btn-signup">Cadastro</button>
                            <h4>Possui conta? <a href="#">Entre no Senerth</a></h4>
                        </form>
                        <img src={logo} alt="logo" id="logo-signup" />
                        <h2>se<span>nerth</span></h2>
                    </section>
                </main>
            </>
        )
    }
}