import React from 'react';
import axios from 'axios';

import "../Login/Login.css";

class DeleteHacker extends  React.Component {
    state = { deleteUser: '' }

    handleUserDelete = (e) => {
        e.preventDefault();

        const url = "https://hackerstats.herokuapp.com/delete";
        axios.post(url, {
            deleteUser: this.state.deleteUser
        }).then(response => {
            alert(response.data.msg);
        })
    }
    render() {
        return (
            <div className="login-box">
                <form onSubmit={this.handleUserDelete} className="login-form">
                    <h1 className="login-title">Enter Hacker's Username</h1>

                    <input className="login-input" type="text" value={this.state.deleteUser} onChange={e=>this.setState({deleteUser: e.target.value})} placeholder="Hacker's Username" required />
                    <button className="login-input login-button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default DeleteHacker;