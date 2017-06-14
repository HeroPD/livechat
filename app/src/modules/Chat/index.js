import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import ChatIcon from 'material-ui/svg-icons/communication/chat';
import PollIcon from 'material-ui/svg-icons/social/poll';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Subheader from 'material-ui/Subheader';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import './style.css'

class HeaderBar extends Component {
	
	render() {
		const styles = {
			headerContainer:{
				height: 48,
				backgroundColor: getMuiTheme().tabs.backgroundColor
			}
		};
		return (
			<div style={styles.headerContainer}>
			</div>
		);
	};
}

export default class Chat extends Component {

  render() {
  	const styles = {
  		zero:{
  			paddingTop: 0,
	  		paddingBottom: 0,
	  		paddingRight: 0,
	  		paddingLeft: 0,
	  		marginLeft: 0,
	  		margintRight: 0
  		},
  		container: {
	  		width: '100%',
	  		height: '100%',
	  		paddingRight: 0,
	  		paddingLeft: 0,
	  		marginLeft: 0,
	  		margintRight: 0
	  	},
	  	list: {
	  		padding: 0,
	  		margin: 0,
	  		top: 48,
	  		bottom: 0,
	  		width: '100%',
	  		overflow: 'auto',
	  		position: 'absolute',
	  	},
	  	leftContainer: {
	  		padding: 0,
	  		margin: 0,
	  		position: 'relative'
	  	},
	  	paper: {
	  		position: 'absolute',
	  		height: '100%',
	  		width: '100%'
	  	}
  	}
  	var rows = [];
		for (var i=0; i < 10; i++) {
		    rows.push(<ListItem key={i} primaryText="Name" secondaryText="message" rightIcon={<ActionInfo />} />);
		};
    return (
    	<MuiThemeProvider>
	      <div className="chat-container">
	      	<Grid fluid style={styles.container}>
	      		<Row style={styles.container}>
	      			<Col xs={3} sm={3} md={3} lg={3} style={styles.leftContainer}>
	      					<Paper style={styles.paper} zDepth={2}>
					        	<Tabs>
									    <Tab
									      icon={<ChatIcon />}
									    />
									    <Tab
									      icon={<PollIcon />}
									    />
									  </Tabs>
									  <List style={styles.list}>
									  	<Subheader>Chats</Subheader>
									  	{rows}
									  </List>
								  </Paper>
				      </Col>
				      <Col xs={9} sm={9} md={9} lg={9} style={styles.zero}>
				        <div>
				        	<HeaderBar />
				        </div>
							</Col>
		        </Row>
		      </Grid>
	      </div>
      </MuiThemeProvider>
    );
  }
}