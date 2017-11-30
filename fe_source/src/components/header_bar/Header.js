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
					<img alt="NOTE" src="//cdn2.jianshu.io/assets/web/logo-58fd04f6f0de908401aa561cda6a0688.png" />
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
				<a class="write_btn" target="_blank" href="">
					<i class="fa fa-leaf"></i>写文章
				</a>
				<a class="login_btn" target="_blank" href="">
					登录
				</a>
				<a class="regist_btn" target="_blank" href="">
					注册
				</a>
			</div>
		);
	}
}