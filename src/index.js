import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import Routes from './routes'
import './index.css';

class App extends React.Component{
    constructor(){
        super();
        var config = {
            apiKey: "AIzaSyBr9wGS-JzixSHSMJpdVXGz-DyUPjlNdNg",
            authDomain: "mapa-de-startup.firebaseapp.com",
            databaseURL: "https://mapa-de-startup.firebaseio.com",
            projectId: "mapa-de-startup",
            storageBucket: "mapa-de-startup.appspot.com",
            messagingSenderId: "562968674625"
        };
        firebase.initializeApp(config);
        console.log("Firebase Inicializado!");
    }
    render() {
        console.log("app render");
        return (
                <Routes />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
