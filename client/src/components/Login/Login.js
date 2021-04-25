import axios from 'axios';
import React from 'react';
import './Login.css';

class Login extends React.Component {
    state = { username: '', password: ''};

    handleFormSubmission = async (e) => {
        e.preventDefault();
        const url = "https://hackerstats.herokuapp.com/user/login";
        const payload = {
            username: this.state.username,
            password: this.state.password
        }

        const response = await axios.post(url, payload)
        
        if(response.data.msg === "Login Success") {
            this.props.handleAuth(response.data.JWT_TOKEN, response.data.userinfo);
        } else {
            alert("Incorrect Credentials");
        }
        
    }

    render() {
        return (
            <div className="login-box">
                <form onSubmit={this.handleFormSubmission} className="login-form">
                    <h1 className="login-title">Login</h1>

                    <input className="login-input" type="text" value={this.state.username} onChange={e=>this.setState({username: e.target.value})} placeholder="username" required />
                    <input className="login-input" type="password" value={this.state.password} onChange={e=>this.setState({password: e.target.value})} placeholder="password" required />
                    <button className="login-input login-button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;