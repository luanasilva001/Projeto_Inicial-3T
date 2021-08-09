import { Component } from "react";

import logo from '../images/logo.svg'

export default class Footer extends Component {
    render() {
        return (
            <footer id="footer-bg">
                <div id="footer">
                    <div id="logo">
                        <img src={logo} alt="" srcSet="" />
                    </div>
                </div>
            </footer>
        )
    }
}