import React, { Component } from 'react'

import '../../styles/salas.css';

import Footer from '../../components/footer'
import Header from '../../components/header'
import api from '../../services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTimes } from '@fortawesome/free-solid-svg-icons';

export default class Salas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            salas: [],
            salaAlterada: 0,

            Sala: {
                nomeSala: '',
                metragem: '',
                andar: ''
            }
        }
    }

    buscarSalas = () => {
        api.get('/sala', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    this.setState({ salas: resposta.data })

                    console.log(this.state.salas)
                }
            })
            .catch(erro => console.log(erro));
    }

    buscarSalaPorId = (sala) => {
        this.setState({
            salaAlterada: sala.idSala,

            Sala: {
                nomeSala: sala.nomeSala,
                metragem: sala.metragem,
                andar: sala.andar
            }
        }, () => {
            console.log(

                'A sala ' + sala.nomeSala + ' foi selecionada, ',
                'agora o valor do state idSala é: ' + this.state.Sala.idSala,
                'e o valor do state nome é: ' + this.state.Sala.nomeSala
            );
        });
    };

    atualizarState = (campo) => {
        // this.setState({ [campo.target.name] : campo.target.value})
        this.setState(prevState => ({
            Sala: {
                ...prevState.Sala,
                [campo.target.name]: campo.target.value
            }
        }))
    }

    componentDidMount() {
        this.buscarSalas();
    }

    cadastrarSala = (event) => {
        event.preventDefault();

        let sala = {
            nomeSala: this.state.Sala.nomeSala,
            metragem: this.state.Sala.metragem,
            andar: this.state.Sala.andar
        }

        if (this.state.salaAlterada !== 0) {
            api.put('/sala', sala, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            })

                .then(resposta => {
                    if (resposta.status === 204) {
                        console.log('Sala' + this.state.equipAlterado +
                            ' atualizada!')
                        console.log('Seu novo nome agora é: ' + this.state.Sala.nomeSala)
                    }
                })

                .catch(erro => {
                    console.log(erro)
                })

                .then(this.buscarSalas)
        }
        else {
            api.post('/sala', sala, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            })

                .then(resposta => {
                    if (resposta.status === 201) {
                        console.log('Sala cadastrada!')
                    }
                })

                .catch(erro => {
                    console.log(erro)
                })

                .then(this.buscarSalas)
        }

    };

    excluirSala = (sala) => {
        console.log('A sala ' + sala.idSala + ' foi selecionada')

        api.delete('/sala/' + sala.idSala, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })

            .then(resposta => {
                if (resposta.status === 204) {
                    console.log('Sala ' + sala.idSala + ' excluída!')
                }
            })

            .catch(erro => console.log(erro))

            .then(this.buscarSalas)
    }

    render() {
        return (
            <>
                <Header />
                <main>
                    <section id="cadastro-salas">
                        <h2 id="title-cad">Cadastro de Sala</h2>
                        <form onSubmit={this.cadastrarSala} id="form-cad-salas">
                            <div id="form-1-cad-sala">
                                <input
                                    type="text"
                                    name="nomeSala"
                                    value={this.state.Sala.nomeSala}
                                    onChange={this.atualizarState}
                                    placeholder="Qual vai ser o nome da sala?"
                                />
                                <input
                                    type="text"
                                    name="andar"
                                    value={this.state.Sala.andar}
                                    onChange={this.atualizarState}
                                    placeholder="Qual o andar da sala?"
                                />
                            </div>
                            <div id="form-2-cad-sala">
                                <input
                                    type="text"
                                    name="metragem"
                                    value={this.state.Sala.metragem}
                                    onChange={this.atualizarState}
                                    placeholder="Qual a metragem da sala?"
                                />
                                <button type="submit" disabled={this.state.Sala.nomeSala === '' ? 'none' : ''}>
                                {this.state.salaAlterada === 0 ? 'Cadastrar' : 'Atualizar'}</button>
                            </div>
                        </form>
                    </section>
                    <section id="lista-salas">
                        <table className="content-table">
                            <thead>
                                <tr>
                                    <th>Nome da sala</th>
                                    <th>Metragem</th>
                                    <th>Andar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.salas.map(
                                        (sala) => {
                                            return (
                                                <tr key={sala.idSala} >
                                                    <th>{sala.nomeSala}</th>
                                                    <th>{sala.metragem}</th>
                                                    <th>{sala.andar}</th>
                                                    <th><button onClick={() => this.buscarSalaPorId(sala)} >
                                                        <FontAwesomeIcon icon={faPenSquare} size="2x"/>
                                                    </button></th>
                                                    <th><button onClick={() => this.excluirSala(sala)}>
                                                        <FontAwesomeIcon icon={faTimes} size="2x"/>
                                                    </button></th>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                                {/* <tr>
                                    <th><input type="" disabled /></th>
                                    <th><input type="text" disabled /></th>
                                    <th><input type="text" disabled /><i className="fas fa-pen-square" id="pencil-icon"></i><i className="fas fa-times" id="erro-icon"></i></th>
                                </tr> */}
                            </tbody>
                        </table>
                    </section>
                </main>
                <Footer />
            </>
        )
    }
}