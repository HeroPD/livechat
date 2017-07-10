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
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import './style.css'

class ChatContainer extends Component {

	render() {
		const styles = {
			chatContainer: {
	  		padding: 0,
	  		margin: 0,
	  		top: 48,
	  		bottom: 0,
	  		width: '100%',
	  		position: 'absolute'
			}
		}
		return (
			<div style={styles.chatContainer}>
				{this.props.children}
			</div>
		);
	}
}

class ChatBody extends Component {
	render() {
		const styles = {
			bodyContainer: {
				top: 0,
				bottom: 72,
				width: '100%',
				overflow: 'auto',
				position: 'absolute'
			}
		}
		return (
			<div style={styles.bodyContainer}>
				{this.props.children}
			</div>
		);
	}
}

class ChatBottom extends Component {
	render() {
		const styles = {
			bottomContainer: {
				height: 72,
				bottom: 0,
				width: '100%',
				position: 'absolute',
				display: 'table',
				margin: 'auto',
				paddingLeft: 10,
				paddingRight: 10,
				borderTop: '1px solid #ddd'
			},
			chatFieldContainer: {
				position: 'relative',
				display: 'table-cell',
				width: '100%'
			},
			chatField: {
				width: '95%'
			},
			chatButton: {
				display: 'table-cell'
			}
		}
		return (
			<div className="vertical-center" style={styles.bottomContainer}>
				<div style={styles.chatFieldContainer}>
					<TextField
						style={styles.chatField}
			      hintText="Enter message"
			      multiLine={true}
			      rowsMax={2}
			    />
		    </div>
			  <FlatButton style={styles.chatButton} primary={true} label="SEND" />
			</div>
		);
	}
}

class ChatLeftBubble extends Component {
	render() {
		const styles = {
			leftBubble: {
				width: '100%',
				padding: 10
			}
		}
		return (
			<div style={styles.leftBubble}>
				{this.props.children}
			</div>
		);
	}
}

class ChatRightBubble extends Component {
	render() {
		const styles = {
			rightBubble: {
				width: '100%',
				textAlign: 'right',
				padding: 10
			}
		}
		return (
			<div style={styles.rightBubble}>
				{this.props.children}
			</div>
		);
	}
}

class ChatTitle extends Component {
	render() {
		const styles = {
			titleContainer: {
				textAlign: 'center',
				right: 0,
				height: 20
			}
		}
		return (
			<div style={styles.titleContainer}>
				{this.props.children}
			</div>
		);
	}
}

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
	  		margintRight: 0,
	  		position: 'relative'
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
	  		borderRight: '1px solid #ddd'
	  	},
	  	leftContainer: {
	  		padding: 0,
	  		margin: 0,
	  		position: 'relative'
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
	      					<div style={styles.container}>
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
								  </div>
				      </Col>
				      <Col xs={9} sm={9} md={9} lg={9} style={styles.zero}>
				        <div style={styles.container}>
				        	<HeaderBar />
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
				        </div>
							</Col>
		        </Row>
		      </Grid>
	      </div>
      </MuiThemeProvider>
    );
  }
}