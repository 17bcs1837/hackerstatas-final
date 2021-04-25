import React from 'react';
import { Link } from 'react-router-dom';


import './Navigation.css';

class Navigation extends React.Component {
    handleLogout = () => {
        this.props.handleLogout();
    }

    render() {
        let content;
        if(this.props.isAuth === true) {
            content = (
                <span className="register-link"><li onClick={this.handleLogout} className="menu-link">Logout</li></span>
            )
        } else {
            content = (
                
                <div className="reg-log">
                    <span className="register-link">
                        <li>
                            <Link className="menu-link" to='/register'>Register</Link>
                        </li>
                    </span>
                    <span className="register-link">
                        <li>
                            <Link className="menu-link" to='/'>Login</Link>
                        </li>
                    </span>
                </div>
                
                
            )
        }

        return (
            <div className="navigation">
                <ul>
                <li className="title menu-link">HackerStats</li>
                { content }
                </ul>
            </div>
        )
    }
}

export default Navigation;