import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from './components/header_bar/Header';
import Home from './components/home/Home';
import Details from './components/details/Details';

export default class App extends Component {
  componentDidMount(){}
  componentWillMount(){}
  render() {
    return (
        <div>
            <Header />
            <Home />
        </div>
    );
  }
}
