import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from './components/header_bar/Header';
import Home from './components/home/Home';
import Details from './components/details/Details';
import Write from './components/write/Write';
import Login from './components/user/login/Login';
import { DatePicker } from 'antd';

export default class App extends Component {
  componentDidMount(){}
  componentWillMount(){}
  render() {
    return (
        <Router>
            <div>
                <DatePicker/>
                <Header />
                <Route exact  path="/" component={Home} />
                <Route path="/p/:id" component={Details} />
                <Route path="/write" component={Write} />
                <Route path="/login" component={Login} />
            </div>
        </Router>
    );
  }
}
