import React,{ Component } from 'react';
import {
	NavLink,Link
} from 'react-router-dom'
import './header.less';

export default class Header extends Component{
	constructor(props){
		super(props);
		this.state = {};
	}
	render(){
		return (
			<div className="head_wrap">
				<a className="logo">
					<img alt="NOTE" src="" />
				</a>
				<div className="container">
					<NavLink to='/' className="menu" activeClassName="active">
						<i className="fa fa-bandcamp"></i>
						<span>首页</span>
					</NavLink>
					<a href="" className="menu">
						<i className="fa fa-bandcamp"></i>
						<span>其他</span>
					</a>
					<a href="" className="menu">
						<i className="fa fa-bandcamp"></i>
						<span>其他</span>
					</a>
					<form action="">
						<input type="text" placeholder="搜索"/>
						<button className="fa fa-search"></button>
					</form>
				</div>
				<NavLink className="write_btn" to="/write">
					<i className="fa fa-leaf"></i>写文章
				</NavLink>
				<Link className="login_btn" to="/login">
					登录
				</Link>
				<a className="regist_btn" target="_blank" href="">
					注册
				</a>
			</div>
		);
	}
}