import React, { Component } from 'react';
import './App.css';


import Navbar from './navbar';
import Router from './Router';

class App extends Component {
    render(){
        return (
            <div className="App">

                <div className="App-use">
                    <Navbar />
                    <Router />
                </div>

            </div>
        );
        }
    }

    export default App;