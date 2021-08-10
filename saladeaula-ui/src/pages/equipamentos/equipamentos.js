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
                dataEntrada: new Date(),
                sala: '',
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
        api.get('/controleequipamento', {
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
                dataEntrada: new Date(equip.dataEntrada),
                sala: equip.idSalaNavigation.nomeSala,
                nomeEquipamento: equip.idEquipamentoNavigation.nomeEquipamento,
                tipoEquipamento: equip.idEquipamentoNavigation.tipoEquipamento,
                marca: equip.idEquipamentoNavigation.marca,
                numeroDeSerie: equip.idEquipamentoNavigation.numeroDeSerie,
                descricao: equip.idEquipamentoNavigation.descricao,
                numeroPatrimonio: equip.idEquipamentoNavigation.numeroPatrimonio,
                estado: equip.idEquipamentoNavigation.estado
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
                dataEntrada: '',
                sala: '',
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
                                    <th>Sala</th>
                                    <th>Tipo</th>
                                    <th>Marca</th>
                                    <th>Serial</th>
                                    <th>Descrição</th>
                                    <th>Numero de Patrimônio</th>
                                    <th>Data Entrada</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.equipamentos.map(
                                        (equipamento) => {
                                            return (
                                                <tr key={equipamento.idEquipamentoNavigation.idEquipamento} >
                                                    <th>{equipamento.idEquipamentoNavigation.nomeEquipamento}</th>
                                                    <th>{equipamento.idSalaNavigation.nomeSala}</th>
                                                    <th>{equipamento.idEquipamentoNavigation.tipoEquipamento}</th>
                                                    <th>{equipamento.idEquipamentoNavigation.marca}</th>
                                                    <th>{equipamento.idEquipamentoNavigation.numeroDeSerie}</th>
                                                    <th>{equipamento.idEquipamentoNavigation.descricao}</th>
                                                    <th>{equipamento.idEquipamentoNavigation.numeroPatrimonio}</th>
                                                    <th>{Intl.DateTimeFormat("pt-BR").format(new Date(equipamento.dataEntrada))}</th>
                                                    <th>{equipamento.idEquipamentoNavigation.estado}</th>
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
                <Footer />
            </>
        )
    }
}