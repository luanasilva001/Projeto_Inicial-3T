import { Component } from "react";

import logo from '../images/logo.svg'

export default class Header extends Component {
    render() {
        return (
            <header id="bg-header">
                <div className="container">
                    <nav id="list">
                        <ul>
                            <li><a href="#">Salas</a></li>
                            <li><a href="#">Equipamentos</a></li>
                            <li><a href="#">Sair</a></li>
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
