import React, { Component } from "react";

export class UserCard extends Component {
  render() {
    return (
      <div className="card card-user" style={{"height": "250px"}}>
        <div className="image">
          <a src={this.props.bgImage} />
        </div>
        <div className="content">
          <div className="author">
            <a href="#">
              <img
                className="avatar border-gray"
                src={this.props.avatar}
                alt="..."
              />
              <h4 className="title">
                {this.props.name}
                <br />
                <small>{this.props.userName}</small>
              </h4>
            </a>
          </div>
          <p className="description text-center">{this.props.description}</p>
        </div>
        <hr />
        <div className="text-center">{this.props.socials}</div>
      </div>
    );
  }
}

export default UserCard;
