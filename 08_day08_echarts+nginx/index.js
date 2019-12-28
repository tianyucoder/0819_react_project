import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store'
import App from './App';
import './config/i18n.js'

ReactDOM.render(
<React.Suspense fallback={<div>loading......</div>}>
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
</React.Suspense>,

document.getElementById('root'));
