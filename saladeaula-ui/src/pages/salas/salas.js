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
        api.get('/sala', {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        })

        .then(resposta => {
            if (resposta.status === 200) {
                this.setState({salas: resposta.data})

                console.log(this.state.salas)
            }
        })
        .catch(erro => console.log(erro));
    }

    atualizarState = (campo) => {
        // this.setState({ [campo.target.name] : campo.target.value})
        this.setState(prevState => ({
            Sala: {
                ...prevState.Sala,
                [campo.target.name] : campo.target.value
            }
        }))
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

        api.post('/sala', sala, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        })

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
                <main>
                    <section>
                        <h2>A</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Metragem</th>
                                    <th>Andar</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.salas.map(
                                        (sala) => {
                                            return (
                                                <tr key={sala.idSala}>
                                                    <td>{sala.nomeSala}</td>
                                                    <td>{sala.metragem}</td>
                                                    <td>{sala.andar}</td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                    </section>
                    <section>
                        <h2>B</h2>
                        <form onSubmit={this.cadastrarSala}>
                            <div>
                                <input
                                    type="text"
                                    name="nomeSala"
                                    value={this.state.Sala.nomeSala}
                                    onChange={this.atualizarState}
                                    placeholder="nome"
                                />
                                <input
                                    type="text"
                                    name="metragem"
                                    value={this.state.Sala.metragem}
                                    onChange={this.atualizarState}
                                    placeholder="metragem"
                                />
                                <input
                                    type="text"
                                    name="andar"
                                    value={this.state.Sala.andar}
                                    onChange={this.atualizarState}
                                    placeholder="andar"
                                />
                                <button type="submit"/>
                            </div>
                        </form>
                    </section>
                </main>
            </>
        )
    }
}