import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game/Game';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './stores';

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
