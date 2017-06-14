// src/components/App/index.js
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import './style.css';

class LoginForm extends Component{

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ');
    event.preventDefault();
  }
  
  render(){
    const styles = {
      textField: {
        width: 300
      },
      button: {
        marginTop: 12,
      },
      checkbox: {
        marginTop: 12,
      }
    };
    return (
      <form className="login-box" onSubmit={this.handleSubmit}>
        <MuiThemeProvider>
          <Card className="card-box">
            <h1>
              Welcome
            </h1>
            <TextField
              defaultValue=""
              floatingLabelText="Username"
              style={styles.textField}
            />
            <br/>
            <TextField
              defaultValue=""
              floatingLabelText="Password"
              type="password"
              style={styles.textField}
            />
            <br/>
            <Checkbox style={styles.checkbox} label="Remember me" />
            <br/>
            <RaisedButton primary={true} style={styles.button} fullWidth={true} label="Login" type="submit" />
          </Card>
        </MuiThemeProvider>
      </form>
    );
  }
}

export default class App extends Component {

  render() {
    return (
      <div className='App'>
        <LoginForm />
      </div>
    );
  }
}