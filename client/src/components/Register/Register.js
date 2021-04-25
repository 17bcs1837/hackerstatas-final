import React from 'react';
import './Register.css';

const axios = require('axios');


class Register extends React.Component {
    state = { username: '', firstname: '', lastname: '', password: '', passwordCheck: '', userinfo: 'User'};

    handleRegistrationForm = (e) => {
        const url = "https://hackerstats.herokuapp.com/user/register";
        
        const payload = {
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password,
            passwordCheck: this.state.passwordCheck,
            userinfo: this.state.userinfo
        }
        
        axios.post(url, payload).then(response => {
            if(response.data.success === true) {
                alert("Registration Successful");
            } else {
                alert("Username already exists");
            }
        })

        e.preventDefault();
    }
    render() {
        return (
            <div className="registration">
                <h1 className="registration-title">Register</h1>

                <form onSubmit={this.handleRegistrationForm} className="registration-form">
                    <input className="register-input" type="text" value={this.state.username} onChange={e=>this.setState({username: e.target.value})} placeholder="username" required />
                    <input className="register-input" type="text" value={this.state.firstname} onChange={e=>this.setState({firstname: e.target.value})} placeholder="firstname" required />
                    <input className="register-input" type="text" value={this.state.lastname} onChange={e=>this.setState({lastname: e.target.value})} placeholder="lastname" required />
                    <input className="register-input" type="password" value={this.state.password} onChange={e=>this.setState({password: e.target.value})} placeholder="password" required />
                    <input className="register-input" type="password" value={this.state.passwordCheck} onChange={e=>this.setState({passwordCheck: e.target.value})} placeholder="confirm password" required />
                    
                    <select className="register-input" value={this.state.userinfo} onChange={e=>this.setState({userinfo: e.target.value})}>
                        <option default value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <button className="register-input register-button" type="submit">Register</button>
                </form>
            </div>
        )
    }
}

export default Register;