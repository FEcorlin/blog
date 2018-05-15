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
import 'antd/dist/antd.less';
import { DatePicker } from 'antd';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export default class App extends Component {
  componentDidMount(){}
  componentWillMount(){}
  render() {
    return (
        <Router>
            <div>
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
