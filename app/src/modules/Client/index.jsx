import React, { Component } from 'react';
import XMPP from "../XMPP";
import { Cookie } from "../Util/cookie.jsx";
import { Strophe } from "strophe.js";
import { Config } from '../../config.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ChatContainer, ChatBody, ChatBottom, ChatTitle, ChatRightBubble, ChatLeftBubble } from '../Chat'
import './style.css';

class FormItemText extends Component {

  constructor(props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (this.props.onValueChange) {
      this.props.onValueChange(this, event.target.value);
    }
  }

  handleFocus(event) {
    if (this.props.onFocused) {
      this.props.onFocused(this);
    }
  }

  render() {
    const styles = {
      redBorder: {
        borderColor: '#ff0000'
      }
    }
    return(
      <div>
        <label>{this.props.label} {this.props.required ? <span className="required">required</span> : ''} </label>
        <input style={this.props.error ? styles.redBorder : null} type="text" onFocus={this.handleFocus} onChange={this.handleChange}/>
      </div>
    );
  }
}

class FormItemList extends Component {

  constructor(props) {
    super(props);
    this.options = this.props.options.map((value) =>
      <option key={value} value={value}>{value}</option>
    );
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (this.props.onValueChange) {
      this.props.onValueChange(this, event.target.value);
    }
  }

  render() {
    return(
      <div>
        <label>{this.props.label}</label>
        <select onChange={this.handleChange}>
          {this.options}
        </select>
      </div>
    );
  }
}

class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formItems: Config.fieldConfig.map(item => {
        item.error = false;
        if (item.type === 'text'){
          item.value = '';
        } else if (item.type === 'list') {
          item.value = item.options[0];
        }
        return item
      })
    };
    this.onFocused = this.onFocused.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onValueChange(formItem, value) {
    var newFormItems = this.state.formItems.slice();
    newFormItems.forEach((item, index) => {
      if (index === formItem.props.id) {
        newFormItems[index].value = value;
      }
    });
    this.setState({
        formItems: newFormItems
      }
    );
  }

  onFocused(formItemText) {
    var newFormItems = this.state.formItems.slice();
    newFormItems.forEach((item, index) => {
      if (index === formItemText.props.id) {
        newFormItems[index].error = false;
      }
    });
    this.setState({
        formItems: newFormItems
      }
    );
  }

  handleSubmit(event) {
    var newFormItems = this.state.formItems.slice();
    var isValidateSuccess = true;
    newFormItems.forEach((item, index)=> {
      if (item.required && item.value === '') {
        newFormItems[index].error = true;
        isValidateSuccess = false;
      } else if (item.validate && !item.validate(item.value)) {
        newFormItems[index].error = true;
        isValidateSuccess = false;
      }
    });
    this.setState({
        formItems: newFormItems
      }
    );
    if (isValidateSuccess && this.props.onSubmit) {
      this.props.onSubmit(this.state.formItems);
    }
    event.preventDefault();
  }

  renderFormItem() {
    var formFieldList = [];
    this.state.formItems.forEach((item, index)=> {
      if (item.type === 'text'){
        formFieldList.push(<FormItemText id={index} key={index} required={item.required} error={item.error} label={item.label} validate={item.validate} onFocused={this.onFocused} onValueChange={this.onValueChange}/>);
      } else if (item.type === 'list') {
        formFieldList.push(<FormItemList id={index} key={index} label={item.label} options={item.options} onValueChange={this.onValueChange}/>);
      }
    });
    return formFieldList;
  }

  render() {
    return (
      <div>
        <h3>Online chat</h3>
        <form className="request-form" onSubmit={this.handleSubmit}>
          {this.renderFormItem()}
          <input type="submit" value="Start Chat"/>
        </form>
      </div>
    );
  }
}

class Conversation extends Component {
  render() {
    return(
      <MuiThemeProvider>
        <ChatContainer>
          <ChatBody>
            <ChatTitle>ChatTitle</ChatTitle>
            <ChatRightBubble>ChatRightBubble</ChatRightBubble>
            <ChatLeftBubble>ChatLeftBubble</ChatLeftBubble>
            <ChatTitle>ChatTitle</ChatTitle>
            <ChatRightBubble>ChatRightBubble</ChatRightBubble>
            <ChatLeftBubble>ChatLeftBubble</ChatLeftBubble>
            <ChatTitle>ChatTitle</ChatTitle>
            <ChatRightBubble>ChatRightBubble</ChatRightBubble>
            <ChatLeftBubble>ChatLeftBubble</ChatLeftBubble>
            <ChatTitle>ChatTitle</ChatTitle>
            <ChatRightBubble>ChatRightBubble</ChatRightBubble>
            <ChatLeftBubble>ChatLeftBubble</ChatLeftBubble>
            <ChatTitle>ChatTitle</ChatTitle>
            <ChatRightBubble>ChatRightBubble</ChatRightBubble>
            <ChatLeftBubble>ChatLeftBubble</ChatLeftBubble>
            <ChatTitle>ChatTitle</ChatTitle>
            <ChatRightBubble>ChatRightBubble</ChatRightBubble>
            <ChatLeftBubble>ChatLeftBubble</ChatLeftBubble>
            <ChatTitle>ChatTitle</ChatTitle>
            <ChatRightBubble>ChatRightBubble</ChatRightBubble>
            <ChatLeftBubble>ChatLeftBubble</ChatLeftBubble>
          </ChatBody>
          <ChatBottom />
        </ChatContainer>
      </MuiThemeProvider>
    );
  }
}

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMode: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onConnect = this.onConnect.bind(this);
  }

  onConnect(status) {
    console.log(status);
    if (status === Strophe.Status.CONNECTING) {
      console.log('Strophe is connecting.');
    } else if (status === Strophe.Status.CONNFAIL) {
      console.log('Strophe failed to connect.');
    } else if (status === Strophe.Status.DISCONNECTING) {
      console.log('Strophe is disconnecting.');
    } else if (status === Strophe.Status.DISCONNECTED) {
      console.log('Strophe is disconnected.');
    } else if (status === Strophe.Status.CONNECTED) {
      console.log('Strophe is connected.');
      console.log(Cookie.getCookie('token'));
      if (Cookie.getCookie('token').length > 0) {
        this.xmpp.joinChat(Cookie.getCookie('token'), success => {

        }, failed => {

        })
      } else {
        this.xmpp.createChat(this.data, token => {
          console.log(token);
          Cookie.setCookie('token', token, 3);
        }, failed => {
          Cookie.setCookie('token', null, 0);
          console.log(failed);
        });
      }
      
    } else if (status === Strophe.Status.ATTACHED) {
      console.log('Strophe is attached.');
    }
  };

  onSubmit(items) {
    console.log(items);
    this.data = items.map(item => {
      var newitem = {
        key: item.key,
        value: item.value
      };
      return newitem;
    });
    this.xmpp = new XMPP(Config.connectionUrl);
    this.xmpp.connectAnonymous(Config.domain, this.onConnect);
  }

  render() {
    return (
      <div className="client">
        <div className="container">
          {this.state.chatMode ? <Conversation /> : <RequestForm onSubmit={this.onSubmit}/>}
        </div>
      </div>
    );
  }
}

export default Client;