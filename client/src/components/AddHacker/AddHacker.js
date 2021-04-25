import axios from 'axios';
import React from 'react';
import './AddHacker.css';
class AddHacker extends React.Component {
    state  = {
        name: '',
        username: '',
        profile: '',
        location: '',
        education: '',
        solved: '',
        submitted: '',
        accepted: '',
        rank: '',
        datastructure: '',
        algorithms: '',
        cplus: '',
        java: '',
        python: '',
        html: '',
        javascript: '',
        votes: '',
        device: '',
    }

    handleAddHacker = async (e) => {
        e.preventDefault();
        const url = "https://hackerstats.herokuapp.com/hackers";
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('username', this.state.username);
        formData.append('profile', this.state.profile);
        formData.append('location', this.state.location);
        formData.append('education', this.state.education);
        formData.append('solved', this.state.solved);
        formData.append('submitted', this.state.submitted);
        formData.append('accepted', this.state.accepted);
        formData.append('rank', this.state.rank);
        formData.append('datastructure', this.state.datastructure);
        formData.append('algorithms', this.state.algorithms);
        formData.append('cplus', this.state.cplus);
        formData.append('java', this.state.java);
        formData.append('python', this.state.python);
        formData.append('html', this.state.html);
        formData.append('javascript', this.state.javascript);
        formData.append('votes', this.state.votes);
        formData.append('device', this.state.device);
        
        formData.append('avatar', document.getElementById("avatar").files[0]);
        const response = await axios.post(url, formData, config);
        alert(response.data.msg);
    }
    render() {
        return (
            <div className="add-hacker">
                <form id="add-hacker-form" onSubmit={this.handleAddHacker}>
                    <h2 class="enter-hacker-details">Enter Hacker Details</h2>
                    <input className="hacker-input" type="text" placeholder="username" value={this.state.username} onChange={e=>this.setState({username: e.target.value})} />
                    <input className="hacker-input"  type="text" placeholder="Name" value={this.state.name} onChange={e=>this.setState({name: e.target.value})} />
                    <input id="avatar" className="hacker-input" type="file" name="avatar" accept="image/*" />
                    <input className="hacker-input" type="text" placeholder="Profile Link" value={this.state.profile} onChange={e=>this.setState({profile: e.target.value})} />
                    <input className="hacker-input" type="text" placeholder="Location" value={this.state.location} onChange={e=>this.setState({location: e.target.value})} />
                    <input className="hacker-input" type="text" placeholder="Education" value={this.state.education} onChange={e=>this.setState({education: e.target.value})} />
                    <input className="hacker-input" type="number" placeholder="Challenges Solved" value={this.state.solved} onChange={e=>this.setState({solved: e.target.value})} />
                    <input className="hacker-input" type="number" placeholder="Solutions Submitted" value={this.state.submitted} onChange={e=>this.setState({submitted: e.target.value})} />
                    <input className="hacker-input"  type="number" placeholder="Solutions Accepted" value={this.state.accepted} onChange={e=>this.setState({accepted: e.target.value})} />
                    <input className="hacker-input" type="number" placeholder="Overall Rank" value={this.state.rank} onChange={e=>this.setState({rank: e.target.value})} />
                    <input className="hacker-input" type="number" placeholder="Data Structures" value={this.state.datastructure} onChange={e=>this.setState({datastructure: e.target.value})} />
                    <input className="hacker-input" type="number" placeholder="Algorithms" value={this.state.algorithms} onChange={e=>this.setState({algorithms: e.target.value})} />
                    <input className="hacker-input" type="number" placeholder="C++" value={this.state.cplus} onChange={e=>this.setState({cplus: e.target.value})} />
                    <input className="hacker-input" type="number" placeholder="Java" value={this.state.java} onChange={e=>this.setState({java: e.target.value})} />
                    <input className="hacker-input" type="number" placeholder="Python" value={this.state.python} onChange={e=>this.setState({python: e.target.value})} />
                    <input className="hacker-input" type="number" placeholder="HTML" value={this.state.html} onChange={e=>this.setState({html: e.target.value})} />
                    <input className="hacker-input" type="number" placeholder="Javascript" value={this.state.javascript} onChange={e=>this.setState({javascript: e.target.value})} />
                    <input className="hacker-input" type="number" placeholder="No. of Votes" value={this.state.votes} onChange={e=>this.setState({votes: e.target.value})} />
                    <input className="hacker-input" type="text" placeholder="Device Type" value={this.state.device} onChange={e=>this.setState({device: e.target.value})} />
                    <button className="hacker-input hacker-button" type="submit">Add Hacker</button>
                </form>
            </div>
        )
    }
}

export default AddHacker;