import React,{ Component } from 'react';
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
					<a href="" className="menu active">
						<i className="fa fa-bandcamp"></i>
						<span>首页</span>
					</a>
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
				<a className="write_btn" target="_blank" href="">
					<i className="fa fa-leaf"></i>写文章
				</a>
				<a className="login_btn" target="_blank" href="">
					登录
				</a>
				<a className="regist_btn" target="_blank" href="">
					注册
				</a>
			</div>
		);
	}
}