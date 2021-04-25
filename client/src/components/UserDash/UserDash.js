import React from 'react';
import GetHackers from '../GetHackers/GetHackers';
import ClearSelection from '../ClearSelection/ClearSelection';

import "../AdminDash/AdminDash.css"

class UserDash extends React.Component {
    state = { task: '' }

    handleUserTask = (e) => {
        this.setState({task: e.target.value});
    }

    render() {
        let content;
        if(this.state.task === "all-hackers") {
            content = <GetHackers />;
        } else if(this.state.task === "clear") {
            content = <ClearSelection />
        } else {
            content = null;
        }
        return (
            <div className="user-task">
                <div className="task-buttons">
                    <button className="task-button" value="all-hackers" onClick={this.handleUserTask}>All Hackers</button>
                    <button className="task-button" value="clear" onClick={this.handleUserTask}>Clear Selection</button>
                </div>
                {content}
            </div>
        )
    }
}

export default UserDash;