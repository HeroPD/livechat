import React, { Component } from 'react';
import XMPP from "../XMPP";
import { Config } from '../../config.jsx';
import './style.css';

class FormItemText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    console.log(this.props);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      value: value
    });
  }

  render() {
    return(
      <div>
        <label>{this.props.label} {this.props.required ? <span className="required">required</span> : ''} </label>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
      </div>
    );
  }
}

class FormItemList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.options[0]
    };
    this.options = this.props.options.map((value) =>
      <option key={value} value={value}>{value}</option>
    );
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return(
      <div>
        <label>{this.props.label}</label>
        <select value={this.state.value} onChange={this.handleChange}>
          {this.options}
        </select>
      </div>
    );
  }
}

class RequestForm extends Component {
  constructor(props) {
    super(props);
    console.log(Config.fieldConfig);
    this.formItems = Config.fieldConfig.map((item, index) =>
      this.renderFieldItem(item, index)
    );
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderFieldItem(item, index) {
    if (item.type == 'text'){
      return <FormItemText key={index} required="true" label={item.label} validate={item.validate}/>;
    } else if (item.type == 'list') {
      return <FormItemList key={index} label={item.label} options={item.options}/>;
    }
  }

  handleSubmit(event) {
    var xmpp = new XMPP(Config.connectionUrl);
    xmpp.connectAnonymous(Config.domain, null);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>Online chat</h3>
        <form className="request-form" onSubmit={this.handleSubmit}>
          {this.formItems}
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