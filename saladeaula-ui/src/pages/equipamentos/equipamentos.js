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
        api.get('/equipamentos', {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        })

        .then(resposta => {
            if (resposta.status === 200) {
                
                this.setState({equipamentos: resposta.data})

                console.log(this.state.equipamentos)
            }
        })
        .catch(erro => console.log(erro));
    }

    atualizarState = (campo) => {
        this.setState(prevState => ({
            Equipamento: {
                ...prevState.Equipamento,
                [campo.target.name] : campo.target.value
            }
        }))
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

        api.post('/equipamentos', equipamento, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        })

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
                
                <main>
                    <section>
                        <h2>A</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>nomeEquipamento</th>
                                    <th>tipoEquipamento</th>
                                    <th>marca</th>
                                    <th>numeroDeSerie</th>
                                    <th>descricao</th>
                                    <th>numeroPatrimonio</th>
                                    <th>estado</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.equipamentos.map(
                                        (equipamento) => {
                                            return (
                                                <tr key={equipamento.idEquipamento}>
                                                    <td>{equipamento.nomeEquipamento}</td>
                                                    <td>{equipamento.tipoEquipamento}</td>
                                                    <td>{equipamento.marca}</td>
                                                    <td>{equipamento.numeroDeSerie}</td>
                                                    <td>{equipamento.descricao}</td>
                                                    <td>{equipamento.numeroPatrimonio}</td>
                                                    <td>{equipamento.estado}</td>
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
                        <form onSubmit={this.cadastrarEquipamento}>
                            <div>
                                <input
                                    type="text"
                                    name="nomeEquipamento"
                                    value={this.state.Equipamento.nomeEquipamento}
                                    onChange={this.atualizarState}
                                    placeholder="nome"
                                />
                                <input
                                    type="text"
                                    name="tipoEquipamento"
                                    value={this.state.Equipamento.tipoEquipamento}
                                    onChange={this.atualizarState}
                                    placeholder="tipo"
                                />
                                <input
                                    type="text"
                                    name="marca"
                                    value={this.state.Equipamento.marca}
                                    onChange={this.atualizarState}
                                    placeholder="marca"
                                />
                                <input
                                    type="text"
                                    name="numeroDeSerie"
                                    value={this.state.Equipamento.numeroDeSerie}
                                    onChange={this.atualizarState}
                                    placeholder="numeroSerie"
                                />
                                <input
                                    type="text"
                                    name="descricao"
                                    value={this.state.Equipamento.descricao}
                                    onChange={this.atualizarState}
                                    placeholder="descricao"
                                />
                                <input
                                    type="text"
                                    name="numeroPatrimonio"
                                    value={this.state.Equipamento.numeroPatrimonio}
                                    onChange={this.atualizarState}
                                    placeholder="patrimonio"
                                />
                                <input
                                    type="text"
                                    name="estado"
                                    value={this.state.Equipamento.estado}
                                    onChange={this.atualizarState}
                                    placeholder="estado"
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