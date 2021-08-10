import { Component } from "react";
import { Link } from "react-router-dom";

import logo from '../images/logo.svg'

export default class Header extends Component {
    render() {
        return (
            <header id="bg-header">
                <div className="container">
                    <nav id="list">
                        <ul>
                            <li><Link to="/salas">Salas</Link></li>
                            <li><Link to="/equipamentos">Equipamentos</Link></li>
                            <li><Link to="/">Sair</Link></li>
                        </ul>
                    </nav>
                    <div id="logo">
                        <img src={logo} alt="" srcSet="" />
                    </div>
                </div>
            </header>
        )
    }
}
