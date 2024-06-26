import React from 'react';
import './index.css';
import AppWithRedux from "./AppWithRedux";
import { store } from './state/store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>, document.getElementById('root')
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

