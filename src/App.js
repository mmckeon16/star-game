import React from 'react';
import logo from './logo.svg';
import './App.css';
import App from './main-game';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister()
