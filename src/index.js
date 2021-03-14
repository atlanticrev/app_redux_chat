import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Store } from "./store/Store";

import App from './App';

import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={Store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
