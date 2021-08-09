import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTimes } from '@fortawesome/free-solid-svg-icons';

import Footer from '../../components/footer'
import Header from '../../components/header'
import '../../styles/equipamentos.css';

import api from '../../services/api'

export default class Equipamentos extends Component {
    constructor(props){
        super(props)
        this.state = {
            equipamentos: [],
            equipAlterado : 0,

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

    buscarEquipamentoPorId = (equip) => {
        this.setState({
            equipAlterado: equip.idEquipamento,

            Equipamento: {
                nomeEquipamento: equip.nomeEquipamento,
                tipoEquipamento: equip.tipoEquipamento,
                marca: equip.marca,
                numeroDeSerie: equip.numeroDeSerie,
                descricao: equip.descricao,
                numeroPatrimonio: equip.numeroPatrimonio,
                estado: equip.estado
            }
        }, () => {
            console.log(

                'O equipamento ' + equip.nomeEquipamento + ' foi selecionado, ',
                'agora o valor do state idEquipamento é: ' + this.state.Equipamento.idEquipamento,
                'e o valor do state nome é: ' + this.state.Equipamento.nomeEquipamento
            );
        });
    };

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

        if (this.state.equipAlterado !== 0) {
            api.put('/equipamentos/' + this.state.equipAlterado, equipamento, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                }
            })

            .then(resposta => {
                if (resposta.status === 204) {
                    console.log('Equipamento' + this.state.equipAlterado + 
                    ' atualizado!')
                    console.log('Seu novo título agora é: ' + this.state.Equipamento.nomeEquipamento)
                }
            })

            .catch(erro => {
                console.log(erro)
            })
    
            .then(this.buscarEquipamentos)
        }
        else {
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


    }

    excluirEquipamento = (equip) => {
        console.log('O equipamento ' + equip.idEquipamento + ' foi selecionado')

        api.delete('/equipamentos/' + equip.idEquipamento, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }
        })

        .then(resposta => {
            if (resposta.status === 204) {
                console.log('Equipamento ' + equip.idEquipamento + ' excluído!')
            }
        })

        .catch(erro => console.log(erro))

        .then(this.buscarEquipamentos)
    }

    limparCampos = () => {
        this.setState({

            Equipamento: {
                nomeEquipamento: '',
                tipoEquipamento: '',
                marca: '',
                numeroDeSerie: '',
                descricao: '',
                numeroPatrimonio: '',
                estado: ''
            },
            equipAlterado : 0

        })
        console.log('Os states foram resetados!')
    }

    render(){
        return(
            <>
                <Header />
                <main>
                    <section id="cadastro-equipamentos">
                        <h2 id="title-cad-equip">Cadastro de Equipamento</h2>
                        <form onSubmit={this.cadastrarEquipamento} id="form-cad-equipamentos">
                            <div id="form-1-cad-sala">
                                <input
                                    type="text"
                                    name="nomeEquipamento"
                                    value={this.state.Equipamento.nomeEquipamento}
                                    onChange={this.atualizarState}
                                    placeholder="Qual vai ser o nome do equipamento?"
                                />
                                <input
                                    type="text"
                                    name="tipoEquipamento"
                                    value={this.state.Equipamento.tipoEquipamento}
                                    onChange={this.atualizarState}
                                    placeholder="Qual o tipo de equipamento?"
                                />
                                <input
                                    type="text"
                                    name="marca"
                                    value={this.state.Equipamento.marca}
                                    onChange={this.atualizarState}
                                    placeholder="Qual a marca?"
                                />
                                <input
                                    type="text"
                                    name="numeroDeSerie"
                                    value={this.state.Equipamento.numeroDeSerie}
                                    onChange={this.atualizarState}
                                    placeholder="Qual o numero de série do equipamento?"
                                />
                            </div>
                            <div id="form-2-cad-sala">
                                <input
                                    type="text"
                                    name="descricao"
                                    value={this.state.Equipamento.descricao}
                                    onChange={this.atualizarState}
                                    placeholder="Qual a descrição do equipamento?"
                                />
                                <input
                                    type="text"
                                    name="numeroPatrimonio"
                                    value={this.state.Equipamento.numeroPatrimonio}
                                    onChange={this.atualizarState}
                                    placeholder="Qual o numero de patrimônio?"
                                />
                                <input
                                    type="text"
                                    name="estado"
                                    value={this.state.Equipamento.estado}
                                    onChange={this.atualizarState}
                                    placeholder="Qual o estado do equipamento?"
                                />
                                <button type="submit" disabled={this.state.Equipamento.nomeEquipamento === '' ? 'none' : ''}>
                                {this.state.equipAlterado === 0 ? 'Cadastrar' : 'Atualizar'}</button>
                            </div>
                        </form>
                    </section>
                    <section id="lista-equipamentos">
                        <table className="content-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Tipo</th>
                                    <th>Marca</th>
                                    <th>Serial</th>
                                    <th>Descrição</th>
                                    <th>Numero de Patrimônio</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.equipamentos.map(
                                        (equipamento) => {
                                            return (
                                                <tr key={equipamento.idEquipamento} >
                                                    <th>{equipamento.nomeEquipamento}</th>
                                                    <th>{equipamento.tipoEquipamento}</th>
                                                    <th>{equipamento.marca}</th>
                                                    <th>{equipamento.numeroDeSerie}</th>
                                                    <th>{equipamento.descricao}</th>
                                                    <th>{equipamento.numeroPatrimonio}</th>
                                                    <th>{equipamento.estado}</th>
                                                    <th><button onClick={() => this.buscarEquipamentoPorId(equipamento)} >
                                                        <FontAwesomeIcon icon={faPenSquare} size="2x"/>
                                                    </button></th>
                                                    <th><button onClick={() => this.excluirEquipamento(equipamento)}>
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
                {/* <main>
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
                </main> */}
                <Footer />
            </>
        )
    }
}