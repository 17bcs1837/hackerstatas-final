import React from 'react';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css'; 

import Navigation from '../Navigation/Navigation';
import Login from '../Login/Login';
import Register from '../Register/Register'
import UserDash from '../UserDash/UserDash';
import AdminDash from '../AdminDash/AdminDash';

class App extends React.Component {
    state = { isAuth: false, TOKEN: '', userinfo: null };
    handleAuth = (token, userinfo) => {
        this.setState({isAuth: true, TOKEN: token, userinfo: userinfo});
        console.log(userinfo)
    }

    handleLogout = () => {
        this.setState({isAuth: false, TOKEN: ''})
    }

    render() {
        let AdminOrUser;
        if(this.state.userinfo === 'User') {
            AdminOrUser = <Redirect to="/userdash" />;
        } else {
            AdminOrUser = <Redirect to="/admindash" />;
        }
        return (
            <div className="App">
                <Router>
                    {
                        this.state.isAuth
                        ? AdminOrUser
                        : <Redirect to="/" />
                    }
                    <Navigation isAuth={this.state.isAuth} handleLogout={this.handleLogout} />
                    <Route exact path="/" component={ () => <Login handleAuth={this.handleAuth} />} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/admindash" component={AdminDash} />
                    <Route exact path="/userdash" component={ () => <UserDash token={this.state.TOKEN} />} />
                </Router>
            </div>
        )
    }
}

export default App;