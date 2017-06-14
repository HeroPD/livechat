import React, { Component } from 'react';
import './style.css';

class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      question: '',
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log(this.state);
    alert('A name was submitted: ');
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>Online chat</h3>
        <form className="request-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Your name: <span className="required">required</span></label>
          <input type="text" id="name" name="name" value={this.state.value} onChange={this.handleChange}/>
          <label htmlFor="question">Question: <span className="required">required</span></label>
          <input type="text" id="question" name="question" value={this.state.question} onChange={this.handleChange}/>
          <label htmlFor="email">Email: <span className="required">required</span></label>
          <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange}/>
          <input type="submit" value="Start Chat"/>
        </form>
      </div>
    );
  }
}

class Client extends Component {
  render() {
    return (
      <div className="client">
        <div className="container">
          <RequestForm />
        </div>
      </div>
    );
  }
}

export default Client;