import React from 'react';

import "./HackerDetails.css";

class HackerDetails extends React.Component {
    render() {
        return (
            <div>
                <img className="img-detail" src={this.props.details[0].avatar} alt="avatar" />
                <li className="detail">Name: {this.props.details[0].name}</li>
                <li className="detail">Profile: {this.props.details[0].profile}</li>
                <li className="detail">Location: {this.props.details[0].location}</li>
                <li className="detail">Education: {this.props.details[0].education}</li>
                <li className="detail">Challenges Solved: {this.props.details[0].solved}</li>
                <li className="detail">Solutions Submitted: {this.props.details[0].submitted}</li>
                <li className="detail">Solutions Accepted: {this.props.details[0].accepted}</li>
                <li className="detail">Rank: {this.props.details[0].rank}</li>
                <li className="detail">Data Structures: {this.props.details[0].datastructure}</li>
                <li className="detail">Algorithms: {this.props.details[0].algorithms}</li>
                <li className="detail">C Plus Plus: {this.props.details[0].cplus}</li>
                <li className="detail">Java: {this.props.details[0].java}</li>
                <li className="detail">Python: {this.props.details[0].python}</li>
                <li className="detail">HTML: {this.props.details[0].html}</li>
                <li className="detail">JS: {this.props.details[0].javascript}</li>
                <li className="detail">Number of Votes: {this.props.details[0].votes}</li>
                <li className="detail">Device Type: {this.props.details[0].device}</li>

            </div>
        )
    }
}

export default HackerDetails;