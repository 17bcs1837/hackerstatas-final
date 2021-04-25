import React from 'react';
import './AdminDash.css';
import AddHacker from '../AddHacker/AddHacker';
import DeleteHacker from '../DeleteHacker/DeleteHacker';

class AdminDash extends React.Component {
    state = { currentTask: null };

    handleAdd = (e) => {
        const task = document.getElementById("add-hacker").value;
        this.setState({currentTask: task});
    }

    handleDelete = (e) => {
        const task = document.getElementById("delete-hacker").value;
        this.setState({currentTask: task});
    }

    render() {
        let content;
        if(this.state.currentTask === "Add Hacker") {
            content = <AddHacker />
        } else if(this.state.currentTask === "Delete Hacker") {
            content = <DeleteHacker />
        } else {
            content = null;
        }

        return (
            <div className="admin-task">
                <div className="task-buttons">
                    <button className="task-button" id="add-hacker" value="Add Hacker" onClick={this.handleAdd}>Add Hacker</button>
                    <button className="task-button" id="delete-hacker" value="Delete Hacker" onClick={this.handleDelete}>Delete Hacker</button>
                </div>
                {content}
            </div>
        )
    }
}

export default AdminDash;   