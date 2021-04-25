import axios from 'axios';
import React from 'react';

import HackerDetails from '../HackerDetails/HackerDetails';
import "./GetHackers.css";

class GetHackers extends React.Component {
    state = { hackers: '', fullDetails: false, user: '', };

    componentDidMount() {
        axios.get('https://hackerstats.herokuapp.com/hackers')
        .then(response => {
            this.setState({hackers: response.data})
        })
    }

    handleHackerClick = (e) => {
        const user = e.target.getAttribute("value");
        this.setState({ fullDetails: true, user: user });
    }

    render() {
        let content;
        if(this.state.hackers === ''){
            content = null;
        } else {
            content = this.state.hackers.map(hacker => {
                return (
                    <div className="hacker" id={hacker.username} >
                        <div className="avatar-box">
                            <img className="avatar" src={hacker.avatar} alt="avatar" onClick={this.handleHackerClick} value={hacker.username}/>
                        </div>
                        <div className="hacker-mini">
                            <p>Name: {hacker.name}</p>
                            <p>Username: {hacker.username}</p>
                        </div>
                    </div>
                )
            })
        }

        if(this.state.fullDetails === true) {
            const s = this.state.hackers.filter(e => {
                return e.username === this.state.user
            })
            
            content = (<HackerDetails details={s} />);
        }

        return (
            <div className="hacker-list">
                {content}
            </div>
        )
    }
}

export default GetHackers;