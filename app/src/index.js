import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes.js'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
	<Routes />,
	document.getElementById('root')
);
